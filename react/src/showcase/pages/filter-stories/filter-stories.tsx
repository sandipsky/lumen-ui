import { useState } from 'react';
import {
  LUIFilter,
  type FilterChange,
  type FilterColumn,
} from '../../../components/ui/filter/filter';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './filter-stories.css';

/** Builds a fresh column set so each demo keeps its own field values. */
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

const columns = makeColumns();
const plainColumns = makeColumns();

const apiInputs: ApiTableRow[] = [
  {
    name: 'filterColumns',
    description:
      'Fields rendered inside the filter dropdown — text or single-select entries, with optional data options and groupBy.',
    type: 'FilterColumn[]',
    default: '[]',
    example: 'filterColumns={columns}',
  },
  {
    name: 'searchBy',
    description: 'Field key for the free-text search box; empty hides the search box.',
    type: 'string',
    default: "''",
    example: 'searchBy="name"',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onFilterChange',
    description: 'Called with the full set of applied filters whenever it changes.',
    type: 'FilterChange[]',
    example: 'onFilterChange={onFilter}',
  },
];

export default function FilterStories() {
  const [applied, setApplied] = useState<FilterChange[]>([]);
  const appliedText =
    applied.map((f) => `${f.field}: ${f.displayValue || f.value}`).join('   ·   ') || '—';

  const onFilter = (changes: FilterChange[]): void => {
    setApplied(changes);
  };

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Filter</h1>
        <p className="page-header__lead">
          A toolbar combining a free-text search box with a dropdown of configurable field filters
          (text / single-select, built on <code>LUISelect</code> and <code>LUIMenu</code>). Applied
          filters surface as removable chips, and the whole set is emitted via{' '}
          <code>onFilterChange</code>. Set <code>searchBy</code> to the field the search box
          targets; leave it empty to hide the box.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Search + field filters"
          description="Type in the search box and press Enter, or open Filters to set text/select fields and Apply. Each applied filter becomes a removable chip; Reset clears everything."
          code={`const columns = [
  { name: 'Name', formcontrolName: 'name', type: 'text' },
  { name: 'Status', formcontrolName: 'status', type: 'select', data: [...] },
  { name: 'Team', formcontrolName: 'team', type: 'select', groupBy: 'group', data: [...] },
];

<LUIFilter
  searchBy="name"
  filterColumns={columns}
  onFilterChange={onFilter}
/>`}
        >
          <div className="filter-demo">
            <LUIFilter searchBy="name" filterColumns={columns} onFilterChange={onFilter} />
            <p className="demo-readout">Applied → {appliedText}</p>
          </div>
        </Story>

        <Story
          title="No search box"
          description="Leave searchBy empty to show only the Filters dropdown."
          code={`<LUIFilter filterColumns={columns} onFilterChange={onFilter} />`}
        >
          <div className="filter-demo">
            <LUIFilter filterColumns={plainColumns} onFilterChange={onFilter} />
          </div>
        </Story>

        <ApiTable
          component="LUIFilter"
          note="Not a form control — filter state lives inside the component. FilterColumn is { name, formcontrolName, type: 'text' | 'select', value?, data?, groupBy? }; each emitted FilterChange is { field, value, displayValue }."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
