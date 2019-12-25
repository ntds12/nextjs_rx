const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('/abbas', (req, res) => {
            res.send("abbas")
        })

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3000, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3000')
        })

        server.get('/', (req, res) => {
            const actualPage = '/post';
            const queryParams = { id: req.params.id };
            res.send = "abbas";
            app.render(req, res, actualPage, queryParams);
        })


    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })