import { useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIBox } from '@lumen-ui/react';

const SPACING = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
/** Dashed outline around a demo, so margins show up. */
const canvas: CSSProperties = { border: '1px dashed var(--separator-dark)', borderRadius: 8 };

const spacing = { control: 'select', options: SPACING, table: { category: 'spacing' } } as const;
const size = { control: 'text', table: { category: 'size' } } as const;
const color = { control: 'text', table: { category: 'color' } } as const;

const meta = {
  title: 'Layout/Box',
  component: LUIBox,
  args: {
    children: 'Style props: p="md" bg="var(--accent-bg)" c="var(--accent-dark)"',
    p: 'md',
    bg: 'var(--accent-bg)',
    c: 'var(--accent-dark)',
  },
  argTypes: {
    children: { control: 'text', description: 'Box content.' },
    component: { control: 'text' },
    m: spacing,
    mx: spacing,
    my: spacing,
    mt: spacing,
    mb: spacing,
    ml: spacing,
    mr: spacing,
    p: spacing,
    px: spacing,
    py: spacing,
    pt: spacing,
    pb: spacing,
    pl: spacing,
    pr: spacing,
    w: size,
    miw: size,
    maw: size,
    h: size,
    mih: size,
    mah: size,
    bg: color,
    c: color,
    style: { control: 'object' },
  },
  render: (args) => (
    <div style={canvas}>
      <LUIBox {...args} style={{ borderRadius: 6, fontSize: 13, fontWeight: 600, ...args.style }} />
    </div>
  ),
} satisfies Meta<typeof LUIBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control; the dashed outline makes margins visible. */
export const Playground: Story = {};

/** The five spacing presets applied as padding. */
export const SpacingScale: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {SPACING.map((preset) => (
        <LUIBox key={preset} p={preset} bg="var(--bg-light)" style={canvas}>
          <LUIBox p="xs" bg="var(--accent)" c="var(--text-white)" style={{ fontSize: 12 }}>
            p="{preset}"
          </LUIBox>
        </LUIBox>
      ))}
    </div>
  ),
};

/** `mx`/`my` set a pair of sides, `mt`/`mb`/`ml`/`mr` a single one. */
export const MarginAndSides: Story = {
  render: () => (
    <LUIBox bg="var(--bg-light)" style={canvas}>
      <LUIBox mx="xl" my="sm" p="sm" bg="var(--accent)" c="var(--text-white)">
        mx="xl" my="sm"
      </LUIBox>
      <LUIBox ml="xl" mb="sm" p="sm" bg="var(--accent-dark)" c="var(--text-white)">
        ml="xl" mb="sm"
      </LUIBox>
    </LUIBox>
  ),
};

/** `w`/`h` and the min/max variants take pixel numbers or any CSS size. */
export const Size: Story = {
  render: () => (
    <LUIBox w="100%" maw={320} h={56} p="sm" bg="var(--accent-bg)" c="var(--accent-dark)">
      w="100%" maw={'{320}'} h={'{56}'}
    </LUIBox>
  ),
};

function AsAnyElementDemo() {
  const [clicks, setClicks] = useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <LUIBox
        component="a"
        href="https://mantine.dev"
        target="_blank"
        rel="noreferrer"
        p="sm"
        bg="var(--info-bg)"
        c="var(--info)"
        style={{ borderRadius: 6, textDecoration: 'none' }}
      >
        Renders an &lt;a&gt; — opens mantine.dev
      </LUIBox>
      <LUIBox
        component="button"
        type="button"
        p="sm"
        bg="var(--accent)"
        c="var(--text-white)"
        style={{ border: 'none', borderRadius: 6, font: 'inherit', cursor: 'pointer' }}
        onClick={() => setClicks(clicks + 1)}
      >
        Renders a &lt;button&gt; — clicked {clicks}×
      </LUIBox>
    </div>
  );
}

/**
 * `component` renders the box as a link, button or any other element — the element's own props
 * and events keep working (Angular uses the `l-box` attribute for this).
 */
export const AsAnyElement: Story = {
  render: () => <AsAnyElementDemo />,
};
