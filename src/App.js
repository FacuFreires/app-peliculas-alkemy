// Libraries
import { Switch, Route} from 'react-router-dom';
import swAlert from '@sweetalert/with-react';
import { useState, useEffect } from 'react';

// Components
import Login from './components/Login';
import Listado from './components/Listado';
import Header from './components/Header';
import Footer from './components/Footer';
import Detalle from './components/Detalle';
import Resultados from './components/Resultados';
import Favoritos from './components/Favoritos';

// Style
import './css/app.css';
import './css/bootstrap.min.css';

function App() {

  const [ favorites, setFavorites ] = useState([]);

   useEffect (() => {
      const favsInLocal = localStorage.getItem('favs');
      if (favsInLocal !== null) {
         const favsArray = JSON.parse(favsInLocal);
         setFavorites(favsArray);
      }
   }, [])

  const addOrRemoveFavs = e => {

  const favMovies = localStorage.getItem('favs');

  let moviesInFavs;

  if (favMovies === null) {
    moviesInFavs = [];
  } else {
    moviesInFavs = JSON.parse(favMovies);                                                                                          
  }

    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector('img').getAttribute('src');
    const title = parent.querySelector('h5').innerText;
    const overview = parent.querySelector('p').innerText;
    const movieData = {
      imgURL, title, overview,
      id: btn.dataset.movieId
    }
    let moviesInArray = moviesInFavs.find(movie => {
      return movie.id === movieData.id;
    });
    if(!moviesInArray){
      moviesInFavs.push(movieData);
      localStorage.setItem('favs', JSON.stringify(moviesInFavs));
      setFavorites(moviesInFavs);
      swAlert({
        title: 'La pelicula se añadió a favoritos',
        text: 'Película agregada con éxito',
        icon: 'success',
        timer: 2500,
        button: false
      })
    } else {
      let moviesLeft = moviesInFavs.filter(movie => {
        return movie.id !== movieData.id;
      });
      localStorage.setItem('favs', JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
      swAlert({
        title: 'La pelicula se quitó de favoritos',
        text: 'Película eliminada con éxito',
        icon: 'success',
        timer: 2500,
        button: false
      })
    }
    
  }

  return (
    <div className='container mt-3'>
      <Header favorites={favorites} />

      <Switch>
        <Route exact path='/' component={ Login } />
        <Route path='/listado' render={ (props) => <Listado addOrRemoveFavs={addOrRemoveFavs} {...props} /> } />
        <Route path='/detalle' component={ Detalle } />
        <Route path='/resultados' render={ (props) => <Resultados addOrRemoveFavs={addOrRemoveFavs} {...props} /> } />
        <Route path='/favoritos' render={ (props) => <Favoritos favorites={favorites} addOrRemoveFavs={addOrRemoveFavs} {...props} /> } />
      </Switch>

      <Footer />
    </div>
  );
}

export default App;


