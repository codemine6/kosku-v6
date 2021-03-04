import {useState, useEffect} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {useAuth} from 'services/Api'
import styles from './Verification.module.css'

import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function Verification() {
    const [verified, setVerified] = useState(false)
    const [loading, setLoading] = useState(true)
    let history = useHistory()
    let location = useLocation()
    let actionCode = new URLSearchParams(useLocation().search).get('oobCode')

    useEffect(() => {
        if (actionCode) {
            useAuth.applyActionCode(actionCode).then(() => {
                setVerified(true)
                setLoading(false)
            }).catch(() => {
                history.replace('/404')
            })
        } else {
            useAuth.onAuthStateChanged(user => {
                if (user.emailVerified && location.state) {
                    setVerified(true)
                    setLoading(false)
                } else if (user.emailVerified) {
                    history.replace('/404')
                } else {
                    useAuth.currentUser.sendEmailVerification()
                    setLoading(false)
                }
            })
        }
    }, [actionCode, location, history])

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {!loading && verified && <div>
                    <h2>Verifikasi Berhasil</h2>
                    <p>Akun berhasil diverifikasi. Silahkan klik lanjutkan untuk mulai menggunakan aplikasi.</p>
                    <Button onClick={() => history.replace('/')}>Lanjutkan</Button>
                </div>}
                {!loading && !verified && <div>
                    <h2>Verifikasi Email</h2>
                    <p>Tautan verifikasi telah dikirim ke emailmu. Silahkan lakukan verifikasi untuk menyelesaikan pendaftaran.</p>
                </div>}
            </div>
            {loading && <Loader/>}
        </div>
    )
}