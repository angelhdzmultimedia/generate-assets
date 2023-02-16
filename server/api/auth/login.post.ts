import { randomUUID } from 'node:crypto'
import { tokens, users } from '~~/server/db'
import { Service } from '~/server/common/service'
import { useService } from '~~/server/common'

type LoginFormData = {
  email: string
  password: string
}

type CookieData = {
  token: string
}

class LoginService extends Service<LoginFormData, {}, {}, CookieData> {
  public login() {
    const user = users.find((item) => item.email === this.body.email)

    if (!user) {
      return this.sendError({
        statusCode: 404,
        statusMessage: 'Email not found.',
      })
    }
    const newToken = randomUUID()
    const [_, setToken] = this.useCookie('token')
    setToken(newToken)
    tokens.push({ id: user.id!, token: newToken })
    return user
  }
}

export default defineEventHandler(async (event) => {
  const loginService = await useService<LoginService>(event, LoginService)

  return loginService.login()
})
