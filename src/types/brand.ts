export interface BrandColors {
  primary: string;
  primaryText: string;
  primaryLoader: string;
  primaryContrastText: string;
  primaryHover: string;
  primarySelectBg: string;
  primaryDisabled: string;
  secondary: string;
  secondaryText: string;
  secondaryLoader: string;
  secondaryContrastText: string;
  secondaryHover: string;
  secondarySelectBg: string;
  secondaryDisabled: string;
  border: string;
  bgDefault: string;
  iconDefault: string;
  iconDark: string;
}

export interface Brand {
  brandId: string;
  tenantId: string;
  slug: string;
  colors: BrandColors;
  fontFamily: string;
  favIconUrl: string;
  smallLogoUrl: string;
  logoUrl: string;
  createdAt: number;
  modifiedAt?: number | null;
  modifiedBy?: string | null;
}
