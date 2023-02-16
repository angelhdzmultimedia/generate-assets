import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../utils/path/build'
import { capitalize, capitalizeAll } from '../../utils/string/capitalize'
import { useArgs } from '../../utils/args'
import { spawn } from 'node:child_process'
import inquirer from 'inquirer'

export default (args: string[]) => {
  const options: any & { name: string } = useArgs(args)
  const appName = options.name.split('-').join('/')
  console.log(`Generating "${appName}" app...`)
  spawn(`pnpx`, ['nuxi', 'init', appName]).addListener('exit', async () => {
    const bla = await inquirer.prompt([
      {
        message: 'Extra Dependencies',
        type: 'checkbox',
        choices: [
          {
            name: 'quasar',
            value: 'quasar',
            key: 'quasar',
          },
        ],
      },
    ])
  })
}
