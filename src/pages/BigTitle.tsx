import React, { useRef, useState, useEffect, useCallback } from 'react'
import { useTransition, animated } from 'react-spring'

function BigTitle() {
  const ref = useRef([])
  const [items, set] = useState([])
  // @ts-ignore
  const transitions = useTransition(items, null, {
    from: { opacity: 0, height: 0, innerHeight: 0, transform: 'perspective(600px) rotateX(0deg)', color: '#ffe1b1' },
    enter: [
      { opacity: 1, height: 80, innerHeight: 80 },
      { transform: 'perspective(600px) rotateX(180deg)', color: '#56c9f7' },
      { transform: 'perspective(600px) rotateX(0deg)' },
    ],
    leave: [{ color: '#f2756a' }, { innerHeight: 0 }, { opacity: 0, height: 0 }],
    update: { color: '#f04a52' },
  })

  const reset = useCallback(() => {
    ref.current.map(clearTimeout)
    ref.current = []
    set([])
    // @ts-ignore
    ref.current.push(setTimeout(() => set(['COMP90024', 'Cluster ', 'and', 'Cloud Computing']), 2000))
    // @ts-ignore
    ref.current.push(setTimeout(() => set(['Assignment', 'Two']), 5000))
    // @ts-ignore
    ref.current.push(setTimeout(() => set(['Tweets Analysis ', 'on the Cloud']), 8000))
  }, [])

  useEffect(() => reset(), [])

  return (
    <div>
      {transitions.map(({ item, props: { innerHeight, ...rest }, key }) => (
        <animated.div className="transitions-item" key={key} style={rest} onClick={reset}>
          <animated.div style={{ overflow: 'hidden', height: innerHeight }}>{item}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}
export default BigTitle
