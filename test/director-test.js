const chai=require('chai');
const chaiHttp=require('chai-http');
 const server= require('../app');
 const should=chai.should();

chai.use(chaiHttp);
let token,director_id;
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
    
    describe("/GET director",()=>{
        it("GET all directors",(done)=>{
         
            chai.request(server)
           .get("/api/directors")
           .set('x-access-token', token)
           .end((err,res)=>{
               res.should.have.status(200);
               res.body.should.be.a('array');
               done();
           })
        })
   
    })
    describe("/POST director",()=>{
        const director={
            name:"TEST",
            surname:"TEST"
        }
        it("POST director",(done)=>{
            chai.request(server)
            .post("/api/directors")
            .send(director)
            .set("x-access-token",token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.property('name');
                res.body.should.property('surname');
                director_id=res.body._id;
                done()

            })
        })
    })
    describe("/PUT/:directorId director",()=>{
           const director={
               name:"TEST2",
               surname:"TEST2"
           };
        it("Update director by id",(done)=>{
            chai.request(server)
            .put("/api/directors/"+director_id)
            .send(director)
            .set("x-access-token",token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name').eql(director.name);
                res.body.should.have.property('surname').eql(director.surname);
                done();
            })
        })
    })
    describe("/GET/:directorId director",()=>{
        it("GET director by id",(done)=>{
            chai.request(server)
            .get("/api/directors/"+director_id)
            .set("x-access-token",token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('name');
                res.body[0].should.have.property('surname');

                
                done();
            })
        })
    })
    describe("/api/directors/:directorId",()=>{
        it("DELETE director by id",(done)=>{
            chai.request(server)
            .delete("/api/directors/"+director_id)
            .set("x-access-token",token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.have.property("status").eql(1);
               
                done();
            })
        })
    })
})