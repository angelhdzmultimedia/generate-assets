import yargs, { CommandModule } from 'yargs'
import { hideBin } from 'yargs/helpers'

export const useArgs = (args: string[], description = '') => {
  return yargs(hideBin(process.argv)).command(args.join(' '), description).argv
}
