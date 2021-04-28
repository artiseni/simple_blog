// ============ index =============

$('#loginIndex').on('click', function(){
    location.replace("./login.html")
})

$('#signUpIndex').on('click', function(){
    location.replace("./signup.html")
})


const localhost = 'http://localhost:3000/'
const ajax = new XMLHttpRequest()
let $lName = $('#inputSuName')
let $lEmail = $('#inputSuEmail')
let $lPass1 = $('#inputSuPass1')
let $lPass2 = $('#inputSuPass2')

// ================== Home ================

$('#displayButton').on('click', function(){
    let txt = $('#pageText')
    
    $.ajax({
        type : 'GET',
        url  : localhost + 'index',
        contentType : 'application/json',
        dataType : 'json',
        success : function(data){
            let toJson = JSON.parse(data)
            let jsonArr = []
            toJson.forEach(el => {
                jsonArr+=` ${el.name}`
                txt.text(`users : ${jsonArr}`)
            })
        },
        error : function(x, s, e){
            console.log(`Error : ${x}, ${s}, ${e}`)
        }
    })
    
})

let theName = sessionStorage.getItem(`theName`)

// ================== SignUp ================


$('#btnSignup').on('click', function(e){
    e.preventDefault()
    if($lPass1.val() != $lPass2.val()){
        alert("Wrong Pass!")
    } else { 
        const passData = {
            name : $lName.val(),
            email: $lEmail.val(),
            pass : $lPass1.val(),
            strv: ""
        }
        const data = JSON.stringify(passData)
        // console.log(data)
        $.ajax({
            type : 'POST',
            url  : localhost + 'signup',
            contentType: 'application/json',
            dataType: "json",
            data : JSON.stringify(passData),
            success: function(status){
                console.log(status)
            },
            error: function(e){
                console.log("Error : " + e)
            }
        })   
        location.replace("./login.html") 
    }
})


//==================== login ================

let loName = $('#inputLogName')
let loPass = $('#inputLogPass')

$('#btnLogin').on('click', function(e){
    
    e.preventDefault()

    let getData = {
        name : loName.val(),
        pass : loPass.val()
    }
    getRespons()
})

let key = sessionStorage.getItem('change')

function getRespons(){
    let empty = ''
    $.ajax({
        type : 'GET',
        url  : localhost + 'login',
        contentType : 'application/json',
        dataType : 'json',
        success : function(data) {

            console.log(data)

            empty+=data
            let jsonTosave = JSON.parse(empty)
            jsonTosave.every(el => {
                console.log(el.name)
                if(loName.val() === el.name && loPass.val() === el.pass){

                    let theName = el.name
                    sessionStorage.setItem(`theName`, theName)
                    
                    $('.containerTwo').css('display', 'block')

                    $('#info').text('Welcome!')
                    return false
                }
                $('#info').text('Invalid user data!')
                return true
            })
        },
        error : function(e){
            console.log(e)
        }
    })
}

function validate(length) { 
    let result = []; 
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    let charactersLength = characters.length; 
    for ( let i = 0; i < length; i++ ) {
        result.push(characters.charAt(Math.floor(Math.random() * charactersLength))); 
    }
    return result.join(''); 
} 


//==================== verify ================

let displayString = $('#txtRetype')
let inputString = $('#inputString')
let valid = validate(5)

function checkButton(){
    displayString.text(valid)
}



$('#btnVerif').on('click', function(){

    if(valid == inputString.val()){
        location.replace("./home.html") 
    } else {
        alert("Invalid!")
    }

   


})

