import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { timer } from 'rxjs';
import {
  Button,
  ConfirmDialog as ConfirmDialogComponent,
  ModalService,
  type ButtonVariant,
  type ConfirmDialogData,
  type ModalAnimation,
  type ModalConfig,
} from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

const ANIMATIONS: ModalAnimation[] = [
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
  'fade',
  'zoom',
  'none',
];

/** Story host: a trigger button that opens an `<ng-template>` through `ModalService`. */
@Component({
  selector: 'story-modal-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `
    <l-button [variant]="variant()" (click)="open()">{{ label() }}</l-button>

    <ng-template #content let-data let-ref="modalRef">
      <div class="demo">
        <h2 class="demo__title">{{ data.title }}</h2>
        <p class="demo__body">{{ data.body }}</p>
        <div class="demo__actions">
          <l-button variant="outlined" (click)="ref.close(false)">Cancel</l-button>
          <l-button (click)="ref.close(true)">Got it</l-button>
        </div>
      </div>
    </ng-template>
  `,
  // The modal panel has no padding of its own.
  styles: `
    .demo {
      width: 420px;
      max-width: 100%;
      padding: 24px;
    }
    .demo__title {
      margin: 0 0 8px;
      font-size: 18px;
      font-weight: 700;
      color: var(--text-primary);
    }
    .demo__body {
      margin: 0 0 20px;
      font-size: 14px;
      line-height: 20px;
      color: var(--text-secondary);
    }
    .demo__actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `,
})
class ModalDemo {
  private readonly _modal = inject(ModalService);
  private readonly _content = viewChild.required<TemplateRef<unknown>>('content');

  readonly label = input('Open modal');
  readonly variant = input<ButtonVariant>('primary');
  readonly title = input('Hello from LumenUI');
  readonly body = input('A simple modal panel.');
  readonly width = input<string>();
  readonly height = input<string>();
  readonly maxWidth = input('90vw');
  readonly panelClass = input<string | string[]>();
  readonly backdrop = input(true);
  readonly disableClose = input(false);
  readonly animation = input<ModalAnimation>('slideUp');
  readonly animationDuration = input(250);
  readonly afterClosed = output<unknown>();

  protected open(): void {
    this._modal
      .open(this._content(), {
        data: { title: this.title(), body: this.body() },
        width: this.width(),
        height: this.height(),
        maxWidth: this.maxWidth(),
        panelClass: this.panelClass(),
        backdrop: this.backdrop(),
        disableClose: this.disableClose(),
        animation: this.animation(),
        animationDuration: this.animationDuration(),
      })
      .afterClosed()
      .subscribe((result) => this.afterClosed.emit(result));
  }
}

/** Story host: opens the library's `ConfirmDialog` component and shows the result. */
@Component({
  selector: 'story-confirm-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `
    <div style="display: flex; align-items: center; gap: 12px">
      <l-button [variant]="confirmVariant()" (click)="open()">Open confirm dialog</l-button>
      <span style="font-size: 13px; color: var(--text-secondary)">Last result: {{ result() }}</span>
    </div>
  `,
})
class ConfirmDemo {
  private readonly _modal = inject(ModalService);

  readonly title = input<string>();
  readonly message = input<string>();
  readonly confirmText = input<string>();
  readonly cancelText = input<string>();
  readonly confirmVariant = input<'primary' | 'danger'>('danger');
  readonly simulateAsync = input(false);
  readonly afterClosed = output<boolean | undefined>();

  protected readonly result = signal('—');

  protected open(): void {
    const data: ConfirmDialogData = {
      title: this.title(),
      message: this.message(),
      confirmText: this.confirmText(),
      cancelText: this.cancelText(),
      confirmVariant: this.confirmVariant(),
      // A fake 1.2s request: the dialog shows "Working…" and closes when it completes.
      onConfirm: this.simulateAsync() ? () => timer(1200) : undefined,
    };
    this._modal
      .open<ConfirmDialogComponent, ConfirmDialogData, boolean>(ConfirmDialogComponent, { data })
      .afterClosed()
      .subscribe((ok) => {
        this.result.set(ok ? 'Confirmed' : 'Cancelled');
        this.afterClosed.emit(ok);
      });
  }
}

type ModalStoryArgs = Omit<ModalConfig, 'data'> &
  Omit<ConfirmDialogData, 'onConfirm'> & {
    body?: string;
    simulateAsync?: boolean;
    afterClosed?: (result: unknown) => void;
  };

const CONFIRM_ARGS: (keyof ModalStoryArgs)[] = [
  'title',
  'message',
  'confirmText',
  'cancelText',
  'confirmVariant',
  'simulateAsync',
  'afterClosed',
];

const meta: Meta<ModalStoryArgs> = {
  title: 'Overlays & Feedback/Modal',
  component: ModalDemo,
  decorators: [moduleMetadata({ imports: [ConfirmDemo] })],
  parameters: {
    docs: {
      description: {
        component:
          'Opened imperatively: inject `ModalService` and call ' +
          '`open(componentOrTemplate, config)`. It returns a `ModalRef` ' +
          '(`close(result)`, `afterClosed()`, `componentInstance`). ' +
          'Component content reads its data from the `MODAL_DATA` token; template content gets ' +
          '`data` and `modalRef` on its context. The controls are the `ModalConfig` options — ' +
          'click the button to open a modal with them.',
      },
    },
  },
  args: {
    title: 'Welcome to LumenUI',
    body: 'Click the backdrop, press Esc, or use the buttons below to close it.',
    maxWidth: '90vw',
    backdrop: true,
    disableClose: false,
    animation: 'slideUp',
    animationDuration: 250,
    afterClosed: fn(),
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Demo content — passed to the template through `data`.',
    },
    body: {
      control: 'text',
      description: 'Demo content — passed to the template through `data`.',
    },
    width: {
      control: 'text',
      description: "Panel width, e.g. `'40vw'`, `'500px'`. Still capped by `maxWidth`.",
      table: { defaultValue: { summary: 'auto (fits content)' } },
    },
    height: {
      control: 'text',
      description: 'Panel height.',
      table: { defaultValue: { summary: 'auto (fits content)' } },
    },
    maxWidth: {
      control: 'text',
      description: 'Panel max width — an explicit width is still capped by it.',
      table: { defaultValue: { summary: "'90vw'" } },
    },
    panelClass: {
      control: 'text',
      description: 'Extra class(es) applied to the panel element.',
      table: { defaultValue: { summary: 'undefined' } },
    },
    backdrop: {
      control: 'boolean',
      description: 'Render the dimmed backdrop behind the panel.',
      table: { defaultValue: { summary: 'true' } },
    },
    disableClose: {
      control: 'boolean',
      description: 'Prevent closing on backdrop click / Escape key.',
      table: { defaultValue: { summary: 'false' } },
    },
    animation: {
      control: 'select',
      options: ANIMATIONS,
      description: 'Entry/leave animation — applied to both transitions.',
      table: { defaultValue: { summary: "'slideUp'" } },
    },
    animationDuration: {
      control: 'number',
      description: 'Animation duration in milliseconds.',
      table: { defaultValue: { summary: '250' } },
    },
    afterClosed: {
      action: 'afterClosed',
      description:
        'Logs the result `ModalRef.afterClosed()` emits once the leave animation finishes ' +
        '(`undefined` for backdrop / Esc).',
    },
  },
  render: (args) => ({
    props: args,
    template: `<story-modal-demo ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<ModalStoryArgs>;

/** Every `ModalConfig` option is wired to a control — set them, then open the modal. */
export const Playground: Story = {};

/** Applied to both the enter and leave transitions. */
export const Animations: Story = {
  render: () => ({
    props: { animations: ANIMATIONS },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        @for (animation of animations; track animation) {
          <story-modal-demo
            variant="secondary"
            [label]="animation"
            [animation]="animation"
            [title]="'Animation: ' + animation"
            body="Both the enter and leave transitions use this animation."
          />
        }
      </div>
    `,
  }),
};

/** An explicit `width` is still capped by `maxWidth` (90vw by default). */
export const Sizing: Story = {
  render: () => ({
    props: { widths: ['360px', '640px', '80vw'] },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        @for (width of widths; track width) {
          <story-modal-demo
            variant="outlined"
            [label]="width"
            [width]="width"
            [title]="'Width: ' + width"
            body="The panel still caps at maxWidth (90vw by default)."
          />
        }
      </div>
    `,
  }),
};

/** Hide the backdrop, or ignore backdrop clicks and Esc so the user has to pick a button. */
export const BackdropAndClose: Story = {
  name: 'Backdrop & close behavior',
  render: () => ({
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        <story-modal-demo
          variant="outlined"
          label="No backdrop"
          [backdrop]="false"
          [title]="'No backdrop'"
          body="The page behind stays visible — only the panel floats above it."
        />
        <story-modal-demo
          variant="outlined"
          label="Disable close"
          [disableClose]="true"
          [title]="'Disabled close'"
          body="Backdrop clicks and Esc are ignored — you must use a button below."
        />
      </div>
    `,
  }),
};

const confirmArgTypes: Story['argTypes'] = {
  title: {
    control: 'text',
    description: 'Dialog heading.',
    table: { defaultValue: { summary: "'Confirm'" } },
  },
  message: {
    control: 'text',
    description: 'Body text.',
    table: { defaultValue: { summary: "'Are you sure?'" } },
  },
  confirmText: {
    control: 'text',
    description: 'Confirm button label.',
    table: { defaultValue: { summary: "'Delete'" } },
  },
  cancelText: {
    control: 'text',
    description: 'Cancel button label.',
    table: { defaultValue: { summary: "'Cancel'" } },
  },
  confirmVariant: {
    control: 'inline-radio',
    options: ['primary', 'danger'],
    description: 'Variant of the confirm button — `danger` for destructive actions.',
    table: { defaultValue: { summary: "'danger'" } },
  },
  simulateAsync: {
    control: 'boolean',
    description:
      'Story only — pass an `onConfirm` Observable (a fake 1.2s request). The dialog shows a ' +
      'loading state and only closes once it completes; on error it stays open.',
  },
  afterClosed: {
    action: 'afterClosed',
    description: 'Logs `true` (confirmed), `false` (cancelled) or `undefined` (backdrop / Esc).',
  },
};

/**
 * The bundled `ConfirmDialog` is opened as *component* content:
 * `modal.open(ConfirmDialog, { data })`. `afterClosed()` emits `true` or `false`.
 */
export const ConfirmDialog: Story = {
  args: {
    title: 'Delete project?',
    message: 'This permanently removes the project and all of its data. This cannot be undone.',
    confirmText: 'Delete',
    cancelText: 'Cancel',
    confirmVariant: 'danger',
    simulateAsync: false,
  },
  argTypes: confirmArgTypes,
  parameters: { controls: { include: CONFIRM_ARGS } },
  render: (args) => ({
    props: args,
    template: `<story-confirm-demo ${argsToTemplate(args, { include: CONFIRM_ARGS })} />`,
  }),
};

/** With `onConfirm`, the dialog shows a loading state and closes only when the action succeeds. */
export const AsyncConfirm: Story = {
  ...ConfirmDialog,
  args: {
    title: 'Save changes?',
    message: 'The dialog stays open and shows a loading state until the async action resolves.',
    confirmText: 'Save',
    cancelText: 'Cancel',
    confirmVariant: 'primary',
    simulateAsync: true,
  },
};
