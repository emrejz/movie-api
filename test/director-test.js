const chai=require('chai');
const chaiHttp=require('chai-http');
 const server= require('../app');
 const should=chai.should();

chai.use(chaiHttp);
let token;
describe('/api/directors tests',()=>{
    before((done)=>{
        chai.request(server)
        .post('/authenticate')
        .send({username:"test",password:"test123"})
        .end((err,res)=>{
            token=res.body.token;
            done();
        })

    })
   
    
    describe("/GET movies",()=>{
        it("GET all directors",(done)=>{
         
            chai.request(server)
           .get("/api/directors")
           .set('x-access-token', token)
           .end((err,res)=>{
               res.should.have.status(200);
               res.body.should.be.a('array')
               done();
           })
        })
   
    })
})