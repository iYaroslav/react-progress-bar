import React, { useEffect, useRef, useState } from 'react'

import Progress from 'react-progress-bar'
import 'react-progress-bar/dist/index.css'

const App = () => {
  const [sliderValue, setSliderValue] = useState(0)

  /** @type {{ current: YSProgressElement }} */
  const ref = useRef(null)

  useEffect(() => {
    let value = 0
    const interval = setInterval(() => {
      value += 0.002
      ref.current.setValue(value % 1)
    }, 0)

    return () => {
      clearInterval(interval)
    }
  }, [ref])

  return <>
    {Array(10).fill(0).map((_, index) => <Progress
      className='progress'
      key={index}
      value={index / 9}
    />)}

    <Progress ref={ref} className='progress green' />

    <Progress
      className='progress red'
      onUserChange={setSliderValue}
    />

    <p>Value: {Math.round(sliderValue * 100)}%</p>
  </>
}

export default App
