import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Button } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-button-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Story, ApiTable],
  templateUrl: './button-stories.html',
  styleUrl: './button-stories.scss',
})
export class ButtonStories {
  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'variant',
      description: 'Visual style of the button.',
      type: "'primary' | 'secondary' | 'outlined' | 'outlined-primary' | 'danger' | 'ghost'",
      default: "'primary'",
      example: 'variant="ghost"',
    },
    {
      name: 'size',
      description: 'Padding scale — sm 4×8, md 6×12, lg 8×16 (px).',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      example: 'size="lg"',
    },
    {
      name: 'width',
      description: 'auto fits the content, full fills the parent width.',
      type: "'auto' | 'full'",
      default: "'auto'",
      example: 'width="full"',
    },
    {
      name: 'rounded',
      description: 'Render as a circular icon button.',
      type: 'boolean',
      default: 'false',
      example: '[rounded]="true"',
    },
    {
      name: 'disabled',
      description: 'Disable the underlying native button.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
  ];
}
