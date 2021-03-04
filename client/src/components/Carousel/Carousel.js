import {useState, useEffect, useRef} from 'react'
import styles from './Carousel.module.css'

export default function Carousel(props) {
    const [childList, setChildList] = useState()
    const [active, setActive] = useState()
    const slideRef = useRef()
    let scroll

    function handleScroll(e) {
        scroll = Math.floor(e.target.scrollLeft)
    }

    function handleTouch() {
        const noSwiped = Math.abs(scroll - active) < Math.floor(slideRef.current.clientWidth / 6)

        if (noSwiped) {
            slideRef.current.scrollLeft = active
        } else if (scroll > active) {
            const current = childList[childList.indexOf(active) + 1]
            slideRef.current.scrollLeft = current
            setActive(current)
        } else if (scroll < active) {
            const current = childList[childList.indexOf(active) - 1]
            slideRef.current.scrollLeft = current
            setActive(current)
        }
    }

    useEffect(() => {
        const element = Array.from(slideRef.current.children).map(item => item.offsetLeft)
        setChildList(element)
        setActive(element[0])

        if (props.autoplay) {
            let index = 1
            const interval = setInterval(() => {
                slideRef.current.scrollLeft = element[index]
                setActive(element[index])

                index + 1 === element.length ? index = 0 : index++
            }, 7000)

            return () => clearInterval(interval)
        }
    }, [slideRef, props.children, props.autoplay])

    return (
        <div className={styles.carousel}>
            <div className={styles.slide} ref={slideRef} onScroll={handleScroll} onTouchEnd={handleTouch}>
                {props.children}
            </div>
            <div className={styles.bar}>
                {childList?.map((child, i) => (
                    <span className={child === active ? styles.active : null} key={i}/>
                ))}
            </div>
        </div>
    )
}