const server = require('../api/server');

const request = require('supertest');

describe('auth-router.js', () => {

    describe('/register', () => {
        it('has process.env.DB_ENV as "testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
    
        it("/register returns 200 ok", async () => {
            const expectedStatus = 200;
            const response = await request(server)
            .post('/api/auth/register')
            .send({username: 'lambdaUser', passowrd: 'pass'})
          });
    });

    describe('/login', () => {
        it('has process.env.DB_ENV as "testing', () => {
            expect(process.env.DB_ENV).toBe('testing');
        });
    
        it("/login returns 200 ok", async () => {
            const expectedStatus = 200;
            const response = await request(server)
            .post('/api/auth/login')
            .send({username: 'sage-jordan', passowrd: 'pass'})
          });
    })
    
})