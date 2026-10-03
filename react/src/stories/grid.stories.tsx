import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUICol, LUIRow } from '@lumen-ui/react';

/** Cell styling — alternating tints so each column is easy to tell apart. */
const cell: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 40,
  padding: '4px 8px',
  borderRadius: 6,
  fontSize: 13,
  fontWeight: 600,
  textAlign: 'center',
};
const cellA: CSSProperties = { ...cell, background: 'var(--accent)', color: 'var(--text-white)' };
const cellB: CSSProperties = {
  ...cell,
  background: 'var(--accent-bg)',
  color: 'var(--accent-dark)',
};
const canvas: CSSProperties = {
  border: '1px dashed var(--separator-dark)',
  borderRadius: 8,
  padding: 8,
};
const stack: CSSProperties = { display: 'flex', flexDirection: 'column', gap: 12 };

const breakpoint = { control: 'object', table: { category: 'responsive' } } as const;

const meta = {
  title: 'Layout/Grid',
  component: LUIRow,
  subcomponents: { LUICol },
  args: {
    gutter: 16,
    justify: 'start',
    align: 'top',
    wrap: true,
  },
  argTypes: {
    gutter: { control: 'object', table: { defaultValue: { summary: '0' } } },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'],
      table: { defaultValue: { summary: "'start'" } },
    },
    align: {
      control: 'inline-radio',
      options: ['top', 'middle', 'bottom', 'stretch'],
      table: { defaultValue: { summary: "'top'" } },
    },
    wrap: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    children: { control: false },
  },
  render: (args) => (
    <div style={canvas}>
      <LUIRow {...args}>
        <LUICol span={2}>
          <div style={{ ...cellA, minHeight: 32 }}>2</div>
        </LUICol>
        <LUICol span={2}>
          <div style={{ ...cellB, minHeight: 64 }}>2</div>
        </LUICol>
        <LUICol span={2}>
          <div style={{ ...cellA, minHeight: 48 }}>2</div>
        </LUICol>
        <LUICol span={2}>
          <div style={{ ...cellB, minHeight: 80 }}>2</div>
        </LUICol>
      </LUIRow>
    </div>
  ),
} satisfies Meta<typeof LUIRow>;

export default meta;
type Story = StoryObj<typeof meta>;

/** `LUIRow` props on four span-2 columns of different heights. */
export const Playground: Story = {};

/** `LUICol` props, applied to the highlighted middle column. */
export const Column: StoryObj<typeof LUICol> = {
  args: {
    span: 4,
    offset: 0,
    order: null,
    flex: null,
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,
    xxl: null,
  },
  argTypes: {
    span: { control: { type: 'number', min: 0, max: 12 } },
    offset: { control: { type: 'number', min: 0, max: 11 } },
    order: { control: 'number' },
    flex: { control: 'text' },
    xs: breakpoint,
    sm: breakpoint,
    md: breakpoint,
    lg: breakpoint,
    xl: breakpoint,
    xxl: breakpoint,
  },
  render: (args) => (
    <LUIRow gutter={16}>
      <LUICol span={3}>
        <div style={cellB}>span 3</div>
      </LUICol>
      <LUICol {...args}>
        <div style={cellA}>this column</div>
      </LUICol>
      <LUICol span={3}>
        <div style={cellB}>span 3</div>
      </LUICol>
    </LUIRow>
  ),
};

/** Spans are fractions of 12: 12 is full width, 6 a half, 4 a third, 3 a quarter. */
export const Basic: Story = {
  render: () => (
    <div style={stack}>
      {[[12], [6, 6], [4, 4, 4], [3, 3, 3, 3]].map((row, r) => (
        <LUIRow key={r} gutter={8}>
          {row.map((span, i) => (
            <LUICol key={i} span={span}>
              <div style={i % 2 ? cellB : cellA}>{span}</div>
            </LUICol>
          ))}
        </LUIRow>
      ))}
    </div>
  ),
};

/**
 * Resize the canvas: full width below `sm` (576px), halves up to `lg` (992px), quarters beyond.
 * Overrides cascade up from the smallest breakpoint.
 */
export const Responsive: Story = {
  render: () => (
    <LUIRow gutter={[12, 12]}>
      {[0, 1, 2, 3].map((i) => (
        <LUICol key={i} xs={12} sm={6} lg={3}>
          <div style={i % 2 ? cellB : cellA}>xs 12 · sm 6 · lg 3</div>
        </LUICol>
      ))}
    </LUIRow>
  ),
};

/** `offset` skips columns on the left; `order` rearranges without touching the markup. */
export const OffsetAndOrder: Story = {
  render: () => (
    <div style={stack}>
      <LUIRow gutter={8}>
        <LUICol span={4}>
          <div style={cellA}>4</div>
        </LUICol>
        <LUICol span={4} offset={4}>
          <div style={cellB}>4, offset 4</div>
        </LUICol>
      </LUIRow>
      <LUIRow gutter={8}>
        {[4, 3, 2, 1].map((order, i) => (
          <LUICol key={order} span={3} order={order}>
            <div style={i % 2 ? cellB : cellA}>
              {i + 1} → order {order}
            </div>
          </LUICol>
        ))}
      </LUIRow>
    </div>
  ),
};

/** `flex="auto"` fills the remaining space; a bare length (`"120px"`) makes a fixed column. */
export const FlexColumns: Story = {
  render: () => (
    <LUIRow gutter={12}>
      <LUICol flex="120px">
        <div style={cellA}>120px</div>
      </LUICol>
      <LUICol flex="auto">
        <div style={cellB}>auto — fills the rest</div>
      </LUICol>
    </LUIRow>
  ),
};
