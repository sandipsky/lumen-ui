import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIButton, LUIStepper, type LUIStepperProps, type Step } from '@lumen-ui/react';

const BASIC_STEPS: Step[] = [
  { title: 'First step', description: 'Create an account' },
  { title: 'Second step', description: 'Verify email' },
  { title: 'Final step', description: 'Get full access' },
];

const WIZARD_STEPS: Step[] = [
  { title: 'Details', description: 'Your information' },
  { title: 'Address', description: 'Where to ship' },
  { title: 'Payment', description: 'How you pay' },
  { title: 'Review', description: 'Confirm & submit' },
];

const meta = {
  title: 'Navigation/Stepper',
  component: LUIStepper,
  args: {
    steps: BASIC_STEPS,
    active: 1,
    orientation: 'horizontal',
    showLines: true,
    clickable: false,
    allowStepSkip: false,
    onStepChange: fn(),
    onActiveChange: fn(),
  },
  argTypes: {
    steps: { control: 'object', table: { defaultValue: { summary: '[]' } } },
    active: { control: { type: 'number', min: 0 }, table: { defaultValue: { summary: '0' } } },
    orientation: {
      control: 'inline-radio',
      options: ['horizontal', 'vertical'],
      table: { defaultValue: { summary: "'horizontal'" } },
    },
    showLines: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    clickable: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    allowStepSkip: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    className: { control: false },
  },
  // `active` is controlled here, so write the selection back to the args.
  render: function Render(args) {
    const [, updateArgs] = useArgs<LUIStepperProps>();
    return (
      <LUIStepper
        {...args}
        onActiveChange={(active) => {
          args.onActiveChange?.(active);
          updateArgs({ active });
        }}
      />
    );
  },
} satisfies Meta<typeof LUIStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
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

/** Controlled `active` — drive it from Back / Next buttons. */
export const ExternalControl: Story = {
  render: function Render() {
    const [step, setStep] = useState(0);
    return (
      <>
        <LUIStepper steps={WIZARD_STEPS} active={step} onActiveChange={setStep} />
        <div style={{ display: 'flex', gap: 8, marginTop: 24 }}>
          <LUIButton variant="outlined" disabled={step === 0} onClick={() => setStep(step - 1)}>
            Back
          </LUIButton>
          <LUIButton disabled={step === WIZARD_STEPS.length - 1} onClick={() => setStep(step + 1)}>
            Next
          </LUIButton>
        </div>
      </>
    );
  },
};
