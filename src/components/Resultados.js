import { useEffect, useState } from 'react';
import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { Link } from 'react-router-dom';


function Resultados(props) {

  let query = new URLSearchParams(window.location.search); // aqui guardo el query string. lo que viaja despues del '?'
  let keyword = query.get('key');

  const apikey = '703762faf4bdf990ca219daf1597e1de'

  const [ moviesResults, setMoviesResults ] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=es-ES&page=1&include_adult=false&query=${keyword}`;

    axios.get(endPoint)
        .then(res => {
            const moviesArray = res.data.results;
            if (moviesArray.length === 0) {
              swAlert ({
                title: 'Ups!',
                text: 'No pudimos encontrar ninguna película con ese nombre',
                icon: 'error'
            })
            }
            setMoviesResults(moviesArray);
        })
        .catch(err => {
          console.log(err)
      })
        
  }, [keyword])
  
  return( 
   <>
    <h2>Estás buscando: <em>{keyword}</em></h2> 
    {moviesResults.length === 0 && <h3>No hay resultados</h3>}
    <div className="row">
        {moviesResults.map((movie, index) => {
          return (
            <div className="col-4" key={index}>
              <div className="card my-4">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className="card-img-top" alt={movie.title} />
                <button className="favourite-btn" 
                onClick={props.addOrRemoveFavs}
                data-movie-id={movie.id}
                >♡</button>
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">
                    {movie.overview.substring(0, 100)}...
                  </p>
                  <Link to={`/detalle?movieID=${movie.id}`} className="btn btn-primary">
                    Ver Detalle
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
   </>
  );
}

export default Resultados;
