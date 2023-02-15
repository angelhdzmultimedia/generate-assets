import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

function capitalize(text: string): string {
  return text
    .split(' ')
    .map((item: string) => {
      return `${item.at(0)!.toUpperCase()}${item.substring(1).toLowerCase()}`
    })
    .join(' ')
}

export default (options: any) => {
  const pageName = options.name === '/' ? 'index' : options.name
  console.log(`Generating "${pageName}" page...`)
  const pagesPath = join(process.cwd(), 'pages')

  if (!existsSync(pagesPath)) {
    mkdirSync(pagesPath)
  }

  const pagePath = join(pagesPath, pageName)

  if (!existsSync(pagePath)) {
    mkdirSync(pagePath)
  }

  writeFileSync(
    join(pagePath, 'index.vue'),
    `
    <script setup lang="ts">
    </script>

    <template>
    <h1>${capitalize(pageName)} Page</h1>
    </template>
  `
  )
}
