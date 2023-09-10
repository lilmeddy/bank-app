
    
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




    
    let one = document.getElementById("one")
    let second = document.getElementById("second")
    let pin = document.getElementById("pin")
    let confirmPin = document.getElementById("confirmPin")
    let accNumber = document.getElementById("accNumber")
    let email = document.getElementById("email")
    let first = document.getElementById("first")
    let last = document.getElementById("last")
    let password = document.getElementById("password")
    let number = document.getElementById("number")
    let randomNumber = Math.floor(Math.random() * 40000000000)
    accNumber.innerHTML = randomNumber
    second.style.display ="none"
    function create(ev) {
        event.preventDefault(ev)
        // first.value !== ""  
        firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredential) => {
                // Signed in 
                
                var user = userCredential.user;
                var userId = user.uid;
                
                alert("successful")
                user.updateProfile({
                displayName: first.value,
}).then(() => {
    one.style.display = "none"
    second.style.display ="block"
  // ...
})
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
    }
    function reg(ev) {
        // console.log("jfj");
           event.preventDefault(ev);
        const user = firebase.auth().currentUser;
        if (user) {
        const uid = user.uid;
        const email = user.email;
        // var docData = {
        
    
        db.collection("account")
        .doc(uid)
        .set({
            // name: first.value,
            displayName:first.value,
            account: randomNumber,
            pin: pin.value,
            last: last.value,
            mail : email,
            balance: "1500000",
            number:number.value,
            userId: uid
        })
        
                .then(() => {
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    alert("Error updating user profile: ", error);
                })
            .catch((error) => {
                alert("Error writing document: ", error);
            });
    }
}
