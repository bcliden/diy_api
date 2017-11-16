const   express = require('express'),
        app = express(),
        todoRoutes = require('./routes/todos');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('index.html');
});

app.use("/api/todos", todoRoutes);

app.listen(3000, function(){
    console.log('App is running on port 3000')
});