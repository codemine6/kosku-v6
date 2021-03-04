import {useDb} from 'services/Api'

export function checkStatus(props) {
    props.forEach(booking => {
        if (booking.status === 'waiting') {
            const remaining = (booking.bookingTime.toMillis() - Date.now()) / 1000 + 172800

            if (remaining < 0) {
                useDb.collection('bookings').doc(booking.id).set({status: 'canceled', canceledTime: new Date()}, {merge: true})
            }
        }
    })
}