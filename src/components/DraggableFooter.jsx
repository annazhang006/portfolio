import { useEffect, useRef, useState } from 'react'

const CHIP_W = 116
const CHIP_H = 44
const GRAVITY = 2600 // px/s^2

const BRAND_COLORS = [
  { bg: '#51331B', text: '#FBF9F3' }, // brown
  { bg: '#DEE6BF', text: '#51331B' }, // sage
  { bg: '#D2DEEB', text: '#51331B' }, // sky
]

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
  { label: 'Email', href: 'mailto:annaz94264@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/annazhang06', external: true },
]

function activate(href, external) {
  if (href.startsWith('#')) {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  } else if (external) {
    window.open(href, '_blank', 'noreferrer')
  } else {
    window.location.href = href
  }
}

function Chip({ label, href, external, initial, color, boundsRef, landedRef }) {
  const [pos, setPos] = useState(initial)
  const [dropped, setDropped] = useState(false)
  const dragging = useRef(false)
  const moved = useRef(false)
  const falling = useRef(false)
  const start = useRef({ x: 0, y: 0, left: 0, top: 0 })
  const velocity = useRef(0)
  const rafId = useRef(null)
  const myEntry = useRef(null)

  useEffect(() => () => rafId.current && cancelAnimationFrame(rafId.current), [])

  const onPointerDown = (e) => {
    if (falling.current) return
    dragging.current = true
    moved.current = false
    start.current = { x: e.clientX, y: e.clientY, left: pos.left, top: pos.top }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!dragging.current) return
    const dx = e.clientX - start.current.x
    const dy = e.clientY - start.current.y
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) moved.current = true

    let left = start.current.left + dx
    let top = start.current.top + dy
    const bounds = boundsRef.current
    if (bounds) {
      left = Math.max(0, Math.min(left, bounds.width - CHIP_W))
      top = Math.max(0, Math.min(top, bounds.height - CHIP_H))
    }
    setPos({ left, top })
  }

  const dropWithGravity = () => {
    falling.current = true
    velocity.current = 0
    let lastT = performance.now()

    // figure out the landing surface: the floor, or the top of any already
    // landed chip whose x-range overlaps this chip's current x-range
    const bounds = boundsRef.current
    let surfaceY = bounds.height
    landedRef.current.forEach((c) => {
      const overlaps = pos.left < c.left + c.width && pos.left + CHIP_W > c.left
      if (overlaps) surfaceY = Math.min(surfaceY, c.top)
    })
    const targetTop = surfaceY - CHIP_H

    const step = (now) => {
      const dt = Math.min((now - lastT) / 1000, 0.04)
      lastT = now
      velocity.current += GRAVITY * dt
      setPos((p) => {
        const nextTop = p.top + velocity.current * dt
        if (nextTop >= targetTop) {
          falling.current = false
          setDropped(true)
          myEntry.current = { left: p.left, width: CHIP_W, top: targetTop }
          landedRef.current.push(myEntry.current)
          return { left: p.left, top: targetTop }
        }
        rafId.current = requestAnimationFrame(step)
        return { left: p.left, top: nextTop }
      })
    }
    rafId.current = requestAnimationFrame(step)
  }

  const onPointerUp = () => {
    dragging.current = false
    if (moved.current) return
    if (!dropped) {
      dropWithGravity()
    } else {
      activate(href, external)
    }
  }

  return (
    <button
      type="button"
      className="footer-chip"
      style={{
        left: pos.left,
        top: pos.top,
        background: color.bg,
        color: color.text,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      title={dropped ? `Go to ${label}` : `Drop ${label}`}
    >
      {label}
    </button>
  )
}

export default function DraggableFooter() {
  const areaRef = useRef(null)
  const landedRef = useRef([])
  const [bounds, setBounds] = useState(null)
  const boundsRef = useRef(null)

  useEffect(() => {
    function measure() {
      if (!areaRef.current) return
      const b = { width: areaRef.current.clientWidth, height: areaRef.current.clientHeight }
      boundsRef.current = b
      setBounds(b)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return (
    <footer className="footer">
      <div className="footer-drag-area" ref={areaRef}>
        {bounds &&
          LINKS.map((link, i) => {
            const cols = 3
            const col = i % cols
            const row = Math.floor(i / cols)
            const initial = {
              left: (col + 0.5) * (bounds.width / cols) - CHIP_W / 2,
              top: row * (CHIP_H + 18) + 12,
            }
            return (
              <Chip
                key={link.label}
                label={link.label}
                href={link.href}
                external={link.external}
                initial={initial}
                color={BRAND_COLORS[i % BRAND_COLORS.length]}
                boundsRef={boundsRef}
                landedRef={landedRef}
              />
            )
          })}
        <p className="footer-hint">press to drop, press again to go</p>
      </div>
      <div className="footer-meta">
        <span>Anna Zhang, {new Date().getFullYear()}</span>
        <span>Built with React &amp; react-three-fiber</span>
      </div>
    </footer>
  )
}
