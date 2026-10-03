import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Filter, FilterChange, FilterColumn } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

/** Builds a fresh column set so each demo mutates its own field values. */
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

@Component({
  selector: 'app-filter-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Filter, Story, ApiTable],
  templateUrl: './filter-stories.html',
  styleUrl: './filter-stories.scss',
})
export class FilterStories {
  protected readonly columns = makeColumns();
  protected readonly plainColumns = makeColumns();

  protected readonly applied = signal<FilterChange[]>([]);
  protected readonly appliedText = computed(
    () =>
      this.applied()
        .map((f) => `${f.field}: ${f.displayValue || f.value}`)
        .join('   ·   ') || '—',
  );

  protected onFilter(changes: FilterChange[]): void {
    this.applied.set(changes);
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'filterColumns',
      description:
        'Fields rendered inside the filter dropdown — text or single-select entries, with optional data options and groupBy.',
      type: 'FilterColumn[]',
      default: '[]',
      example: '[filterColumns]="columns"',
    },
    {
      name: 'searchBy',
      description: 'Field key for the free-text search box; empty hides the search box.',
      type: 'string',
      default: "''",
      example: 'searchBy="name"',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'filterChange',
      description: 'Emits the full set of applied filters whenever it changes.',
      type: 'FilterChange[]',
      example: '(filterChange)="onFilter($event)"',
    },
  ];
}
