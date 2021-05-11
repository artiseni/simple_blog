const fs = require('fs')
const params = require("./params")
const dataJson = '../db/data.json'
const addJson = fs.readFileSync(dataJson, 'utf-8')
const jServer = JSON.parse(addJson)

const users = {

    signup(rq, rs){
        params.post(rq, (r) => {
            const data = JSON.stringify(r, null, 2)  
            let getName = validateSignUp(r)
            if(r.name === getName){
                rs.statusCode = 401
                rs.end(JSON.stringify({message : 'username already exists'}))
            } else {
                pushData(data, rs)
            }
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
            let NewData = filterDta(data)
            rs.end(NewData)
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

function pushData(data, rs) {
    try {
        const user = JSON.parse(data)
        jServer.push(user)
        fs.writeFile(dataJson, JSON.stringify(jServer, null, 2), e => {
            if(e) throw e
            rs.end(JSON.stringify({message : true}))
        })
        // fs.writeFileSync(dataJson, JSON.stringify(jServer, null, 2))
        // console.log('Data added!')
    } catch (e) {
        console.log('Error : ' + e)
    }
}

// edit

function validateSignUp(r){
    let name = ''
    for(let i = 0; i < jServer.length; i++) {
        if(jServer[i].name === r.name)
            name = jServer[i].name
    }
    return name
}


function filterDta(data){
    data = JSON.parse(data)
    let arrData = []

    for(let i = 0; i < data.length; i++) {
        let newData = {
            name : '',
            date1: '',
            date2: '',
            date3: '',
            tittle1: '',
            tittle2: '',
            tittle3: '',
            paragraph1: '',
            paragraph2: '',
            paragraph3: ''
        }
        newData.name = data[i].name
        newData.date1 = data[i].date1
        newData.date2 = data[i].date2
        newData.date3 = data[i].date3
        newData.tittle1 = data[i].tittle1
        newData.tittle2 = data[i].tittle2
        newData.tittle3 = data[i].tittle3
        newData.paragraph1 = data[i].paragraph1
        newData.paragraph2 = data[i].paragraph2
        newData.paragraph3 = data[i].paragraph3
        arrData.push(newData)
    }
    return JSON.stringify(arrData, null, 2)
}

function editData(data){

    let editBlog = JSON.parse(data)
    let date1 = []
    let date2 = []
    let date3 = []
    let tittle1 = []
    let tittle2 = []
    let tittle3 = []
    let paragraph1 = []
    let paragraph2 = []
    let paragraph3 = []

    editBlog.forEach(el => {
        date1.push(el.date1)
        date2.push(el.date2)
        date3.push(el.date3)
        tittle1.push(el.tittle1)
        tittle2.push(el.tittle2)
        tittle3.push(el.tittle3)
        paragraph1.push(el.paragraph1)
        paragraph2.push(el.paragraph2)
        paragraph3.push(el.paragraph3)
    })

    fs.readFile(dataJson, 'utf-8',(e, data)=>{
        let pastData = JSON.parse(data)
        // console.log(tittle1)
        for(let i = 0; i < pastData.length; i++) {
            pastData[i].date1 = date1[i]
            pastData[i].date2 = date2[i]
            pastData[i].date3 = date3[i]
            pastData[i].tittle1 = tittle1[i]
            pastData[i].tittle2 = tittle2[i]
            pastData[i].tittle3 = tittle3[i]
            pastData[i].paragraph1 = paragraph1[i]
            pastData[i].paragraph2 = paragraph2[i]
            pastData[i].paragraph3 = paragraph3[i]
            // console.log(`${pastData[i].tittle1} = ${tittle1[i]}`)
        }
        writeEdit(pastData)
    })

}

function writeEdit(pastData){
    fs.writeFile(dataJson, JSON.stringify(pastData, null, 2), e => {
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
