import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Toggle } from '../../../shared/components/ui/input/toggle/toggle';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-toggle-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Toggle, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './toggle-stories.html',
  styleUrl: './toggle-stories.scss',
})
export class ToggleStories {
  protected readonly ngModelValue = signal(true);
  protected readonly notificationsControl = new FormControl(false);

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered beside the switch.',
      type: 'string',
      default: "''",
      example: 'label="Wi-Fi"',
    },
    {
      name: 'disabled',
      description: 'Disable the switch — non-interactive, reduced opacity.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'id',
      description: 'Id for the native input; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="wifi"',
    },
    {
      name: 'labelPosition',
      description: 'Where the label sits relative to the control.',
      type: "'left' | 'right' | 'top'",
      default: "'right'",
      example: 'labelPosition="left"',
    },
    {
      name: 'viewMode',
      description: 'Render the state as plain "Yes"/"No" text instead of the switch.',
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description: 'Custom text shown in view mode; falls back to "Yes"/"No" when omitted.',
      type: 'string',
      default: '—',
      example: 'viewValue="Enabled"',
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
      description: 'Emits the new checked state whenever the user toggles the switch.',
      type: 'boolean',
      example: '(change)="onToggle($event)"',
    },
  ];
}
