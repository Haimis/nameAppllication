const http = require('http')
const names = require('./names.json')



const app = http.createServer((request, response) => {
    response.writeHead(200, {'Content-Type': 'text/plain'})
    response.end(JSON.stringify(names))

})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server is running at port ${PORT}`)
