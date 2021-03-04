import {useState} from 'react'
import styles from './RoomMenu.module.css'

export default function RoomMenu(props) {
    const [selected, setSelected] = useState(props.default || 'kost')

    function handleChange(type) {
        setSelected(type)
        props.onChange(type)
    }

    return (
        <div className={styles.menus}>
            {['kost', 'kontrakan', 'penginapan', 'perumahan', 'hotel', 'villa'].map((item, i) => (
                <button className={item === selected ? styles.selected : null} key={i} onClick={() => handleChange(item)}>
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
            ))}
        </div>
    )
}