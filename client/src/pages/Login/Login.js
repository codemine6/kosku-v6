import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import config from 'services/Config'
import styles from 'pages/Register/Register.module.css'

import TextInput from 'components/TextInput/TextInput'
import AuthOption from 'components/AuthOption/AuthOption'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function Login() {
    const {dispatch} = useAuthContext()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    async function handleLogin() {
        setMessage(null)
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/auth/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            })
            if (res.ok) {
                dispatch(await res.json())
                history.replace('/')
            } else {
                const {message} = await res.json()
                throw new Error(message)
            }
        } catch (err) {
            setLoading(false)
            setMessage(err.message)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.auth}>
                <h1>Masuk</h1>
                <label>Email Address</label>
                <TextInput type="email" onChange={setEmail}/>
                <label>Password</label>
                <TextInput type="password" onChange={setPassword}/>
                <p className={styles.forgot} onClick={() => history.push('/recovery')}>Lupa password?</p>
                <p className={styles.error}>{message}</p>

                <Button onClick={!loading && handleLogin}>Masuk</Button>

                <p>Atau masuk dengan</p>
                <AuthOption/>
                <p>Belum Punya Akun? <b onClick={() => history.replace('/register')}>Daftar Disini</b></p>
            </div>
            {loading && <Loader/>}
        </div>
    )
}