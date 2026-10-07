import type { CSSProperties } from 'react';

/**
 * Design-token overrides. Each key is a LumenUI color token in camelCase
 * (`accentBg` → `--accent-bg`); values are any CSS color, including
 * `var(--…)` references. Leave a key out to keep its default.
 *
 * Every color with a `…Bg` partner gets that tint derived when you set the
 * color alone, so `{ accent: '#2563eb' }` is a complete brand change.
 */
export interface LUITheme {
  /** Brand color: primary buttons, checked inputs, active tabs, focus borders. Default `#4cb139`. */
  accent?: string;
  /** Tinted surface behind accent content (chips, hovers, focus rings). Derived from `accent`. */
  accentBg?: string;
  /** Hover shade of the accent, e.g. primary button hover. Derived from `accent`. */
  accentDark?: string;
  /**
   * Text and icons drawn on an accent background. Default `var(--text-white)`;
   * set a dark color when the accent is light (yellow, lime, …).
   */
  accentContrast?: string;

  success?: string;
  successBg?: string;
  error?: string;
  errorBg?: string;
  warn?: string;
  warnBg?: string;
  info?: string;
  infoBg?: string;
  premium?: string;
  premiumBg?: string;
  /** Cancelled status, e.g. table status cells. Default `var(--text-tertiary)`. */
  cancel?: string;
  cancelBg?: string;

  textPrimary?: string;
  textSecondary?: string;
  textTertiary?: string;
  textQuaternary?: string;
  /** Light text on dark or colored fills (badges, tooltips, filled status icons). */
  textWhite?: string;

  separator?: string;
  separatorLight?: string;
  separatorDark?: string;

  /** Surface color of inputs, cards, menus, modals and other raised elements. */
  bgLightest?: string;
  bgLight?: string;
  bgSemiLight?: string;
  bgDark?: string;
}

// Keep the mix ratios in sync with --accent-bg / --accent-dark in styles/colors.css.
const tint = (color: string) => `color-mix(in srgb, ${color} 9%, var(--bg-lightest))`;
const shade = (color: string) => `color-mix(in srgb, ${color} 78%, black)`;

const TINTED = ['accent', 'success', 'error', 'warn', 'info', 'premium', 'cancel'] as const;

/**
 * Turns a {@link LUITheme} into CSS custom properties, filling in derived
 * tints and shades the theme doesn't set. Pass the result as `style` to theme
 * one part of the page:
 *
 * ```tsx
 * <section style={luiThemeVars({ accent: 'var(--error)' })}>…</section>
 * ```
 *
 * Overlays (modals, drawers, notifications, select menus) render under
 * `<body>`, outside the section, so they keep the page-wide theme. For a
 * page-wide theme, use `LUIProvider`'s `theme` prop, or with server
 * rendering put the vars on `<html>` yourself so the first paint is themed.
 */
export function luiThemeVars(theme: LUITheme): CSSProperties {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme)) {
    if (value) vars[`--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`] = value;
  }
  for (const key of TINTED) {
    const color = theme[key];
    if (color) vars[`--${key}-bg`] ??= tint(color);
  }
  if (theme.accent) vars['--accent-dark'] ??= shade(theme.accent);
  return vars as CSSProperties;
}
