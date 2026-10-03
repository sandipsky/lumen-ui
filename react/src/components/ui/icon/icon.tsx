import type { ComponentPropsWithRef } from 'react';
import './icon.css';

/**
 * Icon names — the file names (minus `.svg`) under the repo-root `icons/`
 * folder shared with the Angular package. `(string & {})` keeps the union
 * open so newly dropped-in files work without touching this type, while
 * existing names still autocomplete.
 */
export type LUIIconName =
  | 'add'
  | 'attach_file'
  | 'backup'
  | 'bag'
  | 'bank'
  | 'bar_chart'
  | 'bolt'
  | 'bookmark'
  | 'box'
  | 'building'
  | 'calculator'
  | 'calendar'
  | 'calendar_month'
  | 'call'
  | 'car'
  | 'card'
  | 'caret'
  | 'caret_down'
  | 'cart'
  | 'cart_add'
  | 'cart_return'
  | 'category'
  | 'checklist'
  | 'checklist_alt'
  | 'checkroom'
  | 'clock'
  | 'configuration'
  | 'content_copy'
  | 'controller'
  | 'cross'
  | 'dashboard'
  | 'dashboard_alt'
  | 'dislike'
  | 'donut_large'
  | 'download'
  | 'drawer'
  | 'edit'
  | 'education'
  | 'error'
  | 'event_repeat'
  | 'eye'
  | 'eye_slash'
  | 'factory'
  | 'family'
  | 'file'
  | 'file_add'
  | 'file_alt'
  | 'files'
  | 'filter'
  | 'filter_list'
  | 'fitness'
  | 'flight'
  | 'fuel'
  | 'hand'
  | 'hash'
  | 'heart'
  | 'help'
  | 'home'
  | 'hospital'
  | 'image'
  | 'like'
  | 'list'
  | 'location'
  | 'lock'
  | 'logout'
  | 'mail'
  | 'money'
  | 'moneys'
  | 'more'
  | 'music'
  | 'notebook'
  | 'notification'
  | 'notifications_alt'
  | 'pie_chart'
  | 'printer'
  | 'receipt'
  | 'refresh'
  | 'savings'
  | 'savings_alt'
  | 'search'
  | 'settings'
  | 'shield'
  | 'star'
  | 'train'
  | 'trash'
  | 'truck'
  | 'undo'
  | 'upload_file'
  | 'user'
  | 'user_add'
  | 'user_card'
  | 'user_config'
  | 'users'
  | 'verified_user'
  | 'view'
  | 'wallet'
  | 'wallet_alt'
  | 'warning'
  | 'wifi'
  | 'work'
  | (string & {});

// Lives outside the Vite root — vite.config.ts adds it to server.fs.allow.
const RAW_ICONS = import.meta.glob('../../../../../icons/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

/**
 * The source files hardcode their gray (`stroke="#646663"`, `fill="#555755"`,
 * …) and their width/height. Swap the colors for `currentColor` so the
 * `color` prop (or the inherited text color) drives them, and drop the fixed
 * dimensions so the host span's size wins. `<mask>` contents are left alone —
 * their black/white fills are luminance cut-outs, not paint.
 */
const normalize = (raw: string): string =>
  raw
    .replace(/<svg([^>]*)>/, (_, attrs: string) => `<svg${attrs.replace(/\s(?:width|height)="[^"]*"/g, '')}>`)
    .replace(/<mask[\s\S]*?<\/mask>|\b(stroke|fill)="(?!none)[^"]*"/g, (match, attr?: string) =>
      attr ? `${attr}="currentColor"` : match,
    );

const ICONS = new Map<string, string>();
for (const [path, raw] of Object.entries(RAW_ICONS)) {
  ICONS.set(path.split('/').pop()!.replace(/\.svg$/, ''), normalize(raw));
}

/** Every available icon name, sorted — handy for galleries and pickers. */
export const LUI_ICON_NAMES: readonly LUIIconName[] = [...ICONS.keys()].sort();

export interface LUIIconProps extends ComponentPropsWithRef<'span'> {
  /** Icon to draw — an svg file name from `icons/` without the extension. */
  name: LUIIconName;
  /** Width/height. A number is pixels; any CSS size string works too. */
  size?: number | string;
  /**
   * Icon color — any CSS color, including `var(--…)` tokens. Defaults to
   * `var(--text-tertiary)` (#646663); pass `"inherit"` to follow the
   * surrounding text color instead.
   */
  color?: string;
}

/**
 * Inline SVG icon. Renders the named file from `icons/` with its
 * colors rebound to `currentColor`, so it tints via the `color` prop —
 * defaulting to `var(--text-tertiary)` (#646663), the gray the icons were
 * drawn with.
 *
 * ```tsx
 * <LUIIcon name="user" />
 * <LUIIcon name="trash" size={16} color="var(--error)" />
 * ```
 */
export function LUIIcon({ name, size = 20, color, className, style, ...rest }: LUIIconProps) {
  const svg = ICONS.get(name);
  if (!svg) {
    if (import.meta.env.DEV) console.warn(`[LUIIcon] Unknown icon name "${name}".`);
    return null;
  }

  const dimension = typeof size === 'number' ? `${size}px` : size;

  return (
    <span
      className={['lui-icon', className ?? ''].filter(Boolean).join(' ')}
      style={{ width: dimension, height: dimension, color, ...style }}
      aria-hidden="true"
      {...rest}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
