import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { map, timer } from 'rxjs';
import { Button } from '../../../shared/components/ui/button/button';
import { ConfirmDialog } from '../../../shared/components/ui/modal/confirm-dialog';
import { ModalAnimation } from '../../../shared/components/ui/modal/modal.config';
import { ModalService } from '../../../shared/components/ui/modal/modal.service';
import { ApiTable, ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';

@Component({
  selector: 'app-modal-stories',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button, Story, ApiTable],
  templateUrl: './modal-stories.html',
  styleUrl: './modal-stories.scss',
})
export class ModalStories {
  private readonly _modal = inject(ModalService);

  protected readonly demoTpl = viewChild.required<TemplateRef<unknown>>('demoTpl');
  protected readonly lastResult = signal<string>('—');

  protected readonly animations: ModalAnimation[] = [
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
    'fade',
    'zoom',
    'none',
  ];

  protected readonly apiConfig: ApiTableRow[] = [
    {
      name: 'data',
      description:
        'Arbitrary data for the content — injected via the MODAL_DATA token into component content, or exposed on the template context.',
      type: 'D (any)',
      example: "data: { title: 'Delete?' }",
    },
    {
      name: 'width',
      description: 'Panel width.',
      type: 'string',
      example: "width: '640px'",
    },
    {
      name: 'height',
      description: 'Panel height.',
      type: 'string',
      example: "height: '70vh'",
    },
    {
      name: 'maxWidth',
      description: 'Panel max width — an explicit width is still capped by it.',
      type: 'string',
      default: "'90vw'",
      example: "maxWidth: '600px'",
    },
    {
      name: 'panelClass',
      description: 'Extra class(es) applied to the panel element.',
      type: 'string | string[]',
      example: "panelClass: 'checkout-modal'",
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
      name: 'animation',
      description: 'Entry/leave animation — applied to both transitions.',
      type: "'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'fade' | 'zoom' | 'none'",
      default: "'slideUp'",
      example: "animation: 'zoom'",
    },
    {
      name: 'animationDuration',
      description: 'Animation duration in milliseconds.',
      type: 'number',
      default: '250',
      example: 'animationDuration: 400',
    },
  ];

  protected readonly apiMethods: ApiTableRow[] = [
    {
      name: 'ModalService.open',
      description:
        'Open a component or an <ng-template> as the panel content; returns a ModalRef handle.',
      type: 'open(content, config?): ModalRef<T, R>',
      example: 'modal.open(ConfirmDialog, { data })',
    },
    {
      name: 'ModalService.closeAll',
      description: 'Close every open modal.',
      type: 'closeAll(): void',
      example: 'modal.closeAll()',
    },
    {
      name: 'ModalRef.close',
      description:
        'Begin closing the modal; the result is emitted from afterClosed() once the leave animation finishes.',
      type: 'close(result?: R): void',
      example: 'ref.close(true)',
    },
    {
      name: 'ModalRef.componentInstance',
      description:
        'Property — the instance of the component opened inside the modal (null when a TemplateRef was used).',
      type: 'T | null',
      example: 'ref.componentInstance',
    },
  ];

  protected readonly apiOutputs: ApiTableRow[] = [
    {
      name: 'ModalRef.afterClosed()',
      description: 'Emits the close result once and completes when the modal has fully closed.',
      type: 'R | undefined',
      example: 'ref.afterClosed().subscribe((result) => …)',
    },
  ];

  openBasic(): void {
    this._modal.open(this.demoTpl(), {
      data: {
        title: 'Welcome to LumenUI',
        body: 'This panel is rendered from an <ng-template>. Click the backdrop or press Esc to dismiss it.',
      },
    });
  }

  openAnimation(animation: ModalAnimation): void {
    this._modal.open(this.demoTpl(), {
      animation,
      data: {
        title: `Animation: ${animation}`,
        body: 'Both the enter and leave transitions use this animation.',
      },
    });
  }

  openSized(width: string): void {
    this._modal.open(this.demoTpl(), {
      width,
      data: {
        title: `Width: ${width}`,
        body: 'The panel still caps at maxWidth (90vw by default).',
      },
    });
  }

  openNoBackdrop(): void {
    this._modal.open(this.demoTpl(), {
      backdrop: false,
      data: {
        title: 'No backdrop',
        body: 'The page behind stays visible — only the panel floats above it.',
      },
    });
  }

  openDisableClose(): void {
    this._modal.open(this.demoTpl(), {
      disableClose: true,
      data: {
        title: 'Disabled close',
        body: 'Backdrop clicks and Esc are ignored — you must use the button below.',
      },
    });
  }

  openConfirm(): void {
    const ref = this._modal.open(ConfirmDialog, {
      data: {
        title: 'Delete project?',
        message: 'This permanently removes the project and all of its data. This cannot be undone.',
      },
    });
    ref
      .afterClosed()
      .subscribe((result) => this.lastResult.set(result ? 'Confirmed' : 'Cancelled'));
  }

  openAsyncConfirm(): void {
    const ref = this._modal.open(ConfirmDialog, {
      data: {
        title: 'Save changes?',
        message: 'The dialog stays open and shows a loading state until the async action resolves.',
        confirmText: 'Save',
        confirmVariant: 'primary',
        onConfirm: () => timer(1200).pipe(map(() => true)),
      },
    });
    ref.afterClosed().subscribe((result) => this.lastResult.set(result ? 'Saved' : 'Cancelled'));
  }
}
