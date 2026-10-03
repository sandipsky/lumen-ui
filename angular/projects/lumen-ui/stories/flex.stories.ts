import { Flex } from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

const JUSTIFY = [
  'normal',
  'start',
  'end',
  'center',
  'space-between',
  'space-around',
  'space-evenly',
];
const ALIGN = ['normal', 'start', 'end', 'center', 'stretch', 'baseline'];

/** Child box styling — alternating tints so each item is easy to tell apart. */
const ITEM =
  'display: flex; align-items: center; justify-content: center; min-width: 64px; ' +
  'min-height: 40px; padding: 0 12px; border-radius: 6px; font-size: 13px; font-weight: 600; ';
const ITEM_A = ITEM + 'background: var(--accent); color: var(--text-white)';
const ITEM_B = ITEM + 'background: var(--accent-bg); color: var(--accent-dark)';
/** Dashed outline around the container, so justify / align have visible room. */
const CANVAS = 'border: 1px dashed var(--separator-dark); border-radius: 8px; padding: 8px';

const meta: Meta<Flex> = {
  title: 'Layout/Flex',
  component: Flex,
  args: {
    vertical: false,
    justify: 'normal',
    align: 'normal',
    wrap: false,
    gap: 'small',
  },
  argTypes: {
    vertical: {
      control: 'boolean',
      description: 'Lay children out as a column instead of a row.',
      table: { defaultValue: { summary: 'false' } },
    },
    justify: {
      control: 'select',
      options: JUSTIFY,
      description: 'Distribution along the main axis (`justify-content`).',
      table: { defaultValue: { summary: "'normal'" } },
    },
    align: {
      control: 'select',
      options: ALIGN,
      description: 'Alignment on the cross axis (`align-items`).',
      table: { defaultValue: { summary: "'normal'" } },
    },
    wrap: {
      control: 'select',
      options: [false, true, 'nowrap', 'wrap', 'wrap-reverse'],
      description: '`true`/`false`, or any CSS `flex-wrap` keyword.',
      table: { defaultValue: { summary: 'false' } },
    },
    gap: {
      control: 'select',
      options: [0, 'small', 'middle', 'large', 4, 32],
      description:
        'Preset (`small` 8px, `middle` 16px, `large` 24px), a pixel number, or any CSS gap value.',
      table: { defaultValue: { summary: '0' } },
    },
  },
  render: (args) => ({
    template: `
      <l-flex style="${CANVAS}; min-height: 140px" ${argsToTemplate(args)}>
        <div style="${ITEM_A}; min-height: 40px">1</div>
        <div style="${ITEM_B}; min-height: 80px">2</div>
        <div style="${ITEM_A}; min-height: 56px">3</div>
        <div style="${ITEM_B}; min-height: 40px">4</div>
      </l-flex>
    `,
    props: args,
  }),
};

export default meta;
type Story = StoryObj<Flex>;

/** Every input is wired to a control; the items have different heights to show `align`. */
export const Playground: Story = {};

/** `[vertical]="true"` stacks the children as a column. */
export const Vertical: Story = {
  render: () => ({
    template: `
      <l-flex [vertical]="true" gap="small" style="max-width: 240px">
        <div style="${ITEM_A}">1</div>
        <div style="${ITEM_B}">2</div>
        <div style="${ITEM_A}">3</div>
      </l-flex>
    `,
  }),
};

/** Every `justify` value side by side. */
export const Justify: Story = {
  render: () => ({
    props: { values: JUSTIFY.slice(1) },
    template: `
      <l-flex [vertical]="true" gap="middle">
        @for (justify of values; track justify) {
          <div>
            <code style="font-size: 12px">{{ justify }}</code>
            <l-flex [justify]="justify" gap="small" style="${CANVAS}; margin-top: 4px">
              <div style="${ITEM_A}">1</div>
              <div style="${ITEM_B}">2</div>
              <div style="${ITEM_A}">3</div>
            </l-flex>
          </div>
        }
      </l-flex>
    `,
  }),
};

/** Cross-axis alignment, with items of different heights. */
export const Align: Story = {
  render: () => ({
    props: { values: ['start', 'center', 'end', 'stretch'] },
    template: `
      <l-flex gap="middle" [wrap]="true">
        @for (align of values; track align) {
          <div>
            <code style="font-size: 12px">{{ align }}</code>
            <l-flex [align]="align" gap="small" style="${CANVAS}; height: 112px; margin-top: 4px">
              <div style="${ITEM_A}; min-height: 32px">1</div>
              <div style="${ITEM_B}; min-height: 72px">2</div>
              <div style="${ITEM_A}; min-height: 48px">3</div>
            </l-flex>
          </div>
        }
      </l-flex>
    `,
  }),
};

/** `[wrap]="true"` lets children flow onto new lines; `gap` applies both ways. */
export const Wrap: Story = {
  render: () => ({
    props: { items: Array.from({ length: 14 }, (_, i) => i + 1) },
    template: `
      <l-flex [wrap]="true" gap="small" style="max-width: 480px">
        @for (i of items; track i) {
          <div [style]="i % 2 ? '${ITEM_A}' : '${ITEM_B}'">{{ i }}</div>
        }
      </l-flex>
    `,
  }),
};
