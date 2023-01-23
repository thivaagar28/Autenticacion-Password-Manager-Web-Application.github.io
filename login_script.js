import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, push, child } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

let pd, domain, user_name, master_password;

//web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCg-TigzPHPrOJDe3XT1aMZ2ip6m7SyxLA",
    authDomain: "autenticacion-936ca.firebaseapp.com",
    databaseURL: "https://autenticacion-936ca-default-rtdb.firebaseio.com",
    projectId: "autenticacion-936ca",
    storageBucket: "autenticacion-936ca.appspot.com",
    messagingSenderId: "847508811693",
    appId: "1:847508811693:web:31e34aeb9bb7b49d603b24",
    measurementId: "G-BBHLJS80V9"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", ()=>{
    //get url of current page with domain and generated password paameters
    const queryString = window.location.search;
    console.log(queryString);
    //extract parameters list
    const urlParams = new URLSearchParams(queryString);

    //extract specific paramaters
    domain = urlParams.get('domain');
    pd = urlParams.get('password');
    console.log(pd);
    console.log(domain);
})

document.getElementById("login").addEventListener("click", (e)=>{
    console.log("Login clicked");
    e.preventDefault();
    user_name = document.getElementById("username").value;
    master_password = document.getElementById("master_password").value;
    let messages = [];
    if(user_name == "" ){
        messages.push("Username is required");
        //console.log("Username is required");
    }
    if(master_password == "" ){
        messages.push("Password is required")
        //console.log("password is required");
    }
    if(messages.length > 0){
        alert(messages.join("\n"));
    }
    if(user_name != "" && master_password != ""){
        const target = ref(database, 'Users/' + user_name);
        let data;
        get(target).then((snapshot) => {
            if (snapshot.exists()) {
                data = snapshot.val();
                console.log(data);
                if (data.Masterpassword === master_password) {
                    alert("Successfull Login");
                    console.log("account_found");   
                    account_found();
                }
                else{
                    alert('password does not match');
                }
            } else {
                console.log("No data available");
                alert('user does not exist');
            }
        }).catch((error) => {
            console.error(error);
        });
    }
})

function account_found(){
    document.getElementById("login_feature").style.display = "none";
    document.getElementById("password_manager").style.display = "block";
    document.getElementById("pl_dm").value = domain;
    document.getElementById("password").value = pd;
    password_display();
}

function password_display(){
    console.log("Password display function");
    document.getElementById("login").style.display = "none";
    const target = ref(database, 'Users/' + user_name + '/' + "Platform/");
    let uid, data, keys;
    let isfound = false;
    get(target).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            data = snapshot.val();
            keys = Object.keys(data);
            for(var i=0; i<keys.length; i++){
                const k = keys[i];
                if(data[k].platform == domain){
                    isfound = true;
                    uid = k;
                    break;
                }
            }
            if(isfound==true){
                console.log("platform found");
                document.getElementById("identifier").value = data[uid].id;
                document.getElementById("password").value = data[uid].password;
            }else{
                console.log("platform not found");
                no_platform();
            }
        } else {
            //When there are no keys availabele
            console.log("No data available");
            no_platform();
        }
    }).catch((error) => {
        console.error(error);
    });
}

function no_platform(){
    //display save button
    document.getElementById("save").style.display = "block";
    console.log("No platform");
    //set password input value as th generated password
    document.getElementById("password").value = pd;
    //Set header message
    document.getElementById("log_cred").innerHTML ="Login Credential Not Found";
    document.getElementById("save").addEventListener("click", (e)=>{
        e.preventDefault();
        let messages = [];
        if(document.getElementById("identifier").value == ""){
            messages.push("Login Credential required");
        }
        if(document.getElementById("password").value == "" ){
            messages.push("Password is required");
        }
        if(messages.length > 0){
            alert(messages.join("\n"));
        }
        if(document.getElementById("identifier").value != "" && document.getElementById("password").value != ""){
            const target = ref(database, 'Users/' + user_name + '/' + "Platform/");
            const newPostRef = push(target);
            set(newPostRef, {   //posting data with unique id
                platform: domain,
                id: document.getElementById("identifier").value,
                password: document.getElementById("password").value
            });
            alert("Password Saved");
            document.getElementById("log_cred").innerHTML ="Saved Login Credential";
            document.getElementById("save").style.display = "none";
            password_display();
        }
    });
}

document.getElementById("exit").addEventListener("click", (e)=>{
    //Prevent default action
    e.preventDefault();
    //Close the current tab
    window.close();
})

document.getElementById("ctc").addEventListener("click", (e)=>{
    e.preventDefault();
    const text = document.getElementById('password');
    text.select();
    navigator.clipboard.writeText(text.value);
})
document.getElementById("toggle_password").addEventListener("click", (e)=>{
    //e.preventDefault();
    const password = document.getElementById("master_password");
    if (password.type === "password") {
        password.type = "text";
        document.getElementById("toggle_password").src = "img/eye-icon-slash.png";
    } else {
        password.type = "password";
        document.getElementById("toggle_password").src = "img/eye-icon.png";
    }
});
document.getElementById("toggle_password2").addEventListener("click", (e)=>{
    //e.preventDefault();
    const password = document.getElementById("password");
    if (password.type === "password") {
        password.type = "text";
        document.getElementById("toggle_password2").src = "img/eye-icon-slash.png";
    } else {
        password.type = "password";
        document.getElementById("toggle_password2").src = "img/eye-icon.png";
    }
});
