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
                getUser(r)
                const user = JSON.stringify(fs.readFileSync(dataJson, 'utf-8'))
                rs.end(user)
            }
            rs.end()
        })
    },

    change(rq, rs){   
        params.post(rq, (r) => {
            rs.end(changeData(r))
        })    
        
    },

    userName(rq, rs){
        
        // asych
        fs.readFile(dataJson, 'utf-8',(e, data)=>{
            rs.end(JSON.stringify(data))
        })

        // sych
        // let data = JSON.stringify(addJson)
        // rs.end(data)
    },
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

function changeData(data){
    fs.writeFileSync(dataJson, data)
}


function getUser(data) {
    const name = data.name
    const pass = data.pass
  
    jServer.every(element => {
        if(name === element.name && pass === element.pass) {
            let str = `Selamat datang ${element.name}`
            console.log(str)
            return true
        }
        // console.log(`Invalid`)
        return false
    })
}


module.exports = users
