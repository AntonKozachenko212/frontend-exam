export const ACTIONS = {
  ADD_BOOKING:    'ADD_BOOKING',
  CANCEL_BOOKING: 'CANCEL_BOOKING',
  CHANGE_STATUS:  'CHANGE_STATUS',
  SET_FILTER:     'SET_FILTER',
  SELECT_MOVIE:   'SELECT_MOVIE',
  SELECT_SHOWTIME:'SELECT_SHOWTIME',
}

export const initialState = {
  bookings: [],            // Booking[]
  filter: 'all',          // 'all' | 'pending' | 'confirmed' | 'cancelled'
  selectedMovieId: null,  // string | null
  selectedShowtime: null, // string | null
}

/**
 * @param {typeof initialState} state
 * @param {{ type: string, payload?: any }} action
 * @returns {typeof initialState}
 */
export function bookingReducer(state, action) {
  switch (action.type) {

    case ACTIONS.ADD_BOOKING:
      return {
        ...state,
        bookings: [action.payload, ...state.bookings],
      }

    case ACTIONS.CANCEL_BOOKING:
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload
            ? { ...b, status: 'cancelled' }
            : b
        ),
      }

    case ACTIONS.CHANGE_STATUS:
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload.id
            ? { ...b, status: action.payload.status }
            : b
        ),
      }

    case ACTIONS.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      }

    case ACTIONS.SELECT_MOVIE:
      return {
        ...state,
        selectedMovieId: action.payload,
        selectedShowtime: null,
      }

    case ACTIONS.SELECT_SHOWTIME:
      return {
        ...state,
        selectedShowtime: action.payload,
      }

    default:
      return state
  }
}
