let pd, domain, user_name, master_password;
document.addEventListener("DOMContentLoaded", ()=>{
    const queryString = window.location.search;
    console.log(queryString);
    const urlParams = new URLSearchParams(queryString);

    domain = urlParams.get('domain');
    //domain = "www.youtube.com";
    pd = urlParams.get('password');
    //pd = "Hkz0!O+;2#HF9";
    console.log(pd);
    console.log(domain);
})

// Import the functions you need from the SDKs you need
///*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

document.getElementById("login").addEventListener("click", (e)=>{
    console.log("Login clicked");
    e.preventDefault();
    user_name = document.getElementById("username").value;
    master_password = document.getElementById("master_password").value;
    const target = ref(database, 'Users/' + user_name);
    onValue(target, (snapshot) => {
        const data = snapshot.val();
        //console.log(data);
        if (data) {
            if (data.Masterpassword == master_password) {
                alert("Successfull Login");
                document.getElementById("login_feature").style.display = "none";
                document.getElementById("password_manager").style.display = "block";
                document.getElementById("pl_dm").value = domain;
                document.getElementById("password").value = pd;
                password_display();
            }
            else{
                alert('password does not match');
            }
        }else{
            alert('user does not exist');
        }
    })
})
//*/

function password_display(){
    const target = ref(database, 'Users/' + user_name + '/' + "Platforms/");
    //document.getElementById('password').innerHTML =
    let uid, data;
    let isfound = false;
    onValue(target, (snapshot)=>{
        data = snapshot.val();
        const keys = Object.keys(data);
        console.log(keys);
        for(var i=0; i<keys.length; i++){
            const k = keys[i];
            if(data[k].platform == domain){
                isfound = true;
                uid = k;
                break;
            }
        }
    });
    if(isfound==true){
        console.log("platform found");
        document.getElementById("identifier").value = data[uid].id;
        document.getElementById("password").value = data[uid].password;
        document.getElementById("save").style.display = "none";
    }else{
        console.log("platform not found");
        no_platform();
    }
}

function save_log_cred(e){
    e.preventDefault();
    const target = ref(database, 'Users/' + user_name + '/' + "Platforms/");
    const newPostRef = push(target);
    set(newPostRef, {   //posting data with unique id
        platform: domain,
        id: document.getElementById("identifier").value,
        password: pd
    });
}

function no_platform(){
    document.getElementById("password").value = pd;
    document.getElementById("log_cred").innerHTML ="Login Credential Not Found";
    document.getElementById("save").addEventListener("click", (e)=>{
        e.preventDefault();
        const target = ref(database, 'Users/' + user_name + '/' + "Platforms/");
        const newPostRef = push(target);
        set(newPostRef, {   //posting data with unique id
            platform: domain,
            id: document.getElementById("identifier").value,
            password: pd
        });
        alert("Password Saved");
        //password_display();
    });
}
