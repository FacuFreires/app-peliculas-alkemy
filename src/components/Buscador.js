import { useHistory } from 'react-router-dom';
import swAlert from '@sweetalert/with-react';

function Buscador() {
  const history = useHistory();

  const submitHandler = e => {
    e.preventDefault();
    const keyword = e.currentTarget.keyword.value.trim();
    
    if(keyword.length === 0) {
      swAlert({
        title: 'Ocurrió un error',
        text: 'La barra de búsqueda no puede estar vacía',
        icon: 'warning'
      })
    } else if(keyword.length < 4) {
      swAlert({
        text: 'Por favor ingresa más de cuatro caracteres',
        icon: 'warning'
      })
    } else {
      e.currentTarget.keyword.value = '';
      history.push(`/resultados?key=${keyword}`);
    }
  }

  return (
    <>
      <form className="d-flex align-items-center" onSubmit={submitHandler}>
        <label className="form-label mb-0 mx-2">
          <input className="form-control" type="text" name="keyword" placeholder="Buscar..." />
        </label>
        <button className="btn btn-success ml-2" type="submit">
          Buscar
        </button>
      </form>
    </>
  );
}

export default Buscador;
