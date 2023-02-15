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
  const pageName = options.name
  console.log(`Generating "${pageName}" page...`)
  const pagesPath = join(process.cwd(), 'pages')

  if (!existsSync(pagesPath)) {
    mkdirSync(pagesPath)
  }

  const paths = pageName.split('/')

  let root = []
  for (const path of paths) {
    const _path = join(pagesPath, ...root, path)
    if (!existsSync(_path)) {
      mkdirSync(_path)
    }
    root.push(path)
  }

  const lastPageName = root.at(root.length - 1)

  writeFileSync(
    join(pagesPath, ...root, 'index.vue'),
    `
    <script setup lang="ts">
    </script>

    <template>
    <h1>${capitalize(lastPageName)} Page</h1>
    </template>
  `
  )
}
