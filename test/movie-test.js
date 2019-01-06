 const chai= require('chai');
 const chaiHttp= require('chai-http');
 const should=chai.should();
 const server= require('../app');
 chai.use(chaiHttp);

 let token,movie_id;

 describe('/api/movies tests', () => {
 	before((done) => {
 		chai.request(server)
 			.post('/authenticate')
 			.send({username: 'test', password: 'test123'})
 			.end((err, res) => {
                 token = res.body.token;
                 console.log(token);
                 
 				done();
 			});
 	});

 	describe('/GET movies', () => {
 		it('GET all the movies', (done) => {
 			chai.request(server)
 				.get('/api/movies')
 				.set('x-access-token', token)
 				.end((err, res) => {
 					res.should.have.status(200);
 					res.body.should.be.a('array');
 					done();
 				});
 		})
     })

     describe('/POST movies',()=>{
         it('POST the movie',(done)=>{
             const movie={
                 title:"TEST",
                 director_id:"5c30d4a30697d313e00b3417",
                 category:"TEST",
                 country:"Turkey",
                 year:2000,
                 imdb_score:1
             }
             chai.request(server)
             .post("/api/movies")
             .send(movie)
             .set('x-access-token',token)
             .end((err,res)=>{
                 res.should.have.status(200);
                 res.body.should.be.a('object');
                 res.body.should.have.property('title');
                 res.body.should.have.property('director_id');
                 res.body.should.have.property('category');
                 res.body.should.have.property('year');
                 res.body.should.have.property('imdb_score');
                 res.body.should.have.property('country');
                 movie_id=res.body._id;
                 done();
             })
         })
     })
     describe("/GET/:movie_id",()=>{
         it("GET movie by movie_id",(done)=>{
            chai.request(server)
            .get('/api/movies/'+movie_id)
            .set('x-access-token',token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('title');
                res.body.should.have.property('director_id');
                res.body.should.have.property('category');
                res.body.should.have.property('year');
                res.body.should.have.property('imdb_score');
                res.body.should.have.property('country');
                res.body.should.have.property('_id').eq(movie_id);
                done();

            })
         })
     })
 	})