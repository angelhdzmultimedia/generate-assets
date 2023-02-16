import { useService } from '~~/server/common'
import { Service } from '~~/server/common/service'
import { tokens, users } from '~~/server/db'

type CookieData = {
  token: string
}

class SessionUser extends Service<{}, {}, {}, CookieData> {
  public find() {
    const [token] = this.useCookie('token')
    console.log(`Token: ${token}`)

    if (!token) {
      return this.sendError({
        statusCode: 409,
        statusMessage: 'Invalid session',
      })
    }

    const user = tokens.find((item) => item.token === token)!

    if (!user) {
      return this.sendError({
        statusCode: 404,
        statusMessage: 'Email not found.',
      })
    }
    return users.find((item) => item.id === user.id)
  }
}

export default defineEventHandler(async (event) => {
  const sessionUserService = await useService<SessionUser>(event, SessionUser)
  return sessionUserService.find()
})
