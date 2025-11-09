import argparse
import os
import shutil
from dataclasses import dataclass

BACK_DIR = os.path.join("ai", "dataset_pipeline-back")
MAIN_DIR = os.path.join("ai", "dataset_pipeline")


def is_file(path: str) -> bool:
    try:
        return os.path.isfile(path)
    except Exception:
        return False


def is_lfs_pointer(path: str) -> bool:
    if not is_file(path):
        return False
    try:
        with open(path, "rb") as f:
            head = f.read(256)
        return head.startswith(b"version https://git-lfs.github.com/spec/v1")
    except Exception:
        return False


def walk_rel(root: str) -> list[str]:
    out: list[str] = []
    if not os.path.isdir(root):
        return out
    for base, _dirs, files in os.walk(root):
        for fn in files:
            full = os.path.join(base, fn)
            rel = os.path.relpath(full, root)
            out.append(rel)
    return out


@dataclass
class FInfo:
    path: str
    exists: bool
    size: int
    mtime: float
    is_lfs: bool

    @classmethod
    def from_path(cls, path: str) -> "FInfo":
        exists = is_file(path)
        size = os.path.getsize(path) if exists else -1
        mtime = os.path.getmtime(path) if exists else -1.0
        lfs = is_lfs_pointer(path) if exists else False
        return cls(path, exists, size, mtime, lfs)


def decide_action(src: FInfo, dst: FInfo) -> tuple[str, str]:
    """
    Returns (action, reason)
    action: 'copy' means copy BACK->MAIN; 'skip' means keep MAIN
    Rules:
      - If missing in MAIN -> copy
      - Prefer real over LFS pointer
      - If sizes differ -> prefer newer mtime
      - If sizes equal -> prefer newer mtime
      - If same size/mtime -> skip
    """
    if src.exists and not dst.exists:
        return "copy", "missing-in-main"
    if not src.exists and dst.exists:
        return "skip", "only-in-main"
    if not src.exists and not dst.exists:
        return "skip", "missing-both"

    if dst.is_lfs and not src.is_lfs:
        return "copy", "main-is-lfs-pointer"
    if src.is_lfs and not dst.is_lfs:
        return "skip", "backup-is-lfs-pointer"

    if src.size != dst.size:
        if src.mtime > dst.mtime:
            return "copy", "backup-newer-size-diff"
        return "skip", "main-newer-size-diff"

    if src.mtime != dst.mtime:
        if src.mtime > dst.mtime:
            return "copy", "backup-newer"
        return "skip", "main-newer"

    return "skip", "same-size-mtime"


def ensure_parent(dst: str) -> None:
    parent = os.path.dirname(dst)
    if parent and not os.path.isdir(parent):
        os.makedirs(parent, exist_ok=True)


def main():
    ap = argparse.ArgumentParser(description="Compare and merge dataset_pipeline-back into dataset_pipeline")
    ap.add_argument("--apply", action="store_true", help="Apply copy actions (default: dry-run)")
    ap.add_argument("--list-all", action="store_true", help="List all decisions (not just a preview)")
    args = ap.parse_args()

    if not os.path.isdir(BACK_DIR):
        raise SystemExit(f"Backup directory not found: {BACK_DIR}")
    if not os.path.isdir(MAIN_DIR):
        raise SystemExit(f"Main directory not found: {MAIN_DIR}")

    r_back = set(walk_rel(BACK_DIR))
    r_main = set(walk_rel(MAIN_DIR))
    rels = sorted(r_back | r_main)

    copies = []  # (rel, src, dst, reason)
    skips = []   # (rel, reason)

    for rel in rels:
        src = FInfo.from_path(os.path.join(BACK_DIR, rel))
        dst = FInfo.from_path(os.path.join(MAIN_DIR, rel))
        action, reason = decide_action(src, dst)
        if action == "copy":
            copies.append((rel, src.path, os.path.join(MAIN_DIR, rel), reason))
        else:
            skips.append((rel, reason))

    print(f"Total files considered: {len(rels)}")
    print(f"Planned copies (BACK->MAIN): {len(copies)}")
    print(f"Planned skips: {len(skips)}")

    preview_max = None if args.list_all else 50

    def show(prefix: str, items: list[tuple]):
        shown = 0
        for it in items:
            if preview_max is not None and shown >= preview_max:
                print(f"... and {len(items) - shown} more {prefix.lower()} entries")
                break
            if prefix == "COPY":
                rel, _src, _dst, reason = it
                print(f"COPY\t{rel}\t{reason}")
            else:
                rel, reason = it
                print(f"SKIP\t{rel}\t{reason}")
            shown += 1

    show("COPY", copies)
    show("SKIP", skips)

    if args.apply:
        for rel, src, dst, _reason in copies:
            ensure_parent(dst)
            shutil.copy2(src, dst)
        print(f"Applied {len(copies)} copies.")

    # Post-check for any LFS pointers remaining in MAIN
    lfs_left: list[str] = []
    for rel in r_back | r_main:
        p = os.path.join(MAIN_DIR, rel)
        if is_lfs_pointer(p):
            lfs_left.append(rel)
    print(f"LFS pointers remaining in MAIN: {len(lfs_left)}")
    for rel in (lfs_left[:50]):
        print(f"LFS_PTR\t{rel}")
    if len(lfs_left) > 50:
        print(f"... and {len(lfs_left) - 50} more LFS pointers")


if __name__ == "__main__":
    main()
