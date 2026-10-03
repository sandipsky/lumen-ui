import { useState, type CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LUIAvatar, LUIBadge, LUIBadgeWrapper, LUIButton } from '@lumen-ui/react';

/** A neutral square host for the badge to sit on. */
const iconBox: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: 8,
  background: 'var(--bg-dark)',
  fontSize: 20,
};

const row: CSSProperties = { display: 'flex', gap: 24, alignItems: 'center' };

/**
 * Consumers wrap an element in `LUIBadgeWrapper` — the React counterpart of Angular's `[lBadge]`
 * directive (inputs mirrored with a `badge` prefix). It renders the `LUIBadge` bubble at the
 * wrapped element's top-right corner.
 */
const meta = {
  title: 'Data Display/Badge',
  component: LUIBadgeWrapper,
  subcomponents: { LUIBadge },
  args: {
    badge: 5,
    badgeColor: '',
    badgeSize: 'md',
    badgeOverflowCount: 99,
    badgeShowZero: false,
    badgeDynamic: false,
    onBadgeClick: fn(),
  },
  argTypes: {
    badge: { control: 'number', table: { defaultValue: { summary: 'null' } } },
    badgeColor: { control: 'text', table: { defaultValue: { summary: "''" } } },
    badgeSize: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      table: { defaultValue: { summary: "'md'" } },
    },
    badgeOverflowCount: { control: 'number', table: { defaultValue: { summary: '99' } } },
    badgeShowZero: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    badgeDynamic: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    children: { control: false },
  },
  render: (args) => (
    <LUIBadgeWrapper {...args}>
      <LUIButton variant="outlined">Inbox</LUIButton>
    </LUIBadgeWrapper>
  ),
} satisfies Meta<typeof LUIBadgeWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every wrapper prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Wrap any element — an icon, a button, an avatar. */
export const OnElements: Story = {
  render: () => (
    <div style={row}>
      <LUIBadgeWrapper badge={3}>
        <span style={iconBox}>🔔</span>
      </LUIBadgeWrapper>
      <LUIBadgeWrapper badge={12} badgeColor="var(--accent)">
        <span style={iconBox}>✉️</span>
      </LUIBadgeWrapper>
      <LUIBadgeWrapper badge={5}>
        <LUIButton variant="outlined">Inbox</LUIButton>
      </LUIBadgeWrapper>
      <LUIBadgeWrapper badge={1} badgeSize="sm" badgeColor="var(--success)">
        <LUIAvatar name="Ada Lovelace" size="36px" />
      </LUIBadgeWrapper>
    </div>
  ),
};

/** Counts above `badgeOverflowCount` render as `N+`; zero hides unless `badgeShowZero`. */
export const OverflowAndZero: Story = {
  render: () => (
    <div style={row}>
      <LUIBadgeWrapper badge={128}>
        <span style={iconBox}>🔔</span>
      </LUIBadgeWrapper>
      <LUIBadgeWrapper badge={1200} badgeOverflowCount={999}>
        <span style={iconBox}>🔔</span>
      </LUIBadgeWrapper>
      <LUIBadgeWrapper badge={15} badgeOverflowCount={9}>
        <span style={iconBox}>🔔</span>
      </LUIBadgeWrapper>
      <LUIBadgeWrapper badge={0}>
        <span style={iconBox}>🔕</span>
      </LUIBadgeWrapper>
      <LUIBadgeWrapper badge={0} badgeShowZero>
        <span style={iconBox}>🔔</span>
      </LUIBadgeWrapper>
    </div>
  ),
};

function DynamicDemo() {
  const [count, setCount] = useState(4);
  return (
    <div style={row}>
      <LUIBadgeWrapper badge={count} badgeDynamic>
        <span style={iconBox}>🔔</span>
      </LUIBadgeWrapper>
      <LUIButton variant="outlined" onClick={() => setCount(Math.max(0, count - 1))}>
        −
      </LUIButton>
      <LUIButton variant="outlined" onClick={() => setCount(count + 1)}>
        +
      </LUIButton>
    </div>
  );
}

/** With `badgeDynamic` the bubble pops each time the count changes. */
export const Dynamic: Story = {
  render: () => <DynamicDemo />,
};

/** `badgeSize` (sm / md / lg) and `badgeColor` (any CSS color or token). */
export const SizesAndColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={row}>
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <LUIBadgeWrapper key={size} badge={8} badgeSize={size}>
            <span style={iconBox}>🔔</span>
          </LUIBadgeWrapper>
        ))}
      </div>
      <div style={row}>
        {['', 'var(--accent)', 'var(--success)', '#6741d9'].map((color) => (
          <LUIBadgeWrapper key={color} badge={4} badgeColor={color}>
            <span style={iconBox}>🔔</span>
          </LUIBadgeWrapper>
        ))}
      </div>
    </div>
  ),
};
