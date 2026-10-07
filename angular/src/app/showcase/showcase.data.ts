/** Registry of showcased components — drives the sidebar nav and routes. */
export interface ShowcaseEntry {
  /** Route path segment, e.g. `button` → `/button`. */
  path: string;
  name: string;
}

export const SHOWCASE_COMPONENTS: ShowcaseEntry[] = [
  { path: 'button', name: 'Button' },
  { path: 'icon', name: 'Icon' },
  { path: 'text-input', name: 'Text Input' },
  { path: 'password-input', name: 'Password Input' },
  { path: 'email-input', name: 'Email Input' },
  { path: 'username-input', name: 'Username Input' },
  { path: 'number-input', name: 'Number Input' },
  { path: 'select', name: 'Select' },
  { path: 'date-input', name: 'Date Input' },
  { path: 'textarea', name: 'Textarea' },
  { path: 'toggle', name: 'Toggle' },
  { path: 'checkbox', name: 'Checkbox' },
  { path: 'radio', name: 'Radio' },
  { path: 'modal', name: 'Modal' },
  { path: 'drawer', name: 'Drawer' },
  { path: 'accordion', name: 'Accordion' },
  { path: 'menu', name: 'Menu' },
  { path: 'avatar', name: 'Avatar' },
  { path: 'breadcrumb', name: 'Breadcrumb' },
  { path: 'pagination', name: 'Pagination' },
  { path: 'filter', name: 'Filter' },
  { path: 'loading-spinner', name: 'Loading Spinner' },
  { path: 'skeleton', name: 'Skeleton' },
  { path: 'notification', name: 'Notification' },
  { path: 'badge', name: 'Badge' },
  { path: 'chip', name: 'Chip' },
  { path: 'card', name: 'Card' },
  { path: 'segmented-control', name: 'Segmented Control' },
  { path: 'otp-input', name: 'OTP / PIN Input' },
  { path: 'tooltip', name: 'Tooltip' },
  { path: 'tree', name: 'Tree View' },
  { path: 'tabs', name: 'Tabs' },
  { path: 'file-upload', name: 'File Upload' },
  { path: 'table', name: 'Table' },
  { path: 'stepper', name: 'Stepper' },
  { path: 'box', name: 'Box' },
  { path: 'flex', name: 'Flex' },
  { path: 'grid', name: 'Grid' },
  { path: 'spacer', name: 'Spacer' },
  { path: 'form-validation', name: 'Form Validation' },
];
