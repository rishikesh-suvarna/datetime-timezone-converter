import request from 'supertest';
import server from '../../src/index';

afterAll((done) => {
    server.close(done);
});

describe('E2E Tests for /functions/convert-datetime-tz', () => {
    it('POST /functions/convert-datetime-tz should convert datetime', async () => {
        const payload = {
            input: {
                datetime: '2024-10-24T12:00:00Z',
                timezone: 'Asia/Kolkata'
            }
        };
        const response = await request(server)
            .post('/functions/convert-datetime-tz')
            .send(payload);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('output');
        expect(response.body.output).toHaveProperty('converted_datetime');
    });

    it('POST /functions/convert-datetime-tz should return 400 with message if invalid datetime is provided', async () => {
        const payload = {
            input: {
                datetime: 'invalid-datetime',
                timezone: 'Asia/Kolkata'
            }
        };
        const response = await request(server)
            .post('/functions/convert-datetime-tz')
            .send(payload);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    it('POST /functions/convert-datetime-tz should return 400 with message if invalid timezone is provided', async () => {
        const payload = {
            input: {
                datetime: '2024-10-24T12:00:00Z',
                timezone: 'invalid-tz'
            }
        };
        const response = await request(server)
            .post('/functions/convert-datetime-tz')
            .send(payload);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message');
    });

    it('GET /functions/convert-datetime-tz should docs of the API with keys name, description, input, output', async () => {
        const response = await request(server)
            .get('/functions/convert-datetime-tz');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('name');
        expect(response.body).toHaveProperty('description');
        expect(response.body).toHaveProperty('input');
        expect(response.body).toHaveProperty('output');
    });

    it('GET / should return 404 if route is invalid', async () => {
        const response = await request(server)
            .post('/');
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
    });
});