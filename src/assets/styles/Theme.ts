import { Theme } from '@mui/material/styles';
import { Color } from '@mui/material'

declare module '@mui/material/styles/createPalette' {
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

declare module '@mui/material/styles/createTypography' {
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
