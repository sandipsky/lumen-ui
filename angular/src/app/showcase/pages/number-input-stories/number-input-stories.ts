import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NumberInput } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-number-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NumberInput, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './number-input-stories.html',
  styleUrl: './number-input-stories.scss',
})
export class NumberInputStories {
  protected readonly quantity = signal<number | null>(1234567.891);
  protected readonly amount = signal<number | null>(1234567);
  protected readonly priceControl = new FormControl<number | null>(null, [Validators.required]);

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered above the field, linked to the input.',
      type: 'string',
      default: "''",
      example: 'label="Quantity"',
    },
    {
      name: 'placeholder',
      description: 'Placeholder shown while the field is empty.',
      type: 'string',
      default: "''",
      example: 'placeholder="0"',
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
      example: 'id="price"',
    },
    {
      name: 'decimalPlaces',
      description:
        '0 forbids decimals (the dot key is blocked); a positive number rounds the value to that many places on blur; left unset, any number of decimals is allowed.',
      type: 'number',
      default: 'unset',
      example: '[decimalPlaces]="2"',
    },
    {
      name: 'prefix',
      description: 'Display-only adornment before the value — never part of the stored number.',
      type: 'string',
      default: "''",
      example: 'prefix="Rs."',
    },
    {
      name: 'suffix',
      description: 'Display-only adornment after the value — never part of the stored number.',
      type: 'string',
      default: "''",
      example: 'suffix="%"',
    },
    {
      name: 'allowNegative',
      description: 'Allow typing negative numbers; off by default (the minus key is blocked).',
      type: 'boolean',
      default: 'false',
      example: '[allowNegative]="true"',
    },
    {
      name: 'allowZero',
      description:
        'Allow a value of 0. On by default; when off, typing a bare 0 is blocked and a 0 value clears to null on blur.',
      type: 'boolean',
      default: 'true',
      example: '[allowZero]="false"',
    },
    {
      name: 'viewMode',
      description: 'Render the value (with prefix/suffix) as plain text instead of the input.',
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description: 'Custom text shown in view mode; falls back to the affixed value when omitted.',
      type: 'string',
      default: '—',
      example: 'viewValue="Rs. 1,500"',
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
      name: 'valueChange',
      description:
        'Emits the parsed numeric value on every change — null while the field is empty or incomplete.',
      type: 'number | null',
      example: '(valueChange)="onValue($event)"',
    },
  ];
}
