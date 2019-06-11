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
                res.body.should.have.property('_id').eql(movie_id);
                done();

            })
         })
     })
     describe("/PUT/:movie_id movie",()=>{
         it("Update movie by movie id",(done)=>{
            const movie={
                title:"TEST1",
                director_id:"5c30d4a30697d313e00b3411",
                category:"TEST1",
                country:"Turkey1",
                year:2001,
                imdb_score:2
            }
             chai.request(server)
             .put('/api/movies/'+movie_id)
             .send(movie)
             .set("x-access-token",token)
             .end((err,res)=>{
                 res.body.should.have.property('title').eql(movie.title);
                 res.body.should.have.property('director_id').eql(movie.director_id);
                 res.body.should.have.property('category').eql(movie.category);
                 res.body.should.have.property('year').eql(movie.year);
                 res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                 res.body.should.have.property('country').eql(movie.country);
                 done()
             })
         })
     })
     describe("/DELETE/:movie_id",()=>{
         it("delete movie by movie_id",(done)=>{
             chai.request(server)
             .delete("/api/movies/"+movie_id)
             .set("x-access-token",token)
             .end((err,res)=>{
                 res.should.have.status(200);
                 res.body.should.have.property("status").eql(1);
                 done();
             })
         })
     })
 	})