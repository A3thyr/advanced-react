export type Mods = Record<string, string | boolean | undefined>;

export function classNames(
  cls: string,
  mods: Mods = {},
  add: Array<string | undefined> = []
): string {
  return [
    cls,
    ...add.filter(Boolean),
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([cls]) => cls),
  ].join(" ");
}
