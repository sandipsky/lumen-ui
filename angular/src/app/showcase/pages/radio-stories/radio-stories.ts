import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Radio } from '../../../shared/components/ui/input/radio/radio';
import { RadioOption } from '../../../shared/components/ui/input/input';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-radio-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Radio, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './radio-stories.html',
  styleUrl: './radio-stories.scss',
})
export class RadioStories {
  protected readonly plans: RadioOption[] = [
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
  ];

  protected readonly ngModelValue = signal('pro');
  protected readonly planControl = new FormControl('free');

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Optional group label rendered above the options.',
      type: 'string',
      default: "''",
      example: 'label="Plan"',
    },
    {
      name: 'options',
      description: 'Options to render — one radio per { label, value, disabled? } entry.',
      type: 'RadioOption[]',
      default: '[]',
      example: '[options]="plans"',
    },
    {
      name: 'name',
      description:
        'Native name shared across the group so only one option can be selected; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'name="plan"',
    },
    {
      name: 'disabled',
      description:
        "Disable the whole group; a single entry can be disabled via its option's disabled flag.",
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'labelPosition',
      description: 'Where each option label sits relative to its control.',
      type: "'left' | 'right' | 'top'",
      default: "'right'",
      example: 'labelPosition="left"',
    },
    {
      name: 'viewMode',
      description: "Render the selected option's label as plain text instead of the radio group.",
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description:
        "Custom text shown in view mode; falls back to the selected option's label when omitted.",
      type: 'string',
      default: '—',
      example: 'viewValue="Pro (yearly)"',
    },
    {
      name: 'orientation',
      description: 'inline lays options out in a row; stacked in a column.',
      type: "'inline' | 'stacked'",
      default: "'inline'",
      example: 'orientation="stacked"',
    },
    {
      name: 'useValidation',
      description:
        'Opt the field out of the shared inline validation UI (FormValidation host directive).',
      type: 'boolean',
      default: 'true',
      example: 'useValidation="false"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'change',
      description: "Emits the selected option's value when the selection changes.",
      type: 'unknown',
      example: '(change)="onPlan($event)"',
    },
  ];
}
