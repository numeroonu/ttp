import { useEffect, useRef, useState } from 'react'

/**
 * Wrap anything in <Reveal> and it will "emerge from the shadows"
 * when it scrolls into view.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  // Older browsers without IntersectionObserver just show everything
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window))

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [visible])

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}s` }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
