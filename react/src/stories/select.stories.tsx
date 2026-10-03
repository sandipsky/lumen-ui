import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUISelect } from '@lumen-ui/react';

const FRUITS = ['Apple', 'Banana', 'Cherry', 'Mango', 'Pineapple'];

const USERS = [
  { id: 1, name: 'Jack', team: 'Design' },
  { id: 2, name: 'Lucy', team: 'Design' },
  { id: 3, name: 'Yiminghe', team: 'Engineering' },
  { id: 4, name: 'Aarav', team: 'Engineering' },
  { id: 5, name: 'Mei', team: 'Engineering' },
  { id: 6, name: 'Diego', team: 'Product' },
  { id: 7, name: 'Sofia', team: 'Product' },
  { id: 8, name: 'Omar', team: 'Product', disabled: true },
];

const CITIES = Array.from({ length: 5000 }, (_, i) => ({ id: i, label: `City #${i + 1}` }));

const meta = {
  title: 'Form Inputs/Select',
  component: LUISelect,
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    value: 'Banana',
    label: 'Fruit',
    placeholder: 'Select…',
    items: FRUITS,
    disabled: false,
    multiple: false,
    maxTagCount: 'responsive',
    clearable: false,
    searchable: false,
    showArrow: true,
    showLoading: false,
    virtualScroll: false,
    viewMode: false,
    onChange: fn(),
    onSearch: fn(),
    onScrollToEnd: fn(),
    onBlur: fn(),
  },
  argTypes: {
    value: { control: 'object' },
    label: { control: 'text', table: { defaultValue: { summary: "''" } } },
    placeholder: { control: 'text', table: { defaultValue: { summary: "'Select…'" } } },
    disabled: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    id: { control: 'text', table: { defaultValue: { summary: 'auto' } } },
    items: { control: 'object', table: { defaultValue: { summary: '[]' } } },
    bindValue: { control: 'text' },
    bindLabel: { control: 'text' },
    bindDisabled: { control: 'text' },
    groupBy: { control: 'text' },
    multiple: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    maxCount: { control: 'number' },
    maxTagCount: {
      control: 'select',
      options: ['responsive', 1, 2, 3],
      table: { defaultValue: { summary: "'responsive'" } },
    },
    clearable: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    searchable: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showArrow: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showLoading: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    virtualScroll: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    viewMode: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    viewValue: { control: 'text' },
  },
  // Controlled component: write picks back into the `value` arg so the control stays in sync.
  render: function Render(args) {
    const [, updateArgs] = useArgs();
    return (
      <LUISelect
        {...args}
        onChange={(value) => {
          updateArgs({ value });
          args.onChange?.(value);
        }}
      />
    );
  },
} satisfies Meta<typeof LUISelect>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Map objects with `bindValue` (the emitted value) and `bindLabel` (the shown text). */
export const ObjectItems: Story = {
  args: {
    label: 'Assignee',
    items: USERS,
    bindValue: 'id',
    bindLabel: 'name',
    value: 2,
  },
};

/** `groupBy` renders sticky group headers; `bindDisabled` greys out single options. */
export const Grouped: Story = {
  args: {
    label: 'Teammate',
    items: USERS,
    bindValue: 'id',
    bindLabel: 'name',
    groupBy: 'team',
    bindDisabled: 'disabled',
    searchable: true,
    value: null,
  },
};

/** Tags fill the trigger and collapse into a "+N" badge — or cap them with `maxTagCount`. */
export const Multiple: Story = {
  render: function Render() {
    const [picked, setPicked] = useState<unknown>([1, 2, 3, 4, 5]);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <LUISelect
          label="Responsive"
          items={USERS}
          bindValue="id"
          bindLabel="name"
          multiple
          clearable
          value={picked}
          onChange={setPicked}
        />
        <LUISelect
          label="maxTagCount = 2"
          items={USERS}
          bindValue="id"
          bindLabel="name"
          multiple
          maxTagCount={2}
          value={picked}
          onChange={setPicked}
        />
      </div>
    );
  },
};

/** With `virtualScroll` only the visible rows render, so 5,000 options stay smooth. */
export const VirtualScroll: Story = {
  // Local state rather than args so the 5,000 items stay out of the Controls panel.
  render: function Render() {
    const [cityId, setCityId] = useState<unknown>(null);
    return (
      <LUISelect
        label="City (5,000 options)"
        items={CITIES}
        bindValue="id"
        bindLabel="label"
        searchable
        virtualScroll
        value={cityId}
        onChange={setCityId}
      />
    );
  },
};

export const ViewMode: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <LUISelect label="Fruit" items={FRUITS} value="Mango" viewMode />
      <LUISelect label="Fruits" items={FRUITS} multiple value={['Apple', 'Cherry']} viewMode />
    </div>
  ),
};
