import type { Meta, StoryObj } from '@storybook/react-vite';
import { LUIButton, LUILoadingSpinner, useLUISpinner } from '@lumen-ui/react';

interface SpinnerStoryArgs {
  duration: number;
}

/** Fakes one task per entry: `show()` when it starts, `hide()` when it ends. */
function useFakeTasks() {
  const spinner = useLUISpinner();
  return (tasks: number[]) => {
    for (const ms of tasks) {
      spinner.show();
      setTimeout(() => spinner.hide(), ms);
    }
  };
}

const meta: Meta<SpinnerStoryArgs> = {
  title: 'Overlays & Feedback/Loading Spinner',
  component: LUILoadingSpinner,
  parameters: {
    docs: {
      description: {
        component:
          'Full-screen loading overlay. `<LUILoadingSpinner />` takes no props — place one ' +
          'instance near the app root (inside `<LUIProvider>` / `<LUISpinnerProvider>`) and ' +
          'drive it from anywhere with the `useLUISpinner()` hook: `show()`, `hide()`, ' +
          '`reset()` and `visible`. Calls are reference-counted, so overlapping operations ' +
          'keep the overlay up until the last one finishes.',
      },
    },
  },
  args: {
    duration: 1500,
  },
  argTypes: {
    duration: {
      control: { type: 'number', min: 0, step: 500 },
      description:
        'Story only — how long the demo keeps the overlay up: it calls `show()`, then ' +
        '`hide()` after this many ms.',
    },
  },
  render: function Render({ duration }) {
    const run = useFakeTasks();
    return (
      <>
        <LUILoadingSpinner />
        <LUIButton onClick={() => run([duration])}>Show for {duration}ms</LUIButton>
      </>
    );
  },
};

export default meta;
type Story = StoryObj<SpinnerStoryArgs>;

/** Click to show the overlay for `duration` ms. */
export const Playground: Story = {};

/**
 * Two overlapping tasks (1s and 2.5s) each call `show()` / `hide()`. The overlay stays up
 * until the second one finishes.
 */
export const ReferenceCounted: Story = {
  render: function Render() {
    const run = useFakeTasks();
    return (
      <>
        <LUILoadingSpinner />
        <LUIButton onClick={() => run([1000, 2500])}>Run two overlapping tasks</LUIButton>
      </>
    );
  },
};
