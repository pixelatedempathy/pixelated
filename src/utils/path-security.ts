/**
 * Path Security Utilities
 *
 * Provides secure path validation and sanitization to prevent path traversal attacks.
 * All file operations should use these utilities to ensure paths are safe.
 */

<<<<<<< HEAD
import path from 'node:path'
import { fileURLToPath } from 'node:url'
=======
<<<<<<< HEAD
import path from 'node:path'
import { fileURLToPath } from 'node:url'
=======
import path from "node:path";
import { fileURLToPath } from "node:url";
>>>>>>> origin/master
>>>>>>> origin/master

/**
 * Get the project root directory safely
 */
export function getProjectRoot(): string {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
  if (typeof process !== 'undefined' && process.cwd) {
    return process.cwd()
  }
  // Fallback for edge cases
  const __filename = fileURLToPath(import.meta.url)
  return path.dirname(path.dirname(path.dirname(__filename)))
<<<<<<< HEAD
=======
=======
  if (typeof process !== "undefined" && process.cwd) {
    return process.cwd();
  }
  // Fallback for edge cases
  const __filename = fileURLToPath(import.meta.url);
  return path.dirname(path.dirname(path.dirname(__filename)));
>>>>>>> origin/master
>>>>>>> origin/master
}

/**
 * Validates that a path is within an allowed directory (prevents path traversal)
 * @param filePath The path to validate
 * @param allowedDir The allowed base directory
 * @returns The normalized absolute path if valid, throws error if invalid
 */
export function validatePath(filePath: string, allowedDir: string): string {
  // Normalize the allowed directory to absolute path
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
  const normalizedAllowedDir = path.resolve(allowedDir)

  // Resolve the file path to absolute
  const resolvedPath = path.resolve(normalizedAllowedDir, filePath)

  // Normalize to handle any remaining .. or . segments
  const normalizedPath = path.normalize(resolvedPath)

  // Check if the resolved path is within the allowed directory
  if (!normalizedPath.startsWith(normalizedAllowedDir + path.sep) &&
    normalizedPath !== normalizedAllowedDir) {
    throw new Error(
      `Path traversal detected: ${filePath} resolves outside allowed directory ${allowedDir}`,
    )
  }

  return normalizedPath
<<<<<<< HEAD
=======
=======
  const normalizedAllowedDir = path.resolve(allowedDir);

  // Resolve the file path to absolute
  const resolvedPath = path.resolve(normalizedAllowedDir, filePath);

  // Normalize to handle any remaining .. or . segments
  const normalizedPath = path.normalize(resolvedPath);

  // Check if the resolved path is within the allowed directory
  if (
    !normalizedPath.startsWith(normalizedAllowedDir + path.sep) &&
    normalizedPath !== normalizedAllowedDir
  ) {
    throw new Error(
      `Path traversal detected: ${filePath} resolves outside allowed directory ${allowedDir}`,
    );
  }

  return normalizedPath;
>>>>>>> origin/master
>>>>>>> origin/master
}

/**
 * Safely joins paths and validates against an allowed directory
 * @param allowedDir The allowed base directory
 * @param ...pathSegments Path segments to join
 * @returns The validated absolute path
 */
<<<<<<< HEAD
export function safeJoin(allowedDir: string, ...pathSegments: string[]): string {
  const joinedPath = path.join(...pathSegments)
  return validatePath(joinedPath, allowedDir)
=======
<<<<<<< HEAD
export function safeJoin(allowedDir: string, ...pathSegments: string[]): string {
  const joinedPath = path.join(...pathSegments)
  return validatePath(joinedPath, allowedDir)
=======
export function safeJoin(
  allowedDir: string,
  ...pathSegments: string[]
): string {
  const joinedPath = path.join(...pathSegments);
  return validatePath(joinedPath, allowedDir);
>>>>>>> origin/master
>>>>>>> origin/master
}

/**
 * Validates a file path against multiple allowed directories
 * @param filePath The path to validate
 * @param allowedDirs Array of allowed base directories
 * @returns The normalized absolute path if valid, throws error if invalid
 */
export function validatePathAgainstMultiple(
  filePath: string,
  allowedDirs: string[],
): string {
  for (const allowedDir of allowedDirs) {
    try {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
      return validatePath(filePath, allowedDir)
    } catch {
      // Try next directory
      continue
<<<<<<< HEAD
=======
=======
      return validatePath(filePath, allowedDir);
    } catch {
      // Try next directory
      continue;
>>>>>>> origin/master
>>>>>>> origin/master
    }
  }

  throw new Error(
<<<<<<< HEAD
    `Path ${filePath} is not within any allowed directories: ${allowedDirs.join(', ')}`,
  )
=======
<<<<<<< HEAD
    `Path ${filePath} is not within any allowed directories: ${allowedDirs.join(', ')}`,
  )
=======
    `Path ${filePath} is not within any allowed directories: ${allowedDirs.join(", ")}`,
  );
>>>>>>> origin/master
>>>>>>> origin/master
}

