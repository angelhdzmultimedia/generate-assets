import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../utils/path/build'
import { capitalize } from '../utils/string/capitalize'

export default (options: any) => {
  const entityName = options.name
  console.log(`Generating "${entityName}" entity...`)
  const entitiesPath = join(process.cwd(), 'entities')

  if (!existsSync(entitiesPath)) {
    mkdirSync(entitiesPath)
  }

  const fullPath = buildPaths(entityName, entitiesPath)

  writeFileSync(
    join(entitiesPath, `${entityName}.ts`),
`export class ${capitalize(entityName)} {    
}
    `
  )
}