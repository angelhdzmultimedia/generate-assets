import { H3Event } from 'h3'
import { Service } from './service'

export async function useService<T extends Service<any, any, any, any>>(
  event: H3Event,
  baseClass: { new (): T }
) {
  const body = await readBody(event)
  const params = await event.context.params
  const query = await getQuery(event)
  const instance: T = new baseClass() as any as T
  instance.body = body
  instance.params = params!
  instance.query = query
  instance.event = event
  return instance
}
