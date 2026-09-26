import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import {
  collectBranchKeys,
  LUITree,
  type TreeNode,
} from '../../../components/ui/tree/tree';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './tree-stories.css';

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
    key: 'root-files',
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
        label: 'malachai — SOPHISTRY. This is the crux of the issue.',
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

const treeApiInputs: ApiTableRow[] = [
  {
    name: 'nodes',
    description: 'The tree data; a node with children renders as an expandable branch.',
    type: 'TreeNode[]',
    default: '[]',
    example: 'nodes={files}',
  },
  {
    name: 'checkable',
    description: 'Show a checkbox on every node.',
    type: 'boolean',
    default: 'false',
    example: 'checkable',
  },
  {
    name: 'showLine',
    description: 'Draw the connecting rails between nodes.',
    type: 'boolean',
    default: 'true',
    example: 'showLine={false}',
  },
  {
    name: 'showIcon',
    description: "Render each node's icon.",
    type: 'boolean',
    default: 'false',
    example: 'showIcon',
  },
  {
    name: 'selectable',
    description: 'Allow selecting (highlighting) nodes on click.',
    type: 'boolean',
    default: 'true',
    example: 'selectable={false}',
  },
  {
    name: 'multiple',
    description: 'Allow more than one node to be selected.',
    type: 'boolean',
    default: 'false',
    example: 'multiple',
  },
  {
    name: 'checkStrictly',
    description: 'Uncouple parent/child checkboxes (no cascade, no indeterminate).',
    type: 'boolean',
    default: 'false',
    example: 'checkStrictly',
  },
  {
    name: 'expandedKeys',
    description: 'Keys of the expanded branches — controlled; pair with onExpandedKeysChange.',
    type: 'string[]',
    default: '—',
    example: 'expandedKeys={open}',
  },
  {
    name: 'checkedKeys',
    description: 'Keys of the checked nodes — controlled; pair with onCheckedKeysChange.',
    type: 'string[]',
    default: '—',
    example: 'checkedKeys={checked}',
  },
  {
    name: 'selectedKeys',
    description: 'Keys of the selected nodes — controlled; pair with onSelectedKeysChange.',
    type: 'string[]',
    default: '—',
    example: 'selectedKeys={selected}',
  },
  {
    name: 'defaultExpandedKeys',
    description: 'Initial expanded keys when expandedKeys is uncontrolled.',
    type: 'string[]',
    default: '[]',
    example: "defaultExpandedKeys={['src']}",
  },
  {
    name: 'defaultCheckedKeys',
    description: 'Initial checked keys when checkedKeys is uncontrolled.',
    type: 'string[]',
    default: '[]',
    example: "defaultCheckedKeys={['a']}",
  },
  {
    name: 'defaultSelectedKeys',
    description: 'Initial selected keys when selectedKeys is uncontrolled.',
    type: 'string[]',
    default: '[]',
    example: "defaultSelectedKeys={['a']}",
  },
];

const treeApiOutputs: ApiTableRow[] = [
  {
    name: 'onNodeClick',
    description: 'Called with the clicked node (fires even when selection is off/disabled).',
    type: 'TreeNode',
    example: 'onNodeClick={onNode}',
  },
  {
    name: 'onSelectedChange',
    description: 'Called with the selected nodes after a selection click.',
    type: 'TreeNode[]',
    example: 'onSelectedChange={onSelect}',
  },
  {
    name: 'onCheckedChange',
    description: 'Called with the checked nodes after a checkbox toggle.',
    type: 'TreeNode[]',
    example: 'onCheckedChange={onCheck}',
  },
  {
    name: 'onExpandedChange',
    description: 'Called with the toggled node and its new expanded state.',
    type: '{ node: TreeNode; expanded: boolean }',
    example: 'onExpandedChange={onExpand}',
  },
  {
    name: 'onExpandedKeysChange',
    description: 'Fires with the full expanded-key list — the write half of the expandedKeys pair.',
    type: 'string[]',
    example: 'onExpandedKeysChange={setOpen}',
  },
  {
    name: 'onCheckedKeysChange',
    description: 'Fires with the full checked-key list — the write half of the checkedKeys pair.',
    type: 'string[]',
    example: 'onCheckedKeysChange={setChecked}',
  },
  {
    name: 'onSelectedKeysChange',
    description: 'Fires with the full selected-key list — the write half of the selectedKeys pair.',
    type: 'string[]',
    example: 'onSelectedKeysChange={setSel}',
  },
];

