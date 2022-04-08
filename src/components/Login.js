import Form from "./Form";
import { useState } from "react";

function Login({handleLogin}) {

    const [loginState, setLoginState] = useState({
        password: '',
        email: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setLoginState(old => ({
            ...old,
            [name]: value
        }));
    };

    function handleSubmit(e) {
        e.preventDefault();

        if(!loginState.password || !loginState.email) {
            return;
        }

        handleLogin(loginState)

        
    }; 

    return (
        <Form
            title={"Вход"}
            button={"Войти"}
            password={loginState.password}
            email={loginState.email}
            onChange={handleChange}
            onSubmit={handleSubmit}
        />
    );
    
}

export default Login;