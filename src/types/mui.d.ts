import type { ThemeOptions } from '@mui/material/styles';
declare global {
  interface Window {
    __themeConfig?: ThemeOptions;
  }
}
declare module '@mui/material/styles/createPalette' {
  interface SimplePaletteColorOptions {
    text?: string;
    loader?: string;
    hover?: string;
    disabled?: string;
    selectedBg?: string;
    iconDefault?: string;
    iconDark?: string;
  }

  interface PaletteColor {
    text?: string;
    loader?: string;
    hover?: string;
    disabled?: string;
    selectedBg?: string;
    iconDefault?: string;
    iconDark?: string;
  }

  interface TypeBackground {
    dark?: string;
  }
}

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    text?: string;
    loader?: string;
    hover?: string;
    disabled?: string;
    selectedBg?: string;
    iconDefault?: string;
    iconDark?: string;
  }

  interface PaletteColor {
    text?: string;
    loader?: string;
    hover?: string;
    disabled?: string;
    selectedBg?: string;
    iconDefault?: string;
    iconDark?: string;
  }

  interface TypeBackground {
    dark?: string;
  }

  interface Palette {
    custom?: {
      divider?: {
        light: string;
        dark: string;
      };
    };
  }

  interface PaletteOptions {
    custom?: {
      divider?: {
        light: string;
        dark: string;
      };
      darkGreen?: string;
      lightGreen?: string;
      darkOrange?: string;
      lightOrange?: string;
      darkRed?: string;
      lightRed?: string;
      darkViolet?: string;
      lightViolet?: string;
    };
  }
}

export {};
