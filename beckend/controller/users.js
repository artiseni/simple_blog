const fs = require('fs')
const params = require("./params")
const dataJson = '../db/data.json'
const addJson = fs.readFileSync(dataJson, 'utf-8')
const jServer = JSON.parse(addJson)

const users = {

    signup(rq, rs){
        params.post(rq, (r) => {
            const data = JSON.stringify(r, null, 2)  
            pushData(data)
            rs.end()
        })
    },

    login(rq, rs){
        params.post(rq, (r) => {
            if(r){
                validateUser(r, rs)
            } 
        })
    },
    
    userName(rq, rs){
        fs.readFile(dataJson, 'utf-8',(e, data)=>{
            rs.end(JSON.stringify(data))
        })
    },

    userData(rq, rs){
        fs.readFile(dataJson, 'utf-8',(e, data)=>{
            rs.end(data)
        })
    },

    edit(rq, rs){
        params.post(rq, (r) => {
            const data = JSON.stringify(r, null, 2)  
            editData(data)
            rs.end()
        })
    }
}

function pushData(data) {
    try {
        const user = JSON.parse(data)
        jServer.push(user)
        fs.writeFileSync(dataJson, JSON.stringify(jServer, null, 2))
        console.log('Data added!')
    } catch (e) {
        console.log('Error : ' + e)
    }
}

// edit

function editData(data){
    let editBlog = JSON.parse(data)
    fs.writeFile(dataJson, JSON.stringify(editBlog, null, 2), e => {
        if(e) throw e
    })
}

function validateUser(data, rs) {
    const name = data.name
    const pass = data.pass
    let dataName = ''
    let dataPass = ''
  
    fs.readFile(dataJson, (err, dataStr) => {
        if (err) throw err
        let parsData = JSON.parse(dataStr)
        parsData.forEach(e => {
            if(e.name === name && e.pass === pass){
                dataName = e.name
                dataPass = e.pass
            }
        });

        if(name === dataName && pass === dataPass){
            rs.end(JSON.stringify(data))
        } else {
            rs.statusCode = 401
            rs.end(JSON.stringify({ message: "Not found" }))
        }
    })

}


module.exports = users
