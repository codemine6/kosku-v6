import {useState, useEffect, useRef} from 'react'
import styles from './Select.module.css'

import {ChevronBottom, ChevronTop} from 'Icons'

export default function Select(props) {
    const [open, setOpen] = useState(false)
    const [selected, setSelected] = useState(props.children[0].props)
    const optionRef = useRef()

    function handleChange(e) {
        setSelected({value: e.target.getAttribute('value'), children: e.target.innerText})
        props.onChange(e.target.getAttribute('value'))
    }

    function closeSelect(e) {
        !optionRef.current?.contains(e.target) && setOpen(false)
    }

    useEffect(() => {
        document.addEventListener('click', closeSelect)
        return () => document.removeEventListener('click', closeSelect)
    }, [])

    return (
        <div className={styles.select}>
            <div className={styles.header}  ref={optionRef} onClick={() => setOpen(!open)}>{selected.children}</div>
            <i>{open ? <ChevronTop/> : <ChevronBottom/>}</i>
            {open && <div className={styles.options}>
                {props.children.map((child, i) => (
                    <p value={child.props.value} key={i} onClick={handleChange}>{child.props.children}</p>
                ))}
            </div>}
        </div>
    )
}