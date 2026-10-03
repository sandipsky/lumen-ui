import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { LUIAccordion, LUIAccordionItem, type LUIAccordionProps } from '@lumen-ui/react';

type AccordionStoryArgs = LUIAccordionProps & { onOpenedChange: (open: boolean) => void };

const meta = {
  title: 'Data Display/Accordion',
  component: LUIAccordion,
  subcomponents: { LUIAccordionItem },
  args: {
    multiple: false,
    variant: 'contained',
    iconPosition: 'right',
    onOpenedChange: fn(),
  },
  argTypes: {
    multiple: { control: 'boolean', table: { defaultValue: { summary: 'false' } } },
    variant: {
      control: 'inline-radio',
      options: ['contained', 'separated'],
      table: { defaultValue: { summary: "'contained'" } },
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      table: { defaultValue: { summary: "'right'" } },
    },
    onOpenedChange: {
      description:
        '`LUIAccordionItem` callback — called with the new open state whenever the item expands or collapses.',
      table: { category: 'events' },
    },
    children: { control: false },
  },
  render: ({ onOpenedChange, ...args }) => (
    <LUIAccordion {...args}>
      <LUIAccordionItem title="What is LumenUI?" expanded onOpenedChange={onOpenedChange}>
        A React component library — function components and hooks, themeable through CSS custom
        properties.
      </LUIAccordionItem>
      <LUIAccordionItem title="Is it themeable?" onOpenedChange={onOpenedChange}>
        Yes. Colors, spacing, radius and typography are all driven by tokens, so a single token
        change re-themes the whole library.
      </LUIAccordionItem>
      <LUIAccordionItem title="Does it support dark mode?" onOpenedChange={onOpenedChange}>
        Tokens flip with the active theme, so components adapt without per-component edits.
      </LUIAccordionItem>
    </LUIAccordion>
  ),
} satisfies Meta<AccordionStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Single-open by default: opening one section collapses the others. */
export const Playground: Story = {};

/** With `multiple` any number of panels can be open at once. */
export const MultipleOpen: Story = {
  render: () => (
    <LUIAccordion multiple>
      <LUIAccordionItem title="Shipping" expanded>
        Orders ship within two business days via your selected carrier.
      </LUIAccordionItem>
      <LUIAccordionItem title="Returns" expanded>
        Free returns within 30 days — no questions asked.
      </LUIAccordionItem>
      <LUIAccordionItem title="Warranty">
        Every product is covered by a two-year limited warranty.
      </LUIAccordionItem>
    </LUIAccordion>
  ),
};

/** `variant="separated"` renders each item as its own spaced card. */
export const Separated: Story = {
  render: () => (
    <LUIAccordion variant="separated">
      <LUIAccordionItem title="Step one — Install">
        Add the package and import the components you need.
      </LUIAccordionItem>
      <LUIAccordionItem title="Step two — Compose">
        Drop accordion items inside an accordion.
      </LUIAccordionItem>
      <LUIAccordionItem title="Step three — Theme">
        Override the design tokens to match your brand.
      </LUIAccordionItem>
    </LUIAccordion>
  ),
};

/**
 * `iconPosition="left"` moves the chevron ahead of the title. A disabled item can't be toggled
 * and is skipped by Arrow/Home/End keyboard navigation.
 */
export const IconLeftAndDisabled: Story = {
  render: () => (
    <LUIAccordion iconPosition="left">
      <LUIAccordionItem title="Available now">This section toggles normally.</LUIAccordionItem>
      <LUIAccordionItem title="Coming soon" disabled>
        Locked until release.
      </LUIAccordionItem>
      <LUIAccordionItem title="Also available">Another section you can open.</LUIAccordionItem>
    </LUIAccordion>
  ),
};

/** `title` accepts any ReactNode — the counterpart of Angular's `slot="title"` projection. */
export const CustomHeader: Story = {
  render: () => (
    <LUIAccordion variant="separated">
      <LUIAccordionItem
        expanded
        title={
          <span>
            ⭐ Featured <strong>section</strong>
          </span>
        }
      >
        <p>The header above is markup rather than a plain string.</p>
        <p>Panels can hold paragraphs, lists, forms, or nested components.</p>
      </LUIAccordionItem>
      <LUIAccordionItem title="Plain header">
        Mix markup and string headers freely within the same accordion.
      </LUIAccordionItem>
    </LUIAccordion>
  ),
};
