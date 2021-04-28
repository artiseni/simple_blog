const http = require('http')
const fs = require('fs')
const qs = require('querystring')
// const blogs = require('./handler/blogs')
const jsonData = require('../db/data.json')
// const controller = require('../handler/controller.js')
const users = require("../handler/users")

const port = 3000
const succ = 200

http.createServer((rq, rs) => {
    // console.log(jsonData)
    rs.setHeader('Access-Control-Allow-Origin', '*');
	rs.setHeader('Access-Control-Request-Method', '*');
	rs.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	rs.setHeader('Access-Control-Allow-Headers', '*');
    rs.setHeader('Content-type', 'application/json')
    const isJson = rq.headers['content-type'] == 'application/json'
    const url = rq.url == '' ? '/index' : rq.url
    
    // console.log(rq.headers['content-type'])
    // console.log(url)
    
    if (isJson){  
        if (rq.method.toLowerCase() === 'get'){
            switch (url) {
                case '/blogs':
                    // res.end(blogs.index(req, res))
                break;
                case '/login':
                    users.userName(rq, rs)
                    // console.log(`Request type : ${rq.method} | URL ${url}`)
                    break;
                    case '/index':
                    users.userName(rq, rs)
                    console.log(`Request type : ${rq.method} | URL ${url}`)
                break;
                default:
                
                break;
            } 
        } else if (rq.method.toLowerCase() === 'post') {
            switch (url) {
                case '/login':
                    users.login(rq, rs)
                    users.change(rq, rs)
                    // console.log('Ada yang request post nih..')
                break;
                case '/signup':
                    users.signup(rq, rs)
                break;
                default:
                    // controller.receivePost(fs, qs, rq, rs)
                break;
            } 
        }
    }else{
        rs.setHeader('status', 404)
        rs.end(JSON.stringify({ message: "Not found" }))
    }

}).listen(port, () => {
    console.log(`Server is listening on port ${port}`)
})


