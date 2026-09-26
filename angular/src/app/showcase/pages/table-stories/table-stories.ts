import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { Table, TableColumn, TableSort } from '../../../shared/components/ui/table/table';
import { TableCellDirective } from '../../../shared/components/ui/table/table-cell.directive';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  signups: number;
  status: 'success' | 'warn' | 'error';
}

const USERS: User[] = [
  {
    id: 1,
    name: 'Ada Lovelace',
    email: 'ada@example.com',
    role: 'Admin',
    signups: 128,
    status: 'success',
  },
  {
    id: 2,
    name: 'Grace Hopper',
    email: 'grace@example.com',
    role: 'Editor',
    signups: 92,
    status: 'success',
  },
  {
    id: 3,
    name: 'Alan Turing',
    email: 'alan@example.com',
    role: 'Viewer',
    signups: 45,
    status: 'warn',
  },
  {
    id: 4,
    name: 'Katherine Johnson',
    email: 'kj@example.com',
    role: 'Editor',
    signups: 210,
    status: 'success',
  },
  {
    id: 5,
    name: 'Linus Torvalds',
    email: 'linus@example.com',
    role: 'Admin',
    signups: 17,
    status: 'error',
  },
  {
    id: 6,
    name: 'Margaret Hamilton',
    email: 'margaret@example.com',
    role: 'Viewer',
    signups: 76,
    status: 'warn',
  },
];

@Component({
  selector: 'app-table-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Table, TableCellDirective, Story, ApiTable],
  templateUrl: './table-stories.html',
  styleUrl: './table-stories.scss',
})
export class TableStories {
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly columns: TableColumn[] = [
    { key: 'name', header: 'Name', sortable: true },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role', sortable: true },
    { key: 'signups', header: 'Signups', sortable: true, align: 'right' },
    { key: 'status', header: 'Status', sortable: true, align: 'center' },
  ];

  // ── Local sort ─────────────────────────────────────────────────
  protected readonly localData = USERS;
  protected readonly localSort = signal<TableSort | null>({ key: 'signups', direction: 'desc' });

  protected readonly statusLabel: Record<string, string> = {
    success: 'Active',
    warn: 'Pending',
    error: 'Suspended',
  };

  // ── Server sort (simulated) ────────────────────────────────────
  protected readonly serverData = signal<User[]>([]);
  protected readonly serverSort = signal<TableSort | null>({ key: 'name', direction: 'asc' });
  protected readonly loading = signal(false);
  private _pending: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this._fetch(this.serverSort());
    this._destroyRef.onDestroy(() => this._pending && clearTimeout(this._pending));
  }

  /** Pretend to hit an API: sort on the "server" after a short delay. */
  protected _fetch(sort: TableSort | null): void {
    this.loading.set(true);
    if (this._pending) clearTimeout(this._pending);
    this._pending = setTimeout(() => {
      const rows = [...USERS];
      if (sort) {
        const factor = sort.direction === 'asc' ? 1 : -1;
        rows.sort((a, b) => {
          const av = a[sort.key as keyof User];
          const bv = b[sort.key as keyof User];
          if (av === bv) return 0;
          if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * factor;
          return String(av).localeCompare(String(bv)) * factor;
        });
      }
      this.serverData.set(rows);
      this.loading.set(false);
    }, 700);
  }

  protected readonly tableApiInputs: ApiTableRow[] = [
    {
      name: 'columns',
      description:
        'Column definitions; each key is the property read from the row and doubles as the sort key.',
      type: 'TableColumn[]',
      default: '[]',
      example: '[columns]="columns"',
    },
    {
      name: 'data',
      description: 'The rows to render.',
      type: 'any[]',
      default: '[]',
      example: '[data]="rows"',
    },
    {
      name: 'serverSort',
      description: 'Let the server sort: cycle the header and emit only, never reorder locally.',
      type: 'boolean',
      default: 'false',
      example: '[serverSort]="true"',
    },
    {
      name: 'sort',
      description: 'Active sort — two-way, so you can seed or read it; null means unsorted.',
      type: 'TableSort | null',
      default: 'null',
      example: '[(sort)]="sort"',
    },
    {
      name: 'loading',
      description: 'Show a loading overlay over the table.',
      type: 'boolean',
      default: 'false',
      example: '[loading]="loading()"',
    },
    {
      name: 'emptyText',
      description: 'Message shown when there are no rows (and not loading).',
      type: 'string',
      default: "'No data to display'",
      example: 'emptyText="No users found"',
    },
    {
      name: 'rowKey',
      description: 'Row identity for tracking: a property name or a function. Defaults to index.',
      type: 'string | ((row) => unknown)',
      default: 'undefined',
      example: 'rowKey="id"',
    },
  ];

  protected readonly tableApiOutputs: ApiTableRow[] = [
    {
      name: 'rowClick',
      description: 'Emits the clicked row.',
      type: 'any',
      example: '(rowClick)="open($event)"',
    },
    {
      name: 'sortChange',
      description:
        'Change output of the sort model — fires on every sort change; with serverSort, refetch here and pass the sorted data back.',
      type: 'TableSort | null',
      example: '(sortChange)="fetch($event)"',
    },
  ];

  protected readonly cellApiInputs: ApiTableRow[] = [
    {
      name: 'lTableCell',
      description: 'The column key this template renders. Required.',
      type: 'string',
      example: 'lTableCell="status"',
    },
  ];
}
