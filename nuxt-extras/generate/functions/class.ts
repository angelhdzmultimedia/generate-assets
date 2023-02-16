import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../utils/path/build'
import { capitalize } from '../../utils/string/capitalize'

export default (options: any) => {
  const className = options.name
  console.log(`Generating "${className}" entity...`)
  const pagesPath = join(process.cwd(), 'pages')

  if (!existsSync(pagesPath)) {
    mkdirSync(pagesPath)
  }
}
