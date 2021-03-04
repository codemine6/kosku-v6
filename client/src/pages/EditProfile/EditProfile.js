import {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import {useDb} from 'services/Api'
import styles from './EditProfile.module.css'

import {Camera} from 'Icons'
import Navbar from 'components/Navbar/Navbar'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

import cities from 'source/cities.json'

export default function EditProfile() {
    const {auth} = useAuthContext()
    const [profilePhoto, setProfilePhoto] = useState()
    const [username, setUsername] = useState()
    const [phone, setPhone] = useState()
    const [city, setCity] = useState()
    const [list, setList] = useState()
    const [loading, setLoading] = useState(false)
    let history = useHistory()

    function changeImage(e) {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = img => setProfilePhoto(img.target.result)
    }

    function changeCity(e) {
        const value = e.target.value
        const result = cities.filter(city => city.toLowerCase().includes(value.toLowerCase()))
        setCity(value)
        setList(result)
    }

    function selectCity(city) {
        setCity(city)
        setList(null)
    }

    function saveProfile() {
        setLoading(true)
        const data = {profilePhoto, username, phone, city}
        useDb.collection('users').doc(auth.id).set(data, {merge: true}).then(() => {
            history.goBack()
        })
    }

    return (
        <>
            <Navbar/>
            <div className={styles.photo}>
                <img src={profilePhoto ?? "https://placeimg.com/100/100/people"} alt=""/>
                <label htmlFor="input"><Camera/> Ubah Foto</label>
                <input id="input" type="file" accept="image/*" onChange={changeImage}/>
            </div>
            <div className={styles.form}>
                <label>Nama Pengguna</label>
                <input value={username ?? auth.username} onChange={e => setUsername(e.target.value)}/>
                <label>Telepon</label>
                <input value={phone ?? auth.phone} onChange={e => setPhone(e.target.value)}/>
            </div>
            <div className={styles.city}>
                <label>Kota</label>
                <input value={city ?? auth.city} onChange={changeCity}/>
                {list?.length === 0 && <p className={styles.message}>* Kota tidak ditemukan</p>}
                {list?.length > 0 && <div className={styles.list}>
                    {list.map((city, i) => (
                        <p onClick={() => selectCity(city)} key={i}>{city}</p>
                    ))}
                </div>}
            </div>
            <Button id={styles.save} onClick={saveProfile}>Simpan</Button>
            {loading && <Loader/>}
        </>
    )
}