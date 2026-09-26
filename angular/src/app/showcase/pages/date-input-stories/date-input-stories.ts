import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DateInput } from '../../../shared/components/ui/input/date-input/date-input';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-date-input-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DateInput, Story, ApiTable, FormsModule, ReactiveFormsModule],
  templateUrl: './date-input-stories.html',
  styleUrl: './date-input-stories.scss',
})
export class DateInputStories {
  protected readonly birthday = signal<Date | null>(null);
  protected readonly bsDate = signal<Date | null>(new Date());
  protected readonly npDate = signal<Date | null>(new Date());
  protected readonly formatted = signal<Date | null>(new Date());
  protected readonly bounded = signal<Date | null>(null);
  protected readonly focusOpened = signal<Date | null>(null);
  protected readonly pickerOnly = signal<Date | null>(null);
  protected readonly noIcon = signal<Date | null>(null);

  /** Booking window for the min/max demo: today through 30 days out. */
  protected readonly today = new Date();
  protected readonly in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  /** Reactive form control with a required validator for the validation demo. */
  protected readonly appointmentControl = new FormControl<Date | null>(null, [Validators.required]);

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Label rendered above the field, linked to the input.',
      type: 'string',
      default: "''",
      example: 'label="Birthday"',
    },
    {
      name: 'placeholder',
      description: 'Placeholder shown while no date is picked.',
      type: 'string',
      default: "'Select date'",
      example: 'placeholder="Pick a date"',
    },
    {
      name: 'disabled',
      description: 'Disable the field — no popup, no typing, reduced opacity.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
    {
      name: 'id',
      description: 'Id for the native input; auto-generated when omitted.',
      type: 'string',
      default: 'auto',
      example: 'id="dob"',
    },
    {
      name: 'calendar',
      description:
        'Calendar system the picker starts in; the AD/BS toggle in the popup footer can switch it later.',
      type: "'ad' | 'bs'",
      default: "'ad'",
      example: 'calendar="bs"',
    },
    {
      name: 'lang',
      description: 'Display language for the BS calendar — np renders Nepali names and digits.',
      type: "'en' | 'np'",
      default: "'en'",
      example: 'lang="np"',
    },
    {
      name: 'format',
      description:
        'Display format applied in the active calendar. Tokens: YYYY YY, M MM MMM MMMM, D DD, d dd ddd.',
      type: 'string',
      default: "'YYYY-MM-DD'",
      example: 'format="DD/MM/YYYY"',
    },
    {
      name: 'min',
      description:
        'Earliest selectable date (inclusive) — earlier days are disabled in the grid and rejected when typed.',
      type: 'Date | string | null',
      default: 'null',
      example: '[min]="today"',
    },
    {
      name: 'max',
      description: 'Latest selectable date (inclusive).',
      type: 'Date | string | null',
      default: 'null',
      example: '[max]="in30Days"',
    },
    {
      name: 'clearable',
      description: 'Show a clear (×) affix while a date is picked.',
      type: 'boolean',
      default: 'true',
      example: '[clearable]="false"',
    },
    {
      name: 'showToday',
      description: 'Show the "Today" shortcut in the popup footer.',
      type: 'boolean',
      default: 'true',
      example: '[showToday]="false"',
    },
    {
      name: 'showCalendarIcon',
      description: 'Show the calendar affix icon.',
      type: 'boolean',
      default: 'true',
      example: '[showCalendarIcon]="false"',
    },
    {
      name: 'openCalendarOnFocus',
      description: 'Open the calendar as soon as the input gains focus (e.g. when tabbing in).',
      type: 'boolean',
      default: 'false',
      example: '[openCalendarOnFocus]="true"',
    },
    {
      name: 'typableDateInput',
      description:
        'Allow editing by typing — only date-shaped text (digits, /, -, space) is accepted. false makes the field picker-only.',
      type: 'boolean',
      default: 'true',
      example: '[typableDateInput]="false"',
    },
    {
      name: 'viewMode',
      description: 'Render the formatted date as plain text instead of the picker.',
      type: 'boolean',
      default: 'false',
      example: '[viewMode]="true"',
    },
    {
      name: 'viewValue',
      description: 'Custom text shown in view mode; falls back to the formatted date when omitted.',
      type: 'string',
      default: '—',
      example: 'viewValue="2 years ago"',
    },
    {
      name: 'useValidation',
      description:
        'Opt the field out of the shared inline validation UI (from the FormValidation host directive).',
      type: 'boolean',
      default: 'true',
      example: 'useValidation="false"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'change',
      description: 'Emits the picked date (local midnight), or null when cleared.',
      type: 'Date | null',
      example: '(change)="onDate($event)"',
    },
    {
      name: 'calendarChange',
      description: 'Emits when the user flips the AD/BS toggle in the popup.',
      type: "'ad' | 'bs'",
      example: '(calendarChange)="onSystem($event)"',
    },
  ];
}
