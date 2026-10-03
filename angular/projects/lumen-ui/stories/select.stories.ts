import { FormsModule } from '@angular/forms';
import { Select } from '@lumen-ui/angular';
import {
  argsToTemplate,
  componentWrapperDecorator,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { fn } from 'storybook/test';

type SelectStoryArgs = Select & { value: unknown };

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

const meta: Meta<SelectStoryArgs> = {
  title: 'Form Inputs/Select',
  component: Select,
  decorators: [
    moduleMetadata({ imports: [FormsModule] }),
    componentWrapperDecorator((story) => `<div style="max-width: 360px">${story}</div>`),
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
    change: fn(),
    search: fn(),
    scrollToEnd: fn(),
  },
  argTypes: {
    value: {
      control: 'object',
      description:
        'Bound through `[(ngModel)]` (not an input) — the selected value, or an array when `multiple`.',
    },
    label: {
      control: 'text',
      description: 'Label rendered above the field, linked to the trigger.',
      table: { defaultValue: { summary: "''" } },
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder shown while nothing is selected.',
      table: { defaultValue: { summary: "'Select…'" } },
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the control — no dropdown, reduced opacity.',
      table: { defaultValue: { summary: 'false' } },
    },
    id: {
      control: 'text',
      description: 'Id for the trigger element; auto-generated when omitted.',
      table: { defaultValue: { summary: 'auto' } },
    },
    items: {
      control: 'object',
      description: 'Options to choose from — primitives (`string[]`/`number[]`) or objects.',
      table: { defaultValue: { summary: '[]' } },
    },
    bindValue: {
      control: 'text',
      description:
        'For object items: the property to use as the patched value; unset patches the whole item.',
    },
    bindLabel: {
      control: 'text',
      description:
        'For object items: the property to display; unset falls back to the value, then `String(item)`.',
    },
    bindDisabled: {
      control: 'text',
      description: 'For object items: a truthy property that disables that single option.',
    },
    groupBy: {
      control: 'text',
      description:
        'For object items: the property to group options by, rendered under sticky headers.',
    },
    multiple: {
      control: 'boolean',
      description:
        'Allow selecting more than one option — the value becomes an array and the trigger shows tags.',
      table: { defaultValue: { summary: 'false' } },
    },
    maxCount: {
      control: 'number',
      description:
        'Cap the number of options that can be selected (multi-select only); unset means unlimited.',
    },
    maxTagCount: {
      control: 'select',
      options: ['responsive', 1, 2, 3],
      description:
        "How many tags to show before collapsing the rest into a '+N' badge (multi-select only) — `'responsive'` fits as many as the trigger width allows.",
      table: { defaultValue: { summary: "'responsive'" } },
    },
    clearable: {
      control: 'boolean',
      description: 'Show a clear (×) affix that empties the selection.',
      table: { defaultValue: { summary: 'false' } },
    },
    searchable: {
      control: 'boolean',
      description: 'Show an in-dropdown search box that filters options by label.',
      table: { defaultValue: { summary: 'false' } },
    },
    showArrow: {
      control: 'boolean',
      description: 'Show the chevron affix on the right.',
      table: { defaultValue: { summary: 'true' } },
    },
    showLoading: {
      control: 'boolean',
      description:
        'Replace the option list with a spinner — useful while an async search is in flight.',
      table: { defaultValue: { summary: 'false' } },
    },
    virtualScroll: {
      control: 'boolean',
      description: 'Render only the visible window of rows — best for large, ungrouped lists.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewMode: {
      control: 'boolean',
      description:
        'Render the selected option label(s) as plain text instead of the select — comma-separated in multiple mode.',
      table: { defaultValue: { summary: 'false' } },
    },
    viewValue: {
      control: 'text',
      description:
        'Custom text shown in view mode; falls back to the selected option label(s) when omitted.',
    },
    change: {
      action: 'change',
      description: 'Emits the selected value whenever it changes — an array in multiple mode.',
    },
    search: {
      action: 'search',
      description:
        'Emits the search text on every keystroke — wire this to an API call for server-side search.',
    },
    scrollToEnd: {
      action: 'scrollToEnd',
      description:
        'Emits when the option list scrolls near the bottom — append the next page to `items` for paged loading.',
    },
  },
  render: ({ value, ...args }) => ({
    props: { ...args, value },
    template: `<l-select ${argsToTemplate(args)} [(ngModel)]="value" />`,
  }),
};

export default meta;
type Story = StoryObj<SelectStoryArgs>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Map objects with `bindValue` (the patched value) and `bindLabel` (the shown text). */
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
  render: () => ({
    props: { users: USERS, picked: [1, 2, 3, 4, 5] },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <l-select
          label="Responsive"
          [items]="users"
          bindValue="id"
          bindLabel="name"
          [multiple]="true"
          [clearable]="true"
          [(ngModel)]="picked"
        />
        <l-select
          label="maxTagCount = 2"
          [items]="users"
          bindValue="id"
          bindLabel="name"
          [multiple]="true"
          [maxTagCount]="2"
          [(ngModel)]="picked"
        />
      </div>
    `,
  }),
};

/** With `virtualScroll` only the visible rows render, so 5,000 options stay smooth. */
export const VirtualScroll: Story = {
  // Rendered from props rather than args so the 5,000 items stay out of the Controls panel.
  render: () => ({
    props: { cities: CITIES, cityId: null },
    template: `
      <l-select
        label="City (5,000 options)"
        [items]="cities"
        bindValue="id"
        bindLabel="label"
        [searchable]="true"
        [virtualScroll]="true"
        [(ngModel)]="cityId"
      />
    `,
  }),
};

export const ViewMode: Story = {
  render: () => ({
    props: { fruits: FRUITS },
    template: `
      <div style="display: flex; flex-direction: column; gap: 16px">
        <l-select label="Fruit" [items]="fruits" ngModel="Mango" [viewMode]="true" />
        <l-select
          label="Fruits"
          [items]="fruits"
          [multiple]="true"
          [ngModel]="['Apple', 'Cherry']"
          [viewMode]="true"
        />
      </div>
    `,
  }),
};
