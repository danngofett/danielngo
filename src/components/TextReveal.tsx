import React from 'react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animated, useReducedMotion, useTransition } from '@react-spring/web'

const AnimatedSpan = animated('span')

export interface TextRevealProps {
  className?: string
  duration?: number
  delay?: number
  words: string[]
}

export const TextReveal = ({
  words,
  className,
  duration = 2000,
  delay = 0,
}: TextRevealProps) => {
  const reducedMotion = useReducedMotion()

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const measureRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [widths, setWidths] = useState<number[]>([])

  const currentWord = words[index]

  useLayoutEffect(() => {
    const measure = () =>
      setWidths(measureRefs.current.map((el) => el?.offsetWidth ?? 0))
    measure()
    document.fonts?.ready.then(measure)
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [words])

  const transitions = useTransition(currentWord, {
    from: {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-50px)' },
  })

  useEffect(() => {
    const onToggle = (event: Event) =>
      setPaused((event as CustomEvent<{ paused: boolean }>).detail.paused)
    window.addEventListener('rotating-text:toggle', onToggle)
    return () => window.removeEventListener('rotating-text:toggle', onToggle)
  }, [])

  useEffect(() => {
    if (reducedMotion || paused) {
      return
    }

    const interval = window.setInterval(
      () => {
        setIndex((state) => (state + 1) % words.length)
      },
      duration + delay + 500,
    )

    return () => clearInterval(interval)
  }, [words.length, duration, delay, reducedMotion, paused])

  return (
    <div
      className={`${className || ''} relative grid max-w-full overflow-hidden bg-transparent min-[440px]:inline-block min-[440px]:w-(--rotating-width) min-[440px]:whitespace-nowrap`}
      style={
        widths[index]
          ? ({
              '--rotating-width': `${widths[index]}px`,
            } as React.CSSProperties)
          : undefined
      }
    >
      {/* Wide screens: invisible, in-flow spacer that reserves one line */}
      <span
        className="pointer-events-none hidden text-transparent select-none min-[440px]:inline-block"
        aria-hidden
      >
        &nbsp;
      </span>

      {/* Phones: the words wrap, so every word is stacked invisibly in one
          grid cell and the box is as tall as the tallest wrapped word. */}
      {words.map((word) => (
        <span
          key={word}
          className="pointer-events-none invisible col-start-1 row-start-1 select-none min-[440px]:hidden"
          aria-hidden
        >
          {word}
        </span>
      ))}

      {/* Off-flow measurers for every word */}
      {words.map((word, i) => (
        <span
          key={word}
          ref={(el) => {
            measureRefs.current[i] = el
          }}
          className="pointer-events-none invisible absolute top-0 left-0 inline-block whitespace-nowrap select-none"
          aria-hidden
        >
          {word}
        </span>
      ))}

      {/* Screen readers get the full list once, instead of a changing word. */}
      <span className="sr-only">{words.join(', ')}</span>

      {transitions((style, item) => (
        <AnimatedSpan
          key={item}
          aria-hidden
          className="absolute top-0 left-0 w-full text-black dark:text-white"
          style={{
            opacity: style.opacity,
            transform: style.transform,
          }}
        >
          {item}
        </AnimatedSpan>
      ))}
    </div>
  )
}

export default TextReveal
