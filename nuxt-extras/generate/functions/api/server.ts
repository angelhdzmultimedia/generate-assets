import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../../utils/path/build'
import { capitalize } from '../../../utils/string/capitalize'

export default (options: any) => {
  const apiName = options.name
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

  writeFileSync(
    join(apiPath, ...fullPath, 'index.ts'),
    `
    export default defineEventHandler(async (event) => {

    })
  `
  )
}
