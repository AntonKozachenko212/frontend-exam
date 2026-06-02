import { MOVIES } from '../../data/movies'
import { MovieCard } from './MovieCard'
import styles from './MovieCatalog.module.css'

export function MovieCatalog() {
  return (
    <div>
      <h2 className="section-heading">Фільми у прокаті</h2>
      <div className={styles.grid}>
        {MOVIES.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  )
}
