import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import {
  Button,
  NotificationService,
  type ButtonVariant,
  type NotificationOptions,
  type NotificationPosition,
  type NotificationType,
} from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';

/** Story host: a trigger button that calls `NotificationService.show()` with its inputs. */
@Component({
  selector: 'story-notification-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `<l-button [variant]="variant()" (click)="show()">{{ label() }}</l-button>`,
})
class NotificationDemo {
  private readonly _notify = inject(NotificationService);

  readonly label = input('Show notification');
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<NotificationType>('info');
  readonly title = input<string>();
  readonly message = input<string>();
  readonly duration = input(4000);
  readonly position = input<NotificationPosition>('topRight');
  readonly pauseOnHover = input(true);
  readonly showProgress = input(true);
  readonly showClose = input(true);
  readonly withIcon = input(true);

  protected show(): void {
    this._notify.show({
      type: this.type(),
      title: this.title(),
      message: this.message(),
      duration: this.duration(),
      position: this.position(),
      pauseOnHover: this.pauseOnHover(),
      showProgress: this.showProgress(),
      showClose: this.showClose(),
      withIcon: this.withIcon(),
    });
  }
}

const POSITIONS: NotificationPosition[] = [
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
];

const meta: Meta<NotificationOptions> = {
  title: 'Overlays & Feedback/Notification',
  component: NotificationDemo,
  parameters: {
    docs: {
      description: {
        component:
          'Imperative toasts: inject `NotificationService` and call `show(options)` or a type ' +
          'shortcut — `success / error / warn / info(title, message?, options?)`. Each call ' +
          'returns a `NotificationRef` (`dismiss()`); `clear()` dismisses them all. The ' +
          'controls are the `NotificationOptions` — click the button to show a toast with them.',
      },
    },
  },
  args: {
    type: 'success',
    title: 'Changes saved',
    message: 'Your profile has been updated successfully.',
    duration: 4000,
    position: 'topRight',
    pauseOnHover: true,
    showProgress: true,
    showClose: true,
    withIcon: true,
  },
  argTypes: {
    type: {
      control: 'inline-radio',
      options: ['success', 'info', 'warn', 'error'],
      description: 'Visual style and icon of the toast.',
      table: { defaultValue: { summary: "'info'" } },
    },
    title: {
      control: 'text',
      description: 'Heading line of the toast.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    message: {
      control: 'text',
      description: 'Body text shown under the title.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    duration: {
      control: 'number',
      description: 'Auto-dismiss delay in ms; `0` keeps it open until dismissed manually.',
      table: { defaultValue: { summary: '4000' } },
    },
    position: {
      control: 'select',
      options: POSITIONS,
      description: 'Viewport edge/corner the toast stacks in.',
      table: { defaultValue: { summary: "'topRight'" } },
    },
    pauseOnHover: {
      control: 'boolean',
      description: 'Pause the dismiss timer (and progress bar) while hovered.',
      table: { defaultValue: { summary: 'true' } },
    },
    showProgress: {
      control: 'boolean',
      description: 'Render the shrinking progress bar that tracks the dismiss timer.',
      table: { defaultValue: { summary: 'true' } },
    },
    showClose: {
      control: 'boolean',
      description: 'Render the × close button.',
      table: { defaultValue: { summary: 'true' } },
    },
    withIcon: {
      control: 'boolean',
      description: 'Render the leading type icon.',
      table: { defaultValue: { summary: 'true' } },
    },
  },
  render: (args) => ({
    props: args,
    template: `<story-notification-demo ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<NotificationOptions>;

/** Every `NotificationOptions` field is wired to a control — set them, then fire a toast. */
export const Playground: Story = {};

/** `success`, `info`, `warn` and `error` — each with its own color and icon. */
export const Types: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <story-notification-demo
          variant="outlined"
          label="success"
          type="success"
          [title]="'Changes saved'"
          message="Your profile has been updated successfully."
        />
        <story-notification-demo
          variant="outlined"
          label="info"
          type="info"
          [title]="'New version available'"
          message="Reload the page to get the latest features."
        />
        <story-notification-demo
          variant="outlined"
          label="warn"
          type="warn"
          [title]="'Storage almost full'"
          message="You have used 90% of your available space."
        />
        <story-notification-demo
          variant="outlined"
          label="error"
          type="error"
          [title]="'Upload failed'"
          message="The file exceeds the 25 MB limit. Try again."
        />
      </div>
    `,
  }),
};

/** Six fixed regions — toasts in the same position stack. */
export const Positions: Story = {
  render: () => ({
    props: { positions: POSITIONS },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        @for (position of positions; track position) {
          <story-notification-demo
            variant="outlined"
            [label]="position"
            [position]="position"
            [title]="'Position: ' + position"
            message="Toasts in the same position stack."
          />
        }
      </div>
    `,
  }),
};

/** `duration: 0` keeps the toast open (and drops the progress bar) until it is closed. */
export const Persistent: Story = {
  args: {
    type: 'info',
    title: 'Stays until closed',
    message: 'This toast has no timer — use the × button to dismiss it.',
    duration: 0,
  },
};
