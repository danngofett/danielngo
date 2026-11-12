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
    if (reducedMotion) {
      return
    }

    const interval = window.setInterval(
      () => {
        setIndex((state) => (state + 1) % words.length)
      },
      duration + delay + 500,
    )

    return () => clearInterval(interval)
  }, [words.length, duration, delay, reducedMotion])

  return (
    <div
      className={` ${className || ''} relative block overflow-hidden bg-transparent whitespace-nowrap min-[440px]:inline-block`}
      style={widths[index] ? { width: `${widths[index]}px` } : undefined}
    >
      {/* Invisible, in-flow spacer: reserves line height only */}
      <span
        className="pointer-events-none inline-block text-transparent select-none"
        aria-hidden
      >
        &nbsp;
      </span>

      {/* Off-flow measurers for every word */}
      {words.map((word, i) => (
        <span
          key={word}
          ref={(el) => {
            measureRefs.current[i] = el
          }}
          className="pointer-events-none invisible absolute top-0 left-0 inline-block select-none"
          aria-hidden
        >
          {word}
        </span>
      ))}

      {transitions((style, item) => (
        <AnimatedSpan
          key={item}
          className="absolute bottom-0 left-0 inline-block w-full text-black dark:text-white"
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
