import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIDateInput } from '@lumen-ui/react';

/** Fixed sample date (7 Aug 2026) so the stories render the same every day. */
const SAMPLE = new Date(2026, 7, 7);

const meta = {
  title: 'Form Inputs/Date Input',
  component: LUIDateInput,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
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
    onChange: fn(),
    onCalendarChange: fn(),
  },
  argTypes: {
    // The date control hands back a timestamp; the component accepts anything `new Date()` does.
    value: { control: 'date' },
    label: { control: 'text', table: { defaultValue: { summary: "''" } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: "'Select date'" } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    id: { control: 'text', table: { defaultValue: { summary: 'auto' } } },
    calendar: {
      control: 'inline-radio',
      options: ['ad', 'bs'],
      table: { defaultValue: { summary: "'ad'" } },
    },
    lang: {
      control: 'inline-radio',
      options: ['en', 'np'],
      table: { defaultValue: { summary: "'en'" } },
    },
    format: { control: 'text', table: { defaultValue: { summary: "'YYYY-MM-DD'" } } },
    min: { control: 'date', table: { defaultValue: { summary: 'null' } } },
    max: { control: 'date', table: { defaultValue: { summary: 'null' } } },
    clearable: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showToday: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showCalendarIcon: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    openCalendarOnFocus: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    typableDateInput: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    error: { control: 'text' },
    viewMode: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    viewValue: { control: 'text' },
  },
  // Controlled component: write picks back into the `value` arg so the control stays in sync.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUIDateInput
        {...args}
        onChange={(value) => {
          updateArgs({ value });
          args.onChange?.(value);
        }}
      />
    );
  },
} satisfies Meta<typeof LUIDateInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/**
 * The same `Date` in the Gregorian (AD) and Bikram Sambat (BS) calendars, plus BS with Nepali
 * month names and digits. Open a popup and use its AD/BS toggle to switch on the fly.
 */
export const Calendars: Story = {
  render: function Render() {
    const [date, setDate] = useState<Date | null>(SAMPLE);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <LUIDateInput label="Date (AD)" calendar="ad" value={date} onChange={setDate} />
        <LUIDateInput label="Date (BS)" calendar="bs" value={date} onChange={setDate} />
        <LUIDateInput
          label="मिति (BS, Nepali)"
          calendar="bs"
          lang="np"
          value={date}
          onChange={setDate}
        />
      </div>
    );
  },
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
