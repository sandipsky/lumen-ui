import { useRef, useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import {
  LUIButton,
  LUIHeader,
  LUISidebar,
  LUISidebarItem,
  type LUISidebarHandle,
  type LUISidebarProps,
} from '@lumen-ui/react';

interface NavItem {
  icon: string;
  label: string;
  children?: NavItem[];
}

const NAV: NavItem[] = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '👥', label: 'Users' },
  { icon: '📁', label: 'Projects' },
  {
    icon: '📈',
    label: 'Reports',
    children: [
      { icon: '💰', label: 'Sales Report' },
      { icon: '📦', label: 'Stock Report' },
    ],
  },
  { icon: '🔔', label: 'Notifications' },
];

const styles = {
  shell: {
    display: 'flex',
    height: 420,
    overflow: 'hidden',
    borderBottom: '1px solid var(--separator)',
    // Containing block for the fixed mobile drawer, so it stays inside the demo.
    transform: 'translateZ(0)',
  },
  main: { display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 },
  content: {
    flex: 1,
    padding: 24,
    overflow: 'auto',
    fontSize: 14,
    color: 'var(--text-secondary)',
    background: 'var(--bg-light)',
  },
  title: { fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' },
  brand: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    margin: 12,
    borderRadius: 8,
    background: 'var(--accent)',
    color: 'var(--text-white)',
    fontWeight: 700,
    fontSize: 18,
  },
  nav: { display: 'flex', flexDirection: 'column', gap: 4, padding: '0 12px' },
} satisfies Record<string, CSSProperties>;

/**
 * Rail + header + content, with the header's hamburger wired to the sidebar's `toggle()`.
 * Expects a controlled `collapsed` so the items can switch to tooltips while labels are hidden.
 */
function Shell({ intro, ...sidebarProps }: LUISidebarProps & { intro: string }) {
  const sidebar = useRef<LUISidebarHandle>(null);
  const [active, setActive] = useState('Dashboard');
  const [openGroup, setOpenGroup] = useState('');
  const collapsed = !!sidebarProps.collapsed;

  const item = (entry: NavItem) => (
    <LUISidebarItem
      key={entry.label}
      icon={entry.icon}
      label={entry.label}
      active={entry.label === active}
      onClick={() => setActive(entry.label)}
      tooltip={collapsed}
    />
  );

  return (
    <div style={styles.shell}>
      <LUISidebar ref={sidebar} {...sidebarProps}>
        <div style={styles.brand}>L</div>
        <nav style={styles.nav}>
          {NAV.map((entry) =>
            entry.children ? (
              <LUISidebarItem
                key={entry.label}
                icon={entry.icon}
                label={entry.label}
                expanded={openGroup === entry.label}
                onClick={() => setOpenGroup(openGroup === entry.label ? '' : entry.label)}
                tooltip={collapsed}
              >
                {entry.children.map(item)}
              </LUISidebarItem>
            ) : (
              item(entry)
            ),
          )}
        </nav>
      </LUISidebar>

      <div style={styles.main}>
        <LUIHeader onMenuToggle={() => sidebar.current?.toggle()}>
          <span style={styles.title}>LumenUI</span>
        </LUIHeader>
        <main style={styles.content}>
          <p>{intro}</p>
          <p style={{ marginTop: 8 }}>
            Selected: <strong>{active}</strong>
          </p>
        </main>
      </div>
    </div>
  );
}

const meta = {
  title: 'Navigation/Sidebar',
  component: LUISidebar,
  subcomponents: { LUISidebarItem },
  parameters: { layout: 'fullscreen' },
  args: {
    collapsed: false,
    mobileOpen: false,
    onCollapsedChange: fn(),
    onMobileOpenChange: fn(),
  },
  argTypes: {
    collapsed: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    mobileOpen: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    children: { control: false },
    ref: { control: false },
  },
  // Controlled, with every change written back into the controls (like Angular's two-way models).
  render: function Render(args) {
    const [, updateArgs] = useArgs<LUISidebarProps>();
    return (
      <Shell
        {...args}
        onCollapsedChange={(collapsed) => {
          args.onCollapsedChange?.(collapsed);
          updateArgs({ collapsed });
        }}
        onMobileOpenChange={(mobileOpen) => {
          args.onMobileOpenChange?.(mobileOpen);
          updateArgs({ mobileOpen });
        }}
        intro="Use the header hamburger to collapse the rail — it calls toggle() on the sidebar's ref handle, which opens the drawer instead below 768px."
      />
    );
  },
} satisfies Meta<typeof LUISidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** The 70px icon rail; labels move into tooltips. */
export const Collapsed: Story = {
  args: { collapsed: true },
};

function ControlledDemo() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12 }}>
        <LUIButton variant="outlined" size="sm" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? 'Expand' : 'Collapse'} rail
        </LUIButton>
        <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
          collapsed = {String(collapsed)}
        </span>
      </div>
      <Shell
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        intro="The button above and the hamburger both write the same collapsed state."
      />
    </>
  );
}

/** `collapsed` / `mobileOpen` are controlled prop pairs — drive them from anywhere. */
export const ControlledFromOutside: Story = {
  render: () => <ControlledDemo />,
};
