import {
  DOCUMENT,
  EnvironmentProviders,
  Injectable,
  inject,
  provideEnvironmentInitializer,
  signal,
} from '@angular/core';

/**
 * Design-token overrides. Each key is a LumenUI color token in camelCase
 * (`accentBg` → `--accent-bg`); values are any CSS color, including
 * `var(--…)` references. Leave a key out to keep its default.
 *
 * Every color with a `…Bg` partner gets that tint derived when you set the
 * color alone, so `{ accent: '#2563eb' }` is a complete brand change.
 */
export interface Theme {
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

// Keep the mix ratios in sync with --accent-bg / --accent-dark in styles/_colors.scss.
const tint = (color: string) => `color-mix(in srgb, ${color} 9%, var(--bg-lightest))`;
const shade = (color: string) => `color-mix(in srgb, ${color} 78%, black)`;

const TINTED = ['accent', 'success', 'error', 'warn', 'info', 'premium', 'cancel'] as const;

/**
 * Turns a {@link Theme} into CSS custom properties, filling in derived tints
 * and shades the theme doesn't set. Bind the result with `[style]` to theme
 * one part of the page:
 *
 * ```html
 * <section [style]="danger">…</section>
 * ```
 * ```ts
 * protected readonly danger = themeVars({ accent: 'var(--error)' });
 * ```
 *
 * Overlays (modals, drawers, notifications, select menus) render under
 * `<body>`, outside the section, so they keep the page-wide theme.
 */
export function themeVars(theme: Theme): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme)) {
    if (value) vars[`--${key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)}`] = value;
  }
  for (const key of TINTED) {
    const color = theme[key];
    if (color) vars[`--${key}-bg`] ??= tint(color);
  }
  if (theme.accent) vars['--accent-dark'] ??= shade(theme.accent);
  return vars;
}

/**
 * Applies a page-wide {@link Theme} on `<html>`, so it reaches overlays
 * rendered under `<body>` too. Set the initial theme with
 * {@link provideTheme}; inject this to change it at runtime:
 *
 * ```ts
 * inject(ThemeService).set({ accent: tenant.brandColor });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _root = inject(DOCUMENT).documentElement;
  private readonly _theme = signal<Theme>({});
  private _applied: string[] = [];

  /** The overrides currently applied; tokens not in it use their defaults. */
  readonly theme = this._theme.asReadonly();

  /** Replace the current overrides. Tokens `theme` leaves out revert to their defaults. */
  set(theme: Theme): void {
    const vars = themeVars(theme);
    for (const name of this._applied) this._root.style.removeProperty(name);
    for (const [name, value] of Object.entries(vars)) this._root.style.setProperty(name, value);
    this._applied = Object.keys(vars);
    this._theme.set(theme);
  }

  /** Drop every override and go back to the stylesheet defaults. */
  reset(): void {
    this.set({});
  }
}

/**
 * Applies a page-wide {@link Theme} before the app renders. Add it to the
 * application providers:
 *
 * ```ts
 * bootstrapApplication(App, {
 *   providers: [provideTheme({ accent: '#2563eb' })],
 * });
 * ```
 */
export function provideTheme(theme: Theme): EnvironmentProviders {
  return provideEnvironmentInitializer(() => inject(ThemeService).set(theme));
}
