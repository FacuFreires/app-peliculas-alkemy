import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import swAlert from "@sweetalert/with-react";

function Listado(props) {
  let token = sessionStorage.getItem("token");

  const [moviesList, setMovieList] = useState([]);

  useEffect(() => {
    const apiKey = '703762faf4bdf990ca219daf1597e1de';
    const endPoint =
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=es-ES&page=1`;
    axios.get(endPoint)
      .then((res) => {
        const apiData = res.data;
        setMovieList(apiData.results);
    })
      .catch(error => {
        swAlert({
          title: 'Upss!!',
          text: 'Ocurrió un error inesperado, por favor intenta nuevamente',
          icon: 'error',
          button: false, 
          timer: 2500
        });
      })
  }, [setMovieList]);
      

  return (
    <>
      {!token && <Redirect to="/" />}

      <div className="row">
        {moviesList.map((movie, index) => {
          return (
            <div className="col-3 container" key={index}>
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

export default Listado;
