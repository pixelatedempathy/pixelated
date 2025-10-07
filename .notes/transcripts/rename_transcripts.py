#!/usr/bin/env python3
"""
Recursively rename files in the transcripts folder by:
- removing any leading "playlist prefix" (everything before the first space)
- replacing spaces and consecutive whitespace with underscore
- converting names to lowercase
- avoiding overwrites by adding numeric suffixes when collisions occur

Usage:
  ./rename_transcripts.py --dry-run   # show changes
  ./rename_transcripts.py --apply     # perform renames

This script is safe for repeated runs and will skip files where the new name would be unchanged.
"""

import argparse
import os
import re
import sys
from pathlib import Path


def normalize_name(name: str) -> str:
    # Remove leading playlist prefix: everything before first space
    # If there's no space, leave name as-is
    parts = name.split(' ', 1)
    if len(parts) == 2:
        name = parts[1]
    # Replace any whitespace sequences with single underscore
    name = re.sub(r"\s+", "_", name)
    # Lowercase
    name = name.lower()
    # Strip leading/trailing underscores and dots
    name = name.strip(' _\n\r\t\u00A0')
    # Ensure extension remains and isn't altered (but already lowercased)
    return name


def unique_target(path: Path) -> Path:
    """Given a target path, append -1, -2 ... before extension until it doesn't exist."""
    parent = path.parent
    stem = path.stem
    suffix = path.suffix
    candidate = path
    counter = 1
    while candidate.exists() and candidate != path:
        candidate = parent / f"{stem}-{counter}{suffix}"
        counter += 1
    return candidate


def plan_renames(root: Path):
    plans = []  # tuples of (oldpath, newpath)
    for p in root.rglob('*'):
        if p.is_file():
            new_name = normalize_name(p.name)
            if new_name == p.name.lower() or new_name == p.name:
                # Even if lowercasing changed case, we still may want to rename
                # But we will compare normalized final paths
                pass
            new_path = p.with_name(new_name)
            # If the file already has the same resolved name, skip
            if new_path == p:
                continue
            # If new_path exists and is a different file, make unique
            if new_path.exists():
                # If it's the same inode (same file), skip
                try:
                    if os.path.samefile(p, new_path):
                        continue
                except FileNotFoundError:
                    pass
                uniq = unique_target(new_path)
                plans.append((p, uniq))
            else:
                plans.append((p, new_path))
    return plans


def apply_plans(plans, do_apply: bool):
    if not plans:
        print('No files to rename.')
        return 0
    maxlen = max(len(str(a)) for a, _ in plans)
    count = 0
    for src, dst in plans:
        print(f"{str(src):<{maxlen}} -> {dst}")
        if do_apply:
            dst.parent.mkdir(parents=True, exist_ok=True)
            try:
                src.rename(dst)
            except Exception as e:
                print(f"Failed to rename {src} -> {dst}: {e}", file=sys.stderr)
            else:
                count += 1
    return count


def main():
    parser = argparse.ArgumentParser(description='Rename transcript files')
    parser.add_argument('--apply', action='store_true', help='Perform the renames')
    parser.add_argument('--path', type=str, default='.', help='Root path to operate on')
    args = parser.parse_args()

    root = Path(args.path).resolve()
    if not root.exists():
        print(f'Path does not exist: {root}', file=sys.stderr)
        sys.exit(2)

    plans = plan_renames(root)
    if not plans:
        print('No renames planned.')
        return

    if not args.apply:
        print('Dry-run: the following renames are planned (run with --apply to perform):\n')
        apply_plans(plans, do_apply=False)
        print(f"\nTotal planned: {len(plans)}")
    else:
        print('Applying renames...')
        moved = apply_plans(plans, do_apply=True)
        print(f"\nRenames applied: {moved} of {len(plans)} planned.")


if __name__ == '__main__':
    main()
