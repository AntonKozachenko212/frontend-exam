import { useBooking } from '../../context/BookingContext'
import styles from './Dashboard.module.css'

export function Dashboard() {
  const { state } = useBooking()
  const { bookings } = state

  const total     = bookings.length
  const pending   = bookings.filter(b => b.status === 'pending').length
  const confirmed = bookings.filter(b => b.status === 'confirmed').length
  const cancelled = bookings.filter(b => b.status === 'cancelled').length
  const totalSeats = bookings
    .filter(b => b.status !== 'cancelled')
    .reduce((acc, b) => acc + b.seats, 0)

  const stats = [
    { label: 'Усього',       value: total,      mod: styles.total },
    { label: 'Очікують',    value: pending,    mod: styles.pending },
    { label: 'Підтверджено', value: confirmed,  mod: styles.confirmed },
    { label: 'Скасовано',   value: cancelled,  mod: styles.cancelled },
    { label: 'Місць продано', value: totalSeats, mod: styles.seats },
  ]

  return (
    <div className={styles.row}>
      {stats.map(s => (
        <div key={s.label} className={`${styles.stat} ${s.mod}`}>
          <div className={styles.val}>{s.value}</div>
          <div className={styles.lbl}>{s.label}</div>
        </div>
      ))}
    </div>
  )
}
