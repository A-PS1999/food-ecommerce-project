import { rest } from 'msw';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const handlers = [
    rest.post(`${BASE_URL}/log-in`, (req, res, ctx) => {
        const user = {
            id: 9,
            name: 'test_user',
            email: 'fakemail@fake.com',
            is_admin: true
        }

        return res(
            ctx.json({ user })
        )
    }),
    rest.post(`${BASE_URL}/register`, (req, res, ctx) => {
        const user = req.body;
        return res(
            ctx.json({ user })
        )
    }),
    rest.get(`${BASE_URL}/authenticate`, (req, res, ctx) => {
        const result = {
            id: 9,
            name: 'test_user',
            email: 'fakemail@fake.com',
            is_admin: true
        }
        return res(
            ctx.json({ result })
        )
    }),
    rest.get(`${BASE_URL}/log-out`, (req, res, ctx) => {
        return res(
            ctx.status(200)
        )
    }),
];