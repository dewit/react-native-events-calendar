// @flow
import moment from 'moment'
const CALENDER_HEIGHT = 2400
const offset = CALENDER_HEIGHT / 24

function buildEvent (column, left, width) {
  const startTime = moment(column.event_start_time)
  const endTime = column.event_end_time ? moment(column.event_end_time) : startTime.clone().add(1, 'hour')
  const diffHours = startTime.diff(startTime.clone().startOf('day'), 'hours', true)

  column.top = diffHours * offset
  column.height = endTime.diff(startTime, 'hours', true) * offset
  column.width = width
  column.left = left
  return column
}

function collision (a, b) {
  return a.event_end_time > b.event_start_time && a.event_start_time < b.event_end_time
}

function expand (ev, column, columns) {
  var colSpan = 1

  for (var i = column + 1; i < columns.length; i++) {
    var col = columns[i]
    for (var j = 0; j < col.length; j++) {
      var ev1 = col[j]
      if (collision(ev, ev1)) {
        return colSpan
      }
    }
    colSpan++
  }

  return colSpan
}

function pack (columns, width, calculatedEvents) {
  var colLength = columns.length

  for (var i = 0; i < colLength; i++) {
    var col = columns[i]
    for (var j = 0; j < col.length; j++) {
      var colSpan = expand(col[j], i, columns)
      var L = i / colLength * width
      var W = width * colSpan / colLength - 10

      calculatedEvents.push(buildEvent(col[j], L, W))
    }
  }
}

function populateEvents (events, screenWidth) {
  let lastEnd
  let columns
  let self = this
  let calculatedEvents = []

  events = events
    .map((ev, index) => ({ ...ev, index: index }))
    .sort(function (a, b) {
      if (a.event_start_time < b.event_start_time) return -1
      if (a.event_start_time > b.event_start_time) return 1
      if (a.event_end_time < b.event_end_time) return -1
      if (a.event_end_time > b.event_end_time) return 1
      return 0
    })

  columns = []
  lastEnd = null

  events.forEach(function (ev, index) {
    if (lastEnd !== null && ev.start >= lastEnd) {
      pack(columns, screenWidth, calculatedEvents)
      columns = []
      lastEnd = null
    }

    var placed = false
    for (var i = 0; i < columns.length; i++) {
      var col = columns[i]
      if (!collision(col[col.length - 1], ev)) {
        col.push(ev)
        placed = true
        break
      }
    }

    if (!placed) {
      columns.push([ev])
    }

    if (lastEnd === null || ev.event_end_time > lastEnd) {
      lastEnd = ev.event_end_time
    }
  })

  if (columns.length > 0) {
    pack(columns, screenWidth, calculatedEvents)
  }
  return calculatedEvents
}

export default populateEvents
