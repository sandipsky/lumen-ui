import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  effect,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { fixedContainingBlock } from '../../../utils/fixed-containing-block';

export type MenuMode = 'left' | 'right';

/** Below this much room beneath the trigger, the panel flips above it. */
const MIN_SPACE_BELOW = 180;

/**
 * Lightweight dropdown/popover. Project the trigger via `[dropdown-display]`
 * and the panel contents via `[dropdown-item]` / `[dropdown-content]`:
 *
 * ```html
 * <l-menu mode="right">
 *   <button dropdown-display>Open</button>
 *   <div dropdown-item (click)="…">Action</div>
 * </l-menu>
 * ```
 *
 * The panel renders in a fixed layer anchored to the trigger, so it escapes any
 * `overflow` clipping on ancestors, flips above the trigger when there isn't
 * room below, and stays anchored while the page scrolls — mirroring the
 * `l-select` dropdown behavior. It stays anchored inside transformed or
 * filtered ancestors too, which make `position: fixed` relative to themselves.
 * Such an ancestor can still clip the panel when it also scrolls or hides
 * overflow; set `appendBody` to render the panel under `<body>` instead.
 */
@Component({
  selector: 'l-menu',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
  host: {
    '(document:click)': '_onDocumentClick($event)',
  },
})
export class Menu {
  /** Which trigger edge the panel aligns to. */
  readonly mode = input<MenuMode>('left');
  /** Close the panel when a projected item is clicked. */
  readonly closeOnItemClick = input(true);
  /** Drop the panel's inner padding (for custom, edge-to-edge content). */
  readonly contentMode = input(false);
  /** Highlight the trigger while the panel is open. */
  readonly showActiveState = input(true);
  /**
   * Render the panel under `<body>` instead of inside the component, so no
   * ancestor can clip it (e.g. a scrolling container with a `transform`).
   */
  readonly appendBody = input(false);

  private readonly _open = signal(false);
  /** Whether the panel is currently open — read by consumers via a template ref. */
  readonly isOpen = this._open.asReadonly();

  protected readonly _isReady = signal(false);
  protected readonly _dropUp = signal(false);
  protected readonly _top = signal<number | null>(null);
  protected readonly _bottom = signal<number | null>(null);
  protected readonly _left = signal<number | null>(null);
  protected readonly _right = signal<number | null>(null);
  protected readonly _maxHeight = signal<number | null>(null);

  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _panel = viewChild<ElementRef<HTMLElement>>('panel');

  private readonly _onViewportChange = (): void => {
    if (this._open()) this._reposition();
  };

  constructor() {
    inject(DestroyRef).onDestroy(() => this._unbindViewport());

    // `appendBody`: move the panel under <body> once it exists. Emulated style
    // encapsulation follows the element, and Angular removes the node itself
    // when the `@if` closes, so the move is safe (same approach as l-select).
    effect(() => {
      const panel = this._panel()?.nativeElement;
      if (this.appendBody() && panel && panel.parentElement !== document.body) {
        document.body.appendChild(panel);
      }
    });
  }

  /** Open when closed, close when open. */
  toggle(): void {
    this._open() ? this.close() : this._openMenu();
  }

  close(): void {
    if (!this._open()) return;
    this._open.set(false);
    this._isReady.set(false);
    this._unbindViewport();
  }

  protected _onDocumentClick(event: MouseEvent): void {
    if (this._open() && !this._isInside(event.target as Node)) this.close();
  }

  /** Trigger clicks toggle; clicks that bubbled up from the panel are the panel's business. */
  protected _onTriggerClick(event: MouseEvent): void {
    if (this._panel()?.nativeElement.contains(event.target as Node)) return;
    this.toggle();
  }

  protected _onPanelClick(): void {
    if (this.closeOnItemClick()) this.close();
  }

  /** True when the node lives in the trigger host or the (possibly body-level) panel. */
  private _isInside(node: Node | null): boolean {
    if (!node) return false;
    return this._host.nativeElement.contains(node) || !!this._panel()?.nativeElement.contains(node);
  }

  private _openMenu(): void {
    this._open.set(true);
    this._reposition();
    window.addEventListener('scroll', this._onViewportChange, true);
    window.addEventListener('resize', this._onViewportChange);
    // Reveal after the position is applied so it never flashes at the wrong spot.
    requestAnimationFrame(() => this._isReady.set(true));
  }

  /**
   * Anchor the fixed panel to the trigger rect: align the requested edge
   * horizontally, drop below by default, flip above when room runs out, and cap
   * the height to the space available.
   */
  private _reposition(): void {
    const host = this._host.nativeElement;
    const rect = host.getBoundingClientRect();
    const gap = 6;
    const spaceBelow = window.innerHeight - rect.bottom - gap;
    const spaceAbove = rect.top - gap;
    const dropUp = spaceBelow < MIN_SPACE_BELOW && spaceAbove > spaceBelow;
    // The fixed offsets are relative to this box, which isn't always the viewport.
    const box = fixedContainingBlock(this.appendBody() ? document.body : host);

    this._dropUp.set(dropUp);
    this._maxHeight.set(Math.max(120, (dropUp ? spaceAbove : spaceBelow) - 8));

    if (this.mode() === 'right') {
      this._right.set(box.right - rect.right);
      this._left.set(null);
    } else {
      this._left.set(rect.left - box.left);
      this._right.set(null);
    }

    if (dropUp) {
      this._bottom.set(box.bottom - rect.top + gap);
      this._top.set(null);
    } else {
      this._top.set(rect.bottom + gap - box.top);
      this._bottom.set(null);
    }
  }

  private _unbindViewport(): void {
    window.removeEventListener('scroll', this._onViewportChange, true);
    window.removeEventListener('resize', this._onViewportChange);
  }
}
