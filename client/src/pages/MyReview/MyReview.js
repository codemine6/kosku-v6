import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAuthContext} from 'contexts/AuthContext'
import {getData} from 'services/Api'
import config from 'services/Config'
import styles from './MyReview.module.css'

import {Star} from 'Icons'
import Navbar from 'components/Navbar/Navbar'
import RoomSummary from 'components/RoomSummary/RoomSummary'
import Button from 'components/Button/Button'
import Loader from 'components/Loader/Loader'

export default function MyReview() {
    const [review, setReview] = useState()
    const {auth} = useAuthContext()
    const [rating, setRating] = useState()
    const [text, setText] = useState()
    const [loading, setLoading] = useState(true)
    let params = useParams()

    async function addReview() {
        setLoading(true)
        try {
            const res = await fetch(`${config.API_URL}/review/${params.id}`, {
                method: 'PATCH',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({rating, text, owner: review.room.owner})
            })
            if (res.ok) {
                setLoading(false)
            }
        } catch {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function fetchData() {
            const [data] = await getData(`review/${params.id}`)
            if (data) {
                setReview(data)
                setRating(data.rating)
                setText(data.text)
                setLoading(false)
            }
        }
        fetchData()
    }, [params.id, auth.id])

    return (
        <>
            <Navbar/>
            {review && <div className={styles.container}>
                <RoomSummary room={review.room}/>
                <div className={styles.rating}>
                    {[1,2,3,4,5].map(i => (
                        <i className={i <= rating ? styles.marked : null} key={i} onClick={() => setRating(i)}><Star/></i>
                    ))}
                </div>
                <div className={styles.form}>
                    <label>Ceritakan pengalamanmu?</label>
                    <textarea placeholder="Ayo ceritakan pengalamanmu.." rows="4" value={text} onChange={e => setText(e.target.value)}/>
                    <Button onClick={addReview}>Save</Button>
                </div>
            </div>}
            {loading && <Loader/>}
        </>
    )
}