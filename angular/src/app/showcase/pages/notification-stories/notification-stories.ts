import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  Button,
  Toggle,
  NotificationPosition,
  NotificationType,
  NotificationService,
} from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

const SAMPLES: Record<NotificationType, { title: string; message: string }> = {
  success: { title: 'Changes saved', message: 'Your profile has been updated successfully.' },
  info: { title: 'We notify you that', message: 'You are now obligated to give a star on GitHub.' },
  warn: { title: 'Storage almost full', message: 'You have used 90% of your available space.' },
  error: { title: 'Upload failed', message: 'The file exceeds the 25 MB limit. Try again.' },
};

@Component({
  selector: 'app-notification-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Toggle, Story, FormsModule, ApiTable],
  templateUrl: './notification-stories.html',
  styleUrl: './notification-stories.scss',
})
export class NotificationStories {
  private readonly _notify = inject(NotificationService);

  protected readonly types: NotificationType[] = ['success', 'info', 'warn', 'error'];
  protected readonly positions: NotificationPosition[] = [
    'top',
    'topLeft',
    'topRight',
    'bottom',
    'bottomLeft',
    'bottomRight',
  ];

  protected readonly position = signal<NotificationPosition>('topRight');
  protected readonly pauseOnHover = signal(true);
  protected readonly showProgress = signal(true);
  protected readonly showClose = signal(true);
  protected readonly withIcon = signal(true);
  protected readonly duration = signal(4000);

  protected readonly apiOptions: ApiTableRow[] = [
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

  protected readonly apiMethods: ApiTableRow[] = [
    {
      name: 'NotificationService.show',
      description: 'Show a toast built from a full options object; returns a NotificationRef.',
      type: 'show(options): NotificationRef',
      example: "notify.show({ type: 'error', title: 'Failed' })",
    },
    {
      name: 'NotificationService.success / error / warn / info',
      description:
        'Per-type shortcuts for show() — pass the title, an optional message, and any extra options.',
      type: '(title, message?, options?): NotificationRef',
      example: "notify.success('Saved', 'Your changes are live.')",
    },
    {
      name: 'NotificationService.clear',
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

  protected fire(type: NotificationType): void {
    const sample = SAMPLES[type];
    this._notify.show({
      type,
      title: sample.title,
      message: sample.message,
      position: this.position(),
      pauseOnHover: this.pauseOnHover(),
      showProgress: this.showProgress(),
      showClose: this.showClose(),
      withIcon: this.withIcon(),
      duration: this.duration(),
    });
  }

  protected setPosition(position: NotificationPosition): void {
    this.position.set(position);
  }

  protected clearAll(): void {
    this._notify.clear();
  }
}
