import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import {
  collectBranchKeys,
  LUIButton,
  LUITree,
  type LUITreeProps,
  type TreeNode,
} from '@lumen-ui/react';

const files: TreeNode[] = [
  {
    key: 'src',
    label: 'src',
    icon: '📁',
    children: [
      {
        key: 'app',
        label: 'app',
        icon: '📁',
        children: [
          { key: 'app.ts', label: 'app.ts', icon: '📄' },
          { key: 'app.html', label: 'app.html', icon: '📄' },
          { key: 'app.scss', label: 'app.scss', icon: '🎨' },
        ],
      },
      {
        key: 'shared',
        label: 'shared',
        icon: '📁',
        children: [
          { key: 'button', label: 'button.ts', icon: '📄' },
          { key: 'tree', label: 'tree.ts', icon: '📄' },
        ],
      },
      { key: 'main.ts', label: 'main.ts', icon: '📄' },
    ],
  },
  {
    key: 'config',
    label: 'config',
    icon: '📁',
    children: [
      { key: 'pkg', label: 'package.json', icon: '📦' },
      { key: 'tsconfig', label: 'tsconfig.json', icon: '⚙️' },
    ],
  },
];

const comments: TreeNode[] = [
  {
    key: 'c1',
    label: 'Diplodocus — Nope, not buying it.',
    children: [
      {
        key: 'c1-1',
        label: 'malachai — This is the crux of the issue.',
        children: [
          { key: 'c1-1-1', label: 'user_42 — Say more?' },
          { key: 'c1-1-2', label: 'quietStorm — Agreed, well put.' },
        ],
      },
      { key: 'c1-2', label: 'anon — 1 more reply' },
    ],
  },
  {
    key: 'c2',
    label: 'greenTea — Actually the docs cover this.',
    children: [{ key: 'c2-1', label: 'devlin — Link please!' }],
  },
];

const permissions: TreeNode[] = [
  {
    key: 'billing',
    label: 'Billing',
    children: [
      { key: 'billing.view', label: 'View invoices' },
      { key: 'billing.edit', label: 'Edit payment methods' },
      { key: 'billing.refund', label: 'Issue refunds', disabled: true },
    ],
  },
  {
    key: 'team',
    label: 'Team',
    children: [
      { key: 'team.invite', label: 'Invite members' },
      { key: 'team.remove', label: 'Remove members' },
    ],
  },
];

const keysControl = { control: 'object' } as const;

const meta = {
  title: 'Navigation/Tree View',
  component: LUITree,
  args: {
    nodes: files,
    checkable: false,
    showLine: true,
    showIcon: true,
    selectable: true,
    multiple: false,
    checkStrictly: false,
    expandedKeys: ['src', 'app'],
    checkedKeys: [],
    selectedKeys: [],
    onNodeClick: fn(),
    onSelectedChange: fn(),
    onCheckedChange: fn(),
    onExpandedChange: fn(),
    onExpandedKeysChange: fn(),
    onCheckedKeysChange: fn(),
    onSelectedKeysChange: fn(),
  },
  argTypes: {
    nodes: {
      control: 'object',
      description:
        'The tree data — `TreeNode = { key, label, children?, icon?, disabled?, disableCheckbox? }`. A node with children renders as an expandable branch; `key` must be unique across the tree.',
      table: { defaultValue: { summary: '[]' } },
    },
    checkable: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    showLine: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    showIcon: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    selectable: { control: 'boolean', table: { defaultValue: { summary: 'true' } } },
    multiple: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    checkStrictly: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    expandedKeys: keysControl,
    checkedKeys: keysControl,
    selectedKeys: keysControl,
    defaultExpandedKeys: keysControl,
    defaultCheckedKeys: keysControl,
    defaultSelectedKeys: keysControl,
  },
  // The `*Keys` props are controlled and written back into the controls on every click,
  // mirroring the Angular two-way `model()`s.
  render: function Render(args) {
    const [, updateArgs] = useArgs<LUITreeProps>();
    return (
      <LUITree
        {...args}
        onExpandedKeysChange={(keys) => {
          args.onExpandedKeysChange?.(keys);
          updateArgs({ expandedKeys: keys });
        }}
        onCheckedKeysChange={(keys) => {
          args.onCheckedKeysChange?.(keys);
          updateArgs({ checkedKeys: keys });
        }}
        onSelectedKeysChange={(keys) => {
          args.onSelectedKeysChange?.(keys);
          updateArgs({ selectedKeys: keys });
        }}
      />
    );
  },
} satisfies Meta<typeof LUITree>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

function ExpandAllDemo() {
  const [expanded, setExpanded] = useState<string[]>(['src']);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <LUIButton
          variant="outlined"
          size="sm"
          onClick={() => setExpanded(collectBranchKeys(files))}
        >
          Expand all
        </LUIButton>
        <LUIButton variant="outlined" size="sm" onClick={() => setExpanded([])}>
          Collapse all
        </LUIButton>
      </div>
      <LUITree nodes={files} showIcon expandedKeys={expanded} onExpandedKeysChange={setExpanded} />
    </div>
  );
}

/**
 * Expand / collapse all from external buttons through the controlled `expandedKeys` pair —
 * `collectBranchKeys(nodes)` is the React stand-in for Angular's `expandAll()`.
 */
export const ExpandAll: Story = {
  render: () => <ExpandAllDemo />,
};

/** Nested replies connected by curved rails; collapse a thread with its chevron. */
export const CommentThread: Story = {
  render: () => <LUITree nodes={comments} defaultExpandedKeys={['c1', 'c1-1']} />,
};

function CheckableDemo() {
  const [checked, setChecked] = useState<string[]>(['billing.view']);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <LUITree
        nodes={permissions}
        checkable
        selectable={false}
        defaultExpandedKeys={['billing', 'team']}
        checkedKeys={checked}
        onCheckedKeysChange={setChecked}
      />
      <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
        Checked: {checked.join(', ') || '—'}
      </p>
    </div>
  );
}

/**
 * Checking a parent checks its children; a partially checked parent shows an indeterminate
 * dash. Disabled nodes are skipped by the cascade.
 */
export const Checkable: Story = {
  render: () => <CheckableDemo />,
};

/** `showLine={false}` drops the rails for a plain indented tree. */
export const WithoutLines: Story = {
  args: { showLine: false },
};
