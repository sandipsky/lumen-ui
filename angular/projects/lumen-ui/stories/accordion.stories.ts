import { Accordion, AccordionItem } from '@lumen-ui/angular';
import { argsToTemplate, moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { fn } from 'storybook/test';

type AccordionStoryArgs = Accordion & { openedChange: (open: boolean) => void };

const meta: Meta<AccordionStoryArgs> = {
  title: 'Data Display/Accordion',
  component: Accordion,
  decorators: [moduleMetadata({ imports: [AccordionItem] })],
  args: {
    multiple: false,
    variant: 'contained',
    iconPosition: 'right',
    openedChange: fn(),
  },
  argTypes: {
    multiple: {
      control: 'boolean',
      description: 'Allow more than one panel to be open simultaneously. Default: single-open.',
      table: { defaultValue: { summary: 'false' } },
    },
    variant: {
      control: 'inline-radio',
      options: ['contained', 'separated'],
      description: '`contained` (one bordered list with dividers) or `separated` (spaced cards).',
      table: { defaultValue: { summary: "'contained'" } },
    },
    iconPosition: {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Which side the chevron sits on.',
      table: { defaultValue: { summary: "'right'" } },
    },
    openedChange: {
      action: 'openedChange',
      description:
        '`<l-accordion-item>` output — emits the new open state whenever the item expands or collapses. Item inputs: `title`, `disabled`, `expanded` (initial state), `id`.',
      table: { category: 'outputs' },
    },
  },
  render: ({ openedChange, ...args }) => ({
    props: { ...args, openedChange },
    template: `
      <l-accordion ${argsToTemplate(args)}>
        <l-accordion-item
          title="What is LumenUI?"
          [expanded]="true"
          (openedChange)="openedChange($event)"
        >
          A signal-based Angular component library — standalone components, OnPush everywhere,
          themeable through CSS custom properties.
        </l-accordion-item>
        <l-accordion-item title="Is it themeable?" (openedChange)="openedChange($event)">
          Yes. Colors, spacing, radius and typography are all driven by tokens, so a single token
          change re-themes the whole library.
        </l-accordion-item>
        <l-accordion-item title="Does it support dark mode?" (openedChange)="openedChange($event)">
          Tokens flip with the active theme, so components adapt without per-component edits.
        </l-accordion-item>
      </l-accordion>
    `,
  }),
};

export default meta;
type Story = StoryObj<AccordionStoryArgs>;

/** Single-open by default: opening one section collapses the others. */
export const Playground: Story = {};

/** With `[multiple]="true"` any number of panels can be open at once. */
export const MultipleOpen: Story = {
  render: () => ({
    template: `
      <l-accordion [multiple]="true">
        <l-accordion-item title="Shipping" [expanded]="true">
          Orders ship within two business days via your selected carrier.
        </l-accordion-item>
        <l-accordion-item title="Returns" [expanded]="true">
          Free returns within 30 days — no questions asked.
        </l-accordion-item>
        <l-accordion-item title="Warranty">
          Every product is covered by a two-year limited warranty.
        </l-accordion-item>
      </l-accordion>
    `,
  }),
};

/** `variant="separated"` renders each item as its own spaced card. */
export const Separated: Story = {
  render: () => ({
    template: `
      <l-accordion variant="separated">
        <l-accordion-item title="Step one — Install">
          Add the package and import the standalone components you need.
        </l-accordion-item>
        <l-accordion-item title="Step two — Compose">
          Drop accordion items inside an accordion.
        </l-accordion-item>
        <l-accordion-item title="Step three — Theme">
          Override the design tokens to match your brand.
        </l-accordion-item>
      </l-accordion>
    `,
  }),
};

/**
 * `iconPosition="left"` moves the chevron ahead of the title. A disabled item can't be toggled
 * and is skipped by Arrow/Home/End keyboard navigation.
 */
export const IconLeftAndDisabled: Story = {
  render: () => ({
    template: `
      <l-accordion iconPosition="left">
        <l-accordion-item title="Available now">This section toggles normally.</l-accordion-item>
        <l-accordion-item title="Coming soon" [disabled]="true">
          Locked until release.
        </l-accordion-item>
        <l-accordion-item title="Also available">Another section you can open.</l-accordion-item>
      </l-accordion>
    `,
  }),
};

/** Project markup into the `slot="title"` header and any content into the panel. */
export const CustomHeader: Story = {
  render: () => ({
    template: `
      <l-accordion variant="separated">
        <l-accordion-item [expanded]="true">
          <span slot="title">⭐ Featured <strong>section</strong></span>
          <p>The header above is projected markup rather than a plain string.</p>
          <p>Panels can hold paragraphs, lists, forms, or nested components.</p>
        </l-accordion-item>
        <l-accordion-item title="Plain header">
          Mix projected and string headers freely within the same accordion.
        </l-accordion-item>
      </l-accordion>
    `,
  }),
};
