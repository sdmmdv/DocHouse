const supertest = require('supertest');
const base = 'http://localhost:5000/chat';
const mongoose = require('mongoose');
const Room = require('../models/Room');


describe("Testing users API endpoints", () => {
    jest.setTimeout(10000);
    let collection_elem;
    
    beforeAll(async done => {
            await mongoose.connect('mongodb+srv://sadi22:sadi22@cluster0.cim8y.mongodb.net/test?retryWrites=true&w=majority', {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true
                
            });
            done();
    });


	it("creates chat room with conversation members", async done => {

		const response = await supertest(base).post('/rooms/new').send({
            members : [
                {user_id : "5fcac9f1713429367t58d5e9", user_name : "Sadi Mamedov"},
                {user_id : "5fcac9f27144293k7a58d5e9", user_name : "Robert Philidor"}
            ]
        });     
        expect(response.status).toBe(201);
        done();
    });

    it("Get all the rooms existed", async done => {

		const response = await supertest(base).get('/rooms').send();     
        expect(response.status).toBe(200);
        done();
    });

    it("Gets room by roomID", async done => {
        collection_elem = await Room.findOne();
        const response = await supertest(base).get('/rooms/' + collection_elem._id).send();   
        expect(response.status).toBe(200);
        done();
    });


    it("creates new message", async done => {

		const response = await supertest(base).post('/messages/new').send({
            message: "Hello Dear Mrs Annabelle ",
            author : "James Philidor",
            timestamp: "Sun, 22 Nov 2020 11:09:25 GMT",
            room_id: "5fa7ffa4facf5f4fe4225c62"
        });     
        expect(response.status).toBe(201);
        done();
    });

    afterAll(async done => {
        await mongoose.connection.dropCollection('rooms');
        await mongoose.connection.close();
        done();
    });
});