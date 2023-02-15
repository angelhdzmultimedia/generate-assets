import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../utils/path/build'
import { hideBin } from 'yargs/helpers'
import { useArgs } from '../utils/args'
import { capitalize } from '../utils/string/capitalize'

export default (args: string[]) => {
  const options: any & { name: string } = useArgs(args)

  const storesPath = join(process.cwd(), 'stores')

  if (!existsSync(storesPath)) {
    mkdirSync(storesPath)
  }

  const storeName = options.name

  const fullPath = buildPaths(options.name, storesPath)

  writeFileSync(
    join(storesPath, ...fullPath, 'index.ts'),
    `import {defineStore} from 'pinia'

export const use${capitalize(
      storeName
    )}Store = defineStore('${storeName}', () => {
  return {

  }
})
  `
  )

  try {
    import.meta.resolve!('pinia')
  } catch (error: unknown) {
    console.log(`Warning: Pinia is not installed. Install it in order to use the store.

NPM: npm add pinia 
PNPM: pnpm add pinia
Yarn: yarn add pinia
    `)
  }
}
