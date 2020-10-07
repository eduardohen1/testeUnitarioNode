const app       = require('express')();
const bodyParse = require('body-parser');

app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

const alunos = [];

const addAluno = function(nome, sala){
   alunos.push({
      nome: nome,
      sala: sala
   });
   return{
      nome: nome,
      sala: sala
   };
}

const getAlunos = function(){
   return alunos;
};

app.get('/', function(req, res){
   res.send('Bem-vindo ao sistema!');
});

//http://localhost/aluno
app.get('/aluno', function(req, res){
   res.status(200)
      .json(getAlunos());
});

//post
app.post('/aluno', function(req, res){
   res.status(201)
      .json(addAluno(req.body.nome, req.body.sala));
});

app.listen(3000, function(){
   console.log("Servidor rodando na porta 3000");
});

module.exports = {app, addAluno, getAlunos}