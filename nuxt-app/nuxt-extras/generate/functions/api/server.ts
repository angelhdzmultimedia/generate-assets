import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../../utils/path/build'
import {
  camelCase,
  capitalize,
  capitalizeAll,
} from '../../../utils/string/capitalize'
import { useArgs } from '../../../utils/args'

const _options = {
  get: {
    default: false,
    type: 'boolean',
  },
  post: {
    default: false,
    type: 'boolean',
  },
  service: {
    default: false,
    type: 'boolean',
  },
}

export default (args: string[]) => {
  const options: { name: string } & typeof _options = useArgs(
    args,
    _options,
    'new server api'
  )
  const apiName = options.name.split('-').join('/')
  console.log(`Generating "${apiName}" server api...`)

  if (!existsSync('server')) {
    mkdirSync('server')
  }

  const apiPath = join(process.cwd(), 'server/api')

  if (!existsSync(apiPath)) {
    mkdirSync(apiPath)
  }

  let fullPath: string[] = []
  let lastApiName = ''

  if (options.name === 'index') {
    fullPath = []
    lastApiName = 'index'
  } else {
    fullPath = buildPaths(apiName, apiPath)
    lastApiName = fullPath.at(fullPath.length - 1)!
  }

  const method = options.get ? 'get.' : options.post ? 'post.' : ''
  const isService = options.service
  const _apiName = apiName.split('/').join(' ')
  const apiNameCamel = camelCase(_apiName).split(' ').join('')
  const apiNamePascal = capitalizeAll(_apiName).split(' ').join('')
  const service = `const ${apiNameCamel}Service = await useService<${apiNamePascal}Service>(event, ${apiNamePascal}Service)`

  writeFileSync(
    join(apiPath, ...fullPath, `index.${method}ts`),
    `${isService ? `import {useService} from '~/nuxt-extras/utils'` : ''}

export default defineEventHandler(async (event) => {
  ${isService ? service : ''}
})
  `
  )
}
