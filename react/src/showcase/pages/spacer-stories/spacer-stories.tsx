import { LUISpacer } from '../../../components/ui/layout/spacer';
import { LUIFlex } from '../../../components/ui/layout/flex';
import { LUIButton } from '../../../components/ui/button/button';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './spacer-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'h',
    description: 'Vertical space — sets the height. Preset (xs 4px, sm 8px, md 16px, lg 24px, xl 32px), a pixel number, or any CSS size.',
    type: "SpacerSize — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string",
    default: '—',
    example: 'h="md"',
  },
  {
    name: 'w',
    description: 'Horizontal space — sets the width. Same values as h.',
    type: "SpacerSize — 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number | string",
    default: '—',
    example: 'w={24}',
  },
];

const PRESETS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SpacerStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Spacer</h1>
        <p className="page-header__lead">
          Empty block that adds fixed space between elements — inspired by Mantine's Space. Use h
          for vertical gaps and w for horizontal ones; it never shrinks inside flex layouts.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Vertical"
          description="Push siblings apart in a stack with h."
          code={`<div className="box">First</div>
<LUISpacer h="md" />
<div className="box">Second</div>`}
        >
          <div className="spacer-demo-col">
            <div className="spacer-demo-box">First</div>
            <LUISpacer h="md" />
            <div className="spacer-demo-box">Second</div>
          </div>
        </Story>

        <Story
          title="Horizontal"
          description="Separate items in a row with w."
          code={`<LUIFlex align="center">
  <LUIButton>Save</LUIButton>
  <LUISpacer w={24} />
  <LUIButton variant="outlined">Cancel</LUIButton>
</LUIFlex>`}
        >
          <LUIFlex align="center">
            <LUIButton>Save</LUIButton>
            <LUISpacer w={24} />
            <LUIButton variant="outlined">Cancel</LUIButton>
          </LUIFlex>
        </Story>

        <Story
          title="Preset sizes"
          description="The five presets — xs 4px, sm 8px, md 16px, lg 24px, xl 32px."
          code={'<LUISpacer h="xs" /> … <LUISpacer h="xl" />'}
        >
          <div className="spacer-demo-col">
            {PRESETS.map((size) => (
              <div key={size} className="spacer-demo-row">
                <span className="spacer-demo-label">{size}</span>
                <LUISpacer w={size} className="spacer-demo-visual" />
              </div>
            ))}
          </div>
        </Story>

        <Story
          title="Custom sizes"
          description="A number is pixels; any CSS size string also works."
          code={`<LUISpacer h={40} />
<LUISpacer h="3rem" />`}
        >
          <div className="spacer-demo-col">
            <div className="spacer-demo-box">40px below</div>
            <LUISpacer h={40} />
            <div className="spacer-demo-box">3rem below</div>
            <LUISpacer h="3rem" />
            <div className="spacer-demo-box">End</div>
          </div>
        </Story>

        <ApiTable
          component="LUISpacer"
          note="Renders an empty aria-hidden div with the given width/height and flex-shrink: 0 — all native div props (className, style, …) pass through. For repeated equal gaps prefer LUIFlex's gap; reach for LUISpacer when a single one-off space is clearer."
          inputs={apiInputs}
          outputs={[]}
        />
      </div>
    </div>
  );
}
