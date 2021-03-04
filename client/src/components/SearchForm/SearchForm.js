import {useState, useEffect, useRef} from 'react'
import {useHistory} from 'react-router-dom'
import styles from './SearchForm.module.css'

import {Search} from 'Icons'

export default function SearchForm(props) {
    const [input, setInput] = useState('')
    const inputRef = useRef()
    let history = useHistory()

    function handleSearch() {
        if (input) {
            props.onSearch(input)
        }
    }

    useEffect(() => {
        if (history.location.pathname === '/search') {
            inputRef.current.focus()
        }
    }, [history.location.pathname])

    return (
        <div className={styles.form}>
            <input placeholder="Cari kos, kota, lokasi terdekat" ref={inputRef} value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
            <i onClick={handleSearch}><Search/></i>
        </div>
    )
}