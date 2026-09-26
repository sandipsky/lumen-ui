import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import { LUICard, type CardPadding, type CardShadow } from '../../../components/ui/card/card';
import { LUIChip } from '../../../components/ui/chip/chip';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './card-stories.css';

const paddings: CardPadding[] = ['none', 'sm', 'md', 'lg'];
const shadows: CardShadow[] = ['none', 'sm', 'md', 'lg'];

const apiInputs: ApiTableRow[] = [
  {
    name: 'variant',
    description: 'Surface tint — dark uses the darker section background.',
    type: "'default' | 'dark'",
    default: "'default'",
    example: 'variant="dark"',
  },
  {
    name: 'padding',
    description: 'Inner padding of each region: none 0, sm 8, md 12, lg 20 (px).',
    type: "'none' | 'sm' | 'md' | 'lg'",
    default: "'md'",
    example: 'padding="lg"',
  },
  {
    name: 'shadow',
    description: 'Drop-shadow strength.',
    type: "'none' | 'sm' | 'md' | 'lg'",
    default: "'none'",
    example: 'shadow="sm"',
  },
  {
    name: 'bordered',
    description: 'Show the 1px border around the card.',
    type: 'boolean',
    default: 'true',
    example: 'bordered={false}',
  },
  {
    name: 'hoverable',
    description: 'Lift the card and add a shadow on hover — for clickable cards.',
    type: 'boolean',
    default: 'false',
    example: 'hoverable',
  },
  {
    name: 'title',
    description: 'Header title, rendered on the left. Adding it (or extra) shows the header.',
    type: 'ReactNode',
    example: 'title="Project settings"',
  },
  {
    name: 'extra',
    description: 'Header content rendered on the right (actions, links).',
    type: 'ReactNode',
    example: 'extra={<LUIButton size="sm">Edit</LUIButton>}',
  },
  {
    name: 'footer',
    description: 'Footer content, separated from the body by a divider.',
    type: 'ReactNode',
    example: 'footer="Updated 2 days ago"',
  },
];

export default function CardStories() {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="story-page card-stories">
      <header className="page-header">
        <h1 className="page-header__title">Card</h1>
        <p className="page-header__lead">
          A surface container for grouping related content — the shared page-section style
          (<code>section.css</code>) as a component. Optional <code>title</code>/<code>extra</code> header
          and <code>footer</code> slots, with <code>padding</code>, <code>shadow</code>,{' '}
          <code>bordered</code> and <code>hoverable</code> presentation props.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Children render in the card body. Native div props (onClick, style, ...) flow through."
          code={`<LUICard>
  Any content goes here.
</LUICard>`}
        >
          <LUICard className="demo-card">
            A plain card — 12px padding, 12px radius, 1px separator border on the lightest
            background.
          </LUICard>
        </Story>

        <Story
          title="Header and footer"
          description="title renders a header (left), extra sits on its right, footer gets a top divider."
          code={`<LUICard
  title="Project settings"
  extra={<LUIButton variant="ghost" size="sm">Edit</LUIButton>}
  footer="Updated 2 days ago"
>
  Body content.
</LUICard>`}
        >
          <LUICard
            className="demo-card"
            title="Project settings"
            extra={
              <LUIButton variant="ghost" size="sm">
                Edit
              </LUIButton>
            }
            footer="Updated 2 days ago"
          >
            Configure the project name, visibility and default branch. The header and footer are
            separated from the body by full-width dividers.
          </LUICard>
        </Story>

        <Story
          title="Variants"
          description="default sits on the lightest background; dark uses the darker section tint."
          code={`<LUICard title="Default">...</LUICard>
<LUICard variant="dark" title="Dark">...</LUICard>`}
        >
          <div className="demo-grid">
            <LUICard title="Default">Lightest surface (--bg-lightest).</LUICard>
            <LUICard variant="dark" title="Dark">
              Darker surface (--bg-light).
            </LUICard>
          </div>
        </Story>

        <Story
          title="Padding"
          description="none, sm, md (default) and lg — applied to each region so dividers stay full-width."
          code={`<LUICard padding="none">...</LUICard>
<LUICard padding="lg">...</LUICard>`}
        >
          <div className="demo-grid">
            {paddings.map((padding) => (
              <LUICard key={padding} padding={padding} title={`padding="${padding}"`}>
                Body content.
              </LUICard>
            ))}
          </div>
        </Story>

        <Story
          title="Shadow"
          description="Four elevations, from flat (none, the default) to lg."
          code={`<LUICard shadow="sm">...</LUICard>
<LUICard shadow="lg" bordered={false}>...</LUICard>`}
        >
          <div className="demo-grid">
            {shadows.map((shadow) => (
              <LUICard key={shadow} shadow={shadow} title={`shadow="${shadow}"`}>
                Body content.
              </LUICard>
            ))}
          </div>
        </Story>

        <Story
          title="Hoverable"
          description="hoverable lifts the card on hover — pair it with onClick for clickable cards."
          code={`<LUICard hoverable onClick={open}>
  ...
</LUICard>`}
        >
          <div className="demo-grid">
            <LUICard
              hoverable
              title="Quarterly report"
              extra={<LUIChip variant="success" dot>Ready</LUIChip>}
              footer={`Opened ${clicks} time${clicks === 1 ? '' : 's'}`}
              onClick={() => setClicks((c) => c + 1)}
            >
              Click anywhere on the card to open it.
            </LUICard>
          </div>
        </Story>

        <ApiTable
          component="LUICard"
          note="Children become the card body. LUICard extends the native div props (minus title), so onClick, style, aria-* etc. flow through. Region padding resolves into the --l-card-pad custom property, so a theme can restyle spacing by overriding it."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
