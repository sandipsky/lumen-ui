import { Link } from '@tanstack/react-router';
import { LUIMainLayout } from './main-layout';
import './layout-demo.css';

export default function LayoutDemo() {
  return (
    <div className="layout-demo">
      <LUIMainLayout
        header={
          <>
            <span className="layout__title">LumenUI</span>
            <Link className="layout__back" to="/sidebar">
              ← Back to docs
            </Link>
          </>
        }
      >
        <p>
          Full-mode layout. Use the hamburger to collapse the rail (or open the drawer below
          768px).
        </p>
      </LUIMainLayout>
    </div>
  );
}
