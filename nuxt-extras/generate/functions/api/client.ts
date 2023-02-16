import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../../utils/path/build'
import { capitalize } from '../../../utils/string/capitalize'

export default (options: any) => {
  const apiName = options.name
  console.log(`Generating "${apiName}" client api...`)

  if (!existsSync(join('client'))) {
    mkdirSync(join('client'))
  }

  if (!existsSync(join('client/api'))) {
    mkdirSync(join('client/api'))
  }

  const apiPath = join(process.cwd(), 'client', 'api')

  let fullPath: string[] = []
  let lastApiName = ''

  if (options.name === 'index') {
    fullPath = []
    lastApiName = 'index'
  } else {
    fullPath = buildPaths(apiName, apiPath)
    lastApiName = fullPath.at(fullPath.length - 1)!
  }

  const method = options.post
    ? 'POST'
    : options.put
    ? 'PUT'
    : options.delete
    ? 'DELETE'
    : options.patch
    ? 'PATCH'
    : 'GET'
  const baseUrl = `http://${options.host}:${options.port}/${apiName}`
  const withAxios = `import axios from 'axios'

export const ${apiName}Api = axios.create({
  method: '${method}',
  baseURL: '${baseUrl}'
})
    `

  const withFetch = `
export const ${apiName}Api = async (url: string, options: any) => $fetch(\`${baseUrl}/\${url}\`, {
  method: '${method}'
})
  `

  writeFileSync(
    join(apiPath, ...fullPath, 'index.ts'),
    options.axios ? withAxios : withFetch
  )

  try {
    import.meta.resolve!('axios')
  } catch (error: unknown) {
    console.log(`Warning: Axios is not installed. Install it in order to use the client api.

NPM: npm add axios 
PNPM: pnpm add axios
Yarn: yarn add axios
    `)
  }
}
