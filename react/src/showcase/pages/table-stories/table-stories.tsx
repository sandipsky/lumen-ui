import { useEffect, useRef, useState } from 'react';
import {
  LUITable,
  LUITableCell,
  type TableColumn,
  type TableSort,
} from '../../../components/ui/table/table';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './table-stories.css';

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

const columns: TableColumn[] = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'signups', header: 'Signups', sortable: true, align: 'right' },
  { key: 'status', header: 'Status', sortable: true, align: 'center' },
];

const statusLabel: Record<string, string> = {
  success: 'Active',
  warn: 'Pending',
  error: 'Suspended',
};

const tableApiInputs: ApiTableRow[] = [
  {
    name: 'columns',
    description:
      'Column definitions; each key is the property read from the row and doubles as the sort key.',
    type: 'TableColumn[]',
    default: '[]',
    example: 'columns={columns}',
  },
  {
    name: 'data',
    description: 'The rows to render.',
    type: 'any[]',
    default: '[]',
    example: 'data={rows}',
  },
  {
    name: 'serverSort',
    description: 'Let the server sort: cycle the header and emit only, never reorder locally.',
    type: 'boolean',
    default: 'false',
    example: 'serverSort',
  },
  {
    name: 'sort',
    description:
      'Active sort — controlled when passed (pair with onSortChange), so you can seed or read it; null means unsorted.',
    type: 'TableSort | null',
    default: 'null',
    example: 'sort={sort}',
  },
  {
    name: 'loading',
    description: 'Show a loading overlay over the table.',
    type: 'boolean',
    default: 'false',
    example: 'loading={loading}',
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

const tableApiOutputs: ApiTableRow[] = [
  {
    name: 'onRowClick',
    description: 'Called with the clicked row.',
    type: 'any',
    example: 'onRowClick={open}',
  },
  {
    name: 'onSortChange',
    description:
      'Fires on every sort change; with serverSort, refetch here and pass the sorted data back.',
    type: 'TableSort | null',
    example: 'onSortChange={fetch}',
  },
];

const cellApiInputs: ApiTableRow[] = [
  {
    name: 'column',
    description: 'The column key this renderer draws. Required.',
    type: 'string',
    example: 'column="status"',
  },
  {
    name: 'children',
    description:
      'Render prop receiving the cell context: the row, the cell value, the column and the row index.',
    type: '(ctx: TableCellContext) => ReactNode',
    example: '{({ value }) => <span>{value}</span>}',
  },
];

export default function TableStories() {
  // ── Local sort ─────────────────────────────────────────────────
  const [localSort, setLocalSort] = useState<TableSort | null>({
    key: 'signups',
    direction: 'desc',
  });

  // ── Server sort (simulated) ────────────────────────────────────
  const [serverData, setServerData] = useState<User[]>([]);
  const [serverSort, setServerSort] = useState<TableSort | null>({
    key: 'name',
    direction: 'asc',
  });
  const [loading, setLoading] = useState(true);
  const pending = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Pretend to hit an API: sort on the "server" after a short delay. */
  const scheduleFetch = (sort: TableSort | null): void => {
    if (pending.current) clearTimeout(pending.current);
    pending.current = setTimeout(() => {
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
      setServerData(rows);
      setLoading(false);
    }, 700);
  };

  /** Sort-change handler: show the overlay immediately, then "refetch". */
  const fetchRows = (sort: TableSort | null): void => {
    setLoading(true);
    scheduleFetch(sort);
  };

  useEffect(() => {
    // `loading` starts true, so the mount fetch only schedules the timer.
    scheduleFetch({ key: 'name', direction: 'asc' });
    return () => {
      if (pending.current) clearTimeout(pending.current);
    };
  }, []);

  const statusCell = (
    <LUITableCell column="status">
      {({ value }) => (
        <span className={`status ${String(value)}`}>
          <span className="circle"></span>
          {statusLabel[String(value)]}
        </span>
      )}
    </LUITableCell>
  );

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Table</h1>
        <p className="page-header__lead">
          A data table styled from the app's <code>_table.scss</code>, with click-to-sort column
          headers that cycle ascending → descending → unsorted. Cells render <code>row[key]</code>{' '}
          by default, or a custom <code>&lt;LUITableCell column="key"&gt;</code> render prop. Sort{' '}
          <strong>locally</strong> (the table reorders <code>data</code>) or let the{' '}
          <strong>server</strong> sort (<code>serverSort</code> — the table only calls{' '}
          <code>onSortChange</code> and you pass sorted data back). <code>sort</code> is
          controllable via <code>sort</code> + <code>onSortChange</code>.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Local sorting"
          description="Click Name / Role / Signups / Status headers to sort in place. A custom render prop renders the Status column as a colored pill."
          code={`const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'signups', header: 'Signups', sortable: true, align: 'right' },
  …
];

<LUITable columns={columns} data={users} sort={sort} onSortChange={setSort}>
  <LUITableCell column="status">
    {({ value }) => <span className={\`status \${value}\`}><span className="circle"></span> … </span>}
  </LUITableCell>
</LUITable>`}
        >
          <LUITable columns={columns} data={USERS} sort={localSort} onSortChange={setLocalSort}>
            {statusCell}
          </LUITable>
        </Story>

        <Story
          title="Server-side sorting"
          description="serverSort. The header cycles and onSortChange fires; here a fake API sorts after a 700ms delay while a loading overlay shows."
          code={`<LUITable
  columns={columns}
  data={serverData}
  serverSort
  loading={loading}
  sort={serverSort}
  onSortChange={(sort) => {
    setServerSort(sort);
    fetch(sort);
  }}
/>`}
        >
          <LUITable
            columns={columns}
            data={serverData}
            serverSort
            loading={loading}
            sort={serverSort}
            onSortChange={(sort) => {
              setServerSort(sort);
              fetchRows(sort);
            }}
          >
            {statusCell}
          </LUITable>
        </Story>

        <Story
          title="Empty state"
          description="With no rows, the header stays and the no-data message shows."
          code={`<LUITable columns={columns} data={[]} emptyText="No users found" />`}
        >
          <LUITable columns={columns} data={[]} emptyText="No users found" />
        </Story>

        <ApiTable
          component="LUITable"
          note="TableColumn = { key, header, sortable?, align?, width? } — key is the property read from each row and the sort key. Header clicks cycle ascending → descending → unsorted. TableSort = { key, direction }."
          inputs={tableApiInputs}
          outputs={tableApiOutputs}
        />

        <ApiTable
          component="LUITableCell"
          note="Declares the custom cell renderer for a column (the port of ng-template[lTableCell]) — place it as a child of LUITable; it renders nothing by itself. The render prop context exposes the row, the cell value, the column and the row index."
          inputs={cellApiInputs}
        />
      </div>
    </div>
  );
}
