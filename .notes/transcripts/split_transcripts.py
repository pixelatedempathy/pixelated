#!/usr/bin/env python3
"""
Split transcripts into four subject-cohesive parts and normalize formatting.

Behavior:
- Walk a root directory recursively and process files with .md or .txt extensions.
- Backup original file to the same path with a `.orig` suffix (only if not present).
- Split the transcript text into paragraphs (blocks separated by 2+ newlines).
- Compute a simple paragraph similarity (Jaccard on token sets after light normalization).
- Use dynamic programming to find 3 cut points that split paragraphs into 4 contiguous
  segments that maximize within-segment cohesion (average pairwise similarity).
- Write the file back with a consistent format:
  - A single top-level title line preserved if present
  - Four sections labeled "Part 1/4", "Part 2/4", etc., optionally with an inferred short heading
  - Paragraphs preserved verbatim within each part

Usage:
  python3 split_transcripts.py --path /root/pixelated/.notes/transcripts [--apply]

This script avoids heavy third-party dependencies so it can run in minimal environments.
"""

from pathlib import Path
import argparse
import re
import math
import sys

STOPWORDS = {
    'the','and','a','an','in','on','of','to','is','are','it','that','this','for','with','as','was','were','be','by','at','from','or','we','you','i','they','he','she','but','not','have','has','had'
}

def read_file(path: Path) -> str:
    return path.read_text(encoding='utf-8', errors='ignore')

def write_file(path: Path, text: str):
    path.write_text(text, encoding='utf-8')

def split_paragraphs(text: str):
    # Normalize newlines
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    # Collapse repeated blank lines into exactly two newlines for clear paragraph boundaries
    text = re.sub(r"\n{3,}", "\n\n", text)
    # Split on two or more newlines
    parts = re.split(r"\n\s*\n", text.strip())
    # Trim paragraphs
    parts = [p.strip() for p in parts if p.strip()]
    return parts

def tokenize(s: str):
    s = s.lower()
    # remove punctuation except unicode word characters
    s = re.sub(r"[^\w\u00C0-\u017F']+", ' ', s)
    toks = [t for t in s.split() if len(t) > 1 and t not in STOPWORDS]
    return toks

def jaccard(a_set, b_set):
    if not a_set and not b_set:
        return 1.0
    inter = len(a_set & b_set)
    uni = len(a_set | b_set)
    return inter / uni if uni else 0.0

def compute_paragraph_vectors(paragraphs):
    vecs = []
    for p in paragraphs:
        toks = tokenize(p)
        vecs.append(set(toks))
    return vecs

def segment_cohesion(vecs, i, j):
    # average pairwise jaccard among paragraphs i..j inclusive
    n = j - i + 1
    if n <= 1:
        return 1.0
    total = 0.0
    count = 0
    for a in range(i, j+1):
        for b in range(a+1, j+1):
            total += jaccard(vecs[a], vecs[b])
            count += 1
    return total / count if count else 0.0

def best_4_splits(vecs):
    # dynamic programming to split contiguous paragraphs into 4 segments maximizing cohesion sum
    n = len(vecs)
    K = 4
    if n == 0:
        return []
    if n <= K:
        # trivial: each paragraph is its own segment; return split indices after each paragraph
        cuts = []
        idx = 1
        while idx < n and len(cuts) < K-1:
            cuts.append(idx)
            idx += 1
        return cuts

    # precompute cohesion for all segments
    cohesion = [[0.0]*n for _ in range(n)]
    for i in range(n):
        for j in range(i, n):
            cohesion[i][j] = segment_cohesion(vecs, i, j)

    # dp[k][i] = best score to split first i paragraphs (0..i-1) into k segments
    dp = [[-1e9]*(n+1) for _ in range(K+1)]
    parent = [[-1]*(n+1) for _ in range(K+1)]
    dp[0][0] = 0.0
    for k in range(1, K+1):
        for i in range(1, n+1):
            # try last segment starting at t (1..i)
            best = -1e9
            best_t = -1
            for t in range(k-1, i):
                # segment t..i-1
                score = dp[k-1][t]
                if score < -1e8:
                    continue
                seg_score = cohesion[t][i-1]
                val = score + seg_score
                if val > best:
                    best = val
                    best_t = t
            dp[k][i] = best
            parent[k][i] = best_t

    # reconstruct cuts for K=4, n paragraphs
    cuts = []
    k = K
    i = n
    boundaries = []
    while k > 0:
        t = parent[k][i]
        if t is None or t < 0:
            # fallback to equal splits
            boundaries = []
            break
        boundaries.append(t)
        i = t
        k -= 1
    # boundaries has starting indices for segments backward; we want cut points (after index)
    boundaries = list(reversed(boundaries))
    # boundaries contains start indexes of each segment; drop the very first 0
    cuts = [b for b in boundaries if b != 0]
    # we need exactly K-1 cuts; if fewer, fill evenly
    if len(cuts) < K-1:
        # evenly spaced
        cuts = [math.floor(n*(i+1)/K) for i in range(K-1)]
    # ensure cuts are strictly increasing and within range
    final = []
    last = 0
    for c in cuts:
        c = max(last+1, min(n-1, c))
        final.append(c)
        last = c
    # if we somehow have too many or duplicates, make evenly spaced
    if len(set(final)) != K-1:
        final = [math.floor(n*(i+1)/K) for i in range(K-1)]
    return final

