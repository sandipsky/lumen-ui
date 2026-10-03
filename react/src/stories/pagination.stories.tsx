import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useArgs } from 'storybook/preview-api';
import { fn } from 'storybook/test';
import { LUIPagination, type LUIPaginationProps } from '@lumen-ui/react';

const meta = {
  title: 'Navigation/Pagination',
  component: LUIPagination,
  args: {
    length: 234,
    pageSizeOptions: [10, 25, 50, 100],
    pageSize: 10,
    pageIndex: 0,
    onPageChange: fn(),
    onPageIndexChange: fn(),
    onPageSizeChange: fn(),
  },
  argTypes: {
    length: { control: { type: 'number', min: 0 }, table: { defaultValue: { summary: '0' } } },
    pageSizeOptions: {
      control: 'object',
      description: 'Choices offered by the page-size dropdown.',
      table: { defaultValue: { summary: '[10, 25, 50, 100]' } },
    },
    pageSize: { control: { type: 'number', min: 1 }, table: { defaultValue: { summary: '10' } } },
    pageIndex: { control: { type: 'number', min: 0 }, table: { defaultValue: { summary: '0' } } },
  },
  // `pageIndex` / `pageSize` are controlled here, so write changes back to the args.
  render: function Render(args) {
    const [, updateArgs] = useArgs<LUIPaginationProps>();
    return (
      <LUIPagination
        {...args}
        onPageIndexChange={(pageIndex) => {
          args.onPageIndexChange?.(pageIndex);
          updateArgs({ pageIndex });
        }}
        onPageSizeChange={(pageSize) => {
          args.onPageSizeChange?.(pageSize);
          updateArgs({ pageSize });
        }}
      />
    );
  },
} satisfies Meta<typeof LUIPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Every prop is wired to a control — use this one to play. */
export const Playground: Story = {};

/** Override the page-size dropdown options. */
export const CustomPageSizes: Story = {
  args: { pageSizeOptions: [5, 10, 20] },
};

/** With a small dataset the page strip simply shows every page. */
export const FewPages: Story = {
  args: { length: 18 },
};

/** Controlled usage: own `pageIndex` / `pageSize` state and update it from the callbacks. */
export const Controlled: Story = {
  render: function Render() {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    return (
      <>
        <LUIPagination
          length={234}
          pageIndex={page}
          pageSize={size}
          onPageIndexChange={setPage}
          onPageSizeChange={setSize}
        />
        <p style={{ margin: '12px 0 0', fontSize: 13, color: 'var(--text-secondary)' }}>
          pageIndex: {page} · pageSize: {size}
        </p>
      </>
    );
  },
};
