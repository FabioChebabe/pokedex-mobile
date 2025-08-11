export function formatString(value: string): string {
  if (!value) {
    return "";
  }

  const formatted = value.replace(/_/g, " ");

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}
