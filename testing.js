var supertest = require('supertest');
// Define the url of your HTTP-server
var server = supertest.agent("http://localhost:3000");
var token;
describe("Users", function(){
    it("should create a test user", function(done){
        var user = {firstName:'Evert', lastName:'Duipman', middleName:'Test', username:'Test', password:'Test01!'};
        server
            .post("/users")
            .send(user)
            .expect("Content-type", /json/)
            .expect(201, done)
    });

    it("should return access token", function(done){
        var user = {username:'Test',password:'Test01!'};
        server
            .post("/users/authenticate")
            .send(user)
            .expect("Content-type", /json/)
            .expect(200)
            .end(function (err,res) {
                token = res.body.token;
                done();
            });
    });

    it("should return all the users", function(done){
        server.get("/users")
            .set('authorization', token)
            .expect("Content-type", /json/)
            .expect(200, done);
    });
});
describe("Movies", function(){
    it("should list all movies", function(done){
        server.get("/movies")
            .expect("Content-type", /json/)
            .expect(200, done);
    });
    it("should get a movie specified by the url", function(done){
        server.get("/movies/1")
            .expect("Content-type", /json/)
            .expect(200, done);
    });
});
describe("Ratings", function(){
    it("User should rate movie", function(done){
        var rate = {rating:'5'};
        server.put("/users/ratings/1")
            .set('authorization', token)
            .send(rate)
            .expect("Content-type", /json/)
            .expect(200 || 201, done);
    });
    it("User removes his rating", function(done){
        server.delete("/user/ratings/1")
            .set('authorization', token)
            .expect("Content-type", /json/)
            .expect(204, done);
    });
    it("User sees his own rating", function(done){
        server.delete("/user/ratings/1")
            .set('authorization', token)
            .expect("Content-type", /json/)
            .expect(200, done);
    });
});
