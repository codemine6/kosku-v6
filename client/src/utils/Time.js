const intervals = [
    {label: 'tahun', seconds: 31536000},
    {label: 'bulan', seconds: 2592000},
    {label: 'hari', seconds: 86400},
    {label: 'jam', seconds: 3600},
    {label: 'menit', seconds: 60}
]

const monthList = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

export default function Time(props) {
    return {
        fromNow: () => {
            const seconds = (Date.now() - new Date(props).getTime()) / 1000
            const interval = intervals.find(i => i.seconds < seconds)

            if (interval) {
                const time = Math.floor(seconds / interval.seconds)
                return `${time} ${interval.label} lalu`
            } else {
                return 'Beberapa saat lalu'
            }
        },
        remaining: (seconds) => {
            const remaining = (new Date(props).getTime() - Date.now()) / 1000 + seconds
            const day = Math.floor(remaining / 86400)
            const hour = Math.floor(remaining / 3600) % 24
            const minutes = Math.floor(remaining / 60) % 60

            if (day !== 0) return `${day}h ${hour}j ${minutes}m`
            else if (hour !== 0) return `${hour}j ${minutes}m`
            else return `${minutes}m`
        },
        toDate: () => {
            const date = new Date(props).getDate()
            const month = monthList[new Date(props).getMonth()]
            const year = new Date(props).getFullYear()
            return `${date} ${month} ${year}`
        },
        toDateTime: () => {
            const minute = new Date(props).getMinutes()
            const hour = new Date(props).getHours()
            const date = new Date(props).getDate()
            const month = monthList[new Date(props).getMonth()]
            const year = new Date(props).getFullYear()
            return `${hour}:${minute}, ${date} ${month} ${year}`
        }
    }
}