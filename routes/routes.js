const router = require('express').Router();
const Todo = require('../models/todo');

router.get('/',function(req,res){
    Todo.find({}).then(function(results){
        let todos = results.filter(function(todo){
            return !todo.done;
        });
        let donetodos = results.filter(function(todo){
            return todo.done;
        })
        res.render('index',{todos: todos,donetodos: donetodos });
    })
});

router.post('/todos', function(req, res) {
   let newTodo = new Todo({ description: req.body.description});

   newTodo
   .save()
   .then(function(result){
       console.log(result);
       res.redirect('/');
   }).catch(function(err){
       res.redirect('/');
   })
}); 

router.post('/todos/:id/completed',function(req,res) {
    let todoid = req.params.id;
    Todo.findById(todoid)
      .exec()
      .then(function(result){
          result.done = !result.done;
          return result.save();
      }) 
      .then(function(result){
          res.redirect('/');
      });
});
module.exports = router;