type Mods = Record<string, string | boolean>;

export function classNames(
  cls: string,
  mods: Mods = {},
  add: string[] = []
): string {
  return [
    cls,
    ...add.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([cls]) => cls),
  ].join(" ");
}
