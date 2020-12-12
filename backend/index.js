const http = require('http')
const names = require('./names.json')



const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end(JSON.stringify(names))

})

const port = 3001
app.listen(port)
console.log(`Server is running at port ${port}`)
