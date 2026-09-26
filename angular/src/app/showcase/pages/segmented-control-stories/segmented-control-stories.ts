import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  SegmentedControl,
  SegmentedOption,
} from '../../../shared/components/ui/segmented-control/segmented-control';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-segmented-control-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SegmentedControl, Story, ApiTable, FormsModule],
  templateUrl: './segmented-control-stories.html',
  styleUrl: './segmented-control-stories.scss',
})
export class SegmentedControlStories {
  protected readonly ranges = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  protected readonly range = signal<string>('Daily');

  protected readonly view = signal<string>('list');
  protected readonly viewOptions: SegmentedOption[] = [
    { label: 'List', value: 'list' },
    { label: 'Board', value: 'board' },
    { label: 'Calendar', value: 'calendar' },
    { label: 'Timeline', value: 'timeline', disabled: true },
  ];

  protected readonly size = signal<string>('md');
  protected readonly sizes = ['sm', 'md', 'lg'];

  protected readonly plan = signal<string>('pro');
  protected readonly plans = ['Free', 'Pro', 'Team'];

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'options',
      description: 'Options to choose from — plain strings or { label, value, disabled } objects.',
      type: '(string | SegmentedOption)[]',
      default: '[]',
      example: '[options]="ranges"',
    },
    {
      name: 'orientation',
      description: 'Lay segments out in a row or a column; arrow-key navigation follows the axis.',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      example: 'orientation="vertical"',
    },
    {
      name: 'size',
      description: 'Control size.',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      example: 'size="lg"',
    },
    {
      name: 'disabled',
      description:
        "Disable the whole control; a single segment can be disabled via its option's disabled flag.",
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'fullWidth',
      description: 'Stretch to the container width with equal-width segments.',
      type: 'boolean',
      default: 'false',
      example: '[fullWidth]="true"',
    },
    {
      name: 'name',
      description: 'Group name for the control; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'name="view"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'change',
      description: 'Emits the selected value when it changes.',
      type: 'unknown',
      example: '(change)="onRange($event)"',
    },
  ];
}
