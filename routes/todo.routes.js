const router = require("express").Router();
const { find } = require("../models/Todo.model");
const Todo = require("../models/Todo.model")

// GET "/api/todos" => enviar los titulos de todos los ToDos en la DB
router.get("/", async (req, res, next) => {

    try {

        //1 buscar en la DB todos los ToDos
        //const response = await Todo.find().select({title: 1})
        const response = await Todo.find().select("title") 
        // Ambas son validas
        
        // 2.enviarlos al cliente (postman)
        res.status(200).json(response)
        
    } catch (error) {
        next(error)
        
    }


})


// POST /api/todos" => recibe detalles de un nuevo ToDo y lo crea en la DB
router.post("/", async (req, res, next) => {
    console.log("postman accediendo a la ruta")
    console.log(req.body)


    //recopilar la informacion del cliente (postman)
    const newTodo ={
        title: req.body.title,
        description: req.body.description,
        isUrgent: req.body.isUrgent
    }

    // usar esa informacion para crear un nuevo ToDo en la DB
    try {
        const response = await Todo.create(newTodo) // crea el objeto en la DB
        res.status(201).json("todo bien x aqui, tu q tal?, creado el ToDo en la DB")
    } catch (error) {
        next(error)
    }


})


// GET "/aoi/todos/:todoId" => enviar todos los detalles de un ToDo por su id
router.get("/:todoId", async (req, res, next) => {

    try {
        const response = await Todo.findById(req.params.todoId)

        res.status(201).json(response)
        
    } catch (error) {
        next(error)
        
    }

})
module.exports = router;


// DELETE "/api/todos/:todoId" => borrar un documento de ToDo de la DB por su id
router.delete("/:todoId", async (req, res, next) => {


    try {

        // borrar el documento por su id

        await Todo.findByIdAndDelete(req.params.todoId)

        // enviar respuesta al FE
        res.status(200).json("todo bien, documento borrado")
        
    } catch (error) {
        next(error)
    }

} )


//PATCH "/api/todos/:todoId" => editar un documento de ToDo de la DB por su id
router.patch("/:todoId", async (req, res, next) => {

    // buscar los cambios a editar del documento
    const todoUpdates = {
        title: req.body.title,
        description: req.body.description,
        isUrgent: req.body.isUrgent
    }

    try { 
        
            // editar el documento por su id
            await Todo.findByIdAndUpdate(req.params.todoId, todoUpdates)
        
            // enviar mensaje de "todo bien" al FE
            res.status(200).json("todo bien, documento actualizado")
        
    } catch (error) {
        next(error)
        
    }
    
})