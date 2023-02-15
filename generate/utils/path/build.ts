import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'

export const buildPaths = (file: string, root: string = ''): string[] => {
  const paths = file.split('/')
  let current = []
  for (const path of paths) {
    const _path = join(root, ...current, path)
    if (!existsSync(_path)) {
      mkdirSync(_path)
    }
    current.push(path)
  }
  return current
}
