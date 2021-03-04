import {useState} from 'react'
import styles from './ReviewItem.module.css'

import Time from 'utils/Time'
import {ChevronBottom, ChevronTop} from 'Icons'
import Rating from 'components/Rating/Rating'

export default function ReviewItem({review}) {
    const [open, setOpen] = useState(false)

    return (
        <div className={styles.review}>
            <Rating rate={review.rating}/>
            <p className={styles.from}>Oleh <b>{review.customer}</b></p>
            <p className={styles.time}>{Time(review.sendTime).fromNow()}</p>
            <p className={styles.text}>{review.text}</p>
            {review.reply &&
                <button className={styles.replyBtn} onClick={() => setOpen(!open)}>Balasan {open ? <ChevronTop/> : <ChevronBottom/>}</button>
            }

            {open && <div className={styles.reply}>
                <p>{review.reply.text}</p>
                <span>{Time(review.reply.sendTime).fromNow()}</span>
            </div>}
        </div>
    )
}