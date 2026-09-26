import type { ComponentPropsWithRef, CSSProperties, ElementType } from 'react';

/** Preset (`xs` 4px, `sm` 8px, `md` 16px, `lg` 24px, `xl` 32px), a pixel number, or any CSS size. */
export type BoxSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string;
/** A pixel number or any CSS size value (`'50%'`, `'20rem'`, …). */
export type BoxSize = number | string;

const SPACING_PRESETS: Record<string, string> = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
};

const toSpacing = (value: BoxSpacing | undefined): string | undefined => {
  if (value === undefined) return undefined;
  if (typeof value === 'number') return `${value}px`;
  return SPACING_PRESETS[value] ?? value;
};

const toSize = (value: BoxSize | undefined): string | undefined => {
  if (value === undefined) return undefined;
  return typeof value === 'number' ? `${value}px` : value;
};

/** Style props shared by every `LUIBox`, whatever element it renders. */
export interface BoxStyleProps {
  /** Margin on all sides. */
  m?: BoxSpacing;
  /** Horizontal margin (left + right). */
  mx?: BoxSpacing;
  /** Vertical margin (top + bottom). */
  my?: BoxSpacing;
  mt?: BoxSpacing;
  mb?: BoxSpacing;
  ml?: BoxSpacing;
  mr?: BoxSpacing;
  /** Padding on all sides. */
  p?: BoxSpacing;
  /** Horizontal padding (left + right). */
  px?: BoxSpacing;
  /** Vertical padding (top + bottom). */
  py?: BoxSpacing;
  pt?: BoxSpacing;
  pb?: BoxSpacing;
  pl?: BoxSpacing;
  pr?: BoxSpacing;
  /** Width. */
  w?: BoxSize;
  /** Min-width. */
  miw?: BoxSize;
  /** Max-width. */
  maw?: BoxSize;
  /** Height. */
  h?: BoxSize;
  /** Min-height. */
  mih?: BoxSize;
  /** Max-height. */
  mah?: BoxSize;
  /** Background — any CSS color, including tokens like `var(--accent-bg)`. */
  bg?: string;
  /** Text color — any CSS color, including tokens like `var(--accent-dark)`. */
  c?: string;
  style?: CSSProperties;
}

export type LUIBoxProps<E extends ElementType = 'div'> = BoxStyleProps & {
  /** Element or component to render as the root — `div` by default. */
  component?: E;
} & Omit<ComponentPropsWithRef<E>, 'component' | keyof BoxStyleProps>;

/**
 * Base building block inspired by Mantine's `Box` — a `div` (or any element via
 * `component`) with style props for spacing, size and color, so one-off layout
 * tweaks don't need a CSS file. Spacing props accept the preset scale
 * (`xs` 4px … `xl` 32px), a pixel number, or any CSS value; explicit sides win
 * over the `mx`/`my`/`px`/`py` pairs, which win over `m`/`p`.
 *
 * ```tsx
 * <LUIBox p="md" bg="var(--accent-bg)" c="var(--accent-dark)">Highlighted</LUIBox>
 * <LUIBox component="a" href="/docs" p="sm">Link box</LUIBox>
 * ```
 */
export function LUIBox<E extends ElementType = 'div'>({
  component,
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  w,
  miw,
  maw,
  h,
  mih,
  mah,
  bg,
  c,
  style,
  ...rest
}: LUIBoxProps<E>) {
  const Component: ElementType = component ?? 'div';

  /* Resolve each side on its own — mixing the `margin`/`padding` shorthands
     with undefined longhand keys makes React clear the shorthand. */
  const boxStyle: CSSProperties = {
    marginTop: toSpacing(mt ?? my ?? m),
    marginBottom: toSpacing(mb ?? my ?? m),
    marginLeft: toSpacing(ml ?? mx ?? m),
    marginRight: toSpacing(mr ?? mx ?? m),
    paddingTop: toSpacing(pt ?? py ?? p),
    paddingBottom: toSpacing(pb ?? py ?? p),
    paddingLeft: toSpacing(pl ?? px ?? p),
    paddingRight: toSpacing(pr ?? px ?? p),
    width: toSize(w),
    minWidth: toSize(miw),
    maxWidth: toSize(maw),
    height: toSize(h),
    minHeight: toSize(mih),
    maxHeight: toSize(mah),
    background: bg,
    color: c,
    ...style,
  };

  return <Component style={boxStyle} {...rest} />;
}
