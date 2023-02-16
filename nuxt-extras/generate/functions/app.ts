/**
 * TODO:  Finish the generate:app
 */

import { join } from 'node:path'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { buildPaths } from '../../utils/path/build'
import { capitalize, capitalizeAll } from '../../utils/string/capitalize'
import { useArgs } from '../../utils/args'
import { spawn } from 'node:child_process'
import inquirer from 'inquirer'

export default async (command: string[]) => {
  const options: { name: string } = useArgs(command, {}, 'new app')
  const appName = options.name
  console.log(`Generating "${appName}" app...`)

  spawn(`pnpx`, ['nuxi', 'init', appName]).addListener('close', async () => {
    const result = await inquirer.prompt([
      {
        name: 'extra',
        message: 'Extra Dependencies',
        type: 'checkbox',
        choices: [
          {
            name: 'Quasar',
            value: 'quasar',
            key: 'value',
          },
          {
            name: 'Pinia',
            value: 'pinia',
            key: 'value',
          },
        ],
      },
    ])
    console.log(result)
  })
}
