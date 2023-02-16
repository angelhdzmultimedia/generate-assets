import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../utils/path/build'
import { capitalize } from '../utils/string/capitalize'

export default (options: any) => {
  const pageName = options.name
  console.log(`Generating "${pageName}" page...`)
  const pagesPath = join(process.cwd(), 'pages')

  if (!existsSync(pagesPath)) {
    mkdirSync(pagesPath)
  }

  let fullPath: string[] = []
  let lastPageName = ''

  if (options.name === 'index') {
    fullPath = []
    lastPageName = 'index'
  } else {
    fullPath = buildPaths(pageName, pagesPath)
    lastPageName = fullPath.at(fullPath.length - 1)!
  }

  writeFileSync(
    join(pagesPath, ...fullPath, 'index.vue'),
    `
    <script setup lang="ts">
    </script>

    <template>
    <h1>${capitalize(lastPageName!)} Page</h1>
    </template>
  `
  )
}
