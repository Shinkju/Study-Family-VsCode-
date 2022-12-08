
let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

export const INITIAL_EVENTS = [
  // {
  //   id: createEventId(),
  //   title: '오늘의 시작',
  //   start: todayStr
  // },
  // {
  //   id: createEventId(),
  //   title: '오늘의 끝',
  //   start: todayStr + 'T12:00:00'
  // }

  {
    id: createEventId(),
    title: '오늘',
    start: todayStr
  }
  
]

export function createEventId() {
  return String(eventGuid++)
}
