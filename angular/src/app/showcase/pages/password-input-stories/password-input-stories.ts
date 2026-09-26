import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordInput } from '../../../shared/components/ui/input/password-input/password-input';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-password-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [PasswordInput, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './password-input-stories.html',
  styleUrl: './password-input-stories.scss',
})
export class PasswordInputStories {
  protected readonly ngModelValue = signal('');
  protected readonly passwordControl = new FormControl('');

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered above the field, linked to the input.',
      type: 'string',
      default: "''",
      example: 'label="Password"',
    },
    {
      name: 'placeholder',
      description: 'Placeholder shown while the field is empty.',
      type: 'string',
      default: "''",
      example: 'placeholder="Enter your password"',
    },
    {
      name: 'disabled',
      description:
        'Disable the field and the visibility toggle; a disabled FormControl does the same.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'id',
      description: 'Id for the native input; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="password"',
    },
    {
      name: 'showRules',
      description: 'Show the live-validating password-requirements checklist below the field.',
      type: 'boolean',
      default: 'false',
      example: '[showRules]="true"',
    },
    {
      name: 'viewMode',
      description: 'Render the value as plain text instead of the input.',
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description: 'Custom text shown in view mode; falls back to the value when omitted.',
      type: 'string',
      default: '—',
      example: 'viewValue="••••••••"',
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
      name: 'input',
      description: 'Emits the native input event on every keystroke.',
      type: 'Event',
      example: '(input)="onInput($event)"',
    },
    {
      name: 'change',
      description: 'Re-emits the native change event when the value is committed (on blur).',
      type: 'Event',
      example: '(change)="onChange($event)"',
    },
    {
      name: 'keyup',
      description: 'Re-emits the native keyup event.',
      type: 'KeyboardEvent',
      example: '(keyup)="onKeyup($event)"',
    },
    {
      name: 'keydown',
      description: 'Re-emits the native keydown event.',
      type: 'KeyboardEvent',
      example: '(keydown)="onKeydown($event)"',
    },
    {
      name: 'keypress',
      description: 'Re-emits the native keypress event.',
      type: 'KeyboardEvent',
      example: '(keypress)="onKeypress($event)"',
    },
    {
      name: 'enter',
      description: 'Emits when Enter is pressed in the field.',
      type: 'KeyboardEvent',
      example: '(enter)="onEnter($event)"',
    },
  ];
}
