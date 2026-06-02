import { useRef } from 'react'
import { useBooking } from '../../context/BookingContext'
import { ACTIONS } from '../../reducers/bookingReducer'
import { MOVIES, ROWS } from '../../data/movies'
import styles from './BookingForm.module.css'

let _idCounter = 10

function generateId() {
  return `BK-${String(_idCounter++).padStart(3, '0')}`
}

export function BookingForm({ onSuccess }) {
  const { state, dispatch } = useBooking()
  const nameRef  = useRef()
  const emailRef = useRef()
  const seatsRef = useRef()
  const rowRef   = useRef()

  const selectedMovie = MOVIES.find(m => m.id === state.selectedMovieId)
  const isReady = selectedMovie && state.selectedShowtime

  function handleSubmit() {
    const name  = nameRef.current.value.trim()
    const email = emailRef.current.value.trim()
    if (!name || !email) {
      onSuccess?.('Заповніть імʼя та email', 'error')
      return
    }
    if (!isReady) {
      onSuccess?.('Оберіть фільм та сеанс', 'error')
      return
    }

    const booking = {
      id:       generateId(),
      name,
      email,
      movieId:  selectedMovie.id,
      movie:    selectedMovie.title,
      showtime: state.selectedShowtime,
      seats:    Number(seatsRef.current.value),
      row:      rowRef.current.value,
      status:   'pending',
      date:     new Date().toISOString().slice(0, 10),
    }

    dispatch({ type: ACTIONS.ADD_BOOKING, payload: booking })
    nameRef.current.value  = ''
    emailRef.current.value = ''
    onSuccess?.('Бронювання створено!', 'success')
  }

  return (
    <div className={styles.panel}>
      <h2 className="section-heading">Оформити бронювання</h2>

      {/* Selected movie info */}
      <div className={`${styles.infoBox} ${!isReady ? styles.infoBoxEmpty : ''}`}>
        {isReady ? (
          <>
            <span className={styles.infoAccent}>{selectedMovie.emoji} {selectedMovie.title}</span>
            <br />
            Час: <span className={styles.infoAccent}>{state.selectedShowtime}</span>
            {' · '}
            Зал: <span className={styles.infoAccent}>{selectedMovie.hall}</span>
          </>
        ) : (
          <span>← Оберіть фільм та сеанс</span>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Ваше імʼя</label>
        <input ref={nameRef} type="text" placeholder="Іван Франко" className={styles.input} />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Email</label>
        <input ref={emailRef} type="email" placeholder="ivan@example.com" className={styles.input} />
      </div>

      <div className={styles.row2}>
        <div className={styles.field}>
          <label className={styles.label}>Місць</label>
          <select ref={seatsRef} className={styles.input}>
            {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div className={styles.field}>
          <label className={styles.label}>Ряд</label>
          <select ref={rowRef} className={styles.input}>
            {ROWS.map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      <button className="btn-primary" disabled={!isReady} onClick={handleSubmit}>
        Забронювати квитки
      </button>
    </div>
  )
}
