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
const storage = firebase.storage();


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
        


    } else {
        alert("No such document!");
    }
}).catch((error) => {
    alert("Error getting document:", error);
});

} else {
window.location.href ="login.html"
}
});  
}

authAll()


let profileImage = document.getElementById("profileImage")
let fileRead = document.getElementById("fileRead")
let fileInput = document.getElementById("fileInput")

profileImage.addEventListener('click',() =>
{
     fileRead.style.display ="block"
})
fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
        uploadImage(file);
    }
});
function openFileInput (){
    fileInput.click();
}

    function uploadImage(file) {

        if (file) {
            const userId = firebase.auth().currentUser.uid;
            const filename = `${userId}_profile.jpg`;

            const storageRef = storage.ref(`profile-images/${filename}`);
            const uploadTask = storageRef.put(file);
            uploadTask.on('state_changed',
                null,
                (error) => {
                    alert('Error uploading image:', error);
                },
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        // const user = firebase.auth().currentUser;
                        firebase.auth().onAuthStateChanged((user) => {
                            if (user) {
                           
                        user.updateProfile({
                            photoURL: downloadURL
                        }).then(() => {
                            // Update the profile image on the page
                            profileImage.src = downloadURL;
                        }).catch((error) => {
                            alert('Error updating profile image:', error);
                        });
                    }
                    });
                });
                }
            );
        }
    }

  
    function captureImage() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function(stream) {
                    const video = document.createElement('video');
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');

                    video.srcObject = stream;
                    video.play();
                    setTimeout(function() {
                        canvas.width = video.videoWidth;
                        canvas.height = video.videoHeight;
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);
                        canvas.toBlob(function(blob) {
                            const file = new File([blob], 'profile_image.jpg', { type: 'image/jpeg' });

                            profileImage.src = URL.createObjectURL(blob);
                            uploadImage(file);
                        }, 'image/jpeg');
                    }, 3000); 
                })
                .catch(function(error) {
                    alert('Error accessing camera:', error);
                });
        } else {
            alert('Camera not supported in this browser.');
        }
    
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        var uid = user.uid;
        // const userId = firebase.auth().currentUser.uid;
    
        const storageRef = firebase.storage().ref(`profile-images/${uid}_profile.jpg`);
        
        storageRef.getDownloadURL().then((downloadURL) => {
            profileImage.src = downloadURL;
        }).catch((error) => {
            alert('Error retrieving profile image from Firebase Storage:', error);
        });
        
        }
    });
    

let bot = document.querySelector('#bot');
let aside = document.querySelector('.aside');

bot.onclick = function () {
    aside.classList.toggle('active');

};

function log(){
    firebase.auth().signOut().then(() => {
alert ("Sign-out successful.")
window.location.href ="index.html"
}).catch((error) => {
alert(error)
});
 }

 let  accUpdate = document.getElementById("accUpdate")
 accUpdate.addEventListener('click', () =>{
    window.location.href ="details.html"
 })