import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import { LUIToggle } from '../../../components/ui/input/toggle/toggle';
import {
  useLUINotification,
  type NotificationPosition,
  type NotificationType,
} from '../../../components/ui/notification/notification';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './notification-stories.css';

const SAMPLES: Record<NotificationType, { title: string; message: string }> = {
  success: { title: 'Changes saved', message: 'Your profile has been updated successfully.' },
  info: { title: 'We notify you that', message: 'You are now obligated to give a star on GitHub.' },
  warn: { title: 'Storage almost full', message: 'You have used 90% of your available space.' },
  error: { title: 'Upload failed', message: 'The file exceeds the 25 MB limit. Try again.' },
};

const TYPES: NotificationType[] = ['success', 'info', 'warn', 'error'];

const POSITIONS: NotificationPosition[] = [
  'top',
  'topLeft',
  'topRight',
  'bottom',
  'bottomLeft',
  'bottomRight',
];

const apiOptions: ApiTableRow[] = [
  {
    name: 'type',
    description: 'Visual style and icon of the toast.',
    type: "'success' | 'warn' | 'error' | 'info'",
    default: "'info'",
    example: "type: 'success'",
  },
  {
    name: 'title',
    description: 'Heading line of the toast.',
    type: 'string',
    example: "title: 'Changes saved'",
  },
  {
    name: 'message',
    description: 'Body text shown under the title.',
    type: 'string',
    example: "message: 'Your profile is up to date.'",
  },
  {
    name: 'duration',
    description: 'Auto-dismiss delay in ms; 0 keeps it open until dismissed manually.',
    type: 'number',
    default: '4000',
    example: 'duration: 0',
  },
  {
    name: 'position',
    description: 'Viewport edge/corner the toast stacks in.',
    type: "'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight'",
    default: "'topRight'",
    example: "position: 'bottomRight'",
  },
  {
    name: 'pauseOnHover',
    description: 'Pause the dismiss timer (and progress bar) while hovered.',
    type: 'boolean',
    default: 'true',
    example: 'pauseOnHover: false',
  },
  {
    name: 'showProgress',
    description: 'Render the shrinking progress bar that tracks the dismiss timer.',
    type: 'boolean',
    default: 'true',
    example: 'showProgress: false',
  },
  {
    name: 'showClose',
    description: 'Render the × close button.',
    type: 'boolean',
    default: 'true',
    example: 'showClose: false',
  },
  {
    name: 'withIcon',
    description: 'Render the leading type icon.',
    type: 'boolean',
    default: 'true',
    example: 'withIcon: false',
  },
];

const apiMethods: ApiTableRow[] = [
  {
    name: 'show',
    description: 'Show a toast built from a full options object; returns a NotificationRef.',
    type: 'show(options): NotificationRef',
    example: "notify.show({ type: 'error', title: 'Failed' })",
  },
  {
    name: 'success / error / warn / info',
    description:
      'Per-type shortcuts for show() — pass the title, an optional message, and any extra options.',
    type: '(title, message?, options?): NotificationRef',
    example: "notify.success('Saved', 'Your changes are live.')",
  },
  {
    name: 'clear',
    description: 'Dismiss every open notification.',
    type: 'clear(): void',
    example: 'notify.clear()',
  },
  {
    name: 'NotificationRef.dismiss',
    description: 'Begin dismissing this notification (plays the leave animation).',
    type: 'dismiss(): void',
    example: 'ref.dismiss()',
  },
];

