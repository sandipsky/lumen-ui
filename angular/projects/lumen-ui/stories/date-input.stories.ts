import { FormsModule } from '@angular/forms';
import { DateInput } from '@lumen-ui/angular';
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { fn } from 'storybook/test';

type DateInputStoryArgs = DateInput & { value: Date | string | number | null };

/** Fixed sample date (7 Aug 2026) so the stories render the same every day. */
const SAMPLE = new Date(2026, 7, 7);

const meta: Meta<DateInputStoryArgs> = {
  title: 'Form Inputs/Date Input',
  component: DateInput,
  decorators: [
    moduleMetadata({ imports: [FormsModule] }),
    componentWrapperDecorator((story) => `<div style="max-width: 360px">${story}</div>`),
  ],
  args: {
    value: null,
    label: 'Birthday',
    placeholder: 'Select date',
    disabled: false,
    calendar: 'ad',
    lang: 'en',
    format: 'YYYY-MM-DD',
    min: null,
    max: null,
    clearable: true,
    showToday: true,
    showCalendarIcon: true,
    openCalendarOnFocus: false,
    typableDateInput: true,
    viewMode: false,
    change: fn(),
    calendarChange: fn(),
  },
  argTypes: {
    value: {
      control: 'date',
      description:
        'Bound through `[(ngModel)]` (not an input) — always a JS `Date` at local midnight, whichever calendar is shown.',
    },
    label: {
      control: 'text',
      description: 'Label rendered above the field, linked to the input.',
      table: { defaultValue: { summary: "''" } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown while no date is picked.',
      table: { defaultValue: { summary: "'Select date'" } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the field — no popup, no typing, reduced opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    id: {
      control: 'text',
      description: 'Id for the native input; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    calendar: {
      control: 'inline-radio',
      options: ['ad', 'bs'],
      description:
        'Calendar system the picker starts in; the AD/BS toggle in the popup footer can switch it later.',
      table: { defaultValue: { summary: "'ad'" } },
    },
    lang: {
      control: 'inline-radio',
      options: ['en', 'np'],
      description: 'Display language for the BS calendar — `np` renders Nepali names and digits.',
      table: { defaultValue: { summary: "'en'" } },
    },
    format: {
      control: 'text',
      description:
        'Display format applied in the active calendar. Tokens: `YYYY YY`, `M MM MMM MMMM`, `D DD`, `d dd ddd`.',
      table: { defaultValue: { summary: "'YYYY-MM-DD'" } },
    },
    min: {
      control: 'date',
      description:
        'Earliest selectable date (inclusive) — earlier days are disabled in the grid and rejected when typed.',
      table: { defaultValue: { summary: 'null' } },
    },
    max: {
      control: 'date',
      description: 'Latest selectable date (inclusive).',
      table: { defaultValue: { summary: 'null' } },
    },
    clearable: {
      control: 'boolean',
      description: 'Show a clear (×) affix while a date is picked.',
      table: { defaultValue: { summary: 'true' } },
    },
    showToday: {
      control: 'boolean',
      description: 'Show the "Today" shortcut in the popup footer.',
      table: { defaultValue: { summary: 'true' } },
    },
    showCalendarIcon: {
      control: 'boolean',
      description: 'Show the calendar affix icon.',
      table: { defaultValue: { summary: 'true' } },
    },
    openCalendarOnFocus: {
      control: 'boolean',
      description: 'Open the calendar as soon as the input gains focus (e.g. when tabbing in).',
      table: { defaultValue: { summary: 'false' } },
    },
    typableDateInput: {
      control: 'boolean',
      description:
        'Allow editing by typing — only date-shaped text is accepted. `false` makes the field picker-only.',
      table: { defaultValue: { summary: 'true' } },
    },
    viewMode: {
      control: 'boolean',
      description: 'Render the formatted date as plain text instead of the picker.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description: 'Custom text shown in view mode; falls back to the formatted date when omitted.',
    },
    change: {
      action: 'change',
      description: 'Emits the picked date (local midnight), or `null` when cleared.',
    },
    calendarChange: {
      action: 'calendarChange',
      description: 'Emits when the user flips the AD/BS toggle in the popup.',
    },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-date-input ${argsToTemplate(args)} [(ngModel)]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<DateInputStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/**
 * The same `Date` in the Gregorian (AD) and Bikram Sambat (BS) calendars, plus BS with Nepali
 * month names and digits. Open a popup and use its AD/BS toggle to switch on the fly.
 */
export const Calendars: Story = {
  render: () => ({
    props: { date: SAMPLE },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <l-date-input label="Date (AD)" calendar="ad" [(ngModel)]="date" />
        <l-date-input label="Date (BS)" calendar="bs" [(ngModel)]="date" />
        <l-date-input label="मिति (BS, Nepali)" calendar="bs" lang="np" [(ngModel)]="date" />
      </div>
    `,
  }),
};

/** The format string uses the same tokens in both calendars. */
export const CustomFormat: Story = {
  args: { label: 'Published', format: 'ddd DD, MMMM YYYY', value: SAMPLE },
};

/** Dates outside `[min, max]` are disabled in the grid and rejected when typed. */
export const MinMax: Story = {
  args: {
    label: 'Booking date',
    min: new Date(2026, 7, 1),
    max: new Date(2026, 7, 31),
    value: SAMPLE,
  },
};

export const Disabled: Story = {
  args: { label: 'Locked', value: SAMPLE, disabled: true },
};

export const ViewMode: Story = {
  args: { label: 'Joined', value: SAMPLE, viewMode: true },
};
