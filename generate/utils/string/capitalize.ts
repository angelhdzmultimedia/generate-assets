export function capitalize(text: string): string {
  return text
    .split(' ')
    .map((item: string) => {
      return `${item.at(0)!.toUpperCase()}${item.substring(1).toLowerCase()}`
    })
    .join(' ')
}

export function capitalizeAll(text: string): string {
  return text
    .split(' ')
    .map((item) => capitalize(item))
    .join(' ')
}
