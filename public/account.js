const firebaseConfig = {
    apiKey: "AIzaSyCZRt5ZugU3gYBuKEWAAdbgdtCoIuizGJ4",
    authDomain: "bank-56c80.firebaseapp.com",
    projectId: "bank-56c80",
    storageBucket: "bank-56c80.appspot.com",
    messagingSenderId: "278093243224",
    appId: "1:278093243224:web:268d9c364c7d4e5f577b2d"
};
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();


let screen = document.getElementById("screen")
let scrn = document.getElementById("scrn")
let load = document.getElementById("load")
let name = document.getElementById("name")
let acc = document.getElementById("acc")
scrn.style.display = "block"
screen.style.display = "none"
load.style.display = "none"

function authAll(){
    firebase.auth().onAuthStateChanged((user) => {
if (user) {
var uid = user.uid;
var docRef = db.collection("account").doc(`${uid}`);
docRef.get().then((doc) => {
    if (doc.exists) {
           scrn.style.display = "none"
            screen.style.display = "block"
            load.style.display = "block"
            
            name.textContent = ` ${doc.data().displayName}  ${doc.data().last}`
            acc.textContent = ` ${doc.data().account}`
           console.log("Document data:", doc.data());


    } else {
        console.log("No such document!");
    }
}).catch((error) => {
    console.log("Error getting document:", error);
});

} else {
window.location.href ="login.html"
}
});  
}

authAll()




let bot = document.querySelector('#bot');
let aside = document.querySelector('.aside');

bot.onclick = function () {
    aside.classList.toggle('active');

};