const expect = require("chai").expect;
const lambdaTester = require("lambda-tester");
const lambda = require("../lambdas/user/signUp")
const mockData = 
		data = {
			first_name: "Asel",
			last_name: "Kurmanbekk",
			email: "aselkurmanbekk@gmail.com",
			password: "Aselkk191199"
		}

	it("with code = 200", function (done) {
		lambdaTester(lambda.handler)
			.event(mockData) // Passing input data
			.expectResult((result) => {
				expect(result.statusCode).to.exist;
				expect(result.statusCode).to.equal(200);
				// expect(result.data).to.exist;
				// expect(result.data).to.be.a("array");
				done();
			})
			.catch(done); // Catch assertion errors
	});
