import styles from './RoomFacilities.module.css'

import {Ac, Fan, Mattress, Parking, Sofa, Toilet, Tv, Wifi} from 'Icons'

export default function RoomFacilities({facilities}) {
    return (
        <div className={styles.facilities}>
            <h4>Fasilitas</h4>
            <div className={styles.list}>
                {facilities.map((facility, i) => (
                    <div className={styles.item} key={i}>
                        <i>
                            {facility.id === '1' && <Mattress/>}
                            {facility.id === '2' && <Toilet/>}
                            {facility.id === '3' && <Sofa/>}
                            {facility.id === '4' && <Fan/>}
                            {facility.id === '5' && <Tv/>}
                            {facility.id === '6' && <Ac/>}
                            {facility.id === '7' && <Wifi/>}
                            {facility.id === '8' && <Parking/>}
                        </i>
                    </div>
                ))}
            </div>
        </div>
    )
}