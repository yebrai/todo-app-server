const router = require("express").Router();

router.get("/", (req, res, next) => {
  //ya no vamos a renderizar vistas.
  //ni res.render ni res.redirect
  // Solo enviaremos DATA JSON res.json()
  res.json("All good in here");
});

// busca las rutas de "/todos" en todo.routes.js
// añadir el prefijo a todas "/todos"

const todoRoutes = require("./todo.routes")
router.use("/todos", todoRoutes)

module.exports = router;
