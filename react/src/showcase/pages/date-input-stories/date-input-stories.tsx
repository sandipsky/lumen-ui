import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { LUIDateInput } from '../../../components/ui/input/date-input/date-input';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './date-input-stories.css';

const apiInputs: ApiTableRow[] = [
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
    example: 'disabled',
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
    example: 'min={today}',
  },
  {
    name: 'max',
    description: 'Latest selectable date (inclusive).',
    type: 'Date | string | null',
    default: 'null',
    example: 'max={in30Days}',
  },
  {
    name: 'clearable',
    description: 'Show a clear (×) affix while a date is picked.',
    type: 'boolean',
    default: 'true',
    example: 'clearable={false}',
  },
  {
    name: 'showToday',
    description: 'Show the "Today" shortcut in the popup footer.',
    type: 'boolean',
    default: 'true',
    example: 'showToday={false}',
  },
  {
    name: 'showCalendarIcon',
    description: 'Show the calendar affix icon.',
    type: 'boolean',
    default: 'true',
    example: 'showCalendarIcon={false}',
  },
  {
    name: 'openCalendarOnFocus',
    description: 'Open the calendar as soon as the input gains focus (e.g. when tabbing in).',
    type: 'boolean',
    default: 'false',
    example: 'openCalendarOnFocus',
  },
  {
    name: 'typableDateInput',
    description:
      'Allow editing by typing — only date-shaped text (digits, /, -, space) is accepted. false makes the field picker-only.',
    type: 'boolean',
    default: 'true',
    example: 'typableDateInput={false}',
  },
  {
    name: 'value',
    description:
      'Controlled value — always a JS Date (local midnight), regardless of the calendar displayed. ISO strings are also accepted and normalized.',
    type: 'Date | string | null',
    default: 'null',
    example: 'value={birthday}',
  },
  {
    name: 'viewMode',
    description: 'Render the formatted date as plain text instead of the picker.',
    type: 'boolean',
    default: 'false',
    example: 'viewMode',
  },
  {
    name: 'viewValue',
    description: 'Custom content shown in view mode; falls back to the formatted date when omitted.',
    type: 'ReactNode',
    default: '—',
    example: 'viewValue="2 years ago"',
  },
  {
    name: 'error',
    description: 'Validation message shown under the field; also applies the error style.',
    type: 'string',
    default: '—',
    example: 'error={errors.dob?.message}',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onChange',
    description: 'Called with the picked date (local midnight), or null when cleared.',
    type: 'Date | null',
    example: 'onChange={(date) => setBirthday(date)}',
  },
  {
    name: 'onCalendarChange',
    description: 'Called when the user flips the AD/BS toggle in the popup.',
    type: "'ad' | 'bs'",
    example: 'onCalendarChange={(system) => …}',
  },
];

interface AppointmentForm {
  appointment: Date | null;
}

