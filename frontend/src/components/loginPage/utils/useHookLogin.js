import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosLogin } from '../../../actions';
import validationSchema from './validation';

const useHookLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorLogin, setErrorLogin] = useState("");
    const navigate = useNavigate();
    const { mutate,  isLoading } = usePosLogin();

    const handleLogin = async (event) => {
        event.preventDefault();
        setErrorLogin(""); // Clear previous errors

        try {
            await validationSchema.validate(
                { username, password },
                { abortEarly: false }
            );
            
            mutate(
                { username, password },
                {
                    onSuccess: (data) => {
                        if (data) {
                            window.localStorage.setItem('loginUser', JSON.stringify(data));
                            navigate("/home");
                        }
                    },
                    onError: (error) => {
                        setErrorLogin(error.response?.data?.error);
                        setTimeout(() => {
                            setErrorLogin("");
                        }, 3000);
                    }
                }
            );
        } catch (e) {
            if (e.name === "ValidationError") {
                const errors = {};
                e.inner.forEach((error) => {
                    errors[error.path] = error.message;
                });
                setErrorLogin(errors);
            } else {
                setErrorLogin("Ocurrió un error inesperado. Por favor, inténtelo de nuevo.");
                setTimeout(() => {
                    setErrorLogin("");
                }, 3000);
            }
        }
    };

    useEffect(() => {
        const storageLogin = window.localStorage.getItem("loginUser");
        const loginUser = storageLogin !== "undefined" && JSON.parse(storageLogin);
        if (loginUser) {
            navigate("/home");
        }
    }, [navigate]);

    return {
        username,
        setUsername,
        password,
        setPassword,
        errorLogin,
        handleLogin,
        isLoading,
    };
};

export default useHookLogin;
