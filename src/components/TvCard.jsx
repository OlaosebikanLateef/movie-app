import React from 'react';

const TvCard = ({ tvShow:{ name, vote_average, poster_path, first_air_date, original_language} }) => {

  
  return (
   <div className='movie-card'>
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500/${poster_path}`
            : '/no-tv-show.png'
        }
        alt={name}
      />

      <div>
        <h3>{name}</h3>

        <div className="content">
          <div className="rating">
            <img src="/star.svg" alt="Star icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>

          <span>•</span>
          <p className="year">
            {first_air_date ? first_air_date.split('-')[0] : 'N/A'}
          </p>
        </div>

        {/* <p className="overview">
          {overview?.length > 100
            ? `${overview.slice(0, 100)}...`
            : overview}
        </p> */}
      </div>
    </div>
  );
};

export default TvCard;
