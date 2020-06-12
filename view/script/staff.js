// import { verifyTicket } from "../../Database/database";

const buttonElem = document.querySelector('#loginButton');
const inputUser = document.querySelector('#username');
const inputPass = document.querySelector('#password');

async function saveToken(token) {
    //return new Promise((resolve, reject) => {
        sessionStorage.setItem('auth', token);

        //resolve('Done');
    //})
}

function getToken() {
    return sessionStorage.getItem('auth');
}

async function login(username, password) {
    const url = 'http://localhost:8001/whereitsat/auth/login';
    const obj = {
        username: username,
        password: password
    }

    const response = await fetch(url, { 
        method: 'POST', 
        body: JSON.stringify(obj), 
        headers: { 'Content-Type': 'application/json' } });
        
    const data = await response.json();
    console.log(data);
    return await data;
}

async function isLoggedIn() {
    const token = getToken();
    const url = 'http://localhost:8001/whereitsat/auth/isloggedin';

    const response = await fetch(url, { 
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        } 
    });
    const data = await response.json();

    if (data.isLoggedIn) {      
       // location.href = 'http://localhost:8001/staffVerify.html';
    }
}
 
buttonElem.addEventListener('click', async () => {
    const user = inputUser.value;
    const pass = inputPass.value;
    
    let loggedIn = await login(user, pass);
    
    if (loggedIn.success) {
        saveToken(loggedIn.token);
        setTimeout(() => {          

            if(loggedIn.role=='staff') { 
                location.href = 'http://localhost:8001/staffVerify.html'
            } else if (loggedIn.role=='admin') { 
                location.href = 'http://localhost:8001/admin.html'
            } else {
                location.href = 'http://localhost:8001';
            } 
            
        }, 100);

    } else {
        document.querySelector('#errorMessage').classList.toggle('hide');
    }
});

isLoggedIn();