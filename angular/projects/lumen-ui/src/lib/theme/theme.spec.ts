import { TestBed } from '@angular/core/testing';
import { ThemeService, provideTheme, themeVars } from './theme';

describe('themeVars', () => {
  it('maps camelCase keys to their CSS variables', () => {
    expect(themeVars({ bgSemiLight: '#fff', textWhite: '#eee' })).toEqual({
      '--bg-semi-light': '#fff',
      '--text-white': '#eee',
    });
  });

  it('derives the accent tint and hover shade from the accent alone', () => {
    expect(themeVars({ accent: '#2563eb' })).toEqual({
      '--accent': '#2563eb',
      '--accent-bg': 'color-mix(in srgb, #2563eb 9%, var(--bg-lightest))',
      '--accent-dark': 'color-mix(in srgb, #2563eb 78%, black)',
    });
  });

  it('derives a status tint, but keeps values the theme sets', () => {
    const vars = themeVars({ accent: 'red', accentBg: 'pink', accentDark: 'maroon', success: 'teal' });
    expect(vars['--accent-bg']).toBe('pink');
    expect(vars['--accent-dark']).toBe('maroon');
    expect(vars['--success-bg']).toBe('color-mix(in srgb, teal 9%, var(--bg-lightest))');
  });

  it('skips empty values', () => {
    expect(themeVars({ accent: '', accentContrast: undefined })).toEqual({});
  });
});

describe('ThemeService', () => {
  const style = document.documentElement.style;

  afterEach(() => document.documentElement.removeAttribute('style'));

  it('applies the provided theme on <html> at startup', () => {
    TestBed.configureTestingModule({ providers: [provideTheme({ accent: '#2563eb' })] });

    expect(TestBed.inject(ThemeService).theme()).toEqual({ accent: '#2563eb' });
    expect(style.getPropertyValue('--accent')).toBe('#2563eb');
    expect(style.getPropertyValue('--accent-bg')).toContain('#2563eb');
  });

  it('replaces the previous overrides on set()', () => {
    const theme = TestBed.inject(ThemeService);
    theme.set({ accent: 'red' });
    theme.set({ bgLight: 'white' });

    expect(style.getPropertyValue('--accent')).toBe('');
    expect(style.getPropertyValue('--accent-bg')).toBe('');
    expect(style.getPropertyValue('--bg-light')).toBe('white');
  });

  it('removes every override on reset()', () => {
    const theme = TestBed.inject(ThemeService);
    theme.set({ accent: 'red', textPrimary: 'black' });
    theme.reset();

    expect(style.length).toBe(0);
    expect(theme.theme()).toEqual({});
  });
});
