import { Button, Stepper, type Step } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

const BASIC_STEPS: Step[] = [
  { title: 'First step', description: 'Create an account' },
  { title: 'Second step', description: 'Verify email' },
  { title: 'Final step', description: 'Get full access' },
];

const meta: Meta<Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  decorators: [moduleMetadata({ imports: [Button] })],
  args: {
    steps: BASIC_STEPS,
    active: 1,
    orientation: 'horizontal',
    showLines: true,
    clickable: false,
    allowStepSkip: false,
    stepChange: fn(),
    activeChange: fn(),
  },
  argTypes: {
    steps: {
      control: 'object',
      description:
        'The ordered steps to render: `{ title, description?, icon?, error?, completed?, ' +
        'disabled? }`.',
      table: { defaultValue: { summary: '[]' } },
    },
    active: {
      control: { type: 'number', min: 0 },
      description:
        'Index of the current step — two-way (`model()`) for click- or button-driven control.',
      table: { defaultValue: { summary: '0' } },
    },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      description: 'Lay the steps out in a row or stacked vertically.',
      table: { defaultValue: { summary: "'horizontal'" } },
    },
    showLines: {
      control: 'boolean',
      description: 'Show the connecting rails between steps. Steps stay spaced either way.',
      table: { defaultValue: { summary: 'true' } },
    },
    clickable: {
      control: 'boolean',
      description: 'Allow the user to click a step to jump to it.',
      table: { defaultValue: { summary: 'false' } },
    },
    allowStepSkip: {
      control: 'boolean',
      description:
        'When clickable, also allow selecting steps ahead of the active one (skip forward).',
      table: { defaultValue: { summary: 'false' } },
    },
    stepChange: {
      action: 'stepChange',
      description: 'Emits the target index when a step is selected (only fires when selectable).',
    },
    activeChange: { action: 'activeChange', description: 'The `model()` half of `[(active)]`.' },
  },
  render: (args) => ({
    props: args,
    template: `<l-stepper ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<Stepper>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Flag a step with `error: true` to mark it invalid — red indicator with an alert mark. */
export const ErrorState: Story = {
  args: {
    steps: [
      { title: 'Shipping', description: 'Address confirmed' },
      { title: 'Payment', description: 'Card was declined', error: true },
      { title: 'Confirm', description: 'Place the order' },
    ],
  },
};

/** A step's `icon` replaces its number; completed steps still swap to a checkmark. */
export const CustomIcons: Story = {
  args: {
    active: 2,
    steps: [
      { title: 'Cart', icon: '🛒' },
      { title: 'Address', icon: '📦' },
      { title: 'Payment', icon: '💳' },
      { title: 'Complete', icon: '🎉' },
    ],
  },
};

/** Steps stack with a connecting rail down the indicators. */
export const Vertical: Story = {
  args: { orientation: 'vertical' },
};

/** Click a step to jump to it; `allowStepSkip` also allows steps ahead of the active one. */
export const Clickable: Story = {
  args: { clickable: true, allowStepSkip: true },
};

/** `active` is a two-way `model()` — drive it from Back / Next buttons. */
export const ExternalControl: Story = {
  render: () => ({
    props: {
      step: 0,
      steps: [
        { title: 'Details', description: 'Your information' },
        { title: 'Address', description: 'Where to ship' },
        { title: 'Payment', description: 'How you pay' },
        { title: 'Review', description: 'Confirm & submit' },
      ],
    },
    template: `
      <l-stepper [steps]="steps" [(active)]="step" />
      <div style="display: flex; gap: 8px; margin-top: 24px">
        <l-button variant="outlined" [disabled]="step === 0" (click)="step = step - 1">
          Back
        </l-button>
        <l-button [disabled]="step === steps.length - 1" (click)="step = step + 1">Next</l-button>
      </div>
    `,
  }),
};
