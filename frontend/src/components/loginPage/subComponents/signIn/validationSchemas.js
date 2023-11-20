import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
  name: Yup.string().required("Nombre completo requerido"),
  username: Yup.string().required("Nombre de usuario requerido"),
  password: Yup.string()
    .required("Contraseña requerida")
    .test(
      "passwords-match",
      "Las contraseñas deben coincidir",
      function (value) {
        return value === this.parent.confirmPassword;
      }
    ),
  confirmPassword: Yup.string()
    .required("Confirma tu contraseña")
    .test(
      "passwords-match",
      "Las contraseñas deben coincidir",
      function (value) {
        return value === this.parent.password;
      }
    ),
});
