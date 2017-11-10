// @flow
import { StyleSheet } from 'react-native'

const calendarHeight = 2400
// const eventPaddingLeft = 4
const leftMargin = 42 - 1

export default function styleConstructor (
  theme = {}
) {
  let style = {
    container: {
      backgroundColor: '#ffff',
      ...theme.container
    },
    contentStyle: {
      backgroundColor: '#ffff',
      height: calendarHeight + 10
    },
    header: {
      zIndex: 999,
      width: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      paddingHorizontal: 30,
      height: 50,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#E6E8F0',
      backgroundColor: '#F5F5F6',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      ...theme.header
    },
    headerText: {
      fontSize: 16
    },
    arrow: {
      width: 15,
      height: 15,
      resizeMode: 'contain'
    },
    event: {
      position: 'absolute',
      backgroundColor: '#EE7B00',
      opacity: 0.8,
      borderColor: '#ee6800',
      borderWidth: 1,
      paddingLeft: 4,
      minHeight: 25,
      flex: 1,
      paddingTop: 5,
      paddingBottom: 0,
      flexDirection: 'column',
      alignItems: 'flex-start',
      overflow: 'hidden',
      ...theme.event
    },
    eventTitle: {
      color: 'white',
      fontWeight: '600',
      minHeight: 13,
      ...theme.eventTitle
    },
    eventSummary: {
      color: 'white',
      fontSize: 12,
      flexWrap: 'wrap',
      ...theme.eventSummary
    },
    eventTimes: {
      marginTop: 3,
      fontSize: 10,
      fontWeight: 'bold',
      color: 'white',
      flexWrap: 'wrap',
      ...theme.eventTimes
    },
    line: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'rgb(216,216,216)',
      ...theme.line
    },
    lineNow: {
      height: 1,
      position: 'absolute',
      left: leftMargin,
      backgroundColor: 'red',
      ...theme.line
    },
    timeLabel: {
      position: 'absolute',
      left: 6,
      color: 'rgb(170,170,170)',
      fontSize: 10,
      fontFamily: 'Helvetica Neue',
      fontWeight: '500',
      ...theme.timeLabel
    }
  }
  return StyleSheet.create(style)
}
