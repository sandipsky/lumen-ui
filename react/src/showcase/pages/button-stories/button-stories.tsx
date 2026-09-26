import { LUIButton } from '../../../components/ui/button/button';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './button-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'variant',
    description: 'Visual style of the button.',
    type: "'primary' | 'secondary' | 'outlined' | 'outlined-primary' | 'danger' | 'ghost'",
    default: "'primary'",
    example: 'variant="ghost"',
  },
  {
    name: 'size',
    description: 'Padding scale — sm 4×8, md 6×12, lg 8×16 (px).',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    example: 'size="lg"',
  },
  {
    name: 'width',
    description: 'auto fits the content, full fills the parent width.',
    type: "'auto' | 'full'",
    default: "'auto'",
    example: 'width="full"',
  },
  {
    name: 'rounded',
    description: 'Render as a circular icon button.',
    type: 'boolean',
    default: 'false',
    example: 'rounded',
  },
  {
    name: 'disabled',
    description: 'Disable the underlying native button.',
    type: 'boolean',
    default: 'false',
    example: 'disabled',
  },
];

export default function ButtonStories() {
  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Button</h1>
        <p className="page-header__lead">
          Clickable action element. Configurable by variant, size, width, rounded and disabled
          state.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Variants"
          description="primary, secondary, outlined, outlined-primary, danger and ghost."
          code={`<LUIButton variant="primary">Primary</LUIButton>
<LUIButton variant="secondary">Secondary</LUIButton>
<LUIButton variant="outlined">Outlined</LUIButton>
<LUIButton variant="outlined-primary">Outlined Primary</LUIButton>
<LUIButton variant="danger">Danger</LUIButton>
<LUIButton variant="ghost">Ghost</LUIButton>`}
        >
          <LUIButton variant="primary">Primary</LUIButton>
          <LUIButton variant="secondary">Secondary</LUIButton>
          <LUIButton variant="outlined">Outlined</LUIButton>
          <LUIButton variant="outlined-primary">Outlined Primary</LUIButton>
          <LUIButton variant="danger">Danger</LUIButton>
          <LUIButton variant="ghost">Ghost</LUIButton>
        </Story>

        <Story
          title="Sizes"
          description="sm (4×8), md (6×12, default) and lg (8×16)."
          code={`<LUIButton size="sm">Small</LUIButton>
<LUIButton size="md">Medium</LUIButton>
<LUIButton size="lg">Large</LUIButton>`}
        >
          <LUIButton size="sm">Small</LUIButton>
          <LUIButton size="md">Medium</LUIButton>
          <LUIButton size="lg">Large</LUIButton>
        </Story>

        <Story
          title="Width"
          description="auto fits content (default); full fills the parent."
          code={`<LUIButton width="auto">Auto (fits content)</LUIButton>
<LUIButton width="full">Full width</LUIButton>`}
        >
          <div className="width-demo">
            <LUIButton width="auto">Auto (fits content)</LUIButton>
            <LUIButton width="full">Full width</LUIButton>
          </div>
        </Story>

        <Story
          title="Rounded"
          description="Circular icon button with size-matched dimensions."
          code={`<LUIButton size="sm" rounded>+</LUIButton>
<LUIButton size="md" rounded>+</LUIButton>
<LUIButton size="lg" rounded>+</LUIButton>
<LUIButton variant="outlined" rounded>×</LUIButton>`}
        >
          <LUIButton size="sm" rounded>
            +
          </LUIButton>
          <LUIButton size="md" rounded>
            +
          </LUIButton>
          <LUIButton size="lg" rounded>
            +
          </LUIButton>
          <LUIButton variant="outlined" rounded>
            ×
          </LUIButton>
        </Story>

        <Story
          title="Disabled"
          description="Non-interactive state across variants."
          code={`<LUIButton variant="primary" disabled>Primary</LUIButton>
<LUIButton variant="outlined" disabled>Outlined</LUIButton>`}
        >
          <LUIButton variant="primary" disabled>
            Primary
          </LUIButton>
          <LUIButton variant="outlined" disabled>
            Outlined
          </LUIButton>
        </Story>

        <ApiTable
          component="LUIButton"
          note="Wraps a native button element — all native button props (onClick, disabled, type, ref, …) pass through. The label and any icons are passed as children."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
