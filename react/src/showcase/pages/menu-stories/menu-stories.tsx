import { useState } from 'react';
import { LUIButton } from '../../../components/ui/button/button';
import { LUIMenu } from '../../../components/ui/menu/menu';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './menu-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'mode',
    description: 'Which trigger edge the panel aligns to.',
    type: "'left' | 'right'",
    default: "'left'",
    example: 'mode="right"',
  },
  {
    name: 'closeOnItemClick',
    description: 'Close the panel when the panel content is clicked.',
    type: 'boolean',
    default: 'true',
    example: 'closeOnItemClick={false}',
  },
  {
    name: 'contentMode',
    description: "Drop the panel's inner padding (for custom, edge-to-edge content).",
    type: 'boolean',
    default: 'false',
    example: 'contentMode',
  },
  {
    name: 'showActiveState',
    description: 'Highlight the trigger while the panel is open.',
    type: 'boolean',
    default: 'true',
    example: 'showActiveState={false}',
  },
  {
    name: 'dropdownDisplay',
    description: "The trigger element (Angular's [dropdown-display] slot).",
    type: 'ReactNode',
    example: 'dropdownDisplay={<LUIButton>Open</LUIButton>}',
  },
];

export default function MenuStories() {
  const [lastAction, setLastAction] = useState('—');

  const pick = (action: string): void => {
    setLastAction(action);
  };

  return (
    <div className="story-page menu-stories">
      <header className="page-header">
        <h1 className="page-header__title">Menu</h1>
        <p className="page-header__lead">
          A lightweight dropdown / popover. Pass the trigger via the <code>dropdownDisplay</code>{' '}
          prop and the panel contents as children (clickable rows get the{' '}
          <code>dropdown-item</code> class). The panel renders in a fixed layer anchored to the
          trigger, so it escapes any <code>overflow</code> clipping, flips above the trigger when
          there isn't room below, and stays anchored while the page scrolls — the same behavior as
          the <code>LUISelect</code> dropdown. Scroll this page so a trigger sits near the bottom
          edge and the panel opens upward.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="A trigger plus items. By default the menu closes when an item is clicked."
          code={`<LUIMenu dropdownDisplay={<LUIButton variant="outlined">Actions</LUIButton>}>
  <div className="dropdown-item" onClick={() => pick('Edit')}>Edit</div>
  <div className="dropdown-item" onClick={() => pick('Duplicate')}>Duplicate</div>
  <div className="dropdown-item" onClick={() => pick('Archive')}>Archive</div>
</LUIMenu>`}
        >
          <div className="demo-col">
            <LUIMenu dropdownDisplay={<LUIButton variant="outlined">Actions</LUIButton>}>
              <div className="dropdown-item" onClick={() => pick('Edit')}>
                Edit
              </div>
              <div className="dropdown-item" onClick={() => pick('Duplicate')}>
                Duplicate
              </div>
              <div className="dropdown-item" onClick={() => pick('Archive')}>
                Archive
              </div>
            </LUIMenu>
            <p className="demo-readout">Last action: {lastAction}</p>
          </div>
        </Story>

        <Story
          title="Right aligned"
          description="mode='right' anchors the panel's right edge to the trigger — for menus that sit near the right edge of a toolbar."
          code={`<LUIMenu mode="right" dropdownDisplay={<LUIButton variant="outlined">Options</LUIButton>}>
  <div className="dropdown-item">Profile</div>
  <div className="dropdown-item">Settings</div>
  <div className="dropdown-item">Sign out</div>
</LUIMenu>`}
        >
          <LUIMenu mode="right" dropdownDisplay={<LUIButton variant="outlined">Options</LUIButton>}>
            <div className="dropdown-item">Profile</div>
            <div className="dropdown-item">Settings</div>
            <div className="dropdown-item">Sign out</div>
          </LUIMenu>
        </Story>

        <Story
          title="Active item"
          description="Add the 'active' class to an item to mark the current choice."
          code={`<LUIMenu dropdownDisplay={<LUIButton variant="outlined">Sort by</LUIButton>}>
  <div className="dropdown-item active">Newest</div>
  <div className="dropdown-item">Oldest</div>
  <div className="dropdown-item">A–Z</div>
</LUIMenu>`}
        >
          <LUIMenu dropdownDisplay={<LUIButton variant="outlined">Sort by</LUIButton>}>
            <div className="dropdown-item active">Newest</div>
            <div className="dropdown-item">Oldest</div>
            <div className="dropdown-item">A–Z</div>
          </LUIMenu>
        </Story>

        <Story
          title="Custom content (stays open)"
          description="Pass arbitrary markup as children, and set closeOnItemClick={false} + contentMode so clicks inside don't dismiss it and the default padding is dropped."
          code={`<LUIMenu
  closeOnItemClick={false}
  contentMode
  dropdownDisplay={<LUIButton variant="outlined">Account</LUIButton>}
>
  <div className="card"> … custom panel … </div>
</LUIMenu>`}
        >
          <LUIMenu
            closeOnItemClick={false}
            contentMode
            dropdownDisplay={<LUIButton variant="outlined">Account</LUIButton>}
          >
            <div className="menu-card">
              <p className="menu-card__name">Ada Lovelace</p>
              <p className="menu-card__email">ada@lumen.ui</p>
              <hr className="menu-card__sep" />
              <LUIButton variant="primary" width="full">
                Manage account
              </LUIButton>
            </div>
          </LUIMenu>
        </Story>

        <ApiTable
          component="LUIMenu"
          note="No callbacks — the trigger is passed via the dropdownDisplay prop and the panel contents as children (clickable rows use the dropdown-item class, plus active to mark the current choice). The component also exposes toggle() / close() methods and a readonly isOpen flag through its ref (LUIMenuRef)."
          inputs={apiInputs}
        />
      </div>
    </div>
  );
}
