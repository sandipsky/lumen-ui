import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  inject,
  input,
  output,
  viewChild,
} from '@angular/core';
import {
  Button,
  DrawerService,
  type ButtonVariant,
  type DrawerConfig,
  type DrawerPosition,
} from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

/** Story host: a trigger button that opens an `<ng-template>` through `DrawerService`. */
@Component({
  selector: 'story-drawer-demo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Button],
  template: `
    <l-button [variant]="variant()" (click)="open()">{{ label() }}</l-button>

    <ng-template #content let-data let-ref="drawerRef">
      <div class="demo">
        <h2 class="demo__title">{{ data.title }}</h2>
        <p class="demo__body">{{ data.body }}</p>
        <div class="demo__actions">
          <l-button variant="outlined" (click)="ref.close(false)">Cancel</l-button>
          <l-button (click)="ref.close(true)">Apply</l-button>
        </div>
      </div>
    </ng-template>
  `,
  // The drawer panel has no padding of its own.
  styles: `
    .demo {
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
class DrawerDemo {
  private readonly _drawer = inject(DrawerService);
  private readonly _content = viewChild.required<TemplateRef<unknown>>('content');

  readonly label = input('Open drawer');
  readonly variant = input<ButtonVariant>('primary');
  readonly title = input('Hello from LumenUI');
  readonly body = input('A simple drawer panel.');
  readonly position = input<DrawerPosition>('right');
  readonly size = input<string>();
  readonly panelClass = input<string | string[]>();
  readonly backdrop = input(true);
  readonly disableClose = input(false);
  readonly animationDuration = input(280);
  readonly afterClosed = output<unknown>();

  protected open(): void {
    this._drawer
      .open(this._content(), {
        data: { title: this.title(), body: this.body() },
        position: this.position(),
        size: this.size(),
        panelClass: this.panelClass(),
        backdrop: this.backdrop(),
        disableClose: this.disableClose(),
        animationDuration: this.animationDuration(),
      })
      .afterClosed()
      .subscribe((result) => this.afterClosed.emit(result));
  }
}

type DrawerStoryArgs = Omit<DrawerConfig, 'data'> & {
  title?: string;
  body?: string;
  afterClosed?: (result: unknown) => void;
};

const meta: Meta<DrawerStoryArgs> = {
  title: 'Overlays & Feedback/Drawer',
  component: DrawerDemo,
  parameters: {
    docs: {
      description: {
        component:
          'Opened imperatively: inject `DrawerService` and call ' +
          '`open(componentOrTemplate, config)`. It returns a `DrawerRef` ' +
          '(`close(result)`, `afterClosed()`, `componentInstance`). Component content reads ' +
          'its data from the `DRAWER_DATA` token; template content gets `data` and `drawerRef` ' +
          'on its context. The controls are the `DrawerConfig` options — click the button to ' +
          'open a drawer with them.',
      },
    },
  },
  args: {
    title: 'Filters',
    body: 'The slide direction follows the position. Click the backdrop or press Esc to close.',
    position: 'right',
    backdrop: true,
    disableClose: false,
    animationDuration: 280,
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
    position: {
      control: 'inline-radio',
      options: ['left', 'right', 'bottom'],
      description: 'Edge the panel docks to; the slide animation follows it.',
      table: { defaultValue: { summary: "'right'" } },
    },
    size: {
      control: 'text',
      description:
        'Panel size along its sliding axis — the width for left/right drawers, the height for ' +
        "bottom drawers. E.g. `'420px'`, `'30vw'`, `'50vh'`.",
      table: { defaultValue: { summary: '380px (left/right) · 40vh (bottom)' } },
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
    animationDuration: {
      control: 'number',
      description: 'Animation duration in milliseconds.',
      table: { defaultValue: { summary: '280' } },
    },
    afterClosed: {
      action: 'afterClosed',
      description:
        'Logs the result `DrawerRef.afterClosed()` emits once the leave animation finishes ' +
        '(`undefined` for backdrop / Esc).',
    },
  },
  render: (args) => ({
    props: args,
    template: `<story-drawer-demo ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<DrawerStoryArgs>;

/** Every `DrawerConfig` option is wired to a control — set them, then open the drawer. */
export const Playground: Story = {};

/** `left`, `right` (default) and `bottom` — each enters from its edge and reverses on close. */
export const Positions: Story = {
  render: () => ({
    props: { positions: ['left', 'right', 'bottom'] },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        @for (position of positions; track position) {
          <story-drawer-demo
            variant="secondary"
            [label]="position"
            [position]="position"
            [title]="position + ' drawer'"
            body="The slide direction follows the position."
          />
        }
      </div>
    `,
  }),
};

/** `size` sets the sliding-axis extent — the width for left/right, the height for bottom. */
export const Sizing: Story = {
  render: () => ({
    props: { sizes: ['320px', '480px', '30vw'] },
    template: `
      <div style="display: flex; gap: 8px; flex-wrap: wrap">
        @for (size of sizes; track size) {
          <story-drawer-demo
            variant="outlined"
            [label]="size"
            [size]="size"
            [title]="'Size: ' + size"
            body="size sets the width for left/right drawers."
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
        <story-drawer-demo
          variant="outlined"
          label="No backdrop"
          [backdrop]="false"
          [title]="'No backdrop'"
          body="The page behind stays visible — only the panel floats above it."
        />
        <story-drawer-demo
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
