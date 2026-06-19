import  { useState, useEffect } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import TvCard from './components/TvCard';
import {useDebounce} from 'react-use';  
import { updateSearchCount } from './appwrite.js';


// https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc

const API_BASE_URL = 'https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const API_TV_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
const [query, setQuery] = useState('');
const [searchTerm, setSearchTerm] = useState('');
const [errorMessage, setErrorMessage] = useState('');
const [moviesList, setMoviesList] = useState([]);
const [tvList, setTvList] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const [activeTab, setActiveTab] = useState('movies');
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
const [trendingMovies, setTrendingMovies] = useState([]);

useDebounce(
  () => {
    setDebouncedSearchTerm(searchTerm);
  },
  500,
  [searchTerm] 
);

const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setMoviesList(data.results || []);
 

    if(query && data.results.length > 0) {
    await updateSearchCount(query, data.results[0]);
     
}

    updateSearchCount(); // Call the function to update the search count
  } catch (error) {
    console.error(error);
    setErrorMessage('Error fetching movies. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};

const getTrendingMovies = async () => {
  const endpoint = `${API_BASE_URL}trending/movie/day`;
  const response = await fetch(endpoint, API_OPTIONS);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results || [];
};

const loadTrendingMovies = async () => {
  try {
    const trendingMoviesData = await getTrendingMovies();
    setTrendingMovies(trendingMoviesData);
  } catch (error) {
    console.error(`Error fetching trending movies: ${error}`);
  }
};

const fetchTvShows = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = query
      ? `${API_BASE_URL}/search/tv?query=${encodeURIComponent(query)}`
      : `${API_BASE_URL}/discover/tv?sort_by=popularity.desc`;

    const response = await fetch(endpoint,  API_TV_OPTIONS);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    setTvList(data.results || []); 
    
    
if(query && data.results.length > 0) {
   // Call the function to update the search count
}

  } catch (error) {
    console.error(error);
    setErrorMessage('Error fetching TV shows. Please try again later.');
  } finally {
    setIsLoading(false);
  }
};


// useEffect( () => {

//   // avoid calling setState synchronously inside effect by deferring calls
//   const id = setTimeout(() => {
//     fetchMovies(searchTerm);
//     fetchTvShows(searchTerm);
//   }, 0);

//   return () => clearTimeout(id);
// }, [searchTerm]);

useEffect(() => {
  const timer = setTimeout(() => {
    setQuery(searchTerm);
  }, 500);

  return () => clearTimeout(timer);
}, [searchTerm]);

useEffect(() => {
  fetchMovies(debouncedSearchTerm);
  fetchTvShows(debouncedSearchTerm);
}, [debouncedSearchTerm]);

useEffect(() => {
  loadTrendingMovies();
}, []);


  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="/hero.png" alt="Hero Banner"  />
          <h1 > Find <span className="text-gradient">Movies</span> You'll enjoy Without the Hassle</h1>
         </header>



          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
         {/* <h1 className='text-white'> {searchTerm}</h1> */}
    
  {trendingMovies.length > 0 && (
  <section className="trending">
    <h1 className="text-white font-bold flex items-left"> Trending Movies</h1>
    <ul>
      {trendingMovies.map((movie, index) => (
        <li key={movie.id || index}>
          <p>{index + 1}</p>

          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : '/no-movie.png'
            }
            alt={movie.title}
          />
        </li>
      ))}
    </ul>
  </section> 
    )}

  <section className="all-movies">
  <div className="flex gap-4 mb-6">
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
