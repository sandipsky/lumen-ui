import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { Button } from '../../../shared/components/ui/button/button';
import { DrawerPosition } from '../../../shared/components/ui/drawer/drawer.config';
import { DrawerService } from '../../../shared/components/ui/drawer/drawer.service';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-drawer-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Story, ApiTable],
  templateUrl: './drawer-stories.html',
  styleUrl: './drawer-stories.scss',
})
export class DrawerStories {
  private readonly _drawer = inject(DrawerService);

  protected readonly demoTpl = viewChild.required<TemplateRef<unknown>>('demoTpl');

  protected readonly positions: DrawerPosition[] = ['left', 'right', 'bottom'];

  protected readonly apiConfig: ApiTableRow[] = [
    {
      name: 'data',
      description:
        'Arbitrary data for the content — injected via the DRAWER_DATA token into component content, or exposed on the template context.',
      type: 'D (any)',
      example: 'data: { userId: 42 }',
    },
    {
      name: 'position',
      description: 'Edge the panel docks to; the slide animation follows it.',
      type: "'left' | 'right' | 'bottom'",
      default: "'right'",
      example: "position: 'left'",
    },
    {
      name: 'size',
      description:
        'Panel size along its sliding axis — the width for left/right drawers, the height for bottom drawers.',
      type: 'string',
      example: "size: '420px'",
    },
    {
      name: 'panelClass',
      description: 'Extra class(es) applied to the panel element.',
      type: 'string | string[]',
      example: "panelClass: 'filters-drawer'",
    },
    {
      name: 'backdrop',
      description: 'Render the dimmed backdrop behind the panel.',
      type: 'boolean',
      default: 'true',
      example: 'backdrop: false',
    },
    {
      name: 'disableClose',
      description: 'Prevent closing on backdrop click / Escape key.',
      type: 'boolean',
      default: 'false',
      example: 'disableClose: true',
    },
    {
      name: 'animationDuration',
      description: 'Animation duration in milliseconds.',
      type: 'number',
      default: '280',
      example: 'animationDuration: 400',
    },
  ];

  protected readonly apiMethods: ApiTableRow[] = [
    {
      name: 'DrawerService.open',
      description:
        'Open a component or an <ng-template> as the panel content; returns a DrawerRef handle.',
      type: 'open(content, config?): DrawerRef<T, R>',
      example: "drawer.open(FiltersPanel, { position: 'left' })",
    },
    {
      name: 'DrawerService.closeAll',
      description: 'Close every open drawer.',
      type: 'closeAll(): void',
      example: 'drawer.closeAll()',
    },
    {
      name: 'DrawerRef.close',
      description:
        'Begin closing the drawer; the result is emitted from afterClosed() once the leave animation finishes.',
      type: 'close(result?: R): void',
      example: 'ref.close(true)',
    },
    {
      name: 'DrawerRef.componentInstance',
      description:
        'Property — the instance of the component opened inside the drawer (null when a TemplateRef was used).',
      type: 'T | null',
      example: 'ref.componentInstance',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'DrawerRef.afterClosed()',
      description: 'Emits the close result once and completes when the drawer has fully closed.',
      type: 'R | undefined',
      example: 'ref.afterClosed().subscribe((result) => …)',
    },
  ];

  openPosition(position: DrawerPosition): void {
    this._drawer.open(this.demoTpl(), {
      position,
      data: {
        title: `${position[0].toUpperCase()}${position.slice(1)} drawer`,
        body: 'The slide direction follows the position. Click the backdrop or press Esc to dismiss it.',
      },
    });
  }

  openSized(size: string): void {
    this._drawer.open(this.demoTpl(), {
      position: 'right',
      size,
      data: { title: `Size: ${size}`, body: 'size sets the width for left/right drawers.' },
    });
  }

  openNoBackdrop(): void {
    this._drawer.open(this.demoTpl(), {
      position: 'right',
      backdrop: false,
      data: {
        title: 'No backdrop',
        body: 'The page behind stays visible — only the panel floats above it.',
      },
    });
  }

  openDisableClose(): void {
    this._drawer.open(this.demoTpl(), {
      position: 'right',
      disableClose: true,
      data: {
        title: 'Disabled close',
        body: 'Backdrop clicks and Esc are ignored — you must use the button below.',
      },
    });
  }
}
