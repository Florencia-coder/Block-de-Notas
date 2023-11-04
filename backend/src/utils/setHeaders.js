function setHeaders(req, res, next) {
  //Aca estamos seteando todos nuestros headers.
  res.header(
    "Access-Control-Allow-Origin",
    "https://block-de-notas-frontend.vercel.app/"
  ); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE, PATCH"
  );
  next();
}

export default setHeaders;
