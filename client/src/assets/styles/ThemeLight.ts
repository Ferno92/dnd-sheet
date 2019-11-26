import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import createPalette, { Palette } from '@material-ui/core/styles/createPalette'
import createTypography from '@material-ui/core/styles/createTypography'
import ColorUtils from 'utils/ColorUtils'

export enum Colors {
  Black = '#0D0D0D',
  Black10 = '#E6E6E6',
  Black30 = '#B6B6B6',
  Black50 = '#858585',
  Black75 = '#494949',
  SilverGrey = '#CCCCCC',
  SilverGrey50 = '#ECECEC',
  DirtyWhite = '#F3F3F3',
  BrightWhite = '#FFFFFF',
  Cherry = '#D6001A',
  Fern = '#55B454',
  SunYellow = '#FFE01E',
  Transparent = 'transparent',
  DndRed = '#c62b29',
  DndRedLight = '#d15553',
  DndRedDark = '#8a1e1c',
  DndBlack = '#212121',
  DndBlackLight = '#4d4d4d',
  DndBlackDark = '#171717'
}

const palette: Palette = createPalette({
  background: {
    default: Colors.DndRed,
    paper: Colors.DirtyWhite
  },
  backgroundSecondary: {
    default: Colors.DirtyWhite,
    paper: Colors.BrightWhite
  },
  text: {
    primary: Colors.Black,
    secondary: Colors.Black50
  },
  primary: {
    light: Colors.DndRedLight,
    main: Colors.DndRed,
    dark: Colors.DndRedDark,
    contrastText: Colors.BrightWhite
  },
  secondary: {
    light: Colors.DndBlackLight,
    main: Colors.DndBlack,
    dark: Colors.DndBlackDark,
    contrastText: Colors.BrightWhite
  },
  success: {
    main: Colors.Fern,
    light: Colors.Fern,
    dark: Colors.Fern,
    contrastText: Colors.BrightWhite
  },
  info: {
    main: Colors.BrightWhite,
    light: Colors.BrightWhite,
    dark: Colors.BrightWhite,
    contrastText: Colors.Black
  },
  warning: {
    main: Colors.SunYellow,
    light: Colors.SunYellow,
    dark: Colors.SunYellow,
    contrastText: Colors.BrightWhite
  },
  error: {
    main: Colors.Cherry,
    light: Colors.Cherry,
    dark: Colors.Cherry,
    contrastText: Colors.BrightWhite
  },
  picture: {
    dark: Colors.SilverGrey50,
    main: Colors.SilverGrey50,
    light: Colors.SilverGrey50,
    contrastText: Colors.Black
  },
  divider: Colors.SilverGrey50,
  border: {
    main: Colors.SilverGrey,
    light: Colors.SilverGrey50,
    dark: Colors.Black30,
    contrastText: Colors.BrightWhite
  },
  highlight: Colors.DndRedLight,
  hover: Colors.DndRedLight
})

const typography = createTypography(palette, {
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    '"Roboto"',
    '"Oxygen"',
    '"Ubuntu"',
    '"Cantarell"',
    '"Fira Sans"',
    '"Droid Sans"',
    '"Arial"',
    '"sans-serif"'
  ].join(','),
  // Tell Material-UI what's the font-size on the html element is.
  htmlFontSize: 10,
  h1: {
    fontSize: '4.2rem',
    fontWeight: 700,
    lineHeight: 'normal'
  },
  h2: {
    fontSize: '3.6rem',
    fontWeight: 600,
    lineHeight: 'normal'
  },
  h3: {
    fontSize: '2.4rem',
    fontWeight: 700,
    lineHeight: 'normal'
  },
  h4: {
    fontSize: '2.4rem',
    fontWeight: 600,
    lineHeight: 'normal'
  },
  h5: {
    fontSize: '2.0rem',
    fontWeight: 700,
    lineHeight: 'normal'
  },
  h6: {
    fontSize: '2.0rem',
    fontWeight: 600,
    lineHeight: 'normal'
  },
  body1: {
    fontSize: '1.6rem',
    lineHeight: 'normal'
  },
  body2: {
    fontSize: '1.4rem',
    lineHeight: 'normal'
  },
  caption: {
    fontSize: '1.2rem',
    lineHeight: 'normal'
  },
  button: {
    fontSize: '1.6rem',
    fontWeight: 700,
    lineHeight: '2rem',
    textTransform: 'none'
  },
  overline: {
    fontSize: '1.2rem',
    fontWeight: 700,
    textTransform: 'none',
    lineHeight: 'normal'
  },
  subtitle1: {
    fontSize: '1.4rem',
    fontWeight: 700,
    lineHeight: 'normal'
  },
  subtitle2: {
    fontSize: '1.2rem',
    fontWeight: 700,
    lineHeight: 'normal'
  }
})

