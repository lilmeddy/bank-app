
    
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

        let email = document.getElementById("email")
    let password = document.getElementById("password")
    let block = document.getElementById("block")
    let none = document.getElementById("none")
    none.style.display ="none"
      function log(){
        none.style.display ="block"
        block.style.display ="none"
        // event.preventDefault(ev)
  
        firebase.auth().signInWithEmailAndPassword(email.value, password.value)
  .then((userCredential) => {
    // Signed in
    none.style.display ="none"
    var user = userCredential.user;
    let currentUser = firebase.auth().currentUser
  
    window.location.href ="dash.html"
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  });
      }
