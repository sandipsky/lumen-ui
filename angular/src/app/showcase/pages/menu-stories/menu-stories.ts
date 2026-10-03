import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Menu, Button } from '@lumen-ui/angular';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-menu-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Menu, Button, Story, ApiTable],
  templateUrl: './menu-stories.html',
  styleUrl: './menu-stories.scss',
})
export class MenuStories {
  protected readonly lastAction = signal<string>('—');

  protected pick(action: string): void {
    this.lastAction.set(action);
  }

  protected readonly apiInputs: ApiTableRow[] = [
    {
      name: 'mode',
      description: 'Which trigger edge the panel aligns to.',
      type: "'left' | 'right'",
      default: "'left'",
      example: 'mode="right"',
    },
    {
      name: 'closeOnItemClick',
      description: 'Close the panel when a projected item is clicked.',
      type: 'boolean',
      default: 'true',
      example: '[closeOnItemClick]="false"',
    },
    {
      name: 'contentMode',
      description: "Drop the panel's inner padding (for custom, edge-to-edge content).",
      type: 'boolean',
      default: 'false',
      example: '[contentMode]="true"',
    },
    {
      name: 'showActiveState',
      description: 'Highlight the trigger while the panel is open.',
      type: 'boolean',
      default: 'true',
      example: '[showActiveState]="false"',
    },
  ];
}
