import type { ConceptNode } from '../content/types'

function Node({ node, depth }: { node: ConceptNode; depth: number }) {
  return (
    <li className={`cm-item depth-${Math.min(depth, 2)}`}>
      <div className="cm-node">
        <span className="cm-label">{node.label}</span>
        {node.note && <span className="cm-note">{node.note}</span>}
      </div>
      {node.children && node.children.length > 0 && (
        <ul className="cm-children">
          {node.children.map((c) => (
            <Node key={c.label} node={c} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  )
}

export function ConceptMap({ title, root }: { title?: string; root: ConceptNode }) {
  return (
    <figure className="block concept-map" aria-label={title ?? 'Mapa conceitual'}>
      <figcaption className="block-label">Mapa conceitual{title ? `: ${title}` : ''}</figcaption>
      <div className="cm-scroll">
        <ul className="cm-root">
          <Node node={root} depth={0} />
        </ul>
      </div>
    </figure>
  )
}
