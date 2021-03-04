import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import {validateEmail, validatePassword, validateUsername} from 'utils/Validation'
import config from 'services/Config'
import styles from './Register.module.css'

import TextInput from 'components/TextInput/TextInput'
import Select from 'components/Select/Select'
import AuthOption from 'components/AuthOption/AuthOption'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function Register() {
    const {dispatch} = useAuthContext()
    const [username, setUsername] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [type, setType] = useState('owner')
    const [message, setMessage] = useState()
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    async function handleRegister() {
        setMessage(null)
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/auth/register`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, phone, email, password, type})
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
                <h1>Daftar</h1>
                <label>Nama Lengkap</label>
                <TextInput validation={validateUsername} onChange={setUsername}/>
                <label>No.Telepon</label>
                <TextInput type="number" onChange={setPhone}/>
                <label>Email Address</label>
                <TextInput type="email" validation={validateEmail} onChange={setEmail}/>
                <label>Password</label>
                <TextInput type="password" validation={validatePassword} onChange={setPassword}/>
                <label>Daftar sebagai</label>
                <Select onChange={setType}>
                    <option value="owner">Pemilik Kost</option>
                    <option value="customer">Pencari Kost</option>
                </Select>
                <p className={styles.error}>{message}</p>

                <Button onClick={!loading && handleRegister}>Daftar</Button>

                <p>Atau masuk dengan</p>
                <AuthOption/>
                <p>Sudah Punya Akun? <b onClick={() => history.replace('/login')}>Masuk Disini</b></p>
            </div>
            {loading && <Loader/>}
        </div>
    )
}