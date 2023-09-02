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



 

   const user = firebase.auth().currentUser;
   console.log(user);
//    let logs = document.getElementById("log")
    let lastName = document.getElementById("lastName")
    let firstName = document.getElementById("firstName")
    let raydee = document.getElementById("raydee")
    let screen = document.getElementById("screen")
    let scrn = document.getElementById("scrn")
    let load = document.getElementById("load")
    let transfer = document.getElementById("transfer")
    let transferr = document.getElementById("transferr")
    let digits = document.getElementById("digits")
    let showName = document.getElementById("showName")
    let payment = document.getElementById("payment")
    let payName = document.getElementById("payName")
    let payAcc = document.getElementById("payAcc")
    let payAmt = document.getElementById("payAmt")
    let trans = document.getElementById("trans")
    let tranNum = document.getElementById("tranNum")
    let tranNam = document.getElementById("tranNam")
    let tranAmount = document.getElementById("tranAmount")
    let method = document.getElementById("method")
    let reciept = document.getElementById("reciept")
    let rem = document.getElementById("rem")
    let tranRem = document.getElementById("tranRem")
    scrn.style.display = "block"
    screen.style.display = "none"
    load.style.display = "none"
    function authAll(){
        firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    var docRef = db.collection("account").doc(`${user.uid}`);

    docRef.get().then((doc) => {
        if (doc.exists) {
               scrn.style.display = "none"
                screen.style.display = "block"
                load.style.display = "block"
                lastName.textContent = ` ${doc.data().last}`
                firstName.textContent = ` ${doc.data().displayName} pocket`
                raydee.textContent = `₦${doc.data().balance}`
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
    

         function log(){
            firebase.auth().signOut().then(() => {
  alert ("Sign-out successful.")
  window.location.href ="index.html"
}).catch((error) => {
});
         }
         function myAirtime(){
   airtime.style.display="block"
    }
    function buyAirtime(){
        const amountInput = document.getElementById("airtimeAmount");
    const amount = amountInput.value;
        firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    console.log(uid);
    var docRef = db.collection("account").doc(`${uid}`);
    docRef.get().then((doc) => {
        if (doc.exists) {
            const userData = doc.data();
            console.log(userData);
            const currentBalance = userData.balance;
            console.log(currentBalance);
            if (currentBalance >= amount) {
                const newBalance = currentBalance - amount;
                console.log(newBalance);
                console.log(amount);
                db.collection("account").doc(uid).update({
                    balance: newBalance
                }).then(() => {
                    raydee.textContent = ` ₦${newBalance.toFixed(2)}`;

                }).catch(error => {
                    console.error("Error updating balance:", error);
                });
            }else{
                alert("insufficient balance")
            }
        }
        })
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    }



    function myTransfer(){
           transferr.style.display ="block"
    }
    function show(){
       showName.innerHTML=`
       <i class='bx bx-rotate-right bx-spin'></i>`
    
       let accountNumber = parseInt(digits.value); 
    
     db.collection("account")
        .where("account", "==", accountNumber)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const accountData = querySnapshot.docs[0].data();
                const accountName = accountData.displayName; 
                const accountLast = accountData.last;
                const accountNum = accountData.account;
                console.log(accountData); 
                showName.innerHTML = `
                <i class='bx bxs-user-check'></i>
                ${accountName} ${accountLast} `;
            tranNam.innerHTML = `${accountName} ${accountLast}`;
            tranNum.innerHTML =`${accountNum}`

            } else {
                showName.innerHTML = "Account not found.";
            }
        })
    }
   

   
       
function pay(){
    if(!showName.innerHTML==""){
        transferr.style.display ="none"
     payment.style.display ="block"
    }
   
    // trans.style.top ="100%"

}
function showPin(){
    if(payAmt.value !==""){
        // payment.style.display ="none"
        trans.style.display = "block"
    }
    tranAmount.innerHTML = payAmt.value
    tranRem.innerHTML = rem.value

}
function finalPay(){
    firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    var docRef = db.collection("account").doc(`${uid}`);
    let amount = payAmt.value
    let accountNumber = parseInt(digits.value); 
    // let transs = tranAmount.value
    docRef.get().then((doc) => {
        if (doc.exists) {
              const senderData = doc.data();
              
            db.collection("account")
            .where("account", "==", accountNumber)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const accountData = querySnapshot.docs[0].data();
                    const accountName = accountData.displayName; 
                    const accountLast = accountData.last;
                    const accountNum = accountData.account;
                  
                    console.log(accountData); 
                    showName.innerHTML = `
                    <i class='bx bxs-user-check'></i>
                    ${accountName} ${accountLast} `;
                tranNam.innerHTML = `${accountName} ${accountLast}`;
                tranNum.innerHTML =`${accountNum}`


              const senderBalance = senderData.balance
             
              console.log(senderBalance);
                console.log(senderBalance);
                if (!senderData || !accountData) {
                                    alert("Sender or receiver not found.");
                                }
                    
                                if (senderBalance < amount) {
                                    alert("Insufficient balance.");
                                }
                    
                                const newSenderBalance = senderBalance - amount;
                                

                                  console.log(newSenderBalance);
                                  db.collection("account").doc(uid).update({
                                    balance: newSenderBalance
                                }).then(() => {
                                    raydee.textContent = ` ₦${newSenderBalance.toFixed(2)}`;
                                    reciept.innerHTML = `
                                    <div class="rec-top">
                                    <button onclick="bck()"><i class='bx bx-chevron-left bx-flashing'></i></button> 
                                    <span>Transaction details</span>
                                    </div>  
                                    <div class = "rec-body">
                                    <div class="rec-payFlex">
                                     <div class ="rec-icon">
                                     <i class='bx bxs-check-circle'></i>
                                     <p>Payment successful</p>
                                     </div>
                                     
                                    </div>
                                    </div>
                                    `
                
                                }).catch(error => {
                                    console.error("Error updating balance:", error);
                                });
                                const accountNumber = parseInt(tranNum.innerText);
                                const receiverRef =  db.collection("account")
                                .where("account", "==", accountNumber)
                               
                             
                                receiverRef.get()
                                .then((querySnapshot) => {
                                  if (!querySnapshot.empty) {
                                    const receiverDoc = querySnapshot.docs[0].ref;
                                    receiverDoc.get()
                                      .then((receiverData) => {
                                        const accountBalance = receiverData.data().balance;
                                        let acc = parseInt(accountBalance) 
                                          let amt = parseInt(amount);
                                      const newAccBalance =Number(acc) +Number(amt)
                                      
                                        const newreceiverBalance = newAccBalance;
                              
                                        
                                        receiverDoc.update({
                                          balance: newreceiverBalance
                                        })
                                        .then(() => {
                                             trans.style.display = "none"
                                            reciept.style.display ="block"
                                          
                                        //   console.log("receiver's balance updated successfully");
                                        })
                                        .catch((error) => {
                                          console.error("Error updating receiver's balance:", error);
                                        });
                                      })
                                      .catch((error) => {
                                        console.error("Error retrieving receiver's data:", error);
                                      });
                                  } else {
                                    alert("receiver account not found.");
                                  }
                                })
                                .catch((error) => {
                                  console.error("Error querying receiver's account:", error);
                                });
                              

                           
                } else {
                    showName.innerHTML = "Account not found.";
                }
            })
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



let bot = document.querySelector('#bot');
    let aside = document.querySelector('.aside');

    bot.onclick = function () {
        aside.classList.toggle('active');

    };



   

    
