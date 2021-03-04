import {useHistory} from 'react-router-dom'
import styles from './RoomMenu.module.css'

import Confirm from 'components/Confirm/Confirm'

export default function RoomMenu(props) {
    let history = useHistory()

    function deleteRoom() {
        // useDb.collection('rooms').doc(props.id).delete().then(() => console.log('deleted'))
    }

    return (
        <div className={styles.menu} ref={props.menuRef}>
            <p onClick={() => history.push(`/room/${props.id}`)}>Lihat Detail</p>
            <p onClick={() => history.push(`/edit-room/${props.id}`)}>Edit</p>
            <Confirm title="Apakah kamu yakin akan menghapusnya?" onConfirm={deleteRoom}>
                <p>Hapus</p>
            </Confirm>
        </div>
    )
}