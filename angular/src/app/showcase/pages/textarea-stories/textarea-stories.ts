import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Textarea } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-textarea-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Textarea, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './textarea-stories.html',
  styleUrl: './textarea-stories.scss',
})
export class TextareaStories {
  protected readonly ngModelValue = signal('');
  protected readonly viewModeValue = 'First line.\nSecond line.';
  protected readonly bioControl = new FormControl('', [
    Validators.required,
    Validators.minLength(10),
  ]);

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered above the field, linked to the textarea.',
      type: 'string',
      default: "''",
      example: 'label="Message"',
    },
    {
      name: 'placeholder',
      description: 'Placeholder shown while the field is empty.',
      type: 'string',
      default: "''",
      example: 'placeholder="Write something…"',
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
      description: 'Id for the native textarea; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="bio"',
    },
    {
      name: 'rows',
      description: 'Visible rows before the field scrolls.',
      type: 'number',
      default: '4',
      example: '[rows]="8"',
    },
    {
      name: 'resizable',
      description: 'Show the drag-to-resize handle (vertical only).',
      type: 'boolean',
      default: 'false',
      example: '[resizable]="true"',
    },
    {
      name: 'viewMode',
      description:
        'Render the value as plain text (line breaks preserved) instead of the textarea.',
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description: 'Custom text shown in view mode; falls back to the value when omitted.',
      type: 'string',
      default: '—',
      example: 'viewValue="(redacted)"',
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
      description: 'Emits when Enter is pressed (a newline is still inserted).',
      type: 'KeyboardEvent',
      example: '(enter)="onEnter($event)"',
    },
  ];
}
