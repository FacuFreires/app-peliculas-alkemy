import axios from 'axios';
import swAlert from '@sweetalert/with-react';
import { useNavigate } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

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
                        title: "", 
                        text: 'Acceso concedido', 
                        icon: 'success',
                        button: false,
                        timer: 2000
                });
                const tokenRecibido = res.data.token
                localStorage.setItem('token', tokenRecibido);
                navigate('/listado');
            })

    };


    return(
        <>
        <h2>Identificarse</h2>
        <form onSubmit={submitHandler}>
            <label>
                <span>Email:</span>
                <input type="text" name="email" />
            </label>
            <label>
                <span>Password:</span>
                <input type="password" name="password" />
            </label>
            <button type="submit">Ingresar</button>
        </form>
        </>
    )
}

export default Login;