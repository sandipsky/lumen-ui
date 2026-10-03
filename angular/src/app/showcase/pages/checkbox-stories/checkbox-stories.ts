import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Checkbox } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-checkbox-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Checkbox, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox-stories.html',
  styleUrl: './checkbox-stories.scss',
})
export class CheckboxStories {
  protected readonly ngModelValue = signal(false);
  protected readonly termsControl = new FormControl(false, [Validators.requiredTrue]);

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered beside the box.',
      type: 'string',
      default: "''",
      example: 'label="Remember me"',
    },
    {
      name: 'disabled',
      description: 'Disable the checkbox — non-interactive, reduced opacity.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'id',
      description: 'Id for the native input; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="terms"',
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
      description: 'Render the state as plain "Yes"/"No" text instead of the box.',
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description: 'Custom text shown in view mode; falls back to "Yes"/"No" when omitted.',
      type: 'string',
      default: '—',
      example: 'viewValue="Agreed"',
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
      description: 'Emits the new checked state whenever the box is toggled.',
      type: 'boolean',
      example: '(change)="onChecked($event)"',
    },
  ];
}
