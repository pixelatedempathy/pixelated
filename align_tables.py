import logging
import sys
from pathlib import Path

# Configure logging to replace print statements
logging.basicConfig(level=logging.INFO, format="%(message)s")
logger = logging.getLogger(__name__)


def _is_separator_row(row: list) -> bool:
    """Checks if a row is a markdown table separator."""
    return all(set(c) <= {"-", ":", " "} for c in row if c)


def _format_separator_cell(cell: str, width: int) -> str:
    """Formats a single separator cell with correct alignment markers."""
    if cell.startswith(":") and cell.endswith(":"):
        return ":" + "-" * (width - 2) + ":"
    if cell.endswith(":"):
        return "-" * (width - 1) + ":"
    if cell.startswith(":"):
        return ":" + "-" * (width - 1)
    return "-" * width


def _format_row(row: list, col_widths: list, is_separator: bool) -> str:
    """Formats a table row."""
    formatted_cells = []
    for j, cell in enumerate(row):
        width = col_widths[j]
        if is_separator:
            formatted_cells.append(_format_separator_cell(cell, width))
        else:
            formatted_cells.append(cell.ljust(width))
    return "| " + " | ".join(formatted_cells) + " |"


def align_table(table_block: str) -> str:
    """Aligns a markdown table block."""
    lines = [line for line in table_block.strip().split("\n") if line.strip()]

    if len(lines) < 2:
        return table_block

    # Parse rows
    rows = [[cell.strip() for cell in line.strip().strip("|").split("|")] for line in lines]

    # Normalize row length
    max_cols = max(len(r) for r in rows)
    for row in rows:
        while len(row) < max_cols:
            row.append("")

    # Calculate widths
    col_widths = [0] * max_cols
    for i, row in enumerate(rows):
        if i == 1 and _is_separator_row(row):
            continue
        for j, cell in enumerate(row):
            col_widths[j] = max(col_widths[j], len(cell))

    # Ensure min width of 3 for valid separators
    col_widths = [max(w, 3) for w in col_widths]

    # Reconstruct
    formatted_lines = []
    for i, row in enumerate(rows):
        is_sep = i == 1 and _is_separator_row(row)
        formatted_lines.append(_format_row(row, col_widths, is_sep))

    return "\n".join(formatted_lines) + "\n"


def _is_probable_table_row(line: str) -> bool:
    """Heuristic to check if a line is a table row."""
    stripped = line.strip()
    if stripped.startswith("|"):
        return True
    return (
        stripped.count("|") >= 1 and not stripped.startswith("#") and not stripped.startswith("-")
    )


def _is_table_start(lines: list, i: int) -> bool:
    """Checks if a table starts at lines[i]."""
    if not _is_probable_table_row(lines[i]):
        return False

    if i + 1 >= len(lines):
        return False

    next_line = lines[i + 1].strip()
    return next_line.startswith("|") and set(next_line.replace("|", "").replace(" ", "")) <= {
        "-",
        ":",
    }


def process_file(file_path: str):
    """Processes a single file to align all markdown tables found within."""
    try:
        content = Path(file_path).read_text(encoding="utf-8")
    except Exception as e:
        logger.error("Skipping %s: %s", file_path, e)
        return

    lines = content.splitlines()
    new_lines = []
    in_table = False
    table_buffer = []

    for i, line in enumerate(lines):
        if not in_table:
            if _is_table_start(lines, i):
                in_table = True
                table_buffer.append(line)
            else:
                new_lines.append(line)
        elif _is_probable_table_row(line):
            table_buffer.append(line)
        else:
            new_lines.append(align_table("\n".join(table_buffer)))
            table_buffer = []
            in_table = False
            new_lines.append(line)

    if in_table:
        new_lines.append(align_table("\n".join(table_buffer)))

    new_content = "\n".join(new_lines)
    if content.endswith("\n") and not new_content.endswith("\n"):
        new_content += "\n"

    if new_content != content:
        logger.info("Updating %s", file_path)
        Path(file_path).write_text(new_content, encoding="utf-8")
    else:
        logger.debug("No changes for %s", file_path)


if __name__ == "__main__":
    for f in sys.argv[1:]:
        process_file(f)
