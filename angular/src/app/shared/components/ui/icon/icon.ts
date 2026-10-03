import {
  ChangeDetectionStrategy,
  Component,
  Injectable,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

const ICON_NAMES = [
  'add',
  'attach_file',
  'backup',
  'bag',
  'bank',
  'bar_chart',
  'bolt',
  'bookmark',
  'box',
  'building',
  'calculator',
  'calendar',
  'calendar_month',
  'call',
  'car',
  'card',
  'caret',
  'caret_down',
  'cart',
  'cart_add',
  'cart_return',
  'category',
  'checklist',
  'checklist_alt',
  'checkroom',
  'clock',
  'configuration',
  'content_copy',
  'controller',
  'cross',
  'dashboard',
  'dashboard_alt',
  'dislike',
  'donut_large',
  'download',
  'drawer',
  'edit',
  'education',
  'error',
  'event_repeat',
  'eye',
  'eye_slash',
  'factory',
  'family',
  'file',
  'file_add',
  'file_alt',
  'files',
  'filter',
  'filter_list',
  'fitness',
  'flight',
  'fuel',
  'hand',
  'hash',
  'heart',
  'help',
  'home',
  'hospital',
  'image',
  'like',
  'list',
  'location',
  'lock',
  'logout',
  'mail',
  'money',
  'moneys',
  'more',
  'music',
  'notebook',
  'notification',
  'notifications_alt',
  'pie_chart',
  'printer',
  'receipt',
  'refresh',
  'savings',
  'savings_alt',
  'search',
  'settings',
  'shield',
  'star',
  'train',
  'trash',
  'truck',
  'undo',
  'upload_file',
  'user',
  'user_add',
  'user_card',
  'user_config',
  'users',
  'verified_user',
  'view',
  'wallet',
  'wallet_alt',
  'warning',
  'wifi',
  'work',
] as const;

/**
 * Icon names — the file names (minus `.svg`) under the repo-root `icons/`
 * folder shared with the React package. `(string & {})` keeps the union open
 * so newly dropped-in files work without touching this list, while existing
 * names still autocomplete.
 */
export type IconName = (typeof ICON_NAMES)[number] | (string & {});

/** Every bundled icon name, sorted — handy for galleries and pickers. */
export const L_ICON_NAMES: readonly IconName[] = ICON_NAMES;

/**
 * The source files hardcode their gray (`stroke="#646663"`, `fill="#555755"`,
 * …) and their width/height. Swap the colors for `currentColor` so the
 * `color` input (or the inherited text color) drives them, and drop the fixed
 * dimensions so the host's size wins. `<mask>` contents are left alone — their
 * black/white fills are luminance cut-outs, not paint.
 */
const normalize = (raw: string): string =>
  raw
    .replace(
      /<svg([^>]*)>/,
      (_, attrs: string) => `<svg${attrs.replace(/\s(?:width|height)="[^"]*"/g, '')}>`,
    )
    .replace(/<mask[\s\S]*?<\/mask>|\b(stroke|fill)="(?!none)[^"]*"/g, (match, attr?: string) =>
      attr ? `${attr}="currentColor"` : match,
    );

/**
 * Lazy-loads the svg files from the shared `icons/` folder, normalized and
 * cached per name. The folder sits outside the Angular workspace, so instead
 * of serving it as an asset, esbuild bundles it: the `.svg` text loader in
 * angular.json plus the templated `import()` below emit one lazy chunk per file.
 */
@Injectable({ providedIn: 'root' })
export class IconRegistry {
  private readonly _cache = new Map<string, Promise<string>>();

  /** Resolves to `''` (with a dev warning) when the icon doesn't exist. */
  load(name: string): Promise<string> {
    let svg = this._cache.get(name);
    if (!svg) {
      // Imported inside `then` so an unknown name — which esbuild's import
      // map throws on synchronously — still lands in `catch`.
      svg = Promise.resolve()
        .then(() => import(`../../../../../../../icons/${name}.svg`))
        .then((module: { default: string }) => normalize(module.default))
        .catch(() => {
          console.warn(`[l-icon] Unknown icon name "${name}".`);
          return '';
        });
      this._cache.set(name, svg);
    }
    return svg;
  }
}

/**
 * Inline SVG icon. Renders the named file from `icons/` with its colors
 * rebound to `currentColor`, so it tints via the `color` input — defaulting
 * to `var(--text-tertiary)` (#646663), the gray the icons were drawn with.
 *
 * ```html
 * <l-icon name="user" />
 * <l-icon name="trash" [size]="16" color="var(--error)" />
 * ```
 */
@Component({
  selector: 'l-icon',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrl: './icon.scss',
  // Unscoped on purpose: the svg arrives via innerHTML, which emulated
  // encapsulation can't style.
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'lui-icon',
    'aria-hidden': 'true',
    '[style.width]': '_dimension()',
    '[style.height]': '_dimension()',
    '[style.color]': 'color() || null',
    '[innerHTML]': '_svg()',
  },
})
export class Icon {
  /** Icon to draw — an svg file name from `icons/` without the extension. */
  readonly name = input.required<IconName>();

  /** Width/height. A number is pixels; any CSS size string works too. */
  readonly size = input<number | string>(20);

  /**
   * Icon color — any CSS color, including `var(--…)` tokens. Defaults to
   * `var(--text-tertiary)` (#646663); pass `"inherit"` to follow the
   * surrounding text color instead.
   */
  readonly color = input('');

  private readonly _registry = inject(IconRegistry);
  private readonly _sanitizer = inject(DomSanitizer);

  protected readonly _dimension = computed(() => {
    const size = this.size();
    return typeof size === 'number' ? `${size}px` : size;
  });

  protected readonly _svg = signal<SafeHtml | null>(null);

  constructor() {
    effect(() => {
      const name = this.name();
      this._registry.load(name).then((svg) => {
        // Drop stale responses if the name changed while fetching.
        if (this.name() !== name) return;
        // Trusted: the markup is our own bundled asset, normalized above.
        this._svg.set(svg ? this._sanitizer.bypassSecurityTrustHtml(svg) : null);
      });
    });
  }
}
