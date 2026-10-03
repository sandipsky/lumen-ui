/** Shape of one sidebar nav entry rendered by `LUISidebarItem`. */
export interface SidebarItemData {
  icon: string;
  label: string;
  /** Providing children turns the entry into a collapsible group. */
  children?: readonly SidebarItemData[];
}

/** Mock nav entries looped over by the layout demo's `LUIMainLayout`. */
export const SIDEBAR_ITEMS: readonly SidebarItemData[] = [
  { icon: '📊', label: 'Dashboard' },
  { icon: '👥', label: 'Users' },
  { icon: '📁', label: 'Projects' },
  {
    icon: '📈',
    label: 'Reports',
    children: [
      { icon: '💰', label: 'Sales Report' },
      { icon: '📦', label: 'Stock Report' },
    ],
  },
  {
    icon: '⚙️',
    label: 'Setup',
    children: [
      { icon: '🏷️', label: 'Category' },
      { icon: '🧾', label: 'Items' },
      { icon: '📐', label: 'Units' },
    ],
  },
  { icon: '🔔', label: 'Notifications' },
];
