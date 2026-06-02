import { createContext, useContext, useReducer } from 'react'
import { bookingReducer, initialState } from '../reducers/bookingReducer'
import { SEED_BOOKINGS } from '../data/movies'

const BookingContext = createContext(null)

function buildInitialState() {
  return SEED_BOOKINGS.reduce(
    (state, booking) =>
      bookingReducer(state, { type: 'ADD_BOOKING', payload: booking }),
    initialState
  )
}

export function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(bookingReducer, undefined, buildInitialState)

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  )
}

/**
 * Custom hook — gives access to state and dispatch from anywhere in the tree.
 * Must be used inside <BookingProvider>.
 */
export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
