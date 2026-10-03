import { signal } from '@angular/core';
import { Button, Header, Sidebar } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

interface NavItem {
  icon: string;
  label: string;
  children?: NavItem[];
}

const NAV: NavItem[] = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '👥', label: 'Users' },
  { icon: '📁', label: 'Projects' },
  {
    icon: '📈',
    label: 'Reports',
    children: [
      { icon: '💰', label: 'Sales Report' },
      { icon: '📦', label: 'Stock Report' },
    ],
  },
  { icon: '🔔', label: 'Notifications' },
];

/**
 * `<l-sidebar>` only provides the rail; the nav inside is the consumer's own markup. These
 * styles stand in for it (mirroring the React `LUISidebarItem` look) and hide the labels while
 * the desktop rail is collapsed.
 */
const SHELL_STYLES = `
  .shell {
    display: flex;
    height: 420px;
    overflow: hidden;
    border-bottom: 1px solid var(--separator);
    /* Containing block for the fixed mobile drawer, so it stays inside the demo. */
    transform: translateZ(0);
  }
  .shell__main { display: flex; flex-direction: column; flex: 1; min-width: 0; }
  .shell__content {
    flex: 1;
    padding: 24px;
    overflow: auto;
    font-size: 14px;
    color: var(--text-secondary);
    background: var(--bg-light);
  }
  .shell__title { font-size: 14px; font-weight: 600; color: var(--text-primary); }
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 48px;
    margin: 12px;
    border-radius: 8px;
    background: var(--accent);
    color: var(--text-white);
    font-weight: 700;
    font-size: 18px;
  }
  .nav { display: flex; flex-direction: column; gap: 4px; padding: 0 12px; }
  .nav__children { display: flex; flex-direction: column; gap: 2px; padding-left: 14px; }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
  }
  .nav-item:hover, .nav-item.is-active { background: var(--bg-dark); color: var(--text-primary); }
  .nav-item.is-active { font-weight: 600; }
  .nav-item__icon { display: inline-flex; justify-content: center; flex-shrink: 0; width: 18px; }
  .nav-item__label { flex: 1; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; }
  .nav-item__chevron { flex-shrink: 0; transition: transform 150ms ease-out; }
  .nav-item.is-open .nav-item__chevron { transform: rotate(90deg); }
  @media (min-width: 769px) {
    .l-sidebar--collapsed .nav-item { justify-content: center; padding: 8px 0; }
    .l-sidebar--collapsed .nav-item__label,
    .l-sidebar--collapsed .nav-item__chevron { display: none; }
    .l-sidebar--collapsed .nav__children { padding-left: 0; }
  }
`;

const navItem = (item: string) => `
  <button
    type="button"
    class="nav-item"
    [class.is-active]="${item}.label === active()"
    [title]="${item}.label"
    (click)="active.set(${item}.label)"
  >
    <span class="nav-item__icon">{{ ${item}.icon }}</span>
    <span class="nav-item__label">{{ ${item}.label }}</span>
  </button>
`;

/** Shell markup shared by every story: rail + header + content. */
const shell = (sidebarAttrs: string, intro: string) => `
  <div class="shell">
    <l-sidebar #sidebar ${sidebarAttrs}>
      <div class="brand">L</div>
      <nav class="nav">
        @for (item of nav; track item.label) {
          @if (item.children) {
            <button
              type="button"
              class="nav-item"
              [class.is-open]="openGroup() === item.label"
              [title]="item.label"
              [attr.aria-expanded]="openGroup() === item.label"
              (click)="openGroup.set(openGroup() === item.label ? '' : item.label)"
            >
              <span class="nav-item__icon">{{ item.icon }}</span>
              <span class="nav-item__label">{{ item.label }}</span>
              <svg class="nav-item__chevron" viewBox="0 0 20 20" width="14" height="14" fill="none">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </button>
            @if (openGroup() === item.label) {
              <div class="nav__children">
                @for (child of item.children; track child.label) {
                  ${navItem('child')}
                }
              </div>
            }
          } @else {
            ${navItem('item')}
          }
        }
      </nav>
    </l-sidebar>

    <div class="shell__main">
      <l-header (menuToggle)="sidebar.toggle()">
        <span class="shell__title">LumenUI</span>
      </l-header>
      <main class="shell__content">
        <p>${intro}</p>
        <p style="margin-top: 8px">Selected: <strong>{{ active() }}</strong></p>
      </main>
    </div>
  </div>
`;

/** Fresh per-render state for the hand-rolled nav. */
const navState = () => ({ nav: NAV, active: signal('Dashboard'), openGroup: signal('') });

const meta: Meta<Sidebar> = {
  title: 'Navigation/Sidebar',
  component: Sidebar,
  decorators: [moduleMetadata({ imports: [Header, Button] })],
  parameters: { layout: 'fullscreen' },
  args: {
    collapsed: false,
    mobileOpen: false,
    collapsedChange: fn(),
    mobileOpenChange: fn(),
  },
  argTypes: {
    collapsed: {
      control: 'boolean',
      description: 'Desktop state: `true` shrinks the rail from 200px to 70px — two-way.',
      table: { defaultValue: { summary: 'false' } },
    },
    mobileOpen: {
      control: 'boolean',
      description:
        'Mobile state (below 768px): `true` slides the drawer in over the content — two-way.',
      table: { defaultValue: { summary: 'false' } },
    },
    collapsedChange: {
      action: 'collapsedChange',
      description: 'Change half of the `collapsed` model.',
      table: { category: 'outputs' },
    },
    mobileOpenChange: {
      action: 'mobileOpenChange',
      description: 'Change half of the `mobileOpen` model.',
      table: { category: 'outputs' },
    },
  },
  render: (args) => ({
    props: { ...args, ...navState() },
    styles: [SHELL_STYLES],
    template: shell(
      argsToTemplate(args),
      'Use the header hamburger to collapse the rail — it calls <code>sidebar.toggle()</code>, which opens the drawer instead below 768px.',
    ),
  }),
};

export default meta;
type Story = StoryObj<Sidebar>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** The 70px icon rail; labels move into each item's `title`. */
export const Collapsed: Story = {
  args: { collapsed: true },
};

/** `collapsed` and `mobileOpen` are `model()`s — set them from anywhere, not just the header. */
export const ControlledFromOutside: Story = {
  render: () => ({
    props: { ...navState(), collapsed: signal(false) },
    styles: [SHELL_STYLES],
    template: `
      <div style="display: flex; align-items: center; gap: 12px; padding: 12px">
        <l-button variant="outlined" size="sm" (click)="collapsed.set(!collapsed())">
          {{ collapsed() ? 'Expand' : 'Collapse' }} rail
        </l-button>
        <span style="font-size: 13px; color: var(--text-secondary)">
          collapsed = {{ collapsed() }}
        </span>
      </div>
      ${shell(
        '[(collapsed)]="collapsed"',
        'The button above and the hamburger both write the same <code>[(collapsed)]</code> signal.',
      )}
    `,
  }),
};
