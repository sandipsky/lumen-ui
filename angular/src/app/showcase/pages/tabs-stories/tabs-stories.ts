import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Tab } from '../../../shared/components/ui/tabs/tab';
import { Tabs } from '../../../shared/components/ui/tabs/tabs';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-tabs-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Tabs, Tab, Story, ApiTable],
  templateUrl: './tabs-stories.html',
  styleUrl: './tabs-stories.scss',
})
export class TabsStories {
  protected readonly active = signal<unknown>('profile');

  protected readonly tabsApiInputs: ApiTableRow[] = [
    {
      name: 'orientation',
      description: 'Lay the strip out horizontally (top) or vertically (left).',
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      example: 'orientation="vertical"',
    },
    {
      name: 'variant',
      description:
        "'line' slides an underline (or side bar) under the active tab; 'pills' fills it with an accent pill.",
      type: "'line' | 'pills'",
      default: "'line'",
      example: 'variant="pills"',
    },
    {
      name: 'size',
      description: 'Density of the tab buttons.',
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      example: 'size="lg"',
    },
    {
      name: 'grow',
      description: 'Stretch horizontal tabs to fill the width in equal parts.',
      type: 'boolean',
      default: 'false',
      example: '[grow]="true"',
    },
    {
      name: 'value',
      description: "The active tab's value (or its index when no value was given) — two-way.",
      type: 'unknown',
      default: 'null',
      example: '[(value)]="active"',
    },
  ];

  protected readonly tabsApiOutputs: ApiTableRow[] = [
    {
      name: 'activeChange',
      description: "Emits the newly active tab's value when the user selects a tab.",
      type: 'unknown',
      example: '(activeChange)="onTab($event)"',
    },
  ];

  protected readonly tabApiInputs: ApiTableRow[] = [
    {
      name: 'label',
      description: 'Strip label.',
      type: 'string',
      default: "''",
      example: 'label="Profile"',
    },
    {
      name: 'icon',
      description: 'Optional leading glyph/emoji.',
      type: 'string',
      default: "''",
      example: 'icon="👤"',
    },
    {
      name: 'value',
      description: "Explicit value bound to l-tabs value. Defaults to the tab's index.",
      type: 'unknown',
      default: 'undefined',
      example: 'value="profile"',
    },
    {
      name: 'disabled',
      description: 'Disable the tab; it is skipped by arrow-key navigation.',
      type: 'boolean',
      default: 'false',
      example: '[disabled]="true"',
    },
  ];
}
