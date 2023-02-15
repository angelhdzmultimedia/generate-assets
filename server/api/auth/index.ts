const sessionPassword =
  'asdasdasdasdasdasdasdasdasdasdasdas9a0sdasdasdasdsd0asd'
export default eventHandler(async (event) => {
  let time: number = JSON.parse(getCookie(event, 'time')!).time ?? 0
  setCookie(event, 'time', JSON.stringify({ time: time + 1 }))
  return time + 1
})
