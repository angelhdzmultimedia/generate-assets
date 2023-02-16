import { H3Event } from 'h3'
import { Service } from '../entities/service'

export async function useService<T extends Service<any, any, any, any>>(
  event: H3Event,
  baseClass: { new (): T }
) {
  const instance: T = new baseClass() as any as T
  let body = {}
  let params = {}
  let query = {}

  try {
    body = await readBody(event)
    params = await event.context.params!
    query = await getQuery(event)
  } catch (error: unknown) {}

  instance.body = body
  instance.params = params
  instance.query = query
  instance.event = event
  return instance
}
