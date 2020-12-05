const supertest = require('supertest');
const base = 'http://localhost:5000/users';
const mongoose = require('mongoose');


describe("Testing users API endpoints", () => {
    jest.setTimeout(10000);

    beforeAll(async done => {
            await mongoose.connect('mongodb+srv://sadi22:sadi22@cluster0.cim8y.mongodb.net/test?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
                
            });
            done();
    });

	it("successfull user registers", async done => {

		const response = await supertest(base).post('/signup').send({
			first_name: "Sadi",
            last_name: "Mamedov",
            email: "sadim@mail.com",
            password: "test11",
            passwordConfirm: "test11"
		});     
        expect(response.status).toBe(201);
        done();
    });

    it("user email must be unique 400", async done => {

		const response = await supertest(base).post('/signup').send({
			first_name: "Sadi",
            last_name: "Mamedov",
            email: "sadim@mail.com",
            password: "test11",
            passwordConfirm: "test11"
		});     
        expect(response.status).toBe(400);
        done();
    });

    it("registered user logs in", async done => {

		const response = await supertest(base).post('/login').send({
            email: "sadim@mail.com",
            password: "test11"
		});     
        expect(response.status).toBe(200);
        done();
    });

    it("Invalid credentials on login attempt 400", async done => {

		const response = await supertest(base).post('/login').send({
            email: "sadim@mail.com",
            password: "test21"
		});     
        expect(response.status).toBe(400);
        done();
    });

    afterAll(async done => {
        await mongoose.connection.dropCollection('users');
        await mongoose.connection.close();
        done();
    });
});