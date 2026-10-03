import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { Button, LoadingSpinner, SpinnerService } from '@lumen-ui/angular';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';

/**
 * Story host: runs fake tasks through `SpinnerService` — `show()` when each starts,
 * `hide()` when it ends.
 */
@Component({
  selector: 'story-spinner-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `<l-button (click)="run()">{{ label() }}</l-button>`,
})
class SpinnerDemo {
  private readonly _spinner = inject(SpinnerService);

  readonly label = input('Show spinner');
  /** One fake task per entry, lasting that many ms. */
  readonly tasks = input<number[]>([1500]);

  protected run(): void {
    for (const ms of this.tasks()) {
      this._spinner.show();
      setTimeout(() => this._spinner.hide(), ms);
    }
  }
}

interface SpinnerStoryArgs {
  duration: number;
}

const meta: Meta<SpinnerStoryArgs> = {
  title: 'Overlays & Feedback/Loading Spinner',
  component: LoadingSpinner,
  decorators: [moduleMetadata({ imports: [SpinnerDemo] })],
  parameters: {
    docs: {
      description: {
        component:
          'Full-screen loading overlay. `<l-loading-spinner />` takes no inputs — place one ' +
          'instance near the app root and drive it from anywhere with `SpinnerService`: ' +
          '`show()`, `hide()`, `reset()` and the `visible` signal. Calls are ' +
          'reference-counted, so overlapping operations keep the overlay up until the last ' +
          'one finishes.',
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
  render: (args) => ({
    props: args,
    template: `
      <l-loading-spinner />
      <story-spinner-demo [tasks]="[duration]" [label]="'Show for ' + duration + 'ms'" />
    `,
  }),
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
  render: () => ({
    template: `
      <l-loading-spinner />
      <story-spinner-demo [tasks]="[1000, 2500]" label="Run two overlapping tasks" />
    `,
  }),
};
