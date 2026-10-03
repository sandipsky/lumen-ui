import { signal } from '@angular/core';
import { Button, Tree, type TreeNode } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

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

const meta: Meta<Tree> = {
  title: 'Navigation/Tree View',
  component: Tree,
  decorators: [moduleMetadata({ imports: [Button] })],
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
    nodeClick: fn(),
    selectedChange: fn(),
    checkedChange: fn(),
    expandedChange: fn(),
    expandedKeysChange: fn(),
    checkedKeysChange: fn(),
    selectedKeysChange: fn(),
  },
  argTypes: {
    nodes: {
      control: 'object',
      description:
        'The tree data — `TreeNode = { key, label, children?, icon?, disabled?, disableCheckbox? }`. A node with children renders as an expandable branch; `key` must be unique across the tree.',
      table: { defaultValue: { summary: '[]' } },
    },
    checkable: {
      control: 'boolean',
      description: 'Show a checkbox on every node.',
      table: { defaultValue: { summary: 'false' } },
    },
    showLine: {
      control: 'boolean',
      description: 'Draw the connecting rails between nodes.',
      table: { defaultValue: { summary: 'true' } },
    },
    showIcon: {
      control: 'boolean',
      description: "Render each node's `icon`.",
      table: { defaultValue: { summary: 'false' } },
    },
    selectable: {
      control: 'boolean',
      description: 'Allow selecting (highlighting) nodes on click.',
      table: { defaultValue: { summary: 'true' } },
    },
    multiple: {
      control: 'boolean',
      description: 'Allow more than one node to be selected.',
      table: { defaultValue: { summary: 'false' } },
    },
    checkStrictly: {
      control: 'boolean',
      description: 'Uncouple parent/child checkboxes (no cascade, no indeterminate).',
      table: { defaultValue: { summary: 'false' } },
    },
    expandedKeys: {
      control: 'object',
      description: 'Keys of the expanded branches — two-way (`[(expandedKeys)]`).',
      table: { defaultValue: { summary: '[]' } },
    },
    checkedKeys: {
      control: 'object',
      description: 'Keys of the checked nodes — two-way (`[(checkedKeys)]`).',
      table: { defaultValue: { summary: '[]' } },
    },
    selectedKeys: {
      control: 'object',
      description: 'Keys of the selected nodes — two-way (`[(selectedKeys)]`).',
      table: { defaultValue: { summary: '[]' } },
    },
    nodeClick: {
      action: 'nodeClick',
      description: 'Emits the clicked node (fires even when selection is off/disabled).',
      table: { category: 'outputs' },
    },
    selectedChange: {
      action: 'selectedChange',
      description: 'Emits the selected nodes after a selection click.',
      table: { category: 'outputs' },
    },
    checkedChange: {
      action: 'checkedChange',
      description: 'Emits the checked nodes after a checkbox toggle.',
      table: { category: 'outputs' },
    },
    expandedChange: {
      action: 'expandedChange',
      description: 'Emits the toggled node and its new expanded state.',
      table: { category: 'outputs' },
    },
    expandedKeysChange: {
      action: 'expandedKeysChange',
      description: 'Change half of the `expandedKeys` model — the full expanded-key list.',
      table: { category: 'outputs' },
    },
    checkedKeysChange: {
      action: 'checkedKeysChange',
      description: 'Change half of the `checkedKeys` model — the full checked-key list.',
      table: { category: 'outputs' },
    },
    selectedKeysChange: {
      action: 'selectedKeysChange',
      description: 'Change half of the `selectedKeys` model — the full selected-key list.',
      table: { category: 'outputs' },
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-tree ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<Tree>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** `expandAll()` / `collapseAll()` called from external buttons through a `#tree` template ref. */
export const ExpandAll: Story = {
  render: () => ({
    props: { files, expanded: signal(['src']) },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <div style="display: flex; gap: 8px">
          <l-button variant="outlined" size="sm" (click)="tree.expandAll()">Expand all</l-button>
          <l-button variant="outlined" size="sm" (click)="tree.collapseAll()">
            Collapse all
          </l-button>
        </div>
        <l-tree #tree [nodes]="files" [showIcon]="true" [(expandedKeys)]="expanded" />
      </div>
    `,
  }),
};

/** Nested replies connected by curved rails; collapse a thread with its chevron. */
export const CommentThread: Story = {
  render: () => ({
    props: { comments, expanded: signal(['c1', 'c1-1']) },
    template: `<l-tree [nodes]="comments" [(expandedKeys)]="expanded" />`,
  }),
};

/**
 * Checking a parent checks its children; a partially checked parent shows an indeterminate
 * dash. Disabled nodes are skipped by the cascade.
 */
export const Checkable: Story = {
  render: () => ({
    props: {
      permissions,
      expanded: signal(['billing', 'team']),
      checked: signal(['billing.view']),
    },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <l-tree
          [nodes]="permissions"
          [checkable]="true"
          [selectable]="false"
          [(expandedKeys)]="expanded"
          [(checkedKeys)]="checked"
        />
        <p style="font-size: 13px; color: var(--text-secondary)">
          Checked: {{ checked().join(', ') || '—' }}
        </p>
      </div>
    `,
  }),
};

/** `[showLine]="false"` drops the rails for a plain indented tree. */
export const WithoutLines: Story = {
  args: { showLine: false },
};
