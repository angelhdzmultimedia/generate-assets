import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../utils/path/build'
import { capitalize, capitalizeAll } from '../../utils/string/capitalize'
import { useArgs } from '../../utils/args'

export default (command: string[]) => {
  const options: { name: string } = useArgs(command, {}, 'new page')
  const pageName = options.name.split('-').join('/')
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
    lastPageName = fullPath.join(' ')
  }

  const pageNamePascal = capitalizeAll(lastPageName).split(' ').join('')

  writeFileSync(
    join(pagesPath, ...fullPath, 'index.vue'),
    `
    <script setup lang="ts">
    </script>

    <template>
    <h1>${pageNamePascal} Page</h1>
    </template>
  `
  )
}
