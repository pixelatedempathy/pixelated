import path from 'path';

/**
 * Joins a base directory with a user-provided path, ensuring the result is within the base directory.
 * @param baseDir The base directory.
 * @param unsafePath The user-provided path.
 * @returns The resolved, safe path.
 * @throws An error if the resulting path is outside the base directory.
 */
export function secureJoin(baseDir: string, unsafePath: string): string {
  const resolvedPath = path.resolve(baseDir, unsafePath);
  if (!resolvedPath.startsWith(baseDir)) {
    throw new Error('Path traversal attempt detected');
  }
  return resolvedPath;
}
