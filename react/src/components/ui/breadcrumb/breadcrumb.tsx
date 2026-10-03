import type { ComponentType, ReactNode } from 'react';
import './breadcrumb.css';

export interface BreadcrumbItem {
  /** Visible crumb text. */
  label: string;
  /** Optional link target; omit for the current (last) page. */
  link?: string;
}

/** Props `LUIBreadcrumb` passes to `linkComponent` for every linked crumb. */
export interface LUIBreadcrumbLinkProps {
  /** The crumb's `link`. */
  to: string;
  className?: string;
  children?: ReactNode;
}

export interface LUIBreadcrumbProps {
  /** Optional page title rendered above the trail. */
  title?: string;
  /** The crumb trail, in order; the last item is treated as the current page. */
  items?: readonly BreadcrumbItem[];
  /**
   * Renders the linked crumbs. Defaults to a plain `<a href>`; pass your router's
   * link for client-side navigation — TanStack Router's and React Router's `Link`
   * both take `to` and fit as-is.
   */
  linkComponent?: ComponentType<LUIBreadcrumbLinkProps>;
}

function AnchorLink({ to, ...rest }: LUIBreadcrumbLinkProps) {
  return <a href={to} {...rest} />;
}

/**
 * Presentational breadcrumb trail. Pass the crumbs as `items` — the last one is
 * rendered as the current page; earlier ones render through `linkComponent`
 * (a plain `<a href>` by default) when they carry a `link`.
 *
 * ```tsx
 * <LUIBreadcrumb
 *   title="Order #1024"
 *   items={[
 *     { label: 'Home', link: '/' },
 *     { label: 'Orders', link: '/orders' },
 *     { label: 'Order #1024' },
 *   ]}
 * />
 * ```
 */
export function LUIBreadcrumb({
  title = '',
  items = [],
  linkComponent: Link = AnchorLink,
}: LUIBreadcrumbProps) {
  return (
    <div className="breadcrumb-group">
      {title && <h1 className="breadcrumb-title">{title}</h1>}

      {items.length > 0 && (
        <nav aria-label="Breadcrumb">
          <ol className="breadcrumb-list">
            {items.map((item, index) => {
              const last = index === items.length - 1;
              return (
                <li className="breadcrumb-item" key={index}>
                  {last ? (
                    <span className="breadcrumb-sub-title active" aria-current="page">
                      {item.label}
                    </span>
                  ) : item.link ? (
                    <Link className="breadcrumb-sub-title" to={item.link}>
                      {item.label}
                    </Link>
                  ) : (
                    <span className="breadcrumb-sub-title">{item.label}</span>
                  )}

                  {!last && (
                    <svg
                      className="breadcrumb-caret"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                      fill="none"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 5L12.5 10L7.5 15"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
    </div>
  );
}
