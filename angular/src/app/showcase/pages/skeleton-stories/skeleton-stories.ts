import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button, Skeleton } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-skeleton-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Skeleton, Button, Story, ApiTable],
  templateUrl: './skeleton-stories.html',
  styleUrl: './skeleton-stories.scss',
})
export class SkeletonStories {
  protected readonly loading = signal(true);

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'width',
      description: 'Width as any CSS length; ignored when circle is set (width follows height).',
      type: 'string',
      default: "'100%'",
      example: 'width="60%"',
    },
    {
      name: 'height',
      description: 'Height as any CSS length — required for standalone blocks and for circle.',
      type: 'string',
      example: 'height="1rem"',
    },
    {
      name: 'radius',
      description: 'Corner radius (any CSS length); overridden to 50% when circle is set.',
      type: 'string',
      default: "'8px'",
      example: 'radius="20px"',
    },
    {
      name: 'circle',
      description: 'Render a circle: the width follows height and the radius becomes 50%.',
      type: 'boolean',
      default: 'false',
      example: '[circle]="true"',
    },
    {
      name: 'animate',
      description: 'Play the pulsing animation.',
      type: 'boolean',
      default: 'true',
      example: '[animate]="false"',
    },
    {
      name: 'visible',
      description: 'Show the skeleton overlay (true) or reveal the projected content (false).',
      type: 'boolean',
      default: 'true',
      example: '[visible]="loading()"',
    },
  ];

  protected toggleLoading(): void {
    this.loading.update((v) => !v);
  }
}
