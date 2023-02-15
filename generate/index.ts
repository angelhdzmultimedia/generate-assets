import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

const args: any & { type: string; name: string } = yargs(hideBin(process.argv))
  .options({ overwrite: { type: 'boolean', default: false } })
  .command('new <type> <name>', 'new asset', () => {}).argv

async function parseArgs(args: any) {
  if (args._.includes('new')) {
    console.log('New asset')
    const fn = await import(`./functions/${args.type}`)
    fn.default.apply(null, [args])
  }
}

parseArgs(args)
