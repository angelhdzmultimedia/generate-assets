import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { useArgs } from '../utils'

async function parseArgs() {
  const command = ['new', '<type>', '<name>']
  const args: { command: string; type: string; name: string } = useArgs(
    command,
    {
      type: { type: 'string' },
      name: { type: 'string' },
    },
    'new asset'
  )

  console.log('New asset')
  args.type = args.type.split('-').join('/')
  console.log(args.type)
  const fn = await import(`./functions/${args.type}`)
  fn.default.apply(null, [command])
}

parseArgs()
