import Form from "./Form";
import { Link } from 'react-router-dom';
import { useState } from "react";

function Register({handleRegister}) {

    const [registerState, setRegisterState] = useState({
        password: '',
        email: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setRegisterState(old => ({
            ...old,
            [name]: value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();

        handleRegister(registerState);
    }; 
    
    return (
        <>
            <Form
                title={"Регистрация"}
                button={"Зарегистрироваться"}
                password={registerState.password}
                email={registerState.email}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
            <p className="link">Уже зарегистрированы? <Link className="link" to="/signin">Войти</Link></p>
        </>
        
    );  
}

export default Register;