export default function NotificationStories() {
  const notify = useLUINotification();

  const [position, setPosition] = useState<NotificationPosition>('topRight');
  const [pauseOnHover, setPauseOnHover] = useState(true);
  const [showProgress, setShowProgress] = useState(true);
  const [showClose, setShowClose] = useState(true);
  const [withIcon, setWithIcon] = useState(true);
  const [duration, setDuration] = useState(4000);

  const fire = (type: NotificationType): void => {
    const sample = SAMPLES[type];
    notify.show({
      type,
      title: sample.title,
      message: sample.message,
      position,
      pauseOnHover,
      showProgress,
      showClose,
      withIcon,
      duration,
    });
  };

  return (
    <div className="story-page notification-stories">
      <header className="page-header">
        <h1 className="page-header__title">Notification</h1>
        <p className="page-header__lead">
          Imperative toasts opened through the <code>useLUINotification()</code> hook, mirroring the
          modal service. Four types (<code>success</code>, <code>info</code>, <code>warn</code>,{' '}
          <code>error</code>), six positions, an auto-dismiss <code>duration</code> with an optional
          shrinking <code>showProgress</code> bar that <code>pauseOnHover</code> freezes, plus{' '}
          <code>showClose</code> and <code>withIcon</code> toggles. Tune the options below, then fire
          one.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Playground"
          description="Adjust the options, pick a position, then fire a notification of each type."
          code={`const notify = useLUINotification();

notify.success('Changes saved', 'Your profile has been updated.');
notify.show({
  type: 'info',
  title: 'Heads up',
  message: '…',
  position: 'topRight',
  duration: 4000,
  pauseOnHover: true,
  showProgress: true,
  showClose: true,
  withIcon: true,
});`}
        >
          <div className="playground">
            <div className="control-group">
              <span className="control-group__label">Position</span>
              <div className="control-grid">
                {POSITIONS.map((pos) => (
                  <LUIButton
                    key={pos}
                    variant={position === pos ? 'primary' : 'outlined'}
                    onClick={() => setPosition(pos)}
                  >
                    {pos}
                  </LUIButton>
                ))}
              </div>
            </div>

            <div className="control-group">
              <span className="control-group__label">Duration</span>
              <div className="demo-row">
                <LUIButton
                  variant={duration === 2000 ? 'primary' : 'outlined'}
                  onClick={() => setDuration(2000)}
                >
                  2s
                </LUIButton>
                <LUIButton
                  variant={duration === 4000 ? 'primary' : 'outlined'}
                  onClick={() => setDuration(4000)}
                >
                  4s
                </LUIButton>
                <LUIButton
                  variant={duration === 0 ? 'primary' : 'outlined'}
                  onClick={() => setDuration(0)}
                >
                  Persist
                </LUIButton>
              </div>
            </div>

            <div className="control-group">
              <span className="control-group__label">Options</span>
              <div className="demo-row demo-row--wrap">
                <LUIToggle
                  label="Pause on hover"
                  checked={pauseOnHover}
                  onChange={(e) => setPauseOnHover(e.target.checked)}
                />
                <LUIToggle
                  label="Show progress"
                  checked={showProgress}
                  onChange={(e) => setShowProgress(e.target.checked)}
                />
                <LUIToggle
                  label="Show close"
                  checked={showClose}
                  onChange={(e) => setShowClose(e.target.checked)}
                />
                <LUIToggle
                  label="With icon"
                  checked={withIcon}
                  onChange={(e) => setWithIcon(e.target.checked)}
                />
              </div>
            </div>

            <div className="control-group">
              <span className="control-group__label">Fire</span>
              <div className="demo-row">
                {TYPES.map((type) => (
                  <LUIButton key={type} variant="outlined" onClick={() => fire(type)}>
                    {type}
                  </LUIButton>
                ))}
                <LUIButton variant="secondary" onClick={() => notify.clear()}>
                  Clear all
                </LUIButton>
              </div>
            </div>
          </div>
        </Story>

        <ApiTable
          component="useLUINotification() (NotificationOptions)"
          note="Hook-based — call useLUINotification() (requires LUINotificationProvider near the app root) and call show(options) or a type shortcut (success / error / warn / info); every call returns a NotificationRef. Options merge over the defaults shown below."
          inputsTitle="NotificationOptions"
          inputs={apiOptions}
        />

        <ApiTable
          component="useLUINotification() / NotificationRef"
          note="Public methods on the hook's API and on the NotificationRef handle returned by every call."
          inputsTitle="Methods"
          inputs={apiMethods}
        />
      </div>
    </div>
  );
}
