export function capitalize(text: string): string {
  return `${text.at(0).toUpperCase()}${text.substring(1).toLowerCase()}`
}

export function camelCase(text: string): string {
  const words = text.split(' ')
  const firstWord = words.splice(0, 1)[0].toLowerCase()
  return `${firstWord}${words.map((item) => capitalize(item)).join(' ')}`
}

export function capitalizeAll(text: string): string {
  return text
    .split(' ')
    .map((item) => capitalize(item))
    .join(' ')
}
