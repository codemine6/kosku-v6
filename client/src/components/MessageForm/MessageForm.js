import {useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import config from 'services/Config'
import styles from './MessageForm.module.css'

import {Send} from 'Icons'

export default function MessageForm({user}) {
    const [text, setText] = useState('')
    const inputRef = useRef()
    let params = useParams()

    function changeText(e) {
        e.target.style.height = 'auto'
        e.target.style.height = e.target.scrollHeight + 'px'
        setText(e.target.value)
    }

    async function sendMessage() {
        const data = {
            chat: params.id,
            images: [],
            receiver: user,
            room: null,
            text
        }
        if (text) {
            fetch(`${config.API_URL}/message`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            })
        }
        setText('')
        inputRef.current.style.height = 'auto'
    }

    return (
        <div className={styles.form}>
            <textarea placeholder="Tulis pesan..." spellCheck={false} rows={1} ref={inputRef} value={text} onChange={changeText}/>
            <i onClick={sendMessage}><Send/></i>
        </div>
    )
}