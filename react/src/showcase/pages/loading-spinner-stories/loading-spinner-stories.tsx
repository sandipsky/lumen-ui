import { LUIButton } from '../../../components/ui/button/button';
import { LUILoadingSpinner, useLUISpinner } from '../../../components/ui/loading-spinner';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './loading-spinner-stories.css';

const apiService: ApiTableRow[] = [
  {
    name: 'show',
    description: 'Show the overlay (increments the pending count).',
    type: 'show(): void',
    example: 'spinner.show()',
  },
  {
    name: 'hide',
    description: 'Hide one pending request; the overlay stays up until all are cleared.',
    type: 'hide(): void',
    example: 'spinner.hide()',
  },
  {
    name: 'reset',
    description: 'Force the overlay off regardless of pending count.',
    type: 'reset(): void',
    example: 'spinner.reset()',
  },
  {
    name: 'visible',
    description: 'Read-only — true while at least one caller is showing the spinner.',
    type: 'boolean',
    example: 'spinner.visible',
  },
];

export default function LoadingSpinnerStories() {
  const spinner = useLUISpinner();

  const demo = (ms = 1500): void => {
    spinner.show();
    setTimeout(() => spinner.hide(), ms);
  };

  return (
    <div className="story-page loading-spinner-stories">
      <header className="page-header">
        <h1 className="page-header__title">Loading Spinner</h1>
        <p className="page-header__lead">
          A full-screen loading overlay driven by <code>useLUISpinner()</code>. Place one{' '}
          <code>&lt;LUILoadingSpinner /&gt;</code> near the app root, then call <code>show()</code>{' '}
          / <code>hide()</code> from anywhere. Calls are reference-counted, so overlapping requests
          keep the overlay up until the last one finishes.
        </p>
      </header>

      {/* One overlay instance for the page; normally this lives at the app root. */}
      <LUILoadingSpinner />

      <div className="stories">
        <Story
          title="Service-driven overlay"
          description="Triggering the spinner dims the whole page and centers the wheel. This demo shows it for 1.5 seconds."
          code={`const spinner = useLUISpinner();

async function load() {
  spinner.show();
  try {
    await fetchData();
  } finally {
    spinner.hide();
  }
}`}
        >
          <LUIButton variant="primary" onClick={() => demo()}>
            Show for 1.5s
          </LUIButton>
        </Story>

        <ApiTable
          component="LUILoadingSpinner"
          note="The component takes no props — place a single instance near the app root (inside LUISpinnerProvider) and drive the overlay via the useLUISpinner() hook. show()/hide() calls are reference-counted, so overlapping operations keep the overlay up until the last one finishes."
          inputsTitle="useLUISpinner() API"
          inputs={apiService}
        />
      </div>
    </div>
  );
}
