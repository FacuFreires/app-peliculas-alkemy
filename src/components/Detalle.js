import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import swAlert from "@sweetalert/with-react";


function Detalle () {
    const apiKey = '703762faf4bdf990ca219daf1597e1de';
    

    let token = sessionStorage.getItem('token');

    let query = new URLSearchParams(window.location.search); // aqui guardo el query string. lo que viaja despues del '?'
    let movieID = query.get('movieID');

    const [ movie, setMovie] = useState(null);

    useEffect(() => {
        const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=es-ES`;

        axios.get(endPoint)
            .then(res => {
                const movieData = res.data;
                setMovie(movieData);
            })
            .catch(err => {
                swAlert ({
                    title: 'Ups!',
                    text: 'Hubo un error, intente nuevamente más tarde',
                })
            })
    }, [movieID]);

    return (
        <>
            { !token && <Redirect to= '/' /> }
            { movie && 
            <> 
            <h2>{movie.title}</h2>
            <div className="row">
                <div className="col-4">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} className='img-fluid' />
                </div>
                <div className="col-8">
                    <h5>Fecha de estreno: { movie.release_date }</h5>
                    <h5>Reseña:</h5>
                    <p>{ movie.overview }</p>
                    <h5>Rating: { movie.vote_average}</h5>
                    <h2>Géneros:</h2>
                    <ul>
                        { movie.genres.map(oneGenre => <li key={oneGenre.id}>{oneGenre.name}</li>)}
                    </ul>
                    
                    <h5>Homepage: <a href={movie.homepage}>{movie.original_title}</a></h5>
                </div>
            </div>
            </>
            }
        </>
    )
}

export default Detalle;