// ============ Home =============

const localhost = 'http://localhost:3000/'
const ajax = new XMLHttpRequest()
let $lName = $('#inputSuName')
let $lEmail = $('#inputSuEmail')
let $lPass1 = $('#inputSuPass1')
let $lPass2 = $('#inputSuPass2')


// ================== SignUp ================

$('#btnSignup').on('click', function(){

    function moveToLogin(){
        return location.replace('./login.html') 
    }

    if($lPass1.val() != $lPass2.val()){
        alert("Wrong Pass!")
    } else { 
        const passData = {
            name : $lName.val(),
            email: $lEmail.val(),
            pass : $lPass1.val(),
            date1: validate(5),
            date2: validate(5),
            date3: validate(5),
            tittle1: "",
            tittle2: "",
            tittle3: "",
            paragraph1: "",
            paragraph2: "",
            paragraph3: ""
        }
     
        $.ajax({
            type : 'POST',
            url  : localhost + 'signup',
            contentType: 'application/json',
            dataType: "json",
            data : JSON.stringify(passData),
            success: function(status){
                if(status.message === true){
                    moveToLogin()
                }
            },
            error : function(xhr, ajaxOptions, err){
                switch (xhr.status){
                    case 401 :
                        alert(xhr.responseJSON.message)
                    break
                }
                console.log(err)
            }
        })   

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
    getRespons(getData)
})

let key = sessionStorage.getItem('change')

function getRespons(getData){
    let loginName = ''
    let loginPass = ''
    let newGet = JSON.stringify(getData)
    $.ajax({
        type : 'POST',
        url  : localhost + 'login',
        contentType : 'application/json',
        dataType : 'json',
        data: newGet,
        success : function(success) {
            loginName = success.name
            loginPass = success.pass
            if(getData.name == loginName){
                sessionStorage.setItem('theName', getData.name)
                $('.container').css('display', 'none')
                $('.containerTwo').css('display', 'block')
            }
        }, 
        error : function(xhr, ajaxOptions, err){
            switch (xhr.status){
                case 401 :
                    $('#info').text('Invalid user data!')
                break
            }
            console.log(err)
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


//==================== verified ================

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
