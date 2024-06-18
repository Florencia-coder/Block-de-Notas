import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpSchema } from "./validationSchemas";
import { usePostUser } from "../../../actions";

const useHookSignIn = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorSignIn, setErrorSignIn] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const { mutate, isLoading } = usePostUser();

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await signUpSchema.validate(
        { name, username, password, confirmPassword },
        { abortEarly: false }
      );
      mutate({ name, username, password },
        {
            onSuccess: ()=>{
                alert('¡ Te registraste con éxito !')
                setName('')
                setUsername('')
                setPassword('')
                setConfirmPassword('')
                navigate('/')
            },
            onError: (e) =>{
                setErrorSignIn({general:
                    e.response?.data?.error?.errors[0]?.message || "Ya existe una cuenta creada con ese nombre de usuario"}
                  );
            }
        })
      
    } catch (e) {
        console.log({e});

      if (e.name === "ValidationError") {
        const errors = {};
        e.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrorSignIn(errors);
      } else {
        setErrorSignIn(errorSignIn.general=
          e.response?.data?.error || "Algo salió mal durante la creación de usuario."
        );
      }
    }
    setTimeout(() => {
      setErrorSignIn("");
    }, 3000);
  };

  return {
    name,
    setName,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    errorSignIn,
    showPassword,
    setShowPassword,
    handleSignIn,
    isLoading,
  };
};

export default useHookSignIn;