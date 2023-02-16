import yargs, { CommandModule } from 'yargs'
import { hideBin } from 'yargs/helpers'

export const useArgs = (command: string[], options: any, description = '') => {
  return yargs(hideBin(process.argv))
    .command(command.join(' '), description)
    .options(options).argv
}
