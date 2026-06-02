import { useBooking } from '../../context/BookingContext'
import { ACTIONS } from '../../reducers/bookingReducer'
import styles from './MovieCatalog.module.css'

export function MovieCard({ movie }) {
  const { state, dispatch } = useBooking()
  const isSelected = state.selectedMovieId === movie.id

  function handleMovieClick() {
    dispatch({ type: ACTIONS.SELECT_MOVIE, payload: movie.id })
  }

  function handleShowtimeClick(e, time) {
    e.stopPropagation()
    dispatch({ type: ACTIONS.SELECT_MOVIE,    payload: movie.id })
    dispatch({ type: ACTIONS.SELECT_SHOWTIME, payload: time })
  }

  return (
    <div
      className={`${styles.card} ${isSelected ? styles.cardSelected : ''}`}
      onClick={handleMovieClick}
    >
      <div className={styles.emoji}>{movie.emoji}</div>
      <div className={styles.title}>{movie.title}</div>
      <div className={styles.meta}>{movie.duration} · {movie.hall}</div>
      <span className={styles.genre}>{movie.genre}</span>

      <div className={styles.showtimes}>
        {movie.showtimes.map(time => {
          const isTimeSel = isSelected && state.selectedShowtime === time
          return (
            <button
              key={time}
              className={`${styles.showtimeBtn} ${isTimeSel ? styles.showtimeBtnSelected : ''}`}
              onClick={e => handleShowtimeClick(e, time)}
            >
              {time}
            </button>
          )
        })}
      </div>
    </div>
  )
}
