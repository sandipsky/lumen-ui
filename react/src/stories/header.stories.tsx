import { useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import {
  LUIAvatar,
  LUIButton,
  LUIHeader,
  LUISidebar,
  type LUISidebarHandle,
} from '@lumen-ui/react';

const titleStyle = { fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' };

const meta = {
  title: 'Navigation/Header',
  component: LUIHeader,
  parameters: { layout: 'fullscreen' },
  args: {
    children: 'LumenUI',
    onMenuToggle: fn(),
  },
  argTypes: {
    children: { control: 'text', description: 'Header content, laid out in a flex row.' },
  },
  render: ({ children, ...args }) => (
    <LUIHeader {...args}>
      <span style={titleStyle}>{children}</span>
    </LUIHeader>
  ),
} satisfies Meta<typeof LUIHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** The hamburger fires `onMenuToggle` (see Actions); everything else is children. */
export const Playground: Story = {};

/** Children are laid out in a flex row — push actions right with `margin-left: auto`. */
export const WithActions: Story = {
  render: () => (
    <LUIHeader>
      <span style={titleStyle}>Projects</span>
      <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>/ Website redesign</span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
        <LUIButton variant="ghost" size="sm">
          🔔
        </LUIButton>
        <LUIButton size="sm">New task</LUIButton>
        <LUIAvatar name="Ada Lovelace" size="28px" />
      </div>
    </LUIHeader>
  ),
};

function WithSidebarDemo() {
  const sidebar = useRef<LUISidebarHandle>(null);
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display: 'flex', height: 320, overflow: 'hidden', transform: 'translateZ(0)' }}>
      <LUISidebar ref={sidebar} collapsed={collapsed} onCollapsedChange={setCollapsed}>
        <div
          style={{
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
          }}
        >
          L
        </div>
      </LUISidebar>
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <LUIHeader onMenuToggle={() => sidebar.current?.toggle()}>
          <span style={titleStyle}>LumenUI</span>
        </LUIHeader>
        <main
          style={{
            flex: 1,
            padding: 24,
            fontSize: 14,
            color: 'var(--text-secondary)',
            background: 'var(--bg-light)',
          }}
        >
          Rail collapsed: {String(collapsed)}
        </main>
      </div>
    </div>
  );
}

/** Wired to a sidebar: `onMenuToggle={() => sidebar.current?.toggle()}` collapses the rail. */
export const WithSidebar: Story = {
  render: () => <WithSidebarDemo />,
};
