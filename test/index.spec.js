const chai   = require('chai');
const http   = require('chai-http');//extensão do chai para simular requisições http
const subSet = require('chai-subset'); //extensão do chai para verificar objetos

//arquivo que vou testar:
const index = require('../app');

chai.use(http);
chai.use(subSet);

//schema
const alunoSchema = {
   nome: nome => nome,
   sala: sala => sala
};

//verificar se o objeto existe;
//receber uma função e ela deve retornar Verdadeiro para passar no teste
describe('Teste das funcoes:', () =>{
   it('addAluno', () =>{
      const aluno = index.addAluno('Aluno 1', 'Sala 1');
      //verificar se o objeto aluno é igual ao schema
      chai.expect(aluno).to.containSubset(alunoSchema);
   });
   it('getAlunos', ()=>{
      index.addAluno('Aluno 2', 'Sala 1');
      index.addAluno('Aluno 3', 'Sala 2');
      const alunos = index.getAlunos();

      chai.expect(alunos.length).to.be.equals(3);
      chai.expect(alunos).to.containSubset([alunoSchema]);

   });
});

describe('Teste integracao da API:', ()=>{
   it('/aluno - POST', ()=>{
      chai.request(index.app)//intancia o express
          .post('/aluno')//rota
          .send({
             nome: 'Aluno 4',
             sala: 'Sala 1'
          })
          .end((err, res)=>{
            chai.expect(err).to.be.null; //sem erros
            chai.expect(res).to.have.status(201); //statuscode
            chai.expect(res.body).to.containSubset(alunoSchema);//body com json == schema
          });
   });
   it('/aluno - GET', () => {
      chai.request(index.app)
          .get('/aluno')
          .end((err, res)=>{
             chai.expect(err).to.be.null;
             chai.expect(res).to.have.status(200);
             chai.expect(res.body.length).to.be.equal(4);
             chai.expect(res.body).to.containSubset([alunoSchema]);
          });
   });
});