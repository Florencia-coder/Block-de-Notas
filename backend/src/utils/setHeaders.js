function setHeaders(req, res, next) {
  //Aca estamos seteando todos nuestros headers.
  res.header("Access-Control-Allow-Origin", "https://block-de-notas-frontend-eic2ftgfr-florencias-projects-f288cb3c.vercel.app/");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
}

export default setHeaders;
