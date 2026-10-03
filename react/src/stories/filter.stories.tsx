import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LUIFilter, type FilterColumn } from '@lumen-ui/react';

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

const meta = {
  title: 'Data Display/Filter',
  component: LUIFilter,
  args: {
    filterColumns: makeColumns(),
    searchBy: 'name',
    onFilterChange: fn(),
  },
  argTypes: {
    filterColumns: {
      control: 'object',
      description:
        "Fields rendered inside the filter dropdown — `FilterColumn = { name, formcontrolName, type: 'text' | 'select', value?, data?, groupBy? }`.",
      table: { defaultValue: { summary: '[]' } },
    },
    searchBy: { control: 'text', table: { defaultValue: { summary: "''" } } },
  },
  // Leave room below the toolbar for the dropdown panel.
  render: (args) => (
    <div style={{ minHeight: 420 }}>
      <LUIFilter {...args} />
    </div>
  ),
} satisfies Meta<typeof LUIFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Type in the search box and press Enter, or open Filters, set fields and Apply. Each applied
 * filter becomes a removable chip; Reset clears everything.
 */
export const Playground: Story = {};

/** Leave `searchBy` empty to show only the Filters dropdown. */
export const NoSearchBox: Story = {
  args: { searchBy: '' },
};

/** A column's `value` pre-fills its field; it applies once the user presses Apply. */
export const Prefilled: Story = {
  args: {
    filterColumns: makeColumns().map((column) =>
      column.formcontrolName === 'status' ? { ...column, value: 'active' } : column,
    ),
  },
};
