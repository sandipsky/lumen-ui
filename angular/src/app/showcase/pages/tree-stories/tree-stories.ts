import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { Tree, TreeNode } from '../../../shared/components/ui/tree/tree';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-tree-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tree, Story, Button, ApiTable],
  templateUrl: './tree-stories.html',
  styleUrl: './tree-stories.scss',
})
export class TreeStories {
  protected readonly files: TreeNode[] = [
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

  protected readonly comments: TreeNode[] = [
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

  protected readonly permissions: TreeNode[] = [
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

  protected readonly filesExpanded = signal<string[]>(['src', 'app']);
  protected readonly commentsExpanded = signal<string[]>(['c1', 'c1-1']);
  protected readonly checked = signal<string[]>(['billing.view']);

  protected readonly treeApiInputs: ApiTableRow[] = [
    {
      name: 'nodes',
      description: 'The tree data; a node with children renders as an expandable branch.',
      type: 'TreeNode[]',
      default: '[]',
      example: '[nodes]="files"',
    },
    {
      name: 'checkable',
      description: 'Show a checkbox on every node.',
      type: 'boolean',
      default: 'false',
      example: '[checkable]="true"',
    },
    {
      name: 'showLine',
      description: 'Draw the connecting rails between nodes.',
      type: 'boolean',
      default: 'true',
      example: '[showLine]="false"',
    },
    {
      name: 'showIcon',
      description: "Render each node's icon.",
      type: 'boolean',
      default: 'false',
      example: '[showIcon]="true"',
    },
    {
      name: 'selectable',
      description: 'Allow selecting (highlighting) nodes on click.',
      type: 'boolean',
      default: 'true',
      example: '[selectable]="false"',
    },
    {
      name: 'multiple',
      description: 'Allow more than one node to be selected.',
      type: 'boolean',
      default: 'false',
      example: '[multiple]="true"',
    },
    {
      name: 'checkStrictly',
      description: 'Uncouple parent/child checkboxes (no cascade, no indeterminate).',
      type: 'boolean',
      default: 'false',
      example: '[checkStrictly]="true"',
    },
    {
      name: 'expandedKeys',
      description: 'Keys of the expanded branches — two-way.',
      type: 'string[]',
      default: '[]',
      example: '[(expandedKeys)]="open"',
    },
    {
      name: 'checkedKeys',
      description: 'Keys of the checked nodes — two-way.',
      type: 'string[]',
      default: '[]',
      example: '[(checkedKeys)]="checked"',
    },
    {
      name: 'selectedKeys',
      description: 'Keys of the selected nodes — two-way.',
      type: 'string[]',
      default: '[]',
      example: '[(selectedKeys)]="selected"',
    },
  ];

  protected readonly treeApiOutputs: ApiTableRow[] = [
    {
      name: 'nodeClick',
      description: 'Emits the clicked node (fires even when selection is off/disabled).',
      type: 'TreeNode',
      example: '(nodeClick)="onNode($event)"',
    },
    {
      name: 'selectedChange',
      description: 'Emits the selected nodes after a selection click.',
      type: 'TreeNode[]',
      example: '(selectedChange)="onSelect($event)"',
    },
    {
      name: 'checkedChange',
      description: 'Emits the checked nodes after a checkbox toggle.',
      type: 'TreeNode[]',
      example: '(checkedChange)="onCheck($event)"',
    },
    {
      name: 'expandedChange',
      description: 'Emits the toggled node and its new expanded state.',
      type: '{ node: TreeNode; expanded: boolean }',
      example: '(expandedChange)="onExpand($event)"',
    },
  ];
}
