import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Button, TextInput, Step, Stepper } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-stepper-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Stepper, Story, Button, TextInput, FormsModule, ApiTable],
  templateUrl: './stepper-stories.html',
  styleUrl: './stepper-stories.scss',
})
export class StepperStories {
  protected readonly basicSteps: Step[] = [
    { title: 'First step', description: 'Create an account' },
    { title: 'Second step', description: 'Verify email' },
    { title: 'Final step', description: 'Get full access' },
  ];

  protected readonly errorSteps: Step[] = [
    { title: 'Shipping', description: 'Address confirmed' },
    { title: 'Payment', description: 'Card was declined', error: true },
    { title: 'Confirm', description: 'Place the order' },
  ];

  protected readonly iconSteps: Step[] = [
    { title: 'Cart', icon: '🛒' },
    { title: 'Address', icon: '📦' },
    { title: 'Payment', icon: '💳' },
    { title: 'Complete', icon: '🎉' },
  ];

  // ── Clickable ──────────────────────────────────────────────────
  protected readonly current = signal(1);

  // ── External button control ────────────────────────────────────
  protected readonly wizardSteps: Step[] = [
    { title: 'Details', description: 'Your information' },
    { title: 'Address', description: 'Where to ship' },
    { title: 'Payment', description: 'How you pay' },
    { title: 'Review', description: 'Confirm & submit' },
  ];
  protected readonly wizardStep = signal(0);

  protected next(): void {
    this.wizardStep.update((i) => Math.min(this.wizardSteps.length - 1, i + 1));
  }
  protected back(): void {
    this.wizardStep.update((i) => Math.max(0, i - 1));
  }

  // ── Form validation ────────────────────────────────────────────
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly username = signal('');
  protected readonly formStep = signal(0);
  private readonly _attempted = signal<ReadonlySet<number>>(new Set());

  private readonly _emailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email()));

  private _isStepValid(index: number): boolean {
    if (index === 0) return this.name().trim().length > 0 && this._emailValid();
    if (index === 1) return this.username().trim().length >= 3;
    return true;
  }

  protected readonly formSteps = computed<Step[]>(() => {
    const attempted = this._attempted();
    return [
      {
        title: 'Account',
        description: 'Name & email',
        error: attempted.has(0) && !this._isStepValid(0),
      },
      {
        title: 'Profile',
        description: 'Pick a username',
        error: attempted.has(1) && !this._isStepValid(1),
      },
      { title: 'Done', description: 'All set 🎉' },
    ];
  });

  protected formNext(): void {
    const index = this.formStep();
    if (!this._isStepValid(index)) {
      this._attempted.update((prev) => new Set(prev).add(index));
      return;
    }
    this.formStep.update((i) => Math.min(this.formSteps().length - 1, i + 1));
  }

  protected formBack(): void {
    this.formStep.update((i) => Math.max(0, i - 1));
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'steps',
      description: 'The ordered steps to render.',
      type: 'Step[]',
      default: '[]',
      example: '[steps]="steps"',
    },
    {
      name: 'active',
      description: 'Index of the current step — two-way for click- or button-driven control.',
      type: 'number',
      default: '0',
      example: '[(active)]="current"',
    },
    {
      name: 'orientation',
      description: 'Lay the steps out in a row or stacked vertically.',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      example: 'orientation="vertical"',
    },
    {
      name: 'showLines',
      description: 'Show the connecting rails between steps. Steps stay spaced either way.',
      type: 'boolean',
      default: 'true',
      example: '[showLines]="false"',
    },
    {
      name: 'clickable',
      description: 'Allow the user to click a step to jump to it.',
      type: 'boolean',
      default: 'false',
      example: '[clickable]="true"',
    },
    {
      name: 'allowStepSkip',
      description:
        'When clickable, also allow selecting steps ahead of the active one (skip forward).',
      type: 'boolean',
      default: 'false',
      example: '[allowStepSkip]="true"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'stepChange',
      description: 'Emits the target index when a step is selected (only fires when selectable).',
      type: 'number',
      example: '(stepChange)="onStep($event)"',
    },
  ];
}
