import yargs, { CommandModule } from 'yargs'
import { hideBin } from 'yargs/helpers'

export const useArgs = (args: string[], options: any, description = '') => {
  return yargs(hideBin(process.argv))
    .command(args.join(' '), description)
    .options(options).argv
}
