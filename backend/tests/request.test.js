const supertest = require('supertest');
const base = 'http://localhost:5000/requests';
const mongoose = require('mongoose');
const Request = require('../models/Request');


describe("Testing users API endpoints", () => {
    jest.setTimeout(30000);
    let dataUser;
    let dataDoctor;
    let dataRequest;
    
    beforeAll(async done => {
            await mongoose.connect('mongodb+srv://sadi22:sadi22@cluster0.cim8y.mongodb.net/test?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
            });

            await supertest('http://localhost:5000/users').post('/signup').send({
                first_name: "Kenn",
                last_name: "Taylor",
                email: "kenn@mail.com",
                password: "test11",
                passwordConfirm: "test11"
            });
            
            await supertest('http://localhost:5000/doctors').post('/signup').send({
                first_name: "John",
                last_name: "Alvis",
                phone_number: "+36704504545",
                email: "john@hotmail.com",
                speciality: "Primary Health Doctor",
                address: "New york city 11250, Manhatton 4",
                password: "test11",
                passwordConfirm: "test11"
            });  

        const doctorResponse = await supertest('http://localhost:5000/doctors').post('/login').send({
            email: "john@hotmail.com",
            password: "test11"
        });   


        const userResponse = await supertest('http://localhost:5000/users').post('/login').send({
            email: "kenn@mail.com",
            password: "test11"
        }); 

        dataUser = userResponse.body;
        dataDoctor = doctorResponse.body;

            done();
    });

	it("creates appointment request", async done => {
		const response = await supertest(base).post('/create-request').set({"x-auth-token": dataUser.token}).send({
            creator_id: dataUser.user.userId,
            receiver_id: dataDoctor.doctor.doctorId,
            creator_name: dataUser.user.first_name + ' ' + dataUser.user.last_name,
            receiver_name: dataDoctor.doctor.first_name + ' ' + dataDoctor.doctor.last_name,
            subject: "General",
            explanation: "Some general problem regarding explaantion.",
            time: "2020-08-18T21:11:54",
            appointment_fee: 40
        });
        dataRequest = response.body;     
        expect(response.status).toBe(201);
        done();
    });


    it("Doctor accepts request", async done => {
		const response = await supertest(base).patch('/accept/' + dataRequest._id).set({"x-auth-token": dataDoctor.token}).send({
            status: "accepted"
        });     
        expect(response.status).toBe(200);
        done();
    });

    it("Doctor rejects request", async done => {
		const response = await supertest(base).patch('/reject/' + dataRequest._id).set({"x-auth-token": dataDoctor.token}).send({
            status: "rejected"
        });     
        expect(response.status).toBe(200);
        done();
    });

    it("Updates payment status", async done => {
		const response = await supertest(base).patch('/update-payment-status/' + dataRequest._id).set({"x-auth-token": dataUser.token}).send({
            payment_status: "success"
        });     
        expect(response.status).toBe(200);
        done();
    });

    afterAll(async done => {
        await mongoose.connection.dropCollection('requests');
        await mongoose.connection.close();
        done();
    });
});