export default function groupBy<T, K extends keyof T>(
  items: Array<T>,
  key: K,
): Record<string, Array<T>> {
  return items.reduce<Record<string, Array<T>>>((groups, item) => {
    const value = item[key];

    if (typeof value !== 'string') {
      return groups;
    }

    if (!groups[value]) {
      groups[value] = [item];
    } else {
      groups[value].push(item);
    }

    return groups;
  }, {});
}
