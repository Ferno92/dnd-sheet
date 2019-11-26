import { createStyles } from '@material-ui/core'
import Theme from './Theme'
import ColorUtils from 'utils/ColorUtils'

const GlobalStyles = (theme: Theme) =>
  createStyles({
    '@global': {
      'html, body, body #root': {
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        // 10px simplification, https://www.sitepoint.com/understanding-and-using-rem-units-in-css
        // 62.5% of 16px = 10px
        fontSize: '75%'
      },
      'a, a:visited': {
        color: theme.palette.action.active
      },
      table: {
        border: '1px solid #cccccc',
        borderCollapse: 'collapse',
        width: '100%',
        '& th': {
          textAlign: 'left',
          //   border: `1px solid ${theme.palette.border.main}`,
          padding: '5px'
        },
        '& td': {
          //   border: `1px solid ${theme.palette.border.main}`,
          padding: '5px'
        }
      },
      touch: {
        /*
        It's really annoying when a user trying to interact with an element causes the element,
        or the text within it, to be selected instead.
        Adding user-select: none to everything, except for the things that a user would genuinely
        want to copy paste can cut way down on these interactions being accidentally triggered.
        */
        '-webkit-user-select': 'none' /* Chrome all / Safari all */,
        '-moz-user-select': 'none' /* Firefox all */,
        '-ms-user-select': 'none' /* IE 10+ */,
        'user-select': 'none' /* Likely future */,

        /*
        Adding -webkit-touch-callout: none; to an element prevents a tap and hold from opening
        a context menu on the link or image.
        On Android, to stop these menu's from showing up, you can do:
        if(navigator.userAgent.match(/Android/i)) {
          noContextMenu.addEventListener('contextmenu', function (e) { e.preventDefault() })
        }
        */
        '-webkit-touch-callout': 'none',

        /*
        By default, mobile web browsers display a tap highlight, so that users get feedback when
        they tap something.
        Unfortunately it looks awful and is a dead giveaway that your app isn't native.
        The really easy solution is to add this to your css. You NEVER want the default highlight.
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        */
        '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)'
      },
      '.MuiPickersDay-daySelected': {
        background: ColorUtils.hexToRgbString(theme.palette.primary.main, 0.15),
        color: theme.palette.text.primary,
        '&:hover': {
          background: ColorUtils.hexToRgbString(
            theme.palette.text.primary,
            0.08
          )
        },
        '&.MuiPickersDay-current': {
          color: theme.palette.primary.main
        }
      },
      '.MuiPickersDay-current': {
        textDecoration: 'underline',
        fontWeight: 600
      },
      '.calendar-picker-small': {
        '& .MuiPickersCalendar-transitionContainer': {
          minHeight: 172
        },
        '& .MuiPickersCalendarHeader-dayLabel': {
          width: 28
        },
        '& .MuiPickersDay-day': {
          width: 28,
          height: 28,
          '& .MuiTypography-root': {
            ...theme.typography.caption
          }
        }
      },
      '.react-grid-layout': {
        position: 'relative',
        transition: 'height 200ms ease'
      },
      '.react-grid-item': {
        transition: 'all 200ms ease',
        transitionProperty: 'left, top'
      },
      '.react-grid-item.cssTransforms': {
        transitionProperty: 'transform'
      },
      '.react-grid-item.resizing': {
        zIndex: 1,
        willChange: 'width, height'
      },
      '.react-grid-item.react-draggable-dragging': {
        transition: 'none',
        zIndex: 3,
        willChange: 'transform'
      },
      '.react-grid-item.react-grid-placeholder': {
        // background: theme.palette.backgroundSecondary.default,
        transitionDuration: '100ms',
        zIndex: 2,
        borderRadius: 3,
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        '-o-user-select': 'none',
        userSelect: 'none'
      },
      '.react-grid-item > .react-resizable-handle': {
        position: 'absolute',
        width: 20,
        height: 20,
        bottom: 0,
        right: 0,
        cursor: 'se-resize'
      },
      '.react-grid-item > .react-resizable-handle::after': {
        content: '""',
        position: 'absolute',
        right: 3,
        bottom: 3,
        width: 12,
        height: 12,
        borderRight: '2px solid rgba(0, 0, 0, 0.4)',
        borderBottom: '2px solid rgba(0, 0, 0, 0.4)'
      }
    }
  })

export default GlobalStyles
