import { Link } from '@tanstack/react-router';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './sidebar-stories.css';

const sidebarApiInputs: ApiTableRow[] = [
  {
    name: 'collapsed',
    description:
      'Desktop state: true shrinks the rail from 200px to 70px — controlled when provided.',
    type: 'boolean',
    default: 'false',
    example: 'collapsed={collapsed}',
  },
  {
    name: 'onCollapsedChange',
    description: 'Fired when the sidebar changes the desktop collapsed state itself.',
    type: '(collapsed: boolean) => void',
    example: 'onCollapsedChange={setCollapsed}',
  },
  {
    name: 'mobileOpen',
    description:
      'Mobile state: true slides the drawer in over the content — controlled when provided.',
    type: 'boolean',
    default: 'false',
    example: 'mobileOpen={open}',
  },
  {
    name: 'onMobileOpenChange',
    description: 'Fired when the sidebar changes the mobile drawer state itself.',
    type: '(open: boolean) => void',
    example: 'onMobileOpenChange={setOpen}',
  },
  {
    name: 'ref',
    description: 'Imperative handle exposing toggle().',
    type: 'Ref<LUISidebarHandle>',
    example: 'ref={sidebar}',
  },
];

const headerApiOutputs: ApiTableRow[] = [
  {
    name: 'onMenuToggle',
    description: "Fired by the hamburger button; wire it to the sidebar's toggle().",
    type: 'void',
    example: 'onMenuToggle={() => sidebar.current?.toggle()}',
  },
];

export default function SidebarStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Sidebar &amp; Header</h1>
        <p className="page-header__lead">
          Empty layout shells. <code>&lt;LUISidebar&gt;</code> is a 200px rail that collapses to
          70px on desktop and becomes a slide-in drawer with a backdrop below 768px; both states
          can be controlled from outside (<code>collapsed</code>/<code>onCollapsedChange</code>,{' '}
          <code>mobileOpen</code>/<code>onMobileOpenChange</code>) and its <code>toggle()</code>{' '}
          (via <code>ref</code>) picks the right one per viewport.{' '}
          <code>&lt;LUIHeader&gt;</code> is a 40px bar whose hamburger fires{' '}
          <code>onMenuToggle</code> — wire it to the sidebar's <code>toggle()</code>.
        </p>
        <p className="page-header__lead">
          See it running full-screen at{' '}
          <Link className="page-header__link" to="/layout">
            /layout
          </Link>
          .
        </p>
      </header>

      <div className="stories">
        <Story
          title="Usage"
          description="Put the sidebar and header in a flex container; wire the header's onMenuToggle to the sidebar's toggle()."
          code={`const sidebar = useRef<LUISidebarHandle>(null);

<div className="layout">
  <LUISidebar ref={sidebar}>
    {/* nav content */}
  </LUISidebar>

  <div className="layout__main">
    <LUIHeader onMenuToggle={() => sidebar.current?.toggle()}>
      {/* header content */}
    </LUIHeader>
    <main>{/* page content */}</main>
  </div>
</div>

/* layout container */
.layout { display: flex; height: 100vh; }
.layout__main { display: flex; flex-direction: column; flex: 1; min-width: 0; }`}
        ></Story>

        <Story
          title="Controlled from outside"
          description="collapsed and mobileOpen are controlled prop pairs — bind or set them from anywhere, not just the hamburger."
          code={`const [collapsed, setCollapsed] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);

<LUISidebar
  collapsed={collapsed}
  onCollapsedChange={setCollapsed}
  mobileOpen={mobileOpen}
  onMobileOpenChange={setMobileOpen}
>
  …
</LUISidebar>`}
        ></Story>

        <ApiTable
          component="LUISidebar"
          note="Layout shell — nav content is passed as children. toggle() (via the ref handle) collapses/expands on desktop and opens/closes the drawer on mobile (below 768px); Escape closes the mobile drawer."
          inputs={sidebarApiInputs}
        />

        <ApiTable
          component="LUIHeader"
          note="A 40px bar with a built-in hamburger; header content is passed as children. Native header props pass through."
          outputs={headerApiOutputs}
        />
      </div>
    </div>
  );
}
