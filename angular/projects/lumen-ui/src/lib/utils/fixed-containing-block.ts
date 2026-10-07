/** A box's edges in viewport coordinates. */
export interface BoxEdges {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * The box that `top`/`right`/`bottom`/`left` of a `position: fixed` element
 * placed inside `parent` are measured from, in viewport coordinates.
 *
 * That's usually the viewport, but an ancestor with a `transform`, `filter`,
 * `contain`, `will-change: transform` and the like takes its place, and the
 * popup would then land offset by that ancestor's position (Storybook's docs
 * blocks use `transform: translateZ(0)`). Subtract these edges from viewport
 * coordinates to place a fixed popup correctly either way. A throwaway probe
 * measures the box directly, so it covers every property that can cause this.
 */
export function fixedContainingBlock(parent: Element): BoxEdges {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;inset:0;visibility:hidden;pointer-events:none';
  parent.appendChild(probe);
  const { top, right, bottom, left } = probe.getBoundingClientRect();
  probe.remove();
  return { top, right, bottom, left };
}
