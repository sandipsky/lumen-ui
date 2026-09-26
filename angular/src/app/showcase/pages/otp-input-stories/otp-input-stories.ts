import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button } from '../../../shared/components/ui/button/button';
import { OtpInput } from '../../../shared/components/ui/input/otp-input/otp-input';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-otp-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OtpInput, Story, Button, ApiTable, FormsModule],
  templateUrl: './otp-input-stories.html',
  styleUrl: './otp-input-stories.scss',
})
export class OtpInputStories {
  protected readonly code = signal('');
  protected readonly pin = signal('');
  protected readonly sized = signal('');

  // Show / hide toggle demo — bind `mask` to a signal.
  protected readonly secret = signal('');
  protected readonly masked = signal(true);

  protected toggleMask(): void {
    this.masked.update((m) => !m);
  }

  protected readonly lastCompleted = signal('');
  protected onCompleted(value: string): void {
    this.lastCompleted.set(value);
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'length',
      description: 'Number of character boxes.',
      type: 'number',
      default: '6',
      example: '[length]="4"',
    },
    {
      name: 'type',
      description: 'number restricts entry to digits; text allows any non-space character.',
      type: "'number' | 'text'",
      default: "'number'",
      example: 'type="text"',
    },
    {
      name: 'mask',
      description: 'Hide the entered characters as dots (PIN mode).',
      type: 'boolean',
      default: 'false',
      example: '[mask]="true"',
    },
    {
      name: 'size',
      description: 'Box size preset.',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      example: 'size="lg"',
    },
    {
      name: 'disabled',
      description: 'Disable all boxes; binding a disabled FormControl does the same.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'error',
      description: 'Paint the boxes in the error color — e.g. after a failed verification.',
      type: 'boolean',
      default: 'false',
      example: '[error]="true"',
    },
    {
      name: 'autoFocus',
      description: 'Focus the first box on render.',
      type: 'boolean',
      default: 'false',
      example: '[autoFocus]="true"',
    },
    {
      name: 'separator',
      description: 'Render a dash between every box, e.g. 123-456.',
      type: 'boolean',
      default: 'false',
      example: '[separator]="true"',
    },
    {
      name: 'ariaLabel',
      description: 'Accessible label for the group of boxes.',
      type: 'string',
      default: "'One-time code'",
      example: 'ariaLabel="PIN"',
    },
    {
      name: 'name',
      description:
        'Base name for the native inputs (each box appends its index); auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'name="otp"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'change',
      description: 'Emits the full concatenated value on every change.',
      type: 'string',
      example: '(change)="onChange($event)"',
    },
    {
      name: 'completed',
      description: 'Emits the value once every box is filled.',
      type: 'string',
      example: '(completed)="verify($event)"',
    },
  ];
}
