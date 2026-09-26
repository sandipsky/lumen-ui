import type { ReactNode } from 'react';
import './story.css';

export interface StoryProps {
  title: string;
  description?: string;
  code?: string;
  children?: ReactNode;
}

/**
 * A single showcase example: a titled card with a live demo canvas
 * (children) and an optional code snippet.
 */
export function Story({ title, description = '', code = '', children }: StoryProps) {
  return (
    <section className="story">
      <header className="story__header">
        <h3 className="story__title">{title}</h3>
        {description && <p className="story__desc">{description}</p>}
      </header>

      <div className="story__canvas">{children}</div>

      {code && (
        <pre className="story__code">
          <code>{code}</code>
        </pre>
      )}
    </section>
  );
}
