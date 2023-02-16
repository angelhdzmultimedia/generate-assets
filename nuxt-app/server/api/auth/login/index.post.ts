import { useService } from '~/../nuxt-extras/utils'
import { Service } from '~/../nuxt-extras/entities'
import { randomUUID } from 'crypto'

export type CookieData = {
  token: string
}

type LoginBody = {
  email: string
  password: string
}

export type User = {
  email: string
  password: string
  id: string
  name: string
}

export const users: User[] = [
  {
    email: 'angelhdz@gmail.com',
    password: '123456',
    id: 'asdasd90as9d0asd9sa9',
    name: 'Angel',
  },
]

type Token = {
  id: string
  token: string
}

export const tokens: Token[] = []

class AuthLoginService extends Service<LoginBody, {}, {}, CookieData> {
  public login(): Omit<User, 'password'> | undefined | void {
    const user = users.find((item) => item.email === this.body.email)

    if (!user) {
      return this.sendError({
        statusCode: 404,
        statusMessage: 'Email not found',
      })
    }

    if (user.password !== this.body.password) {
      return this.sendError({
        statusCode: 409,
        statusMessage: 'Email or password not valid',
      })
    }

    const [_, setToken] = this.useCookie('token')
    const newToken = randomUUID()
    setToken(newToken)
    tokens.push({ id: user.id, token: newToken })
    const { password, ..._user } = user
    return _user as Omit<User, 'password'>
  }
}

export default defineEventHandler(async (event) => {
  const authLoginService = await useService<AuthLoginService>(
    event,
    AuthLoginService
  )

  return authLoginService.login()
})
