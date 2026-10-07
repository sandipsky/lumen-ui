import { useLayoutEffect, type ReactNode } from 'react';
import { luiThemeVars, type LUITheme } from '../theme/theme';
import { LUIDrawerProvider } from '../ui/drawer';
import { LUISpinnerProvider } from '../ui/loading-spinner';
import { LUIModalProvider } from '../ui/modal';
import { LUINotificationProvider } from '../ui/notification/notification';

export interface LUIProviderProps {
  children?: ReactNode;
  /**
   * Page-wide design-token overrides, applied on `<html>` so they also reach
   * overlays rendered under `<body>`. Change it at any time to re-theme;
   * tokens it leaves out keep their defaults.
   */
  theme?: LUITheme;
}

/**
 * All-in-one LumenUI provider — mounts every library context (notification,
 * spinner, modal, drawer) so the `useLUI*()` hooks work anywhere below it,
 * and applies the optional `theme`. Mount once near the app root, like
 * Mantine's `MantineProvider`:
 *
 * ```tsx
 * <LUIProvider theme={{ accent: '#2563eb' }}>
 *   <App />
 * </LUIProvider>
 * ```
 *
 * The individual providers remain exported for apps that only want a subset.
 */
export function LUIProvider({ children, theme }: LUIProviderProps) {
  useRootTheme(theme);

  return (
    <LUINotificationProvider>
      <LUISpinnerProvider>
        <LUIModalProvider>
          <LUIDrawerProvider>{children}</LUIDrawerProvider>
        </LUIModalProvider>
      </LUISpinnerProvider>
    </LUINotificationProvider>
  );
}

/**
 * Writes the theme's custom properties onto `<html>` before paint and removes
 * them on change or unmount. Keyed on the serialized vars, so an inline
 * `theme` object recreated every render doesn't touch the DOM.
 */
function useRootTheme(theme: LUITheme | undefined) {
  const serialized = JSON.stringify(theme ? luiThemeVars(theme) : {});

  useLayoutEffect(() => {
    const vars: Record<string, string> = JSON.parse(serialized);
    const { style } = document.documentElement;
    for (const [name, value] of Object.entries(vars)) style.setProperty(name, value);
    return () => {
      for (const name of Object.keys(vars)) style.removeProperty(name);
    };
  }, [serialized]);
}
