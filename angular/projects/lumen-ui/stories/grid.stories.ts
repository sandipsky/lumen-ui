import { Col, Row } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

/** Cell styling — alternating tints so each column is easy to tell apart. */
const CELL =
  'display: flex; align-items: center; justify-content: center; min-height: 40px; ' +
  'padding: 4px 8px; border-radius: 6px; font-size: 13px; font-weight: 600; text-align: center; ';
const CELL_A = CELL + 'background: var(--accent); color: var(--text-white)';
const CELL_B = CELL + 'background: var(--accent-bg); color: var(--accent-dark)';
const CANVAS = 'border: 1px dashed var(--separator-dark); border-radius: 8px; padding: 8px';
const STACK = 'display: flex; flex-direction: column; gap: 12px';

const breakpoint = (name: string, minWidth: string) => ({
  control: 'object' as const,
  description: `Override from the \`${name}\` breakpoint (≥ ${minWidth}) up — a span number or \`{ span, offset, order }\`.`,
  table: { category: 'responsive', defaultValue: { summary: 'null' } },
});

const meta: Meta<Row> = {
  title: 'Layout/Grid',
  component: Row,
  decorators: [moduleMetadata({ imports: [Col] })],
  args: {
    gutter: 16,
    justify: 'start',
    align: 'top',
    wrap: true,
  },
  argTypes: {
    gutter: {
      control: 'object',
      description:
        'Spacing between columns (px). A `[horizontal, vertical]` pair also spaces wrapped lines.',
      table: { defaultValue: { summary: '0' } },
    },
    justify: {
      control: 'select',
      options: ['start', 'end', 'center', 'space-between', 'space-around', 'space-evenly'],
      description: "Distributes columns that don't fill all 12 tracks.",
      table: { defaultValue: { summary: "'start'" } },
    },
    align: {
      control: 'inline-radio',
      options: ['top', 'middle', 'bottom', 'stretch'],
      description: 'Vertical alignment of the columns.',
      table: { defaultValue: { summary: "'top'" } },
    },
    wrap: {
      control: 'boolean',
      description: 'Wrap columns onto new lines once they exceed 12 tracks.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `
      <div style="${CANVAS}">
        <l-row ${argsToTemplate(args)}>
          <l-col [span]="2"><div style="${CELL_A}; min-height: 32px">2</div></l-col>
          <l-col [span]="2"><div style="${CELL_B}; min-height: 64px">2</div></l-col>
          <l-col [span]="2"><div style="${CELL_A}; min-height: 48px">2</div></l-col>
          <l-col [span]="2"><div style="${CELL_B}; min-height: 80px">2</div></l-col>
        </l-row>
      </div>
    `,
  }),
};

export default meta;
type Story = StoryObj<Row>;

/** `<l-row>` inputs on four span-2 columns of different heights. */
export const Playground: Story = {};

/** `<l-col>` inputs, applied to the highlighted middle column. */
export const Column: StoryObj<Col> = {
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
    span: {
      control: { type: 'number', min: 0, max: 12 },
      description:
        'Columns to span out of 12. `0` hides the column. Unset → sized by content (or `flex`).',
      table: { defaultValue: { summary: 'null' } },
    },
    offset: {
      control: { type: 'number', min: 0, max: 11 },
      description: 'Columns to skip on the left, out of 12.',
      table: { defaultValue: { summary: '0' } },
    },
    order: {
      control: 'number',
      description: 'CSS `order` — rearranges columns without touching the markup.',
      table: { defaultValue: { summary: 'null' } },
    },
    flex: {
      control: 'text',
      description:
        "CSS `flex` shorthand — `'auto'` (fill), a grow number, or a length like `'200px'` (fixed). Takes precedence over `span`.",
      table: { defaultValue: { summary: 'null' } },
    },
    xs: breakpoint('xs', '0px'),
    sm: breakpoint('sm', '576px'),
    md: breakpoint('md', '768px'),
    lg: breakpoint('lg', '992px'),
    xl: breakpoint('xl', '1200px'),
    xxl: breakpoint('xxl', '1400px'),
  },
  render: (args) => ({
    props: args,
    template: `
      <l-row [gutter]="16">
        <l-col [span]="3"><div style="${CELL_B}">span 3</div></l-col>
        <l-col ${argsToTemplate(args)}><div style="${CELL_A}">this column</div></l-col>
        <l-col [span]="3"><div style="${CELL_B}">span 3</div></l-col>
      </l-row>
    `,
  }),
};

/** Spans are fractions of 12: 12 is full width, 6 a half, 4 a third, 3 a quarter. */
export const Basic: Story = {
  render: () => ({
    props: { rows: [[12], [6, 6], [4, 4, 4], [3, 3, 3, 3]] },
    template: `
      <div style="${STACK}">
        @for (row of rows; track $index) {
          <l-row [gutter]="8">
            @for (span of row; track $index; let odd = $odd) {
              <l-col [span]="span">
                <div [style]="odd ? '${CELL_B}' : '${CELL_A}'">{{ span }}</div>
              </l-col>
            }
          </l-row>
        }
      </div>
    `,
  }),
};

/**
 * Resize the canvas: full width below `sm` (576px), halves up to `lg` (992px), quarters beyond.
 * Overrides cascade up from the smallest breakpoint.
 */
export const Responsive: Story = {
  render: () => ({
    props: { cols: [1, 2, 3, 4] },
    template: `
      <l-row [gutter]="[12, 12]">
        @for (i of cols; track i; let odd = $odd) {
          <l-col [xs]="12" [sm]="6" [lg]="3">
            <div [style]="odd ? '${CELL_B}' : '${CELL_A}'">xs 12 · sm 6 · lg 3</div>
          </l-col>
        }
      </l-row>
    `,
  }),
};

/** `offset` skips columns on the left; `order` rearranges without touching the markup. */
export const OffsetAndOrder: Story = {
  render: () => ({
    template: `
      <div style="${STACK}">
        <l-row [gutter]="8">
          <l-col [span]="4"><div style="${CELL_A}">4</div></l-col>
          <l-col [span]="4" [offset]="4"><div style="${CELL_B}">4, offset 4</div></l-col>
        </l-row>
        <l-row [gutter]="8">
          <l-col [span]="3" [order]="4"><div style="${CELL_A}">1 → order 4</div></l-col>
          <l-col [span]="3" [order]="3"><div style="${CELL_B}">2 → order 3</div></l-col>
          <l-col [span]="3" [order]="2"><div style="${CELL_A}">3 → order 2</div></l-col>
          <l-col [span]="3" [order]="1"><div style="${CELL_B}">4 → order 1</div></l-col>
        </l-row>
      </div>
    `,
  }),
};

/** `flex="auto"` fills the remaining space; a bare length (`"120px"`) makes a fixed column. */
export const FlexColumns: Story = {
  render: () => ({
    template: `
      <l-row [gutter]="12">
        <l-col flex="120px"><div style="${CELL_A}">120px</div></l-col>
        <l-col flex="auto"><div style="${CELL_B}">auto — fills the rest</div></l-col>
      </l-row>
    `,
  }),
};
