import { Routes } from '@angular/router';
import { ShowcaseLayout } from './showcase/showcase-layout/showcase-layout';

export const routes: Routes = [
  {
    path: 'layout',
    loadComponent: () =>
      import('./showcase/pages/layout-demo/layout-demo').then((m) => m.LayoutDemo),
  },
  {
    path: '',
    component: ShowcaseLayout,
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      {
        path: 'button',
        loadComponent: () =>
          import('./showcase/pages/button-stories/button-stories').then((m) => m.ButtonStories),
      },
      {
        path: 'icon',
        loadComponent: () =>
          import('./showcase/pages/icon-stories/icon-stories').then((m) => m.IconStories),
      },
      {
        path: 'text-input',
        loadComponent: () =>
          import('./showcase/pages/text-input-stories/text-input-stories').then(
            (m) => m.TextInputStories,
          ),
      },
      {
        path: 'password-input',
        loadComponent: () =>
          import('./showcase/pages/password-input-stories/password-input-stories').then(
            (m) => m.PasswordInputStories,
          ),
      },
      {
        path: 'email-input',
        loadComponent: () =>
          import('./showcase/pages/email-input-stories/email-input-stories').then(
            (m) => m.EmailInputStories,
          ),
      },
      {
        path: 'username-input',
        loadComponent: () =>
          import('./showcase/pages/username-input-stories/username-input-stories').then(
            (m) => m.UsernameInputStories,
          ),
      },
      {
        path: 'number-input',
        loadComponent: () =>
          import('./showcase/pages/number-input-stories/number-input-stories').then(
            (m) => m.NumberInputStories,
          ),
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./showcase/pages/select-stories/select-stories').then((m) => m.SelectStories),
      },
      {
        path: 'date-input',
        loadComponent: () =>
          import('./showcase/pages/date-input-stories/date-input-stories').then(
            (m) => m.DateInputStories,
          ),
      },
      {
        path: 'textarea',
        loadComponent: () =>
          import('./showcase/pages/textarea-stories/textarea-stories').then(
            (m) => m.TextareaStories,
          ),
      },
      {
        path: 'toggle',
        loadComponent: () =>
          import('./showcase/pages/toggle-stories/toggle-stories').then((m) => m.ToggleStories),
      },
      {
        path: 'checkbox',
        loadComponent: () =>
          import('./showcase/pages/checkbox-stories/checkbox-stories').then(
            (m) => m.CheckboxStories,
          ),
      },
      {
        path: 'radio',
        loadComponent: () =>
          import('./showcase/pages/radio-stories/radio-stories').then((m) => m.RadioStories),
      },
      {
        path: 'modal',
        loadComponent: () =>
          import('./showcase/pages/modal-stories/modal-stories').then((m) => m.ModalStories),
      },
      {
        path: 'drawer',
        loadComponent: () =>
          import('./showcase/pages/drawer-stories/drawer-stories').then((m) => m.DrawerStories),
      },
      {
        path: 'accordion',
        loadComponent: () =>
          import('./showcase/pages/accordion-stories/accordion-stories').then(
            (m) => m.AccordionStories,
          ),
      },
      {
        path: 'menu',
        loadComponent: () =>
          import('./showcase/pages/menu-stories/menu-stories').then((m) => m.MenuStories),
      },
      {
        path: 'avatar',
        loadComponent: () =>
          import('./showcase/pages/avatar-stories/avatar-stories').then((m) => m.AvatarStories),
      },
      {
        path: 'breadcrumb',
        loadComponent: () =>
          import('./showcase/pages/breadcrumb-stories/breadcrumb-stories').then(
            (m) => m.BreadcrumbStories,
          ),
      },
      {
        path: 'pagination',
        loadComponent: () =>
          import('./showcase/pages/pagination-stories/pagination-stories').then(
            (m) => m.PaginationStories,
          ),
      },
      {
        path: 'filter',
        loadComponent: () =>
          import('./showcase/pages/filter-stories/filter-stories').then((m) => m.FilterStories),
      },
      {
        path: 'loading-spinner',
        loadComponent: () =>
          import('./showcase/pages/loading-spinner-stories/loading-spinner-stories').then(
            (m) => m.LoadingSpinnerStories,
          ),
      },
      {
        path: 'skeleton',
        loadComponent: () =>
          import('./showcase/pages/skeleton-stories/skeleton-stories').then(
            (m) => m.SkeletonStories,
          ),
      },
      {
        path: 'notification',
        loadComponent: () =>
          import('./showcase/pages/notification-stories/notification-stories').then(
            (m) => m.NotificationStories,
          ),
      },
      {
        path: 'badge',
        loadComponent: () =>
          import('./showcase/pages/badge-stories/badge-stories').then((m) => m.BadgeStories),
      },
      {
        path: 'chip',
        loadComponent: () =>
          import('./showcase/pages/chip-stories/chip-stories').then((m) => m.ChipStories),
      },
      {
        path: 'card',
        loadComponent: () =>
          import('./showcase/pages/card-stories/card-stories').then((m) => m.CardStories),
      },
      {
        path: 'segmented-control',
        loadComponent: () =>
          import('./showcase/pages/segmented-control-stories/segmented-control-stories').then(
            (m) => m.SegmentedControlStories,
          ),
      },
      {
        path: 'table',
        loadComponent: () =>
          import('./showcase/pages/table-stories/table-stories').then((m) => m.TableStories),
      },
      {
        path: 'file-upload',
        loadComponent: () =>
          import('./showcase/pages/file-upload-stories/file-upload-stories').then(
            (m) => m.FileUploadStories,
          ),
      },
      {
        path: 'tabs',
        loadComponent: () =>
          import('./showcase/pages/tabs-stories/tabs-stories').then((m) => m.TabsStories),
      },
      {
        path: 'tree',
        loadComponent: () =>
          import('./showcase/pages/tree-stories/tree-stories').then((m) => m.TreeStories),
      },
      {
        path: 'tooltip',
        loadComponent: () =>
          import('./showcase/pages/tooltip-stories/tooltip-stories').then((m) => m.TooltipStories),
      },
      {
        path: 'otp-input',
        loadComponent: () =>
          import('./showcase/pages/otp-input-stories/otp-input-stories').then(
            (m) => m.OtpInputStories,
          ),
      },
      {
        path: 'stepper',
        loadComponent: () =>
          import('./showcase/pages/stepper-stories/stepper-stories').then((m) => m.StepperStories),
      },
      {
        path: 'sidebar',
        loadComponent: () =>
          import('./showcase/pages/sidebar-stories/sidebar-stories').then((m) => m.SidebarStories),
      },
      {
        path: 'box',
        loadComponent: () =>
          import('./showcase/pages/box-stories/box-stories').then((m) => m.BoxStories),
      },
      {
        path: 'flex',
        loadComponent: () =>
          import('./showcase/pages/flex-stories/flex-stories').then((m) => m.FlexStories),
      },
      {
        path: 'grid',
        loadComponent: () =>
          import('./showcase/pages/grid-stories/grid-stories').then((m) => m.GridStories),
      },
      {
        path: 'spacer',
        loadComponent: () =>
          import('./showcase/pages/spacer-stories/spacer-stories').then((m) => m.SpacerStories),
      },
      {
        path: 'form-validation',
        loadComponent: () =>
          import('./showcase/pages/form-validation-stories/form-validation-stories').then(
            (m) => m.FormValidationStories,
          ),
      },
    ],
  },
];
