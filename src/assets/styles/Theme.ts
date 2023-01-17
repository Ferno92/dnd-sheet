import { Theme } from '@material-ui/core/styles/createMuiTheme'
import { Variant } from '@material-ui/core/styles/createTypography'
import { Color } from '@material-ui/core'

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    highlightSearchWords: {
      fontWeight: React.CSSProperties['fontWeight']
      color: string
      backgroundColor: string
    }
  }

  // Allow configuration using `createMuiTheme`
  interface ThemeOptions {
    highlightSearchWords?: {
      fontWeight?: React.CSSProperties['fontWeight']
      color?: string
      backgroundColor?: string
    }
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    backgroundSecondary: TypeBackground
    success: PaletteColor
    warning: PaletteColor
    info: PaletteColor
    icon: PaletteColor
    picture: PaletteColor
    border: PaletteColor
    highlight: string
    hover: string
  }

  // Allow configuration using `createMuiTheme`
  interface PaletteOptions {
    backgroundSecondary?: TypeBackground
    success?: SimplePaletteColorOptions | Partial<Color>
    warning?: SimplePaletteColorOptions | Partial<Color>
    info?: SimplePaletteColorOptions | Partial<Color>
    icon?: PaletteColor
    picture?: PaletteColor
    border?: PaletteColor
    highlight?: string
    hover?: string
  }
}

declare module '@material-ui/core/styles/createTypography' {
  interface Typography
    extends Record<Variant, TypographyStyle>,
      FontStyle,
      TypographyUtils {
    customTypography: {
      fontSize: number
      color: string
    }
  }

  // Allow configuration using `createMuiTheme`
  interface TypographyOptions
    extends Partial<
      Record<Variant, TypographyStyleOptions> & FontStyleOptions
    > {
    customTypography?: {
      fontSize?: number
      color?: string
    }
  }
}

export default Theme
