/*
document.getElementById("login").addEventListener("click", () =>{
    window.location.href='extension.html';
});
*/
// Import the functions you need from the SDKs you need
///*
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
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
    var user_name = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    const target = ref(database, 'Users/' + user_name);
    onValue(target, (snapshot) => {
        const data = snapshot.val();
        console.log(data);
        if (data) {
            if (data.password == password) {
                alert('correct');
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