const ThemeLight = createMuiTheme({
  palette: palette,
  typography: typography,
  shape: {
    borderRadius: 3
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1600
    }
  },
  shadows: [
    'none',
    '0px 1px 3px 0px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 2px 1px -1px rgba(0,0,0,0.12)',
    'none',
    '0px 1px 8px 0px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 3px 3px -2px rgba(0,0,0,0.12)',
    '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
    '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
    '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
    '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
    '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
    '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
    '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
    '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
    '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
    '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
    '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
    '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
    '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
    '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
    '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
    '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
    '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)'
  ],
  overrides: {
    MuiInputBase: {
      input: {
        height: '2.2rem'
      }
    },
    MuiOutlinedInput: {
      input: {
        height: 'unset'
      }
    },
    MuiInputLabel: {
      root: {
        fontSize: typography.body2.fontSize,
        color: ColorUtils.hexToRgbString(Colors.Black, 0.5)
      }
    },
    MuiLink: {
      root: {
        color: palette.action.active
      }
    },
    MuiMenuItem: {
      root: {
        fontSize: typography.body1.fontSize,
        fontWeight: typography.body1.fontWeight
      }
    },
    MuiListItem: {
      root: {
        paddingTop: 12,
        paddingBottom: 12,
        paddingLeft: 16,
        paddingRight: 16
      }
    },
    MuiExpansionPanelSummary: {
      root: {
        padding: '0 16px'
      }
    },
    MuiButton: {
      root: {
        minWidth: 100,
        minHeight: 40,
        padding: '8px 20px'
      },
      sizeSmall: {
        fontSize: typography.button.fontSize,
        minHeight: 32,
        padding: '6px 12px'
      },
      contained: {
        '&.Mui-disabled': {
          backgroundColor: Colors.SilverGrey,
          color: ColorUtils.hexToRgbString(Colors.BrightWhite, 0.5)
        }
      },
      containedPrimary: {
        backgroundColor: palette.primary.main,
        color: palette.primary.contrastText,
        '&:hover': {
          backgroundColor: palette.primary.light
        }
      },
      containedSecondary: {
        backgroundColor: palette.secondary.main,
        color: palette.secondary.contrastText,
        '&:hover': {
          backgroundColor: palette.secondary.light
        }
      },
      outlined: {
        padding: '10px 20px',
        borderColor: Colors.SilverGrey,
        '&:hover': {
          borderColor: Colors.SilverGrey,
          backgroundColor: ColorUtils.hexToRgbString(Colors.Black, 0.1)
        },
        '&.Mui-disabled': {
          color: ColorUtils.hexToRgbString(Colors.Black, 0.3)
        }
      },
      outlinedPrimary: {
        borderColor: Colors.SilverGrey,
        '&:hover': {
          borderColor: Colors.Transparent,
          backgroundColor: ColorUtils.hexToRgbString(Colors.Black, 0.1)
        }
      },
      outlinedSecondary: {
        borderColor: Colors.SilverGrey,
        '&:hover': {
          borderColor: Colors.Transparent,
          backgroundColor: ColorUtils.hexToRgbString(Colors.Black, 0.1)
        }
      },
      text: {
        padding: '10px 20px',
        '&:hover': {
          backgroundColor: ColorUtils.hexToRgbString(Colors.Black, 0.1)
        },
        '&.Mui-disabled': {
          color: ColorUtils.hexToRgbString(Colors.Black, 0.3)
        }
      },
      textPrimary: {
        '&:hover': {
          backgroundColor: ColorUtils.hexToRgbString(Colors.Black, 0.1)
        }
      },
      textSecondary: {
        '&:hover': {
          backgroundColor: ColorUtils.hexToRgbString(Colors.Black, 0.1)
        }
      }
    },
    MuiDialogTitle: {
      root: {
        padding: '44px 64px 24px 64px'
      }
    },
    MuiDialogContent: {
      root: {
        padding: '0 64px'
      }
    },
    MuiDialogActions: {
      spacing: {
        padding: 24,
        '& > * + *': {
          marginLeft: 16
        }
      }
    },
    MuiSelect: {
      root: {
        height: 36
      }
    },
    MuiTabs: {
      root: {
        minHeight: 28
      },
      indicator: {
        height: 1
      }
    },
    MuiTab: {
      root: {
        minHeight: 28,
        ...typography.body1,
        '@media (min-width: 960px)': {
          ...typography.body1
        },
        '&$selected': {
          ...typography.button
        }
      }
    }
  },
  props: {
    MuiLink: {
      underline: 'always'
    },
    MuiCircularProgress: {
      size: 32
    },
    MuiTabs: {
      textColor: 'primary',
      indicatorColor: 'primary'
    }
  },
  highlightSearchWords: {
    fontWeight: 700,
    backgroundColor: 'transparent',
    color: palette.text.primary
  }
})

export default ThemeLight
