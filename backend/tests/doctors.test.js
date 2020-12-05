const supertest = require('supertest');
const base = 'http://localhost:5000/doctors';
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


	it("successfull Doctor registers", async done => {

		const response = await supertest(base).post('/signup').send({
			first_name: "Philidor",
            last_name: "Robert",
            phone_number: "+36704504545",
            email: "philidor@hotmail.com",
            speciality: "Primary Health Doctor",
            address: "New york city 11250, Manhatton 4",
            password: "test11",
            passwordConfirm: "test11"
		});     
        expect(response.status).toBe(201);
        done();
    });

    it("Doctor email must be unique, Registration fails 400", async done => {

		const response = await supertest(base).post('/signup').send({
			first_name: "Sami",
            last_name: "Samuels",
            phone_number: "+36704504545",
            email: "philidor@hotmail.com",
            speciality: "Primary Health Doctor",
            address: "New york city 11250, Manhatton 4",
            password: "test11",
            passwordConfirm: "test11"
		});     
        expect(response.status).toBe(400);
        done();
    });

    it("registered Doctor logs in", async done => {

		const response = await supertest(base).post('/login').send({
            email: "philidor@hotmail.com",
            password: "test11"
		});     
        expect(response.status).toBe(200);
        done();
    });

    it("Invalid credentials on Doctor login attempt, logging in Fails.", async done => {

		const response = await supertest(base).post('/login').send({
            email: "philidor@hotmail.com",
            password: "somesecretcode2332"
		});     
        expect(response.status).toBe(400);
        done();
    });

    afterAll(async done => {
        await mongoose.connection.dropCollection('doctors');
        await mongoose.connection.close();
        done();
    });
});