// ============ Home =============

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
                console.log(status)
            }
        })   

        location.replace('./login.html') 
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


// ================== Home ================

const btnSrc = $('#btn-src')
let formSrc = $('#form-src').val()
const time = new Date()

    $.ajax({
        type : 'GET',
        url  : localhost + 'home',
        contentType : 'application/json',
        dataType : 'json',
        success : function(data){

            let cards1 = ''
            let cards2 = ''
            let tittle = ''
            let paragraph = ''
            let writter = ''
            let lastUpdate = ''
            let getName = sessionStorage.getItem('theName')

            data.forEach(el => {
                cards1 += displayBlog(el)
            });

            for(let i = 0; i < data.length; i++){
                if(data.name = getName){
                    let checkIndex = data.findIndex(find => find.name === getName)
                    let card = data[checkIndex]
                    cards2 += displayBlog(card)
                    break
                }
            }

            // cek user (guest / signed in)

            if(getName == null){
                $('.cards-containerAll').html(cards1)
                $('#userAdmin').text(`Home`)
                $('.btnEdit').css('display', 'none')
            } else {
                const btnLogout = `<a class="btn btn-light" id="btnLogout" >Logout</a>`
                const btnMyBlog = `<a class="btn btn-light" id="btnMyBlog" >My blog</a>`
                $('.cards-container').html(cards2)
                $('.cards-container').css('display', 'none')
                $('#userAdmin').html(`Hi, ${getName} |${btnLogout}${btnMyBlog}`)
                $('.container-login-regist').css('display', 'none')
            }

            let contMyblog = 0
            let cards3 = ''

            
            for(let j = 0; j < data.length; j++){
                if(data[j].name != getName){
                    cards3 += displayBlog(data[j])
                }
            }

            function displayAllBlogs (){
                $('#btnMyBlog').text('My blog')
                $('.cards-containerAll').html(cards3)
                $('.cards-container').css('display', 'block')
                $('.cards-containerAll').css('display', 'block')
                $('.btnEdit').css('display', 'none')
            }

            displayAllBlogs ()

            $('#btnMyBlog').on('click', function(){
                if(contMyblog == 0){
                    contMyblog++
                    $(this).text('Hide')
                    $('.cards-container').css('display', 'block')
                    $('.btnEdit').css('display', 'block')
                    $('.cards-containerAll').css('display', 'none')
                } else if (contMyblog == 1){
                    $(this).text('My blog')
                    $('#btnAllBlogs').text('All Blogs')
                    $('.cards-container').css('display', 'none')
                    displayAllBlogs ()
                    return contMyblog = 0
                }
            })

            $('#btnLogout').on('click', function(){
                sessionStorage.removeItem('theName')
                location.replace('./login.html') 
            })

            $('.btnEdit').on('click', function(){

                tittle = $(this).data('tittle')
                paragraph = $(this).data('paragraph')
                writter = $(this).data('name')
                lastUpdate = $(this).data('date')

                let tEdit = document.getElementById('tittleEdit')
                let pEdit = document.getElementById('paragraphEdit')

                tEdit.innerHTML = tittle
                pEdit.innerHTML = paragraph

                $('#model').css('display', 'block')
                $('.cards-container').css('display', 'none')

            })

            // model

            $('.btnClose').on('click', function(){
                $('#model').css('display', 'none')
                $('.cards-container').css('display', 'block')
            })

            // update data

            let newData = data

            $('.btnSave').on('click', function(){

                let newTittle = $('#tittleEdit').html()
                let newParagraph = $('#paragraphEdit').html()

                for(let i = 0; i < newData.length; i++){
                    if(newData[i].name == writter){

                        let tittleData = [(newData[i].tittle1),(newData[i].tittle2),(newData[i].tittle3)]
                        let paragraphData = [(newData[i].paragraph1),(newData[i].paragraph2),(newData[i].paragraph3)]
                        let dateData = [(newData[i].date1),(newData[i].date2),(newData[i].date3)]
                        let passTittle = ''
                        let passParagraph = ''
                        let passDate = ''
                        
                        for(let j = 0; j < tittleData.length; j++){
                            if(tittleData[j] == tittle && paragraphData[j] == paragraph && dateData[j] == lastUpdate){
                                passTittle = tittleData[j]
                                passParagraph = paragraphData[j]
                                passDate = dateData[j]
                            }
                        }

                        if(newData[i].date1 === passDate) newData[i].date1 = time.toString()
                        else if(newData[i].date2 === passDate) newData[i].date2 = time.toString()
                        else if(newData[i].date3 === passDate) newData[i].date3 = time.toString()
                        
                        if(newData[i].tittle1 === passTittle) newData[i].tittle1 = newTittle
                        else if(newData[i].tittle2 === passTittle) newData[i].tittle2 = newTittle
                        else if(newData[i].tittle3 === passTittle) newData[i].tittle3 = newTittle
                        

                        if(newData[i].paragraph1 === passParagraph) newData[i].paragraph1 = newParagraph
                        else if(newData[i].paragraph2 === passParagraph) newData[i].paragraph2 = newParagraph
                        else if(newData[i].paragraph3 === passParagraph) newData[i].paragraph3 = newParagraph
                        
                        $.ajax({
                            type: 'POST',
                            url : localhost + 'home',
                            contentType: 'application/json',
                            dataType: 'json',
                            data: JSON.stringify(newData, null, 2),
                            success:function(status){
                                console.log(status)
                            },
                            error: function(e){
                                console.log("Error : " + e)
                            }
                        })
                        
                    }
                }
            })

        },
        error : function(x, s, e){
            console.log(`Error : ${x}, ${s}, ${e}`)
        }
    })

    
    function displayBlog(el){
        let card = '' 
        let tittles = [el.tittle1, el.tittle2, el.tittle3]
        let paragraphs = [el.paragraph1, el.paragraph2, el.paragraph3]
        let dates = [el.date1, el.date2, el.date3]
        for(var i = 0; i < tittles.length; i++){
            card += 
            `<div class="card index-card" style="width: 35rem;">
                <div class="card-body">
                    <div class="blog">
                        <h3 class="tittle" data-title="${tittles[i]}">${tittles[i]}</h3>
                        <p>by : <l class="writter">${el.name}</l> 
                        <p>last update : <l class="date" data-list="${dates[i]}">${dates[i]}</l></p> 
                        <br>                     
                        <p class="paragraph">${paragraphs[i]}</p>
                        <br>
                    </div>
                    <a class="btn btn-primary btnEdit" name = "btnEdit" data-date="${dates[i]}" data-tittle="${tittles[i]}" data-paragraph="${paragraphs[i]}" data-name="${el.name}">Edit</a>
                </div>
            </div>
            <br>`
        }
        return card
    }


