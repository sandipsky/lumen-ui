import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button, Card, CardPadding, CardShadow, Chip } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-card-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Card, Chip, Button, Story, ApiTable],
  templateUrl: './card-stories.html',
  styleUrl: './card-stories.scss',
})
export class CardStories {
  protected readonly paddings: CardPadding[] = ['none', 'sm', 'md', 'lg'];
  protected readonly shadows: CardShadow[] = ['none', 'sm', 'md', 'lg'];

  protected readonly clicks = signal(0);

  // Kept in TS: `{{ }}` inside a template attribute would be parsed as interpolation.
  protected readonly hoverableCode = `<l-card [hoverable]="true" title="Quarterly report" (click)="open()">
  <l-chip card-extra variant="success" [dot]="true">Ready</l-chip>
  Click anywhere on the card to open it.
  <span card-footer>Opened {{ clicks() }} times</span>
</l-card>`;

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'variant',
      description: 'Surface tint — dark uses the darker section background.',
      type: "'default' | 'dark'",
      default: "'default'",
      example: 'variant="dark"',
    },
    {
      name: 'padding',
      description: 'Inner padding of each region: none 0, sm 8, md 12, lg 20 (px).',
      type: "'none' | 'sm' | 'md' | 'lg'",
      default: "'md'",
      example: 'padding="lg"',
    },
    {
      name: 'shadow',
      description: 'Drop-shadow strength.',
      type: "'none' | 'sm' | 'md' | 'lg'",
      default: "'none'",
      example: 'shadow="sm"',
    },
    {
      name: 'bordered',
      description: 'Show the 1px border around the card.',
      type: 'boolean',
      default: 'true',
      example: '[bordered]="false"',
    },
    {
      name: 'hoverable',
      description: 'Lift the card and add a shadow on hover — for clickable cards.',
      type: 'boolean',
      default: 'false',
      example: '[hoverable]="true"',
    },
    {
      name: 'title',
      description:
        'Header title, rendered on the left. Adding it (or [card-extra] content) shows the header.',
      type: 'string',
      default: "''",
      example: 'title="Project settings"',
    },
    {
      name: '[card-extra]',
      description: 'Content slot — header content rendered on the right (actions, links).',
      type: 'content slot',
      example: '<l-button card-extra size="sm">Edit</l-button>',
    },
    {
      name: '[card-footer]',
      description: 'Content slot — footer content, separated from the body by a divider.',
      type: 'content slot',
      example: '<span card-footer>Updated 2 days ago</span>',
    },
  ];
}
