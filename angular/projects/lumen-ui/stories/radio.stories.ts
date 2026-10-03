import { FormsModule } from '@angular/forms';
import { Radio, type RadioOption } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type RadioStoryArgs = Radio & { value: unknown };

const PLANS: RadioOption[] = [
  { label: 'Free', value: 'free' },
  { label: 'Pro', value: 'pro' },
  { label: 'Enterprise', value: 'enterprise' },
];

const meta: Meta<RadioStoryArgs> = {
  title: 'Form Inputs/Radio',
  component: Radio,
  decorators: [moduleMetadata({ imports: [FormsModule] })],
  args: {
    value: 'pro',
    label: 'Plan',
    options: PLANS,
    disabled: false,
    labelPosition: 'right',
    orientation: 'inline',
    viewMode: false,
    change: fn(),
  },
  argTypes: {
    value: {
      control: 'inline-radio',
      options: ['free', 'pro', 'enterprise'],
      description: "Bound through `[(ngModel)]` (not an input) — the selected option's value.",
    },
    label: {
      control: 'text',
      description: 'Optional group label rendered above the options.',
      table: { defaultValue: { summary: "''" } },
    },
    options: {
      control: 'object',
      description: 'Options to render — one radio per `{ label, value, disabled? }` entry.',
      table: { defaultValue: { summary: '[]' } },
    },
    name: {
      control: 'text',
      description:
        'Native name shared across the group so only one option can be selected; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    disabled: {
      control: 'boolean',
      description:
        "Disable the whole group; a single entry can be disabled via its option's `disabled` flag.",
      table: { defaultValue: { summary: 'false' } },
    },
    labelPosition: {
      control: 'inline-radio',
      options: ['left', 'right', 'top'],
      description: 'Where each option label sits relative to its control.',
      table: { defaultValue: { summary: "'right'" } },
    },
    orientation: {
      control: 'inline-radio',
      options: ['inline', 'stacked'],
      description: '`inline` lays options out in a row; `stacked` in a column.',
      table: { defaultValue: { summary: "'inline'" } },
    },
    viewMode: {
      control: 'boolean',
      description: "Render the selected option's label as plain text instead of the radio group.",
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description:
        "Custom text shown in view mode; falls back to the selected option's label when omitted.",
    },
    change: {
      action: 'change',
      description: "Emits the selected option's value when the selection changes.",
    },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-radio ${argsToTemplate(args)} [(ngModel)]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<RadioStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

export const Stacked: Story = {
  args: { orientation: 'stacked' },
};

export const LabelPosition: Story = {
  render: () => ({
    props: { plans: PLANS },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <l-radio label="Left" [options]="plans" labelPosition="left" ngModel="pro" />
        <l-radio label="Top" [options]="plans" labelPosition="top" ngModel="pro" />
      </div>
    `,
  }),
};

/** Disable the whole group with `disabled`, or a single entry via its option's `disabled` flag. */
export const Disabled: Story = {
  render: () => ({
    props: {
      plans: PLANS,
      partial: [PLANS[0], PLANS[1], { ...PLANS[2], disabled: true }],
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <l-radio label="Whole group" [options]="plans" ngModel="pro" [disabled]="true" />
        <l-radio label="Single option" [options]="partial" ngModel="pro" />
      </div>
    `,
  }),
};

export const ViewMode: Story = {
  args: { viewMode: true },
};
