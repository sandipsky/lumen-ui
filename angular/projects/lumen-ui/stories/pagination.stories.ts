import { Pagination } from '@lumen-ui/angular';
import { argsToTemplate, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

const meta: Meta<Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  args: {
    length: 234,
    pageSizeOptions: [10, 25, 50, 100],
    pageSize: 10,
    pageIndex: 0,
    pageChange: fn(),
    pageIndexChange: fn(),
    pageSizeChange: fn(),
  },
  argTypes: {
    length: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items being paginated; drives the page count.',
      table: { defaultValue: { summary: '0' } },
    },
    pageSizeOptions: {
      control: 'object',
      description: 'Choices offered by the page-size dropdown.',
      table: { defaultValue: { summary: '[10, 25, 50, 100]' } },
    },
    pageSize: {
      control: { type: 'number', min: 1 },
      description:
        'Items per page. Two-way bindable (`model()`); changing it resets to the first page.',
      table: { defaultValue: { summary: '10' } },
    },
    pageIndex: {
      control: { type: 'number', min: 0 },
      description: 'Zero-based index of the current page. Two-way bindable (`model()`).',
      table: { defaultValue: { summary: '0' } },
    },
    pageChange: {
      action: 'pageChange',
      description: 'Emits a `PageEvent` (`{ pageIndex, pageSize, length }`) on every change.',
    },
    pageIndexChange: {
      action: 'pageIndexChange',
      description: 'The `model()` half of `[(pageIndex)]`.',
    },
    pageSizeChange: {
      action: 'pageSizeChange',
      description: 'The `model()` half of `[(pageSize)]`.',
    },
  },
  render: (args) => ({
    props: args,
    template: `<l-pagination ${argsToTemplate(args)} />`,
  }),
};

export default meta;
type Story = StoryObj<Pagination>;

/** Every input is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Override the page-size dropdown options. */
export const CustomPageSizes: Story = {
  args: { pageSizeOptions: [5, 10, 20] },
};

/** With a small dataset the page strip simply shows every page. */
export const FewPages: Story = {
  args: { length: 18 },
};

/** `pageIndex` and `pageSize` are `model()`s — bind them two-way to keep your own state. */
export const Controlled: Story = {
  render: () => ({
    props: { page: 0, size: 10 },
    template: `
      <l-pagination [length]="234" [(pageIndex)]="page" [(pageSize)]="size" />
      <p style="margin: 12px 0 0; font-size: 13px; color: var(--text-secondary)">
        pageIndex: {{ page }} · pageSize: {{ size }}
      </p>
    `,
  }),
};
