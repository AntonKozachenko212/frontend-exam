import { useState, useCallback, useRef } from 'react'
import { BookingProvider } from './context/BookingContext'
import { Dashboard }     from './components/Dashboard/Dashboard'
import { MovieCatalog }  from './components/MovieCatalog/MovieCatalog'
import { BookingForm }   from './components/BookingForm/BookingForm'
import { BookingList }   from './components/BookingList/BookingList'

const TABS = [
  { id: 'catalog',   label: 'Каталог' },
  { id: 'bookings',  label: 'Бронювання' },
]

function Toast({ message, type, visible }) {
  return (
    <div className={`toast ${visible ? 'toast--visible' : ''} ${type === 'error' ? 'toast--error' : ''}`}>
      {message}
    </div>
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('catalog')
  const [toast, setToast] = useState({ message: '', type: '', visible: false })
  const timerRef = useRef(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type, visible: true })
    clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setToast(t => ({ ...t, visible: false }))
      // on success booking → switch tab
      if (type === 'success' && message.includes('створено')) {
        setTimeout(() => setActiveTab('bookings'), 300)
      }
    }, 2200)
  }, [])

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1 className="header__title">Синема ✦ Люкс</h1>
        <p className="header__subtitle">Система бронювання квитків · Управління замовленнями</p>
      </header>

      {/* Stats dashboard */}
      <Dashboard />

      {/* Tabs */}
      <nav className="tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Catalog tab */}
      {activeTab === 'catalog' && (
        <div className="catalog-layout">
          <MovieCatalog />
          <BookingForm onSuccess={showToast} />
        </div>
      )}

      {/* Bookings tab */}
      {activeTab === 'bookings' && (
        <BookingList />
      )}

      <Toast {...toast} />
    </div>
  )
}

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  )
}
