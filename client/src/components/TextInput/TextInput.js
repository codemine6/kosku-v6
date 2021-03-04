import {useState} from 'react'
import styles from './TextInput.module.css'

import {Eye, EyeOff, Valid} from 'Icons'

export default function TextInput(props) {
    const [value, setValue] = useState('')
    const [message, setMessage] = useState('')
    const [type, setType] = useState(props.type)

    function handleChange(e) {
        if (props.validation) {
            const result = props.validation(e.target.value)
            if (result.valid) {
                props.onChange(result.text)
                setMessage(null)
            } else {
                setMessage(result.text)
            }
        } else {
            props.onChange(e.target.value)
        }
        if (type === 'email') {
            setValue(e.target.value.toLowerCase())
        } else {
            setValue(e.target.value)
        }
    }

    return (
        <div className={styles.inputGroup}>
            <input
                className={message ? styles.invalid : null}
                type={type}
                value={value}
                onChange={handleChange}
            />
            {message === null && props.type !== 'password' && <i className={styles.validIcon}><Valid/></i>}
            {message && <span dangerouslySetInnerHTML={{__html: message}}/>}
            {props.type === 'password' &&
                <>{type === 'password' ?
                    <i className={styles.eyeIcon} onClick={() => setType('text')}><EyeOff/></i> : <i className={styles.eyeIcon} onClick={() => setType('password')}><Eye/></i>
                }</>
            }
        </div>
    )
}