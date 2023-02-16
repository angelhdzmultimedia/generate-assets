import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '~/generate/utils/path/build'
import { capitalize } from '~/generate//utils/string/capitalize'

export default (options: any) => {
  const apiName = options.name
  console.log(`Generating "${apiName}" client middleware...`)

  if (!existsSync('middleware')) {
    mkdirSync('middleware')
  }

  const middleWarePath = 'middleware'

  let fullPath: string[] = []
  let lastApiName = ''

  if (options.name === 'index') {
    fullPath = []
    lastApiName = 'index'
  } else {
    fullPath = buildPaths(apiName, middleWarePath)
    lastApiName = fullPath.at(fullPath.length - 1)!
  }

  writeFileSync(
    join(
      middleWarePath,
      ...fullPath,
      `index.${options.global ? 'global.' : ''}ts`
    ),
    `
    export default defineNuxtRouteMiddleware(async (to) => {

    })
  `
  )
}
