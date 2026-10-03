import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button, EmailInput, PasswordInput, TextInput } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-form-validation-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextInput, EmailInput, PasswordInput, Button, Story, ReactiveFormsModule, ApiTable],
  templateUrl: './form-validation-stories.html',
  styleUrl: './form-validation-stories.scss',
})
export class FormValidationStories {
  /** Single-field demo: required + minimum length. */
  protected readonly nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  /** Opt-out demo: required, but the inline UI is suppressed. */
  protected readonly quietControl = new FormControl('', [Validators.required]);

  /** Full-form demo — errors surface on submit via `markAllAsTouched()`. */
  protected readonly signupForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  protected readonly submittedValue = signal<string>('—');

  protected submit(): void {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      this.submittedValue.set('Form is invalid — fix the highlighted fields.');
      return;
    }
    this.submittedValue.set(JSON.stringify(this.signupForm.getRawValue(), null, 2));
  }

  protected reset(): void {
    this.signupForm.reset();
    this.submittedValue.set('—');
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'useValidation',
      description: 'Set to false to opt a single field out of the inline validation UI.',
      type: 'boolean',
      default: 'true',
      example: '[useValidation]="false"',
    },
  ];
}
