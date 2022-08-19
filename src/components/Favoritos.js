import { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

function Favoritos (props) {
   let token = sessionStorage.getItem("token");

   return (
      <>
      {!token && <Redirect to="/" />}
         <h2>Sección favoritos</h2>
         <div className="row">
            { !props.favorites.length && <div className='col-12 text-danger'>No tienes ninguna película agregada a favoritos</div> }
         {
         props.favorites.map((movie, index) => {
          return (
            <div className="col-3 container" key={index}>
              <div className="card my-4">
                <img src={movie.imgURL} className="card-img-top" alt={movie.title} />
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
   )
}

export default Favoritos;