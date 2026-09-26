import { useState } from 'react';
import {
  LUIPagination,
  type PageEvent,
} from '../../../components/ui/pagination/pagination';
import { ApiTable, type ApiTableRow } from '../../api-table/api-table';
import { Story } from '../../story/story';
import './pagination-stories.css';

const apiInputs: ApiTableRow[] = [
  {
    name: 'length',
    description: 'Total number of items being paginated; drives the page count.',
    type: 'number',
    default: '0',
    example: 'length={234}',
  },
  {
    name: 'pageSizeOptions',
    description: 'Choices offered by the page-size dropdown.',
    type: 'number[]',
    default: '[10, 25, 50, 100]',
    example: 'pageSizeOptions={[5, 10, 20]}',
  },
  {
    name: 'pageSize',
    description:
      'Items per page. Omit for internal state, or pair with onPageSizeChange for controlled usage; changing it resets to the first page.',
    type: 'number',
    default: '10',
    example: 'pageSize={size}',
  },
  {
    name: 'pageIndex',
    description:
      'Zero-based index of the current page. Omit for internal state, or pair with onPageIndexChange for controlled usage.',
    type: 'number',
    default: '0',
    example: 'pageIndex={page}',
  },
];

const apiOutputs: ApiTableRow[] = [
  {
    name: 'onPageChange',
    description: 'Fires whenever the page index or page size changes.',
    type: 'PageEvent',
    example: 'onPageChange={(e) => load(e)}',
  },
  {
    name: 'onPageIndexChange',
    description: 'Fires when the page index changes (controlled-usage half of pageIndex).',
    type: 'number',
    example: 'onPageIndexChange={setPage}',
  },
  {
    name: 'onPageSizeChange',
    description: 'Fires when the page size changes (controlled-usage half of pageSize).',
    type: 'number',
    example: 'onPageSizeChange={setSize}',
  },
];

export default function PaginationStories() {
  const [lastEvent, setLastEvent] = useState<PageEvent | null>(null);

  const onPage = (event: PageEvent) => setLastEvent(event);

  return (
    <div className="story-page">
      <header className="page-header">
        <h1 className="page-header__title">Pagination</h1>
        <p className="page-header__lead">
          Page navigation with first / prev / next / last controls, a windowed page-number strip,
          and a page-size dropdown built on <code>LUIMenu</code>. Pass <code>length</code>,
          optionally <code>pageSizeOptions</code>, and react to <code>onPageChange</code>. Because
          the page-size dropdown uses the menu, it flips upward when the paginator sits near the
          bottom of the viewport.
        </p>
      </header>

      <div className="stories">
        <Story
          title="Basic"
          description="Provide the total item count via length; the component tracks page index and size internally and fires onPageChange."
          code={`<LUIPagination length={234} onPageChange={(e) => onPage(e)} />`}
        >
          <div className="demo-col-wide">
            <div className="pagination-demo">
              <LUIPagination length={234} onPageChange={onPage} />
            </div>
            {lastEvent && (
              <p className="demo-readout">
                pageIndex: {lastEvent.pageIndex} · pageSize: {lastEvent.pageSize} · length:{' '}
                {lastEvent.length}
              </p>
            )}
          </div>
        </Story>

        <Story
          title="Custom page sizes"
          description="Override the page-size dropdown options."
          code={`<LUIPagination length={234} pageSizeOptions={[5, 10, 20]} onPageChange={(e) => onPage(e)} />`}
        >
          <div className="pagination-demo">
            <LUIPagination length={234} pageSizeOptions={[5, 10, 20]} onPageChange={onPage} />
          </div>
        </Story>

        <Story
          title="Few pages"
          description="With a small dataset the page strip simply shows every page."
          code={`<LUIPagination length={18} onPageChange={(e) => onPage(e)} />`}
        >
          <div className="pagination-demo">
            <LUIPagination length={18} onPageChange={onPage} />
          </div>
        </Story>

        <ApiTable
          component="LUIPagination"
          note="pageIndex and pageSize were model() signals in Angular; here each works uncontrolled (omit the prop) or controlled via the prop + its onPage…Change callback. PageEvent is { pageIndex: number; pageSize: number; length: number }. Selecting a new page size resets pageIndex to 0 before onPageChange fires."
          inputs={apiInputs}
          outputs={apiOutputs}
        />
      </div>
    </div>
  );
}
