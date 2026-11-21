import { memo, useEffect } from 'react'

// Fundo animado: brilhos que flutuam, grid de pontos que desliza, ondas de luz
// correndo na base e símbolos de código subindo. Só CSS (transform/opacity),
// sem canvas, então roda leve até em celular fraco.

const glyphs = ['{ }', '</>', '=>', '( )', ';', '[ ]', '&&', '$_', '#', '//', '===', 'fn']

// Onda que se repete: desenhada com 2x a largura e deslocada em -50% em loop
function wavePath(amp: number, len: number, y: number, total = 2400) {
  let d = `M0 ${y}`
  for (let x = 0; x < total; x += len) {
    d += ` Q${x + len / 4} ${y - amp} ${x + len / 2} ${y} T${x + len} ${y}`
  }
  return d
}

const waves = [
  { cls: 'w1', d: wavePath(26, 400, 120), stroke: 'var(--accent)' },
  { cls: 'w2', d: wavePath(18, 300, 140), stroke: 'var(--mint)' },
  { cls: 'w3', d: wavePath(34, 600, 110), stroke: 'var(--amber)' },
]

export const AnimatedBg = memo(function AnimatedBg() {
  // Pausa a animação com a aba em segundo plano (economiza bateria)
  useEffect(() => {
    const onVis = () => document.body.classList.toggle('anim-paused', document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  return (
    <div className="bg-anim" aria-hidden>
      <div className="bg-grid" />
      <div className="bg-glow g1" />
      <div className="bg-glow g2" />
      <div className="bg-glow g3" />
      <div className="bg-waves">
        {waves.map((w) => (
          <svg key={w.cls} className={`bg-wave ${w.cls}`} viewBox="0 0 2400 240" preserveAspectRatio="none">
            <path d={w.d} fill="none" stroke={w.stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" />
          </svg>
        ))}
      </div>
      {glyphs.map((g, i) => (
        <span key={i} className={`bg-glyph gl${i + 1}`}>
          {g}
        </span>
      ))}
      <div className="bg-vignette" />
    </div>
  )
})
