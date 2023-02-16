import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { useArgs } from '../utils/args'

const commands = ['new', '<type>', '<name>']
const args: any & { type: string; name: string } = useArgs(
  commands,
  'new asset'
)

async function parseArgs(args: any) {
  if (args._.includes('new')) {
    console.log('New asset')
    args.type = args.type.split('-').join('/')
    console.log(args.type)
    const fn = await import(`./functions/${args.type}`)
    fn.default.apply(null, [commands])
  }
}

parseArgs(args)
