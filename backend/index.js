import express from "express";
import sequelize from "./src/db.js";
import "./src/models/Note.js";
import "./src/models/Category.js";
import app from "./src/app.js";

const PORT = process.env.PORT || 2000;

async function main() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("Synchronize tables with database successfully");
    app.listen(PORT, () => {
      console.log(`Escuchando en el puerto ${PORT}`); // eslint-disable-line no-console
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
main();

// app.get("/", (req, res) => {
//   const htmlResponse = `
//   <html>
//   <head>
//   <title>Express</title>
//   </head>
//   <body>
//   <h1>Soy un proyecto de back en vercel</h1>
//   </body>
//   </html>
//   `;
//   res.send(htmlResponse);
// });

// app.listen(PORT, () => {
//   console.log(`Escuchando en el puerto ${PORT}`); // eslint-disable-line no-console
// });
