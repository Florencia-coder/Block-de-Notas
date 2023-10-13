import express from "express";
import setHeaders from "./utils/setHeaders.js";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import morgan from "morgan";
import noteRoutes from "./routes/note.routes.js";
import categoryRoutes from "./routes/category.routes.js";

const app = express();

//Middlewares
app.use(express.json()); // Interpreta y guarda en req.body
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" })); //nos dpermite parsear nuestros json de forma correcta
app.use(bodyParser.json({ limit: "50mb" })); //para poder tomar json
app.use(cookieParser());
app.use(morgan("dev")); //da un ouput en la consola cada vez que hacemos un request
app.use(setHeaders);

app.use(noteRoutes);
app.use(categoryRoutes);

export default app;
