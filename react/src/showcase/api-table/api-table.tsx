import './api-table.css';

/** One documented prop or callback row for {@link ApiTable}. */
export interface ApiTableRow {
  name: string;
  description: string;
  /** Type as shown to the consumer, e.g. `'ad' | 'bs'`. */
  type: string;
  /** Default value — omit for callbacks. */
  default?: string;
  /** Short usage snippet, e.g. `span={12}`. */
  example?: string;
}

export interface ApiTableProps {
  /** Component being documented, e.g. `LUIDateInput`. */
  component: string;
  /** Optional note under the heading — value semantics, controlled usage, etc. */
  note?: string;
  /** Heading for the first table — override for config-object docs (e.g. "ModalConfig"). */
  inputsTitle?: string;
  inputs?: ApiTableRow[];
  outputs?: ApiTableRow[];
}

/**
 * API reference card for a showcase page: renders a component's props and
 * callbacks as Ant Design-style docs tables (Property | Description | Type |
 * Default | Example).
 */
export function ApiTable({
  component,
  note = '',
  inputsTitle = 'Props',
  inputs = [],
  outputs = [],
}: ApiTableProps) {
  /* Component names render as `<LUI...>`; hook/service names are shown as passed. */
  const displayName = /^LUI\w+$/.test(component) ? `<${component}>` : component;

  return (
    <section className="api">
      <header className="api__header">
        <h2 className="api__title">
          API — <code>{displayName}</code>
        </h2>
        {note && <p className="api__note">{note}</p>}
      </header>

      {inputs.length > 0 && (
        <>
          <h3 className="api__section">{inputsTitle}</h3>
          <div className="api__scroll">
            <table className="api__table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Default</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {inputs.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <code className="api__name">{row.name}</code>
                    </td>
                    <td className="api__desc">{row.description}</td>
                    <td>
                      <code>{row.type}</code>
                    </td>
                    <td>{row.default ? <code>{row.default}</code> : <span className="api__none">—</span>}</td>
                    <td>{row.example ? <code>{row.example}</code> : <span className="api__none">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {outputs.length > 0 && (
        <>
          <h3 className="api__section">Callbacks</h3>
          <div className="api__scroll">
            <table className="api__table">
              <thead>
                <tr>
                  <th>Callback</th>
                  <th>Description</th>
                  <th>Payload</th>
                  <th>Example</th>
                </tr>
              </thead>
              <tbody>
                {outputs.map((row) => (
                  <tr key={row.name}>
                    <td>
                      <code className="api__name">{row.name}</code>
                    </td>
                    <td className="api__desc">{row.description}</td>
                    <td>
                      <code>{row.type}</code>
                    </td>
                    <td>{row.example ? <code>{row.example}</code> : <span className="api__none">—</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}
