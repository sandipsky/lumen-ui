import { Filter, type FilterColumn } from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

/** A fresh column set per story — the Angular filter writes field values back onto it. */
function makeColumns(): FilterColumn[] {
  return [
    { name: 'Name', formcontrolName: 'name', type: 'text' },
    {
      name: 'Status',
      formcontrolName: 'status',
      type: 'select',
      data: [
        { id: 'active', name: 'Active' },
        { id: 'invited', name: 'Invited' },
        { id: 'disabled', name: 'Disabled' },
      ],
    },
    {
      name: 'Team',
      formcontrolName: 'team',
      type: 'select',
      groupBy: 'group',
      data: [
        { id: 1, name: 'Design', group: 'Product' },
        { id: 2, name: 'Engineering', group: 'Product' },
        { id: 3, name: 'Sales', group: 'Go to market' },
        { id: 4, name: 'Support', group: 'Go to market' },
      ],
    },
  ];
}

const meta: Meta<Filter> = {
  title: 'Data Display/Filter',
  component: Filter,
  args: {
    filterColumns: makeColumns(),
    searchBy: 'name',
    filterChange: fn(),
  },
  argTypes: {
    filterColumns: {
      control: 'object',
      description:
        "Fields rendered inside the filter dropdown — `FilterColumn = { name, formcontrolName, type: 'text' | 'select', value?, data?, groupBy? }`.",
      table: { defaultValue: { summary: '[]' } },
    },
    searchBy: {
      control: 'text',
      description: 'Field key for the free-text search box; empty hides the search box.',
      table: { defaultValue: { summary: "''" } },
    },
    filterChange: {
      action: 'filterChange',
      description:
        'Emits the full set of applied filters (`{ field, value, displayValue }[]`) whenever it changes.',
      table: { category: 'outputs' },
    },
  },
  // Leave room below the toolbar for the dropdown panel.
  render: (args) => ({
    props: args,
    template: `<div style="min-height: 420px"><l-filter ${argsToTemplate(args)} /></div>`,
  }),
};

export default meta;
type Story = StoryObj<Filter>;

/**
 * Type in the search box and press Enter, or open Filters, set fields and Apply. Each applied
 * filter becomes a removable chip; Reset clears everything.
 */
export const Playground: Story = {};

/** Leave `searchBy` empty to show only the Filters dropdown. */
export const NoSearchBox: Story = {
  args: { filterColumns: makeColumns(), searchBy: '' },
};

/** A column's `value` pre-fills its field; it applies once the user presses Apply. */
export const Prefilled: Story = {
  args: {
    filterColumns: makeColumns().map((column) =>
      column.formcontrolName === 'status' ? { ...column, value: 'active' } : column,
    ),
  },
};