export default function TreeStories() {
  const [filesExpanded, setFilesExpanded] = useState<string[]>(['src', 'app']);
  const [commentsExpanded, setCommentsExpanded] = useState<string[]>(['c1', 'c1-1']);
  const [checked, setChecked] = useState<string[]>(['billing.view']);

  return (
    <div className="story-page tree-stories">
      <header className="page-header">
        <h1 className="page-header__title">Tree View</h1>
        <p className="page-header__lead">
          A hierarchical tree with Reddit-style connecting rails, inspired by Ant Design's{' '}
          <code>Tree</code>. Data-driven via <code>nodes</code>; a chevron expands/collapses each
          branch, <code>checkable</code> adds cascading checkboxes (with indeterminate parents),{' '}
          <code>showLine</code> toggles the rails, and <code>showIcon</code> renders per-node
          glyphs. Expanded / checked / selected state works uncontrolled (via{' '}
          <code>default*Keys</code>) or controlled through the <code>*Keys</code> +{' '}
          <code>on*KeysChange</code> prop pairs, and the exported{' '}
          <code>collectBranchKeys()</code> helper drives expand-all / collapse-all from external
          buttons.
        </p>
      </header>

      <div className="stories">
        <Story
          title="File tree with external controls"
          description="Expand all / collapse all driven from buttons through the controlled expandedKeys pair — collectBranchKeys(nodes) is the React stand-in for the Angular expandAll() template-ref method; showIcon renders each node's glyph."
          code={`<LUIButton onClick={() => setOpen(collectBranchKeys(files))}>Expand all</LUIButton>
<LUIButton onClick={() => setOpen([])}>Collapse all</LUIButton>

<LUITree nodes={files} showIcon expandedKeys={open} onExpandedKeysChange={setOpen} />`}
        >
          <div className="demo-col">
            <div className="demo-actions">
              <LUIButton
                variant="outlined"
                size="sm"
                onClick={() => setFilesExpanded(collectBranchKeys(files))}
              >
                Expand all
              </LUIButton>
              <LUIButton variant="outlined" size="sm" onClick={() => setFilesExpanded([])}>
                Collapse all
              </LUIButton>
            </div>
            <LUITree
              nodes={files}
              showIcon
              expandedKeys={filesExpanded}
              onExpandedKeysChange={setFilesExpanded}
            />
          </div>
        </Story>

        <Story
          title="Reddit-style comment thread"
          description="Nested replies connected by curved rails; collapse a thread with its chevron."
          code={`<LUITree nodes={comments} expandedKeys={open} onExpandedKeysChange={setOpen} />`}
        >
          <LUITree
            nodes={comments}
            expandedKeys={commentsExpanded}
            onExpandedKeysChange={setCommentsExpanded}
          />
        </Story>

        <Story
          title="Checkable (cascading)"
          description="checkable. Checking a parent checks its children; a partially-checked parent shows an indeterminate dash. Disabled nodes are skipped."
          code={`<LUITree nodes={permissions} checkable checkedKeys={checked} onCheckedKeysChange={setChecked} />`}
        >
          <div className="demo-col">
            <LUITree
              nodes={permissions}
              checkable
              selectable={false}
              checkedKeys={checked}
              onCheckedKeysChange={setChecked}
            />
            <p className="demo-readout">Checked: {checked.join(', ') || '—'}</p>
          </div>
        </Story>

        <Story
          title="Without lines"
          description="showLine={false} drops the rails for a plain indented tree."
          code={`<LUITree nodes={files} showLine={false} showIcon />`}
        >
          <LUITree
            nodes={files}
            showLine={false}
            showIcon
            defaultExpandedKeys={['src', 'app']}
          />
        </Story>

        <ApiTable
          component="LUITree"
          note="TreeNode = { key, label, children?, icon?, disabled?, disableCheckbox? } — key must be unique across the whole tree. Rows render through an internal LUITreeItem. Expanded / checked / selected state is uncontrolled by default; provide the *Keys prop (with its on*KeysChange callback) to control it. collectBranchKeys(nodes) returns every branch key for expand-all buttons."
          inputs={treeApiInputs}
          outputs={treeApiOutputs}
        />
      </div>
    </div>
  );
}
