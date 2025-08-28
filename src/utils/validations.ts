export const normalize = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[^a-zA-Z0-9]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
