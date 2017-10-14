var supertest = require('supertest');
// Define the url of your HTTP-server
var server = supertest.agent("http://localhost:3000");
describe("Users", function(){
    var token;
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
    it("should add a movie", function(done){
        server.get("/movies")
            .expect("Content-type", /json/)
            .expect(200, done);
    });
});
