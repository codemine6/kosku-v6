import {useState} from 'react'
import {useDb} from 'services/Api'
import styles from './ReviewAction.module.css'

import Time from 'utils/Time'
import {Location} from 'Icons'
import Rating from 'components/Rating/Rating'
import Button from 'components/Button/Button'

export default function ReviewItem({review}) {
    const [message, setMessage] = useState(review.reply ?? '')
    const [open, setOpen] = useState(false)

    function addReply() {
        const data = {
            message,
            sendTime: new Date()
        }
        if (message) {
            useDb.collection('rooms').doc(review.room).collection('reviews').doc(review.id).set({reply: data}, {merge: true}).then(() => {
                setOpen(false)
            })
        }
    }

    return (
        <div className={styles.review}>
            <div className={styles.room}>
                <img src={review.room.image} alt=""/>
                <div>
                    <h4>{review.room.name}</h4>
                    <div className={styles.location}>
                        <Location/>
                        <div>
                            <span>{review.room.location.city}</span>
                            <p>{review.room.location.address}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Rating rate={review.rating}/>
            <p className={styles.from}>Oleh <b>{review.customer}</b></p>
            <p className={styles.time}>{Time(review.sendTime).fromNow()}</p>
            <p className={styles.text}>{review.text}</p>
            <button id={styles.replyBtn} onClick={() => setOpen(!open)}>{open ? 'Tutup' : 'Balas'}</button>

            {open && <div className={styles.form}>
                <textarea placeholder="Balasanmu.." value={message} onChange={e => setMessage(e.target.value)}/>
                <Button onClick={addReply}>Kirim</Button>
            </div>}
        </div>
    )
}