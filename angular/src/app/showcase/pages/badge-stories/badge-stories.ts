import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { BadgeDirective, Button } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-badge-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BadgeDirective, Button, Story, ApiTable],
  templateUrl: './badge-stories.html',
  styleUrl: './badge-stories.scss',
})
export class BadgeStories {
  protected readonly count = signal(3);
  protected readonly lastClick = signal('—');

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'lBadge',
      description: 'The count to display. Hidden at 0 unless lBadgeShowZero is set.',
      type: 'number | null',
      default: 'null',
      example: '[lBadge]="unread()"',
    },
    {
      name: 'lBadgeColor',
      description: 'Any CSS color or token; defaults to the badge red shade.',
      type: 'string',
      default: "''",
      example: 'lBadgeColor="var(--accent)"',
    },
    {
      name: 'lBadgeSize',
      description: 'Size of the badge bubble.',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      example: 'lBadgeSize="lg"',
    },
    {
      name: 'lBadgeOverflowCount',
      description: 'Show N+ once the count passes this threshold.',
      type: 'number',
      default: '99',
      example: '[lBadgeOverflowCount]="999"',
    },
    {
      name: 'lBadgeShowZero',
      description: 'Keep the badge visible when the count is 0.',
      type: 'boolean',
      default: 'false',
      example: '[lBadgeShowZero]="true"',
    },
    {
      name: 'lBadgeDynamic',
      description: 'Play a pop animation whenever the count changes.',
      type: 'boolean',
      default: 'false',
      example: '[lBadgeDynamic]="true"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'lBadgeClick',
      description: "Emits when the badge bubble is clicked, without triggering the host's click.",
      type: 'MouseEvent',
      example: '(lBadgeClick)="onBadgeClick()"',
    },
  ];

  protected inc(): void {
    this.count.update((c) => c + 1);
  }

  protected dec(): void {
    this.count.update((c) => Math.max(0, c - 1));
  }

  protected onBadgeClick(): void {
    this.lastClick.set(new Date().toLocaleTimeString());
  }
}
