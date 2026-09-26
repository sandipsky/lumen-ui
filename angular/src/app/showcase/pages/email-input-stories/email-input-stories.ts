import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmailInput } from '../../../shared/components/ui/input/email-input/email-input';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-email-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [EmailInput, Story, ApiTable, FormsModule, ReactiveFormsModule, JsonPipe],
  templateUrl: './email-input-stories.html',
  styleUrl: './email-input-stories.scss',
})
export class EmailInputStories {
  protected readonly ngModelValue = signal('');
  protected readonly emailControl = new FormControl('', [Validators.required]);

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered above the field, linked to the input.',
      type: 'string',
      default: "''",
      example: 'label="Email"',
    },
    {
      name: 'placeholder',
      description: 'Placeholder shown while the field is empty.',
      type: 'string',
      default: "''",
      example: 'placeholder="you@example.com"',
    },
    {
      name: 'disabled',
      description: 'Disable the field; binding a disabled FormControl does the same.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'id',
      description: 'Id for the native input; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="email"',
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
      example: 'viewValue="jane (at) example.com"',
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
