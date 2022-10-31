import AppBarSolidus from '../components/appbarsolidus';
import CrudTable from '../components/crudtable';
import styles from '../styles/Home.module.css'
import BookIcon from '@mui/icons-material/Book';
import SearchBar from '../components/searchbar';

export default function Home() {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <AppBarSolidus />
        <div className={styles.title}> Books Administration Panel </div>
        <SearchBar />
        <CrudTable />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.soliduscapital.io/"
          target="_blank"
          rel="noopener noreferrer"
        >
          SolidusCapital Library{' '}
          <BookIcon/>
        </a>
      </footer>
    </div>
  )
}