export default function DateInputStories() {
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [bsDate, setBsDate] = useState<Date | null>(() => new Date());
  const [npDate, setNpDate] = useState<Date | null>(() => new Date());
  const [formatted, setFormatted] = useState<Date | null>(() => new Date());
  const [bounded, setBounded] = useState<Date | null>(null);
  const [focusOpened, setFocusOpened] = useState<Date | null>(null);
  const [pickerOnly, setPickerOnly] = useState<Date | null>(null);
  const [noIcon, setNoIcon] = useState<Date | null>(null);

  /** Booking window for the min/max demo: today through 30 days out. */
  const [today] = useState(() => new Date());
  const [in30Days] = useState(() => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000));

  /** react-hook-form demo — a required date wired up through <Controller>. */
  const {
    control,
    formState: { isValid },
  } = useForm<AppointmentForm>({
    mode: 'onTouched',
    defaultValues: { appointment: null },
  });
  const appointment = useWatch({ control, name: 'appointment' });

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Date Input</h1>
        <p className="page-header__lead">
          An Ant Design-inspired date picker with a dual-calendar twist: the popup renders in
          either the Gregorian (<code>AD</code>) or Bikram Sambat (<code>BS</code>) system,
          switchable from a toggle in the panel footer. The bound value is always a JS{' '}
          <code>Date</code>, whichever calendar is shown. Supports typing (<code>YYYY-MM-DD</code>,{' '}
          <code>DD/MM/YYYY</code>, …), month/year drill-down views, keyboard navigation,{' '}
          <code>min</code>/<code>max</code> bounds, a custom <code>format</code>, and
          Nepali-language rendering via <code>lang="np"</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Starts in the AD calendar. Open the popup and use the AD/BS toggle in the footer to flip the calendar system — the bound value stays the same JS Date."
          code={`const [birthday, setBirthday] = useState<Date | null>(null);

<LUIDateInput label="Birthday" value={birthday} onChange={setBirthday} />`}
        >
          <div className="demo-col">
            <LUIDateInput label="Birthday" value={birthday} onChange={setBirthday} />
            <p className="demo-readout">Value: {birthday?.toDateString() ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="BS calendar by default"
          description='Set calendar="bs" to open in Bikram Sambat. The input shows the BS date (e.g. 2083-03-19) while the value stays an AD Date.'
          code={'<LUIDateInput label="Date (BS)" calendar="bs" value={bsDate} onChange={setBsDate} />'}
        >
          <div className="demo-col">
            <LUIDateInput label="Date (BS)" calendar="bs" value={bsDate} onChange={setBsDate} />
            <p className="demo-readout">Value (AD): {bsDate?.toDateString() ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Nepali language"
          description='lang="np" renders Nepali month names, weekdays and digits in BS mode.'
          code={'<LUIDateInput label="मिति" calendar="bs" lang="np" value={npDate} onChange={setNpDate} />'}
        >
          <div className="demo-col">
            <LUIDateInput label="मिति" calendar="bs" lang="np" value={npDate} onChange={setNpDate} />
            <p className="demo-readout">Value (AD): {npDate?.toDateString() ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Custom format"
          description="The format string uses the same tokens in both calendars: YYYY, MM/MMM/MMMM, DD, dd/ddd."
          code={'<LUIDateInput label="Published" format="ddd DD, MMMM YYYY" value={formatted} onChange={setFormatted} />'}
        >
          <div className="demo-col">
            <LUIDateInput
              label="Published"
              format="ddd DD, MMMM YYYY"
              value={formatted}
              onChange={setFormatted}
            />
          </div>
        </Story>

        <Story
          title="Min / max bounds"
          description="Dates outside [min, max] are disabled in the grid and rejected when typed — in both calendar systems."
          code={'<LUIDateInput label="Booking date" min={today} max={in30Days} value={bounded} onChange={setBounded} />'}
        >
          <div className="demo-col">
            <LUIDateInput
              label="Booking date"
              min={today}
              max={in30Days}
              value={bounded}
              onChange={setBounded}
            />
            <p className="demo-readout">Value: {bounded?.toDateString() ?? '—'}</p>
          </div>
        </Story>

        <Story
          title="Required (react-hook-form)"
          description="The value is a Date, not a DOM string, so wrap the field in a <Controller> and pass the validation message through error — it surfaces on blur with mode: 'onTouched'."
          code={`const { control } = useForm<{ appointment: Date | null }>({
  mode: 'onTouched',
  defaultValues: { appointment: null },
});

<Controller
  name="appointment"
  control={control}
  rules={{ required: 'This field is required.' }}
  render={({ field, fieldState }) => (
    <LUIDateInput
      label="Appointment"
      value={field.value}
      onChange={(date) => { field.onChange(date); field.onBlur(); }}
      error={fieldState.error?.message}
    />
  )}
/>`}
        >
          <div className="demo-col">
            <Controller
              name="appointment"
              control={control}
              rules={{ required: 'This field is required.' }}
              render={({ field, fieldState }) => (
                <LUIDateInput
                  label="Appointment"
                  value={field.value}
                  onChange={(date) => {
                    field.onChange(date);
                    field.onBlur();
                  }}
                  error={fieldState.error?.message}
                />
              )}
            />
            <p className="demo-readout">
              Status: {isValid ? 'valid' : 'invalid'} — value: {appointment?.toDateString() ?? '—'}
            </p>
          </div>
        </Story>

        <Story
          title="Focus, typing & icon options"
          description="openCalendarOnFocus opens the popup as soon as the field gains focus (tab into it). typableDateInput={false} makes the field picker-only — typing is blocked and the cursor turns into a pointer. showCalendarIcon hides the affix icon."
          code={`<LUIDateInput label="Opens on focus" openCalendarOnFocus value={focusOpened} onChange={setFocusOpened} />
<LUIDateInput label="Picker only" typableDateInput={false} value={pickerOnly} onChange={setPickerOnly} />
<LUIDateInput label="No icon" showCalendarIcon={false} value={noIcon} onChange={setNoIcon} />`}
        >
          <div className="demo-col">
            <LUIDateInput
              label="Opens on focus"
              openCalendarOnFocus
              value={focusOpened}
              onChange={setFocusOpened}
            />
            <LUIDateInput
              label="Picker only"
              typableDateInput={false}
              value={pickerOnly}
              onChange={setPickerOnly}
            />
            <LUIDateInput label="No icon" showCalendarIcon={false} value={noIcon} onChange={setNoIcon} />
          </div>
        </Story>

        <Story
          title="Disabled"
          description="Standard disabled treatment — no popup, reduced opacity."
          code={'<LUIDateInput label="Locked" disabled />'}
        >
          <div className="demo-col">
            <LUIDateInput label="Locked" disabled />
          </div>
        </Story>

        <Story
          title="View mode"
          description="viewMode renders the formatted date as plain text — no picker."
          code={'<LUIDateInput label="Joined" value="2026-08-07" viewMode />'}
        >
          <LUIDateInput label="Joined" value="2026-08-07" viewMode />
        </Story>

        <ApiTable
          component="LUIDateInput"
          note="Controlled component — pair value with onChange. The value is always a JS Date (local midnight), regardless of the calendar displayed; ISO strings are also accepted and normalized. With react-hook-form, wrap it in a <Controller> and pass error={fieldState.error?.message}."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
