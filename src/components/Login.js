import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useHistory, Redirect } from 'react-router-dom';

function Login() {

    const history = useHistory();

    const submitHandler = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        // console.log(regexEmail.test()) --> Para testear true o false email

        if (email === '' || password === '') {
            swAlert({
                title: "Hay campos incompletos",
                icon: "warning"
            });
            return;
        } 

        if (email !== '' && !regexEmail.test(email)) {
            swAlert({
                title: "Cuidado...",
                text: "...debes ingresar una dirección de correo válida",
                icon: "warning"
            });
            return;
        }

        if (email !== 'challenge@alkemy.org' || password !== 'react') {
            swAlert({
                title: "Credenciales Incorrectas",
                text: "Intenta nuevamente",
                icon: "error"
            })
            return;
        }


        // Enviamos la informacion --> .post()

        axios
            .post('http://challenge-react.alkemy.org', {email, password})
            .then(res => {
                swAlert({
                        title: 'Acceso concedido',
                        icon: 'success',
                        button: false,
                        timer: 2000
                });
                const tokenRecibido = res.data.token;
                sessionStorage.setItem('token', tokenRecibido);
                history.push("/listado");
            })

    };

    let token = sessionStorage.getItem('token');


    return(
        <>
            {token && <Redirect to="/listado"/>}
        
            <div className='row'>
                <div className='col-6 offset-3'>
                    <h2>Log In</h2>
                    <form onSubmit={submitHandler}>
                        <label className='form-label d-block mt-2'>
                            <span>Correo Electrónico:</span> <br />
                            <input className='form-control' type='text' name='email'/>
                        </label>
                        <label className='form-label d-block mt-2'>
                            <span>Password:</span> <br />
                            <input className='form-control' type='password' name='password'/>
                        </label>
                        <button className='btn btn-success mt-2' type='submit'>Ingresar</button>
                    </form>
                </div>
            </div> 
        </>
    )
}

export default Login;