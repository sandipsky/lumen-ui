import { LUIAccordion } from '../../../components/ui/accordion/accordion';
import { LUIAccordionItem } from '../../../components/ui/accordion/accordion-item';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './accordion-stories.css';

const accordionApiInputs: ApiTableRow[] = [
  {
    name: 'multiple',
    description: 'Allow more than one panel to be open simultaneously. Default: single-open.',
    type: 'boolean',
    default: 'false',
    example: 'multiple',
  },
  {
    name: 'variant',
    description: "'contained' (one bordered list with dividers) or 'separated' (spaced cards).",
    type: "'contained' | 'separated'",
    default: "'contained'",
    example: 'variant="separated"',
  },
  {
    name: 'iconPosition',
    description: 'Which side the chevron sits on.',
    type: "'left' | 'right'",
    default: "'right'",
    example: 'iconPosition="left"',
  },
];

const itemApiInputs: ApiTableRow[] = [
  {
    name: 'title',
    description:
      'Header content. Accepts rich markup (the React counterpart of the Angular title slot).',
    type: 'ReactNode',
    default: "''",
    example: 'title="Shipping"',
  },
  {
    name: 'disabled',
    description: 'Disable toggling; the header is skipped by keyboard navigation.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
  {
    name: 'expanded',
    description:
      'Whether this item starts open (applied once, when it registers with the accordion).',
    type: 'boolean',
    default: 'false',
    example: 'expanded',
  },
  {
    name: 'id',
    description: 'Id for the header/panel pair; auto-generated when omitted.',
    type: 'string',
    default: 'auto',
    example: 'id="faq-shipping"',
  },
];

const itemApiOutputs: ApiTableRow[] = [
  {
    name: 'onOpenedChange',
    description: 'Called with the new open state whenever this item expands or collapses.',
    type: 'boolean',
    example: 'onOpenedChange={(open) => onOpen(open)}',
  },
];

export default function AccordionStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Accordion</h1>
        <p className="page-header__lead">
          A stack of collapsible sections composed from <code>&lt;LUIAccordion&gt;</code> and{' '}
          <code>&lt;LUIAccordionItem&gt;</code>. Single-open by default; set{' '}
          <code>multiple</code> to keep several panels open. Choose the <code>contained</code> or{' '}
          <code>separated</code> variant, place the chevron with <code>iconPosition</code>, and put
          any markup in a panel. Headers are real buttons with full keyboard support (Arrow keys,
          Home/End, Enter/Space) and the panel height animates with a pure-CSS grid transition.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic (single-open)"
          description="Opening one section collapses the others. Each item starts closed; set expanded to open one initially."
          code={`<LUIAccordion>
  <LUIAccordionItem title="What is LumenUI?" expanded>
    A polished React component library.
  </LUIAccordionItem>
  <LUIAccordionItem title="Is it themeable?">
    Yes — every color and spacing is a token.
  </LUIAccordionItem>
</LUIAccordion>`}
        >
          <LUIAccordion>
            <LUIAccordionItem title="What is LumenUI?" expanded>
              A polished React component library built on React 19 — plain function components,
              React Compiler optimized, themeable through CSS design tokens.
            </LUIAccordionItem>
            <LUIAccordionItem title="Is it themeable?">
              Yes. Colors, spacing, radius and typography are all driven by CSS custom properties,
              so a single token change re-themes the whole library.
            </LUIAccordionItem>
            <LUIAccordionItem title="Does it support dark mode?">
              Tokens flip with the active theme, so components adapt without per-component edits.
            </LUIAccordionItem>
          </LUIAccordion>
        </Story>

        <Story
          title="Multiple open"
          description="With multiple any number of panels can be open at once."
          code={`<LUIAccordion multiple>…</LUIAccordion>`}
        >
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
        </Story>

        <Story
          title="Separated variant"
          description="variant='separated' renders each item as its own spaced card."
          code={`<LUIAccordion variant="separated">…</LUIAccordion>`}
        >
          <LUIAccordion variant="separated">
            <LUIAccordionItem title="Step one — Install">
              Add the package and import the components you need.
            </LUIAccordionItem>
            <LUIAccordionItem title="Step two — Compose">
              Drop <code>&lt;LUIAccordionItem&gt;</code> elements inside an accordion.
            </LUIAccordionItem>
            <LUIAccordionItem title="Step three — Theme">
              Override the design tokens to match your brand.
            </LUIAccordionItem>
          </LUIAccordion>
        </Story>

        <Story
          title="Icon on the left + disabled item"
          description="iconPosition='left' moves the chevron ahead of the title. A disabled item can't be toggled and is skipped by keyboard nav."
          code={`<LUIAccordion iconPosition="left">
  <LUIAccordionItem title="Available">…</LUIAccordionItem>
  <LUIAccordionItem title="Coming soon" disabled>…</LUIAccordionItem>
</LUIAccordion>`}
        >
          <LUIAccordion iconPosition="left">
            <LUIAccordionItem title="Available now">This section toggles normally.</LUIAccordionItem>
            <LUIAccordionItem title="Coming soon" disabled>
              Locked until release.
            </LUIAccordionItem>
            <LUIAccordionItem title="Also available">Another open-able section.</LUIAccordionItem>
          </LUIAccordion>
        </Story>

        <Story
          title="Rich content"
          description="Put any markup — including other LumenUI components — in a panel, and pass a custom header as JSX through the title prop."
          code={`<LUIAccordionItem title={<span>Custom <strong>header</strong></span>}>
  <p>Any content goes here.</p>
</LUIAccordionItem>`}
        >
          <LUIAccordion variant="separated">
            <LUIAccordionItem title={<span>⭐ Featured section</span>}>
              <p>The header above is JSX rather than a plain string.</p>
              <p>Panels can hold paragraphs, lists, forms, or nested components.</p>
            </LUIAccordionItem>
            <LUIAccordionItem title="Plain header">
              Mix JSX and string headers freely within the same accordion.
            </LUIAccordionItem>
          </LUIAccordion>
        </Story>

        <ApiTable
          component="LUIAccordion"
          note="Container that owns the open state — single-open unless multiple. Headers support Arrow/Home/End roving focus. No callbacks; listen on each item's onOpenedChange."
          inputs={accordionApiInputs}
        />

        <ApiTable
          component="LUIAccordionItem"
          note="One collapsible section. Panel content is children; a custom header goes into the title prop (any ReactNode). Open state lives on the parent accordion — this component only reflects it."
          inputs={itemApiInputs}
          outputs={itemApiOutputs}
        />
      </div>
    </div>
  );
}
