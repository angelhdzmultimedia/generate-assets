import { H3Event } from 'h3'
import type { NuxtError } from '#app'

export class Service<B extends {}, P extends {}, Q extends {}, C extends {}> {
  public body: B = {} as B
  public params: P = {} as P
  public query: Q = {} as Q
  public event: H3Event | undefined

  constructor() {}

  public useCookie(key: keyof C): [C[keyof C], (value: C[keyof C]) => void] {
    return [
      String(getCookie(this.event!, key as string)) as any as C[keyof C],
      (value: C[keyof C]) => {
        setCookie(this.event!, key as string, String(value))
      },
    ]
  }

  public sendError(error: string | Partial<NuxtError>) {
    return sendError(this.event!, createError(error))
  }
}
