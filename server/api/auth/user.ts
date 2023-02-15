import { tokens, users } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'token')

  if (!token) {
    return sendError(
      event,
      createError({
        statusCode: 409,
        statusMessage: 'Invalid session',
      })
    )
  }

  const user = tokens.find((item) => item.token === token)!
  return users.find((item) => item.id === user.id)
})
