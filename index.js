const   express = require('express'),
        app = express(),
        todoRoutes = require('./routes/todos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.send("Hello from root route")
});

app.use("/api/todos", todoRoutes);

app.listen(3000, function(){
    console.log('App is running on port 3000')
});