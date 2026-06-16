import  { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import TvCard from './components/TvCard';

// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc

const API_BASE_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const API_TV_URL = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc';
const API_TV_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json', 
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {

const [searchTerm, setSearchTerm] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [moviesList, setMoviesList] = useState([]);
const [tvList, setTvList] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const [activeTab, setActiveTab] = useState('movies');


const fetchMovies = async () => { 
  setIsLoading(true);
  setErrorMessage('');

  try{
    const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await fetch(endpoint, API_OPTIONS);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(endpoint);
    // if(data.response === 'False') {
    //   setErrorMessage(data.Error || 'Failed to fetch movies');
    //   setMoviesList([]);
    //   return;
    // }

    setMoviesList(data.results || []);
  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage( 'Error fetching movies. Please try again later.');
  } finally{
    setIsLoading(false);
  }
} 



 

const fetchTvShows = async () => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = 'https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc';

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setTvList(data.results || []);
  } catch (error) {
    console.error(`Error fetching TV shows: ${error}`);
    setErrorMessage('Error fetching TV shows. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};


useEffect( () => {

  // avoid calling setState synchronously inside effect by deferring calls
  const id = setTimeout(() => {
    fetchMovies();
    fetchTvShows();
  }, 0);

  return () => clearTimeout(id);
}, [searchTerm]);
// Hello

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner"  />
          <h1 > Find <span className="text-gradient">Movies</span> You'll enjoy Without the Hassle</h1>
         </header>


         <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}  />

         {/* <h1 className='text-white'> {searchTerm}</h1> */}

  <section className="all-movies">
  <div className="flex gap-4 mt-[40px] mb-6">
    <button
      onClick={() => setActiveTab('movies')}
      className={`px-4 py-2 rounded ${
        activeTab === 'movies'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-700 text-white'
      }`}
    >
      All Movies
    </button>

    <button
      onClick={() => setActiveTab('tv')}
      className={`px-4 py-2 rounded ${
        activeTab === 'tv'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-700 text-white'
      }`}
    >
      All TV
    </button>
  </div>

  {activeTab === 'movies' ? (
    isLoading ? (
      <Spinner />
    ) : errorMessage ? (
      <p className="text-red-500">{errorMessage}</p>
    ) : (
      <ul>
        {moviesList.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    )
  ) : (
    <ul>
  {tvList.map((tvShow) => (
    <TvCard
      key={tvShow.id}
      tvShow={tvShow}
    />
  ))}
</ul>
  )}
</section>


      </div>
    </main>
  )
}

export default App
