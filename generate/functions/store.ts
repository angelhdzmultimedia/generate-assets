import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

function capitalize(text: string): string {
  return text
    .split(' ')
    .map((item: string) => {
      return `${item.at(0)!.toUpperCase()}${item.substring(1).toLowerCase()}`
    })
    .join(' ')
}

export default (options: any) => {
  const storesPath = join(process.cwd(), 'stores')
  if (!existsSync(storesPath)) {
    mkdirSync(storesPath)
  }

  const storeName = options.name
  const storePath = join(storesPath, storeName)

  if (!existsSync(storePath)) {
    mkdirSync(storePath)
  }

  writeFileSync(
    join(storePath, 'index.ts'),
    `
  export const use${capitalize(
    storeName
  )}Store = defineStore('${storeName}', () => {
    return {

    }
  })
  `
  )
}
