import { Link } from '@tanstack/react-router';
import {
  LUIBreadcrumb,
  type BreadcrumbItem,
} from '../../../components/ui/breadcrumb/breadcrumb';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './breadcrumb-stories.css';

const trail: BreadcrumbItem[] = [
  { label: 'Home', link: '/button' },
  { label: 'Components', link: '/menu' },
  { label: 'Breadcrumb' },
];

const shortTrail: BreadcrumbItem[] = [
  { label: 'Docs', link: '/button' },
  { label: 'Getting started' },
];

const apiInputs: ApiTableRow[] = [
  {
    name: 'title',
    description: 'Optional page title rendered above the trail.',
    type: 'string',
    default: "''",
    example: 'title="Order #1024"',
  },
  {
    name: 'items',
    description:
      'The crumb trail, in order; the last item is treated as the current page, earlier ones link when they carry a link.',
    type: 'BreadcrumbItem[]',
    default: '[]',
    example: 'items={trail}',
  },
  {
    name: 'linkComponent',
    description:
      'Renders the linked crumbs. Defaults to a plain <a href>; pass a router link (TanStack Router or React Router Link, which both take to) for client-side navigation.',
    type: 'ComponentType<LUIBreadcrumbLinkProps>',
    default: '<a href>',
    example: 'linkComponent={Link}',
  },
];

export default function BreadcrumbStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Breadcrumb</h1>
        <p className="page-header__lead">
          Presentational breadcrumb trail. Pass the crumbs as <code>items</code> — the last one
          renders as the current page (<code>aria-current="page"</code>), while earlier crumbs render
          through <code>linkComponent</code> (a plain <code>&lt;a href&gt;</code>, or your router's{' '}
          <code>Link</code>) when they carry a <code>link</code>. An optional{' '}
          <code>title</code> renders above the trail.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic trail"
          description="Earlier crumbs are links; the last is the current page."
          code={`const items = [
  { label: 'Home', link: '/' },
  { label: 'Components', link: '/components' },
  { label: 'Breadcrumb' },
];

<LUIBreadcrumb items={items} linkComponent={Link} />`}
        >
          <LUIBreadcrumb items={trail} linkComponent={Link} />
        </Story>

        <Story
          title="With page title"
          description="Set title to render a page heading above the trail."
          code={`<LUIBreadcrumb title="Breadcrumb" items={items} linkComponent={Link} />`}
        >
          <LUIBreadcrumb title="Breadcrumb" items={trail} linkComponent={Link} />
        </Story>

        <Story
          title="Short trail"
          description="Any depth works; a crumb without a link renders as plain text."
          code={`const items = [{ label: 'Docs', link: '/' }, { label: 'Getting started' }];

<LUIBreadcrumb items={items} linkComponent={Link} />`}
        >
          <LUIBreadcrumb items={shortTrail} linkComponent={Link} />
        </Story>

        <ApiTable
          component="LUIBreadcrumb"
          note="Presentational — no callbacks. BreadcrumbItem is { label: string; link?: string }: label is the visible crumb text and link is an optional link target (omit it for the current page)."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
