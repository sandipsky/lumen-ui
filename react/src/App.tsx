import { Suspense } from 'react';
import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Navigate,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import { ShowcaseLayout } from './showcase/showcase-layout/showcase-layout';
import { LUIProvider } from './components/provider/provider';
import './showcase/story-page.css';

const rootRoute = createRootRoute({
  component: () => (
    <LUIProvider>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </LUIProvider>
  ),
});

const layoutDemoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/layout',
  component: lazyRouteComponent(() => import('./showcase/pages/layout-demo/layout-demo')),
});

/* Pathless layout route: wraps every story page in the showcase shell. */
const showcaseRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'showcase',
  component: ShowcaseLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => showcaseRoute,
  path: '/',
  component: () => <Navigate to="/button" replace />,
});

const STORY_PAGES = [
  { path: '/button', load: () => import('./showcase/pages/button-stories/button-stories') },
  { path: '/icon', load: () => import('./showcase/pages/icon-stories/icon-stories') },
  { path: '/text-input', load: () => import('./showcase/pages/text-input-stories/text-input-stories') },
  { path: '/password-input', load: () => import('./showcase/pages/password-input-stories/password-input-stories') },
  { path: '/email-input', load: () => import('./showcase/pages/email-input-stories/email-input-stories') },
  { path: '/username-input', load: () => import('./showcase/pages/username-input-stories/username-input-stories') },
  { path: '/number-input', load: () => import('./showcase/pages/number-input-stories/number-input-stories') },
  { path: '/select', load: () => import('./showcase/pages/select-stories/select-stories') },
  { path: '/date-input', load: () => import('./showcase/pages/date-input-stories/date-input-stories') },
  { path: '/textarea', load: () => import('./showcase/pages/textarea-stories/textarea-stories') },
  { path: '/toggle', load: () => import('./showcase/pages/toggle-stories/toggle-stories') },
  { path: '/checkbox', load: () => import('./showcase/pages/checkbox-stories/checkbox-stories') },
  { path: '/radio', load: () => import('./showcase/pages/radio-stories/radio-stories') },
  { path: '/modal', load: () => import('./showcase/pages/modal-stories/modal-stories') },
  { path: '/drawer', load: () => import('./showcase/pages/drawer-stories/drawer-stories') },
  { path: '/accordion', load: () => import('./showcase/pages/accordion-stories/accordion-stories') },
  { path: '/menu', load: () => import('./showcase/pages/menu-stories/menu-stories') },
  { path: '/avatar', load: () => import('./showcase/pages/avatar-stories/avatar-stories') },
  { path: '/breadcrumb', load: () => import('./showcase/pages/breadcrumb-stories/breadcrumb-stories') },
  { path: '/pagination', load: () => import('./showcase/pages/pagination-stories/pagination-stories') },
  { path: '/filter', load: () => import('./showcase/pages/filter-stories/filter-stories') },
  { path: '/loading-spinner', load: () => import('./showcase/pages/loading-spinner-stories/loading-spinner-stories') },
  { path: '/skeleton', load: () => import('./showcase/pages/skeleton-stories/skeleton-stories') },
  { path: '/notification', load: () => import('./showcase/pages/notification-stories/notification-stories') },
  { path: '/badge', load: () => import('./showcase/pages/badge-stories/badge-stories') },
  { path: '/chip', load: () => import('./showcase/pages/chip-stories/chip-stories') },
  { path: '/card', load: () => import('./showcase/pages/card-stories/card-stories') },
  { path: '/segmented-control', load: () => import('./showcase/pages/segmented-control-stories/segmented-control-stories') },
  { path: '/otp-input', load: () => import('./showcase/pages/otp-input-stories/otp-input-stories') },
  { path: '/tooltip', load: () => import('./showcase/pages/tooltip-stories/tooltip-stories') },
  { path: '/tree', load: () => import('./showcase/pages/tree-stories/tree-stories') },
  { path: '/tabs', load: () => import('./showcase/pages/tabs-stories/tabs-stories') },
  { path: '/file-upload', load: () => import('./showcase/pages/file-upload-stories/file-upload-stories') },
  { path: '/table', load: () => import('./showcase/pages/table-stories/table-stories') },
  { path: '/stepper', load: () => import('./showcase/pages/stepper-stories/stepper-stories') },
  { path: '/sidebar', load: () => import('./showcase/pages/sidebar-stories/sidebar-stories') },
  { path: '/box', load: () => import('./showcase/pages/box-stories/box-stories') },
  { path: '/flex', load: () => import('./showcase/pages/flex-stories/flex-stories') },
  { path: '/grid', load: () => import('./showcase/pages/grid-stories/grid-stories') },
  { path: '/spacer', load: () => import('./showcase/pages/spacer-stories/spacer-stories') },
  { path: '/form-validation', load: () => import('./showcase/pages/form-validation-stories/form-validation-stories') },
];

const storyRoutes = STORY_PAGES.map(({ path, load }) =>
  createRoute({
    getParentRoute: () => showcaseRoute,
    path,
    component: lazyRouteComponent(load),
  }),
);

const routeTree = rootRoute.addChildren([
  layoutDemoRoute,
  showcaseRoute.addChildren([indexRoute, ...storyRoutes]),
]);

const router = createRouter({ routeTree });

function App() {
  return <RouterProvider router={router} />;
}

export default App;
