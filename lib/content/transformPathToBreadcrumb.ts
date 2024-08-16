export function transformPathToBreadcrumb(path: string): string {
  if (path === "/") {
    return "work";
  }
  return path;
}