def infer_heading(paragraph):
    # Use first sentence up to 8 words as a short inferred heading
    s = paragraph.strip().split('\n',1)[0]
    # extract first sentence by punctuation
    m = re.split(r'[\.\?!。？！]', s, 1)[0]
    words = m.split()
    heading = ' '.join(words[:8]).strip()
    return heading if heading else None

def process_file(path: Path, do_apply: bool):
    text = read_file(path)
    paragraphs = split_paragraphs(text)
    if not paragraphs:
        return (0, 'empty')
    vecs = compute_paragraph_vectors(paragraphs)
    if len(paragraphs) < 4:
        # fallback: group contiguous paragraphs to make 4 parts as evenly as possible
        cuts = [math.floor(len(paragraphs)*(i+1)/4) for i in range(3)]
    else:
        cuts = best_4_splits(vecs)

    # Build output
    parts = []
    start = 0
    for cut in cuts + [len(paragraphs)]:
        seg = paragraphs[start:cut]
        parts.append(seg)
        start = cut

    # Compose output text
    out_lines = []
    title = None
    # If file starts with a top-level markdown title, preserve
    if paragraphs and paragraphs[0].startswith('#'):
        title = paragraphs[0]
    if title:
        out_lines.append(title)
        out_lines.append('')

    for idx, seg in enumerate(parts, start=1):
        # infer heading
        heading = infer_heading(seg[0]) if seg else None
        if heading:
            out_lines.append(f'## Part {idx}/4 — {heading}')
        else:
            out_lines.append(f'## Part {idx}/4')
        out_lines.append('')
        # write paragraphs verbatim with a blank line between each
        for p in seg:
            out_lines.append(p)
            out_lines.append('')

    output = '\n'.join(out_lines).rstrip() + '\n'

    if do_apply:
        bak = path.with_suffix(path.suffix + '.orig')
        if not bak.exists():
            path.replace(bak)
            # write new content to original path
            write_file(path, output)
        else:
            # backup exists; overwrite path directly but keep backup intact
            write_file(path, output)
        return (1, 'processed')
    else:
        return (1, 'dry-run')

def walk_and_process(root: Path, do_apply: bool):
    processed = 0
    skipped = 0
    for p in sorted(root.rglob('*')):
        if p.is_file() and p.suffix.lower() in ('.md', '.txt') and p.name.endswith('.orig') is False:
            try:
                res, reason = process_file(p, do_apply)
                if res:
                    processed += 1
                else:
                    skipped += 1
            except Exception as e:
                print(f'Error processing {p}: {e}', file=sys.stderr)
    return processed, skipped

def main():
    parser = argparse.ArgumentParser(description='Split transcripts into 4 topic-based parts')
    parser.add_argument('--path', type=str, default='.', help='root path to process')
    parser.add_argument('--apply', action='store_true', help='apply changes (default is dry-run)')
    args = parser.parse_args()
    root = Path(args.path)
    if not root.exists():
        print('Path does not exist:', root)
        sys.exit(2)
    do_apply = args.apply
    if not do_apply:
        print('Dry-run: will report files that would be processed (use --apply to make changes)\n')
    processed, skipped = walk_and_process(root, do_apply)
    print(f'Processed: {processed}, Skipped: {skipped}')

if __name__ == '__main__':
    main()
