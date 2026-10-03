import { signal } from '@angular/core';
import {
  Avatar,
  Chip,
  Table,
  TableCellDirective,
  type TableColumn,
  type TableSort,
} from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  signups: number;
  status: 'Active' | 'Pending' | 'Suspended';
}

const user = (
  id: number,
  name: string,
  email: string,
  role: string,
  signups: number,
  status: User['status'],
): User => ({ id, name, email, role, signups, status });

const USERS: User[] = [
  user(1, 'Ada Lovelace', 'ada@example.com', 'Admin', 128, 'Active'),
  user(2, 'Grace Hopper', 'grace@example.com', 'Editor', 92, 'Active'),
  user(3, 'Alan Turing', 'alan@example.com', 'Viewer', 45, 'Pending'),
  user(4, 'Katherine Johnson', 'kj@example.com', 'Editor', 210, 'Active'),
  user(5, 'Linus Torvalds', 'linus@example.com', 'Admin', 17, 'Suspended'),
  user(6, 'Margaret Hamilton', 'margaret@example.com', 'Viewer', 76, 'Pending'),
];

const COLUMNS: TableColumn[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'signups', header: 'Signups', sortable: true, align: 'right' },
  { key: 'status', header: 'Status', sortable: true, align: 'center' },
];

const STATUS_VARIANT: Record<User['status'], string> = {
  Active: 'success',
  Pending: 'warn',
  Suspended: 'error',
};

/** What a backend would do: sort a copy of the rows. */
function sortUsers(rows: User[], sort: TableSort | null): User[] {
  if (!sort) return [...rows];
  const factor = sort.direction === 'asc' ? 1 : -1;
  const key = sort.key as keyof User;
  return [...rows].sort((a, b) => {
    const av = a[key];
    const bv = b[key];
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * factor;
    return String(av).localeCompare(String(bv)) * factor;
  });
}

const STATUS_CELL = `
  <ng-template lTableCell="status" let-value="value">
    <l-chip size="sm" [variant]="statusVariant[value]" [dot]="true">{{ value }}</l-chip>
  </ng-template>
`;

const meta: Meta<Table> = {
  title: 'Data Display/Table',
  component: Table,
  decorators: [moduleMetadata({ imports: [TableCellDirective, Chip, Avatar] })],
  args: {
    columns: COLUMNS,
    data: USERS,
    serverSort: false,
    sort: null,
    loading: false,
    emptyText: 'No data to display',
    rowKey: 'id',
    rowClick: fn(),
    sortChange: fn(),
  },
  argTypes: {
    columns: {
      control: 'object',
      description:
        'Column definitions — `TableColumn = { key, header, sortable?, align?, width? }`. `key` is the property read from each row and doubles as the sort key.',
      table: { defaultValue: { summary: '[]' } },
    },
    data: {
      control: 'object',
      description: 'The rows to render.',
      table: { defaultValue: { summary: '[]' } },
    },
    serverSort: {
      control: 'boolean',
      description: 'Let the server sort: cycle the header and emit only, never reorder locally.',
      table: { defaultValue: { summary: 'false' } },
    },
    sort: {
      control: 'object',
      description:
        'Active sort — `{ key, direction: "asc" | "desc" }`, two-way; `null` means unsorted. Header clicks cycle ascending → descending → unsorted.',
      table: { defaultValue: { summary: 'null' } },
    },
    loading: {
      control: 'boolean',
      description: 'Show a loading overlay over the table.',
      table: { defaultValue: { summary: 'false' } },
    },
    emptyText: {
      control: 'text',
      description: 'Message shown when there are no rows (and not loading).',
      table: { defaultValue: { summary: "'No data to display'" } },
    },
    rowKey: {
      control: 'text',
      description: 'Row identity for tracking: a property name or a function. Defaults to index.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    rowClick: {
      action: 'rowClick',
      description: 'Emits the clicked row.',
      table: { category: 'outputs' },
    },
    sortChange: {
      action: 'sortChange',
      description:
        'Change half of the `sort` model — fires on every sort change; with `serverSort`, refetch here and pass the sorted data back.',
      table: { category: 'outputs' },
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-table ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<Table>;

/** Every input is wired to a control — click the sortable headers to sort locally. */
export const Playground: Story = {};

/**
 * `<ng-template lTableCell="key">` replaces a column's cells. The context exposes the row
 * (`let-row`), `value`, `column` and `index`.
 */
export const CustomCells: Story = {
  args: { sort: { key: 'signups', direction: 'desc' } },
  render: (args) => ({
    props: { ...args, statusVariant: STATUS_VARIANT },
    template: `
      <l-table ${argsToTemplate(args)}>
        <ng-template lTableCell="name" let-row>
          <span style="display: inline-flex; align-items: center; gap: 8px">
            <l-avatar [name]="row.name" size="24px" />
            {{ row.name }}
          </span>
        </ng-template>
        ${STATUS_CELL}
      </l-table>
    `,
  }),
};

/**
 * `[serverSort]="true"`: the header cycles and `(sortChange)` fires; here a fake API sorts after
 * 700ms while the loading overlay shows.
 */
export const ServerSort: Story = {
  render: () => {
    const initial: TableSort = { key: 'name', direction: 'asc' };
    const data = signal(sortUsers(USERS, initial));
    const loading = signal(false);
    let pending: ReturnType<typeof setTimeout> | undefined;
    const fetch = (sort: TableSort | null) => {
      loading.set(true);
      clearTimeout(pending);
      pending = setTimeout(() => {
        data.set(sortUsers(USERS, sort));
        loading.set(false);
      }, 700);
    };
    return {
      props: {
        columns: COLUMNS,
        data,
        loading,
        sort: signal<TableSort | null>(initial),
        fetch,
        statusVariant: STATUS_VARIANT,
      },
      template: `
        <l-table
          [columns]="columns"
          [data]="data()"
          [serverSort]="true"
          [loading]="loading()"
          [(sort)]="sort"
          (sortChange)="fetch($event)"
        >
          ${STATUS_CELL}
        </l-table>
      `,
    };
  },
};

export const Loading: Story = {
  args: { loading: true },
};

/** With no rows the header stays and the empty message shows. */
export const Empty: Story = {
  args: { data: [], emptyText: 'No users found' },
};
