import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import {
  LUIAvatar,
  LUIChip,
  LUITable,
  LUITableCell,
  type ChipVariant,
  type LUITableProps,
  type TableColumn,
  type TableSort,
} from '@lumen-ui/react';

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

const STATUS_VARIANT: Record<User['status'], ChipVariant> = {
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

const statusCell = (
  <LUITableCell<User> column="status">
    {({ row }) => (
      <LUIChip size="sm" variant={STATUS_VARIANT[row.status]} dot>
        {row.status}
      </LUIChip>
    )}
  </LUITableCell>
);

const meta = {
  title: 'Data Display/Table',
  component: LUITable,
  subcomponents: { LUITableCell },
  args: {
    columns: COLUMNS,
    data: USERS,
    serverSort: false,
    sort: null,
    loading: false,
    emptyText: 'No data to display',
    rowKey: 'id',
    onRowClick: fn(),
    onSortChange: fn(),
  },
  argTypes: {
    columns: {
      control: 'object',
      description:
        'Column definitions — `TableColumn = { key, header, sortable?, align?, width? }`. `key` is the property read from each row and doubles as the sort key.',
      table: { defaultValue: { summary: '[]' } },
    },
    data: { control: 'object', table: { defaultValue: { summary: '[]' } } },
    serverSort: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    sort: { control: 'object', table: { defaultValue: { summary: 'undefined' } } },
    loading: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    emptyText: { control: 'text', table: { defaultValue: { summary: "'No data to display'" } } },
    rowKey: { control: 'text', table: { defaultValue: { summary: 'undefined' } } },
    children: { control: false },
  },
  // `sort` is controlled and written back into the controls, like Angular's two-way model.
  render: function Render(args) {
    const [, updateArgs] = useArgs<LUITableProps>();
    return (
      <LUITable
        {...args}
        onSortChange={(sort) => {
          args.onSortChange?.(sort);
          updateArgs({ sort });
        }}
      />
    );
  },
} satisfies Meta<typeof LUITable>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — click the sortable headers to sort locally. */
export const Playground: Story = {};

/**
 * `<LUITableCell column="key">` replaces a column's cells; its render prop receives the `row`,
 * `value`, `column` and `index`.
 */
export const CustomCells: Story = {
  args: {
    sort: { key: 'signups', direction: 'desc' },
    children: [
      <LUITableCell<User> key="name" column="name">
        {({ row }) => (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <LUIAvatar name={row.name} size="24px" />
            {row.name}
          </span>
        )}
      </LUITableCell>,
      <LUITableCell<User> key="status" column="status">
        {({ row }) => (
          <LUIChip size="sm" variant={STATUS_VARIANT[row.status]} dot>
            {row.status}
          </LUIChip>
        )}
      </LUITableCell>,
    ],
  },
};

function ServerSortDemo() {
  const initial: TableSort = { key: 'name', direction: 'asc' };
  const [sort, setSort] = useState<TableSort | null>(initial);
  const [data, setData] = useState(() => sortUsers(USERS, initial));
  const [loading, setLoading] = useState(false);
  const pending = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(pending.current), []);

  const fetchSorted = (next: TableSort | null) => {
    setSort(next);
    setLoading(true);
    clearTimeout(pending.current);
    pending.current = setTimeout(() => {
      setData(sortUsers(USERS, next));
      setLoading(false);
    }, 700);
  };

  return (
    <LUITable
      columns={COLUMNS}
      data={data}
      serverSort
      loading={loading}
      sort={sort}
      onSortChange={fetchSorted}
    >
      {statusCell}
    </LUITable>
  );
}

/**
 * `serverSort`: the header cycles and `onSortChange` fires; here a fake API sorts after 700ms
 * while the loading overlay shows.
 */
export const ServerSort: Story = {
  render: () => <ServerSortDemo />,
};

export const Loading: Story = {
  args: { loading: true },
};

/** With no rows the header stays and the empty message shows. */
export const Empty: Story = {
  args: { data: [], emptyText: 'No users found' },
};
