import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import { LUIChip, type ChipVariant } from '../../../components/ui/chip/chip';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './chip-stories.css';

const DEFAULT_TAGS = ['React', 'Hooks', 'CSS', 'Vitest'];

const variants: ChipVariant[] = [
  'default',
  'primary',
  'success',
  'error',
  'warn',
  'info',
  'premium',
];

const apiInputs: ApiTableRow[] = [
  {
    name: 'variant',
    description: 'Color tint of the chip.',
    type: "'default' | 'primary' | 'success' | 'error' | 'warn' | 'info' | 'premium'",
    default: "'default'",
    example: 'variant="success"',
  },
  {
    name: 'size',
    description: 'Padding and font size of the pill.',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    example: 'size="sm"',
  },
  {
    name: 'dot',
    description: 'Show a leading dot in the variant color.',
    type: 'boolean',
    default: 'false',
    example: 'dot',
  },
  {
    name: 'removable',
    description: 'Show a remove button; pressing it fires onRemoved.',
    type: 'boolean',
    default: 'false',
    example: 'removable',
  },
  {
    name: 'removeLabel',
    description: 'Accessible label for the remove button.',
    type: 'string',
    default: "'Remove'",
    example: 'removeLabel="Remove tag React"',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onRemoved',
    description: 'Fires when the remove button is pressed. The consumer removes the chip.',
    type: '() => void',
    example: 'onRemoved={() => remove(tag)}',
  },
];

export default function ChipStories() {
  const [tags, setTags] = useState([...DEFAULT_TAGS]);

  const remove = (tag: string) => setTags((current) => current.filter((t) => t !== tag));
  const reset = () => setTags([...DEFAULT_TAGS]);

  return (
    <div className="story-page chip-stories">
      <header className="page-header">
        <h1 className="page-header__title">Chip</h1>
        <p className="page-header__lead">
          A pill-shaped label for statuses, tags and filters. Tinted per <code>variant</code>,
          with an optional leading status <code>dot</code> and an optional remove button
          (<code>removable</code> + <code>onRemoved</code>) for dismissible tags.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Variants"
          description="Seven tints: default, primary, success, error, warn, info and premium."
          code={`<LUIChip>default</LUIChip>
<LUIChip variant="success">success</LUIChip>
<LUIChip variant="error">error</LUIChip>`}
        >
          <div className="demo-row">
            {variants.map((variant) => (
              <LUIChip key={variant} variant={variant}>
                {variant}
              </LUIChip>
            ))}
          </div>
        </Story>

        <Story
          title="Status dot"
          description="dot adds a leading dot in the variant color — handy for live statuses."
          code={`<LUIChip variant="success" dot>Active</LUIChip>
<LUIChip variant="error" dot>Failed</LUIChip>`}
        >
          <div className="demo-row">
            <LUIChip dot>Draft</LUIChip>
            <LUIChip variant="success" dot>
              Active
            </LUIChip>
            <LUIChip variant="warn" dot>
              Pending
            </LUIChip>
            <LUIChip variant="error" dot>
              Failed
            </LUIChip>
            <LUIChip variant="info" dot>
              Syncing
            </LUIChip>
          </div>
        </Story>

        <Story
          title="Sizes"
          description="sm, md (default) and lg."
          code={`<LUIChip size="sm">Small</LUIChip>
<LUIChip>Medium</LUIChip>
<LUIChip size="lg">Large</LUIChip>`}
        >
          <div className="demo-row">
            <LUIChip variant="primary" size="sm">
              Small
            </LUIChip>
            <LUIChip variant="primary">Medium</LUIChip>
            <LUIChip variant="primary" size="lg">
              Large
            </LUIChip>
          </div>
        </Story>

        <Story
          title="Removable"
          description="removable shows a close button; onRemoved fires and the consumer drops the chip."
          code={`{tags.map((tag) => (
  <LUIChip key={tag} removable onRemoved={() => remove(tag)}>{tag}</LUIChip>
))}`}
        >
          <div className="demo-col">
            <div className="demo-row">
              {tags.length > 0 ? (
                tags.map((tag) => (
                  <LUIChip
                    key={tag}
                    removable
                    removeLabel={`Remove ${tag}`}
                    onRemoved={() => remove(tag)}
                  >
                    {tag}
                  </LUIChip>
                ))
              ) : (
                <p className="demo-readout">All tags removed.</p>
              )}
            </div>
            <LUIButton variant="outlined" size="sm" onClick={reset}>
              Reset
            </LUIButton>
          </div>
        </Story>

        <ApiTable
          component="LUIChip"
          note="Children become the label — anything between the tags is rendered inside the pill. Variant colors resolve into the --l-chip-bg / --l-chip-color custom properties, so a theme can restyle chips by overriding that pair."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
