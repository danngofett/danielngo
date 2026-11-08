import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { animated, useReducedMotion, useTransition } from '@react-spring/web'

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
  const containerRef = useRef<HTMLDivElement | null>(null)
  const wordRef = useRef<HTMLSpanElement | null>(null)

  const currentWord = words[index]

  const updateWordSpacer = () => {
    if (wordRef.current && containerRef.current) {
      const wordWidth = wordRef.current.offsetWidth
      const wordHeight = wordRef.current.offsetHeight

      containerRef.current.style.width = `${wordWidth}px`
      containerRef.current.style.height = `${wordHeight}px`
    }
  }

  const transitions = useTransition(currentWord, {
    from: {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-50px)' },
    onDestroyed: updateWordSpacer,
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

  const AnimatedSpan = animated('span')

  return (
    <div
      className={` ${className || ''} relative block overflow-hidden bg-transparent whitespace-nowrap min-[440px]:inline-block`}
      ref={containerRef}
    >
      {transitions((style, item) => (
        <React.Fragment key={item}>
          <AnimatedSpan
            className="absolute bottom-0 left-0 inline-block w-full text-black dark:text-white"
            style={{
              opacity: style.opacity,
              transform: style.transform,
            }}
          >
            {item}
          </AnimatedSpan>

          <span
            className="pointer-events-none inline-block text-transparent select-none"
            ref={wordRef}
            aria-hidden
          >
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  )
}

export default TextReveal
