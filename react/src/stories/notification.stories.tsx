import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  LUIButton,
  useLUINotification,
  type NotificationOptions,
  type NotificationPosition,
} from '@lumen-ui/react';

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
  parameters: {
    docs: {
      description: {
        component:
          'Imperative toasts via the `useLUINotification()` hook (needs `<LUIProvider>` or ' +
          '`<LUINotificationProvider>` above it): `show(options)` or a type shortcut — ' +
          '`success / error / warn / info(title, message?, options?)`. Each call returns a ' +
          '`NotificationRef` (`dismiss()`); `clear()` dismisses them all. The controls are the ' +
          '`NotificationOptions` — click the button to show a toast with them.',
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
  render: function Render(args) {
    const notify = useLUINotification();
    return <LUIButton onClick={() => notify.show(args)}>Show notification</LUIButton>;
  },
};

export default meta;
type Story = StoryObj<NotificationOptions>;

/** Every `NotificationOptions` field is wired to a control — set them, then fire a toast. */
export const Playground: Story = {};

/** `success`, `info`, `warn` and `error` — each with its own color and icon. */
export const Types: Story = {
  render: function Render() {
    const notify = useLUINotification();
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <LUIButton
          variant="outlined"
          onClick={() =>
            notify.success('Changes saved', 'Your profile has been updated successfully.')
          }
        >
          success
        </LUIButton>
        <LUIButton
          variant="outlined"
          onClick={() =>
            notify.info('New version available', 'Reload the page to get the latest features.')
          }
        >
          info
        </LUIButton>
        <LUIButton
          variant="outlined"
          onClick={() =>
            notify.warn('Storage almost full', 'You have used 90% of your available space.')
          }
        >
          warn
        </LUIButton>
        <LUIButton
          variant="outlined"
          onClick={() =>
            notify.error('Upload failed', 'The file exceeds the 25 MB limit. Try again.')
          }
        >
          error
        </LUIButton>
      </div>
    );
  },
};

/** Six fixed regions — toasts in the same position stack. */
export const Positions: Story = {
  render: function Render() {
    const notify = useLUINotification();
    return (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {POSITIONS.map((position) => (
          <LUIButton
            key={position}
            variant="outlined"
            onClick={() =>
              notify.info(`Position: ${position}`, 'Toasts in the same position stack.', {
                position,
              })
            }
          >
            {position}
          </LUIButton>
        ))}
      </div>
    );
  },
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
