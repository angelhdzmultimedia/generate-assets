import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../utils/path/build'
import { capitalize, capitalizeAll } from '../../utils/string/capitalize'
import { useArgs } from '../../utils/args'

export default (command: string[]) => {
  const options: { name: string } = useArgs(command, {}, 'new service')
  const serviceName = options.name.split('-').join('/')
  console.log(`Generating "${serviceName}" service...`)
  const servicesPath = join(process.cwd(), 'services')

  if (!existsSync(servicesPath)) {
    mkdirSync(servicesPath)
  }

  const fullPath = buildPaths(serviceName, servicesPath)

  writeFileSync(
    join(
      servicesPath,
      ...fullPath,
      `${fullPath.length > 0 ? 'index' : serviceName}.ts`
    ),
    `import {Service} from 'nuxt-api-utils'

export class ${capitalizeAll(serviceName.split('/').join(' '))
      .split(' ')
      .join('')}Service extends Service<{}, {}, {}, {}> {    
}
    `
  )
}
