import * as Yup from "yup";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Nombre de usuario requerido"),
    password: Yup.string().required("Contraseña requerida"),
});

export default validationSchema;