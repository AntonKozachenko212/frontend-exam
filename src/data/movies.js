export const MOVIES = [
  {
    id: 'm1',
    title: 'Дюна: Частина ІІ',
    genre: 'Sci-Fi',
    duration: '166 хв',
    hall: 'Зал 1',
    emoji: '🪱',
    showtimes: ['10:00', '14:30', '19:00', '22:30'],
  },
  {
    id: 'm2',
    title: 'Механічний Апельсин',
    genre: 'Жесть',
    duration: '158 хв',
    hall: 'Зал 2',
    emoji: '🍊',
    showtimes: ['11:00', '16:00', '20:30'],
  },
  {
    id: 'm3',
    title: 'Опенгеймер',
    genre: 'Драма',
    duration: '180 хв',
    hall: 'Зал 1',
    emoji: '☢️',
    showtimes: ['12:00', '17:30', '21:00'],
  },
  {
    id: 'm4',
    title: 'Мій сусід Тоторо',
    genre: 'Аніме',
    duration: '86 хв',
    hall: 'Зал 3',
    emoji: '🌿',
    showtimes: ['10:30', '13:00', '15:30', '18:00'],
  },
  {
    id: 'm5',
    title: 'Нові мутанти',
    genre: 'Жахи',
    duration: '94 хв',
    hall: 'Зал 2',
    emoji: '🕸️',
    showtimes: ['23:00', '01:00'],
  },
  {
    id: 'm6',
    title: 'La La Land',
    genre: 'Мюзикл',
    duration: '128 хв',
    hall: 'Зал 3',
    emoji: '🎷',
    showtimes: ['13:30', '18:30', '21:30'],
  },
]

export const SEED_BOOKINGS = [
  {
    id: 'BK-001',
    name: 'Ольга Петренко',
    email: 'olga@mail.com',
    movieId: 'm1',
    movie: 'Дюна: Частина ІІ',
    showtime: '19:00',
    seats: 2,
    row: 'A — VIP ближній',
    status: 'confirmed',
    date: '2024-06-10',
  },
  {
    id: 'BK-002',
    name: 'Михайло Ковач',
    email: 'mike@mail.com',
    movieId: 'm3',
    movie: 'Опенгеймер',
    showtime: '21:00',
    seats: 1,
    row: 'C — Стандарт ближній',
    status: 'pending',
    date: '2024-06-10',
  },
  {
    id: 'BK-003',
    name: 'Соня Іванова',
    email: 'sonya@mail.com',
    movieId: 'm6',
    movie: 'La La Land',
    showtime: '18:30',
    seats: 3,
    row: 'B — VIP задній',
    status: 'cancelled',
    date: '2024-06-09',
  },
]

export const ROWS = [
  'A — VIP ближній',
  'B — VIP задній',
  'C — Стандарт ближній',
  'D — Стандарт центр',
  'E — Стандарт задній',
]

export const STATUS_LABELS = {
  pending: 'Очікує',
  confirmed: 'Підтверджено',
  cancelled: 'Скасовано',
}

export const STATUSES = ['pending', 'confirmed', 'cancelled']
