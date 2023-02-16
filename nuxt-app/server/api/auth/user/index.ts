import { useService } from '~/nuxt-extras/utils'
import { Service } from '../../../../nuxt-extras/entities'
import { CookieData, tokens, User, users } from '../login/index.post'

class AuthUserService extends Service<{}, {}, {}, CookieData> {
  public find(): Omit<User, 'password'> | undefined | void {
    const [token] = this.useCookie('token')

    if (!token) {
      return this.sendError({
        statusCode: 409,
        statusMessage: 'Session not valid',
      })
    }

    const id = tokens.find((item) => item.token === token).id!
    const user = users.find((item) => item.id === id)

    if (!user) {
      return this.sendError({
        statusCode: 404,
        statusMessage: 'Email not found',
      })
    }
    const { password, ..._user } = user
    return _user
  }
}
export default defineEventHandler(async (event) => {
  const authUserService = await useService<AuthUserService>(
    event,
    AuthUserService
  )

  return authUserService.find()
})
