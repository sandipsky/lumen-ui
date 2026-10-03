import { FormsModule } from '@angular/forms';
import { SegmentedControl, type SegmentedOption } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type SegmentedControlStoryArgs = SegmentedControl & { value: unknown };

const ranges = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
const plans = ['Free', 'Pro', 'Team'];
const viewOptions: SegmentedOption[] = [
  { label: 'List', value: 'list' },
  { label: 'Board', value: 'board' },
  { label: 'Calendar', value: 'calendar' },
  { label: 'Timeline', value: 'timeline', disabled: true },
];

const meta: Meta<SegmentedControlStoryArgs> = {
  title: 'Actions/Segmented Control',
  component: SegmentedControl,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  args: {
    options: ranges,
    value: 'Daily',
    orientation: 'horizontal',
    size: 'md',
    disabled: false,
    fullWidth: false,
    change: fn(),
  },
  argTypes: {
    options: {
      control: 'object',
      description:
        'Options to choose from — plain strings or `{ label, value, disabled }` objects.',
      table: {
        type: { summary: '(string | SegmentedOption)[]' },
        defaultValue: { summary: '[]' },
      },
    },
    value: {
      control: 'text',
      description:
        'Story-only: the form value, passed via `[ngModel]`. Bind the real control with `[(ngModel)]` or a reactive form.',
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Lay segments out in a row or a column; arrow-key navigation follows the axis.',
      table: { defaultValue: { summary: "'horizontal'" } },
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Control size.',
      table: { defaultValue: { summary: "'md'" } },
    },
    disabled: {
      control: 'boolean',
      description:
        "Disable the whole control; a single segment can be disabled via its option's `disabled` flag.",
      table: { defaultValue: { summary: 'false' } },
    },
    fullWidth: {
      control: 'boolean',
      description: 'Stretch to the container width with equal-width segments.',
      table: { defaultValue: { summary: 'false' } },
    },
    name: {
      control: 'text',
      description: 'Group name for the control; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    // Outputs need `action` (or `control`): @storybook/angular strips other args before render.
    change: {
      action: 'change',
      description: 'Emits the selected value when it changes.',
      table: { category: 'outputs', type: { summary: 'unknown' } },
    },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-segmented-control ${argsToTemplate(args)} [ngModel]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<SegmentedControlStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

export const Sizes: Story = {
  render: () => ({
    props: { sizes: ['sm', 'md', 'lg'], size: 'md' },
    template: `
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 12px">
        <l-segmented-control [options]="sizes" size="sm" [(ngModel)]="size" />
        <l-segmented-control [options]="sizes" size="md" [(ngModel)]="size" />
        <l-segmented-control [options]="sizes" size="lg" [(ngModel)]="size" />
      </div>
    `,
  }),
};

/** `{ label, value, disabled }` objects; disabled segments are skipped by click and keyboard. */
export const ObjectOptions: Story = {
  args: { options: viewOptions, value: 'list' },
};

export const FullWidth: Story = {
  args: { options: plans, value: 'Pro', fullWidth: true },
};

export const Disabled: Story = {
  args: { options: plans, value: 'Pro', disabled: true },
};
