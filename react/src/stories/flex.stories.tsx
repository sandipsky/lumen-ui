import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIFlex, type FlexAlign, type FlexJustify } from '@lumen-ui/react';

const JUSTIFY: FlexJustify[] = [
  'normal',
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const ALIGN: FlexAlign[] = ['normal', 'start', 'end', 'center', 'stretch', 'baseline'];

/** Child box styling — alternating tints so each item is easy to tell apart. */
const item: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 64,
  minHeight: 40,
  padding: '0 12px',
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
};
const itemA: CSSProperties = { ...item, background: 'var(--accent)', color: 'var(--text-white)' };
const itemB: CSSProperties = {
  ...item,
  background: 'var(--accent-bg)',
  color: 'var(--accent-dark)',
};
/** Dashed outline around the container, so justify / align have visible room. */
const canvas: CSSProperties = {
  border: '1px dashed var(--separator-dark)',
  borderRadius: 8,
  padding: 8,
};

const meta = {
  title: 'Layout/Flex',
  component: LUIFlex,
  args: {
    vertical: false,
    justify: 'normal',
    align: 'normal',
    wrap: false,
    gap: 'small',
  },
  argTypes: {
    vertical: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    justify: {
      control: 'select',
      options: JUSTIFY,
      table: { defaultValue: { summary: "'normal'" } },
    },
    align: { control: 'select', options: ALIGN, table: { defaultValue: { summary: "'normal'" } } },
    wrap: {
      control: 'select',
      options: [false, true, 'nowrap', 'wrap', 'wrap-reverse'],
      table: { defaultValue: { summary: 'false' } },
    },
    gap: {
      control: 'select',
      options: [0, 'small', 'middle', 'large', 4, 32],
      description:
        'Preset (`small` 8px, `middle` 16px, `large` 24px), a pixel number, or any CSS gap value.',
      table: { defaultValue: { summary: '0' } },
    },
    children: { control: false },
  },
  render: (args) => (
    <LUIFlex {...args} style={{ ...canvas, minHeight: 140 }}>
      <div style={{ ...itemA, minHeight: 40 }}>1</div>
      <div style={{ ...itemB, minHeight: 80 }}>2</div>
      <div style={{ ...itemA, minHeight: 56 }}>3</div>
      <div style={{ ...itemB, minHeight: 40 }}>4</div>
    </LUIFlex>
  ),
} satisfies Meta<typeof LUIFlex>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control; the items have different heights to show `align`. */
export const Playground: Story = {};

/** `vertical` stacks the children as a column. */
export const Vertical: Story = {
  render: () => (
    <LUIFlex vertical gap="small" style={{ maxWidth: 240 }}>
      <div style={itemA}>1</div>
      <div style={itemB}>2</div>
      <div style={itemA}>3</div>
    </LUIFlex>
  ),
};

/** Every `justify` value side by side. */
export const Justify: Story = {
  render: () => (
    <LUIFlex vertical gap="middle">
      {JUSTIFY.slice(1).map((justify) => (
        <div key={justify}>
          <code style={{ fontSize: 12 }}>{justify}</code>
          <LUIFlex justify={justify} gap="small" style={{ ...canvas, marginTop: 4 }}>
            <div style={itemA}>1</div>
            <div style={itemB}>2</div>
            <div style={itemA}>3</div>
          </LUIFlex>
        </div>
      ))}
    </LUIFlex>
  ),
};

/** Cross-axis alignment, with items of different heights. */
export const Align: Story = {
  render: () => (
    <LUIFlex gap="middle" wrap>
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <div key={align}>
          <code style={{ fontSize: 12 }}>{align}</code>
          <LUIFlex align={align} gap="small" style={{ ...canvas, height: 112, marginTop: 4 }}>
            <div style={{ ...itemA, minHeight: 32 }}>1</div>
            <div style={{ ...itemB, minHeight: 72 }}>2</div>
            <div style={{ ...itemA, minHeight: 48 }}>3</div>
          </LUIFlex>
        </div>
      ))}
    </LUIFlex>
  ),
};

/** `wrap` lets children flow onto new lines; `gap` applies both ways. */
export const Wrap: Story = {
  render: () => (
    <LUIFlex wrap gap="small" style={{ maxWidth: 480 }}>
      {Array.from({ length: 14 }, (_, i) => i + 1).map((i) => (
        <div key={i} style={i % 2 ? itemA : itemB}>
          {i}
        </div>
      ))}
    </LUIFlex>
  ),
};
