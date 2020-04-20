import React, {
  useEffect,
  useRef,
  useCallback,
  forwardRef,
  useLayoutEffect,
  CSSProperties,
  Ref
} from 'react'
import styles from './styles.module.css'

export interface Props {
  value: number
  className?: string
  style?: CSSProperties
  onChange?: (value: number) => void
  onUserChange?: (value: number) => void
}

export interface YSProgressElement extends HTMLDivElement {
  setValue: (value: number) => void
  getValue: () => number
}

function Progress(
  { value, onChange, onUserChange, className = '', ...props }: Props,
  ref: Ref<YSProgressElement>
) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const valueRef = useRef<HTMLDivElement>(null)
  const values = useRef({
    userHandled: false,
    progress: 0,
    raf: -1
  })

  const apply = useCallback(() => {
    const cssProgressValue = `${values.current.progress * 100}%`

    if (valueRef.current) {
      valueRef.current.style.width = cssProgressValue
    }

    if (sliderRef.current) {
      sliderRef.current.style.left = cssProgressValue
    }

    if (onChange) {
      onChange(values.current.progress)
    }

    if (values.current.userHandled && onUserChange) {
      onUserChange(values.current.progress)
    }

    values.current.raf = -1
  }, [onChange, onUserChange])

  const updateProgress = useCallback(
    (value: number) => {
      const progress = Math.max(0, Math.min(1, Math.round(value * 100) / 100))
      if (values.current.progress !== progress) {
        values.current.progress = progress

        if (values.current.raf === -1) {
          values.current.raf = requestAnimationFrame(apply)
        }
      }
    },
    [apply]
  )

  useEffect(() => {
    const container = containerRef.current!
    let bounds: DOMRect

    const onMove = (e: MouseEvent) => {
      updateProgress((e.clientX - bounds.left) / bounds.width)
    }

    const onDown = (e: MouseEvent) => {
      bounds = container.getBoundingClientRect()
      onMove(e)
      values.current.userHandled = true
      container.classList.add(styles.handled)
      document.addEventListener('mousemove', onMove, false)
      document.addEventListener('mouseup', onUp, false)
    }

    const onUp = () => {
      // TODO fire event
      values.current.userHandled = false
      container.classList.remove(styles.handled)
      document.removeEventListener('mousemove', onMove, false)
      document.removeEventListener('mouseup', onUp, false)
    }

    container.addEventListener('mousedown', onDown, false)

    return () => {
      cancelAnimationFrame(values.current.raf)
      container.removeEventListener('mousedown', onDown, false)
    }
  }, [])

  useEffect(() => {
    if (!values.current.userHandled) {
      updateProgress(value)
    }
  }, [value])

  useLayoutEffect(() => {
    if (!ref || !containerRef.current) return
    const el: Partial<YSProgressElement> = containerRef.current

    el.setValue = (value) => {
      !values.current.userHandled && updateProgress(value)
    }
    el.getValue = () => values.current.progress

    if (typeof ref === 'function') {
      ref(el as YSProgressElement)
    } else {
      ;(ref as any).current = el as YSProgressElement
    }
  }, [ref, updateProgress])

  return (
    <div
      ref={containerRef}
      className={[styles.container, className].join(' ')}
      {...props}
    >
      <div className={styles.progress} />
      <div ref={valueRef} className={styles.value} />
      <div ref={sliderRef} className={styles.slider} />
    </div>
  )
}

export default forwardRef(Progress)
