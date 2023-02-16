import { useService } from '~/nuxt-extras/utils'
import { Service } from '../../../../nuxt-extras/entities'
import { CookieData } from '../login/index.post'

class AuthLogoutService extends Service<{}, {}, {}, CookieData> {
  public logout() {
    const [_, __, deleteToken] = this.useCookie('token')
    deleteToken()
    return true
  }
}

export default defineEventHandler(async (event) => {
  const authLogoutService = await useService<AuthLogoutService>(
    event,
    AuthLogoutService
  )
  return authLogoutService.logout()
})
