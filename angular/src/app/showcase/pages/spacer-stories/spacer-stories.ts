import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { Flex, Spacer } from '../../../shared/components/ui/layout';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-spacer-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Spacer, Flex, Button, Story, ApiTable],
  templateUrl: './spacer-stories.html',
  styleUrl: './spacer-stories.scss',
})
export class SpacerStories {
  protected readonly presets = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'h',
      description:
        'Vertical space — sets the height. Preset (xs 4px, sm 8px, md 16px, lg 24px, xl 32px), a pixel number, or any CSS size.',
      type: "SpacerSize — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string",
      default: '—',
      example: 'h="md"',
    },
    {
      name: 'w',
      description: 'Horizontal space — sets the width. Same values as h.',
      type: "SpacerSize — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string",
      default: '—',
      example: '[w]="24"',
    },
  ];
}
