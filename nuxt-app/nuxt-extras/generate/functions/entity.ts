import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../utils/path/build'
import { capitalize, capitalizeAll } from '../../utils/string/capitalize'
import { useArgs } from '../../utils/args'

export default (args: string[]) => {
  const options: any & { name: string } = useArgs(args)
  const entityName = options.name.split('-').join('/')
  console.log(`Generating "${entityName}" entity...`)
  const entitiesPath = join(process.cwd(), 'entities')

  if (!existsSync(entitiesPath)) {
    mkdirSync(entitiesPath)
  }

  const fullPath = buildPaths(entityName, entitiesPath)

  writeFileSync(
    join(
      entitiesPath,
      ...fullPath,
      `${fullPath.length > 0 ? 'index' : entityName}.ts`
    ),
    `export class ${capitalizeAll(entityName.split('/').join(' '))
      .split(' ')
      .join('')} {    
}
    `
  )
}
