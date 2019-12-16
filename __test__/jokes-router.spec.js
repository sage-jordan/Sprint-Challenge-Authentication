const server = require('../api/server');

const request = require('supertest');

describe('GET /', () => {
    it('has process.env.DB_ENV as "testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
    });

    it('returns 401 unauthorized', () => {
        return request(server).get('/api/jokes')
            .expect(401)
    })
});