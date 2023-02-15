import { createHash, randomUUID } from 'node:crypto'
import { tokens, users } from '~~/server/db'

export default defineEventHandler(async (event) => {
  const { email, password } = await readBody(event)
  const user = users.find((item) => item.email === email)

  if (!user) {
    return sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: 'Email not found.',
      })
    )
  }
  const token = randomUUID()
  setCookie(event, 'token', token)
  tokens.push({ id: user.id!, token })
  return user
})
