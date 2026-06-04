import { useBooking } from '../../context/BookingContext'
import { ACTIONS } from '../../reducers/bookingReducer'
import { STATUSES, STATUS_LABELS } from '../../data/movies'
import styles from './BookingList.module.css'

export function BookingCard({ booking }) {
  const { dispatch } = useBooking()

  function handleCancel() {
    dispatch({ type: ACTIONS.CANCEL_BOOKING, payload: booking.id })
  }

  function handleChangeStatus(newStatus) {
    dispatch({ type: ACTIONS.CHANGE_STATUS, payload: { id: booking.id, status: newStatus } })
  }

  const otherStatuses = STATUSES.filter(s => s !== booking.status)

  return (
    <div className={`${styles.card} ${styles[`card_${booking.status}`]}`}>
      {/* ID + date */}
      <div className={styles.cardId}>
        <span className={styles.idCode}>{booking.id}</span>
        <span className={styles.idDate}>{booking.date}</span>
      </div>

      {/* Main info */}
      <div className={styles.cardMain}>
        <div className={styles.movieTitle}>{booking.movie}</div>
        <div className={styles.details}>
          {booking.name} · {booking.email} · {booking.showtime}
        </div>
        <div className={styles.seats}>
          {booking.seats} місць · {booking.row}
        </div>
      </div>

      {/* Status + actions */}
      <div className={styles.cardRight}>
        <span className={`badge badge--${booking.status}`}>
          {STATUS_LABELS[booking.status]}
        </span>

        <div className={styles.actions}>
          {otherStatuses.map(s => (
            <button
              key={s}
              className="btn-sm"
              onClick={() => handleChangeStatus(s)}
            >
              {STATUS_LABELS[s]}
            </button>
          ))}

          {booking.status !== 'cancelled' && (
            <button className="btn-sm btn-sm--danger" onClick={handleCancel}>
              Скасувати
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
