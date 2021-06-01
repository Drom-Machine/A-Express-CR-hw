const express = require("express");
const router = express.Router();


let todos = [
    {
    id: "haf24jd",
    todo: "do laundry",
    done: "false"
    },
    {
    id: "jp2nkl2",
    todo: "wash dishes",
    done: "true"
    }
]

router.get("/get-all-todos", function (req, res) {
    res.json({todos});
});

router.get("/get-todo-by-id/:id",  (req, res) =>  {
    const id = req.params.id;
    let foundTodo;
    todos.forEach( (element)  => {
        if (element.id === id) {
        foundTodo = element;
    }
    });


    if (!foundTodo) {
        res.json({ message: "This is not the Todo you are looking for." });
    } else {
        res.json({ foundTodo });
    }
});

router.get("/get-todos-by-done/:boolean",  (req, res) =>  {
    const boolean = req.params.boolean;
    let newDoneArray = [];
    todos.forEach( (element)  => {
        if (element.done === boolean) {
        newDoneArray.push(element);
        }
    });
    res.json(newDoneArray);
});

router.post("/create-new-todo",  (req, res) =>  {
    let newToDo = {
        id: uuidv4(),
        todo: req.body.todo,
        done: 'false'
    };
    let isTrue = true;
    todos.forEach((element)=>{ 
        if (element.todo === newToDo.todo){
        res.json({ message: "Todo done already. Do another Todo!"});
        isTrue = false;
    }
    });
    if(isTrue){
        todos.push(newToDo);
        res.json({ todos });
    }
});


module.exports = router;