/**
 * Sanitizes a filename to prevent directory traversal and other unsafe characters
 * @param filename The filename to sanitize
 * @returns Sanitized filename safe for use
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and dangerous characters
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
  // Using explicit character codes for control characters to avoid regex warnings
  const unsafeChars = new RegExp('[<>:"|?*\x00-\x1F]', 'g')

  return filename
    .replace(/[/\\]/g, '') // Remove path separators
    .replace(/\.\./g, '') // Remove parent directory references
    .replace(unsafeChars, '') // Remove unsafe characters including control characters
    .trim()
<<<<<<< HEAD
=======
=======
  const withoutSeparators = filename
    .replace(/[/\\]/g, "") // Remove path separators
    .replace(/\.\./g, ""); // Remove parent directory references

  const filtered = Array.from(withoutSeparators)
    .filter((ch) => {
      const code = ch.codePointAt(0);
      if (code === undefined) return false;
      if (code >= 0x00 && code <= 0x1f) return false;
      return !["<", ">", ":", '"', "|", "?", "*"].includes(ch);
    })
    .join("");

  return filtered.trim();
>>>>>>> origin/master
>>>>>>> origin/master
}

/**
 * Creates a safe file path by joining base directory with sanitized filename
 * @param baseDir The base directory
 * @param filename The filename to sanitize and join
 * @returns The validated absolute path
 */
export function createSafeFilePath(baseDir: string, filename: string): string {
<<<<<<< HEAD
  const sanitized = sanitizeFilename(filename)
  return safeJoin(baseDir, sanitized)
=======
<<<<<<< HEAD
  const sanitized = sanitizeFilename(filename)
  return safeJoin(baseDir, sanitized)
=======
  const sanitized = sanitizeFilename(filename);
  return safeJoin(baseDir, sanitized);
>>>>>>> origin/master
>>>>>>> origin/master
}

/**
 * Validates that a directory path is safe and creates it if needed
 * @param dirPath The directory path to validate
 * @param allowedDir The allowed base directory
 * @returns The validated absolute path
 */
export function validateAndCreateDir(
  dirPath: string,
  allowedDir: string,
): string {
  return validatePath(dirPath, allowedDir);
}

/**
 * Common allowed directories for the application
 */
// Lazy initialization to avoid issues with import.meta.url in some contexts
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
let _projectRoot: string | null = null

function getCachedProjectRoot(): string {
  if (!_projectRoot) {
    _projectRoot = getProjectRoot()
  }
  return _projectRoot
<<<<<<< HEAD
=======
=======
let _projectRoot: string | null = null;

function getCachedProjectRoot(): string {
  if (!_projectRoot) {
    _projectRoot = getProjectRoot();
  }
  return _projectRoot;
>>>>>>> origin/master
>>>>>>> origin/master
}

export const ALLOWED_DIRECTORIES = {
  get PROJECT_ROOT() {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/master
    return getCachedProjectRoot()
  },
  get CONTENT() {
    return path.join(getCachedProjectRoot(), 'content')
  },
  get PUBLIC() {
    return path.join(getCachedProjectRoot(), 'public')
  },
  get OUTPUT() {
    return path.join(getCachedProjectRoot(), 'output')
  },
  get LOGS() {
    return path.join(getCachedProjectRoot(), 'logs')
  },
  get TEMP() {
    return path.join(getCachedProjectRoot(), '.temp')
  },
  get TESTS() {
    return path.join(getCachedProjectRoot(), 'tests')
  },
  get SCRIPTS() {
    return path.join(getCachedProjectRoot(), 'scripts')
  },
} as const

<<<<<<< HEAD
=======
=======
    return getCachedProjectRoot();
  },
  get CONTENT() {
    return path.join(getCachedProjectRoot(), "content");
  },
  get PUBLIC() {
    return path.join(getCachedProjectRoot(), "public");
  },
  get OUTPUT() {
    return path.join(getCachedProjectRoot(), "output");
  },
  get LOGS() {
    return path.join(getCachedProjectRoot(), "logs");
  },
  get TEMP() {
    return path.join(getCachedProjectRoot(), ".temp");
  },
  get TESTS() {
    return path.join(getCachedProjectRoot(), "tests");
  },
  get SCRIPTS() {
    return path.join(getCachedProjectRoot(), "scripts");
  },
} as const;
>>>>>>> origin/master
>>>>>>> origin/master
