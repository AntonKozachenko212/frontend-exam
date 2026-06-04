import { useBooking } from '../../context/BookingContext'
import { ACTIONS } from '../../reducers/bookingReducer'
import { BookingCard } from './BookingCard'

const FILTERS = [
  { value: 'all',       label: 'Усі' },
  { value: 'pending',   label: 'Очікують' },
  { value: 'confirmed', label: 'Підтверджені' },
  { value: 'cancelled', label: 'Скасовані' },
]

export function BookingList() {
  const { state, dispatch } = useBooking()

  function handleFilter(value) {
    dispatch({ type: ACTIONS.SET_FILTER, payload: value })
  }

  const filtered = state.filter === 'all'
    ? state.bookings
    : state.bookings.filter(b => b.status === state.filter)

  return (
    <div>
      <h2 className="section-heading">Мої бронювання</h2>

      {/* Filters */}
      <div className="filter-row">
        {FILTERS.map(f => (
          <button
            key={f.value}
            className={`filter-btn ${state.filter === f.value ? 'filter-btn--active' : ''}`}
            onClick={() => handleFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="empty">
          <div className="empty__icon">🎟</div>
          Немає бронювань у цій категорії
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(booking => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}
