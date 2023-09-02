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
    let final = document.getElementById("final")
    let rem = document.getElementById("rem")
    let tranRem = document.getElementById("tranRem")
    let download = document.getElementById("document")
    let history = document.getElementById("history")
    let transaction =  Math.floor(Math.random() * 10000000000000000000)
    let transactio =  Math.floor(Math.random() * 10000000000000000)
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
              const senderAcc = doc.data().account;
              const senderName = doc.data().last
              const senderNam = doc.data().displayName
              const fullName = `${senderName} ${senderNam}`
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
                 const transNum = tranNum.innerHTML
                 const transNam = tranNam.innerHTML

              const senderBalance = senderData.balance
             const senderPin = senderData.pin
              console.log(senderBalance);
                console.log(senderBalance);
                if (!senderData || !accountData) {
                                    alert("Sender or receiver not found.");
                                }
                    
                                if (senderBalance < amount) {
                                    alert("Insufficient balance.");
                                }
                                if (final.value =  senderPin){
                                   
                                
                                const newSenderBalance = senderBalance - amount;
                                

                                  console.log(newSenderBalance);
                                  db.collection("account").doc(uid).update({
                                    balance: newSenderBalance
                                }).then(() => {
                                    const who = "sent";
                                    raydee.textContent = ` ₦${newSenderBalance.toFixed(2)}`;
                                    reciept.innerHTML = `
                                    <div class="rec-top">
                                    <button onclick="bck()"><i class='bx bx-chevron-left bx-flashing'></i></button> 
                                    <span>Transaction details</span>
                                    </div>  
                                    <div class = "rec-body">
                                    <div class="rec-flex">
                                     <div class ="rec-icon">
                                     <i class='bx bxs-check-circle'></i>
                                     <p>Payment successful</p>

                                     </div>

                                     <div class ="rec-icon">
                                     <i class='bx bxs-check-circle'></i>
                                     <p>Processing by bank</p>
                                     </div>

                                     <div class ="rec-icon">
                                     <i class='bx bxs-check-circle'></i>
                                     <p>Received by bank</p>
                                     </div>
                                    </div>
                                    <h1>
                                    The recipient account is expected to be credited within 5 minutes,
                                     subject to notification by the bank.
                                    </h1>
                                    <div class="payFlex">
                                    <p><i class='bx bx-wallet-alt'></i> <span>Transfer to bank</span></p>
                                    <h1>-₦${amount}</h1>
                                </div>
                                <div class="payFlex">
                                    <p>Order Amount</p>
                                     <h1>₦${amount}</h1>
                                     </div>
                                     <div class="payFlex">
                                    <p>Fee</p>
                                     <h1>₦0.00</h1>
                                     </div>
                                     <div class ="rec-time"></div>
                                     <div class="payFlex">
                                     <p>Status</p>
                                      <h1>Success</h1>
                                      </div>
                                      <div class="payFlex">
                                      <p>Bank Name</p>
                                       <h1>Piggy Vest</h1>
                                       </div>
                                       <div class="payFlex">
                                       <p>Account Number</p>
                                        <h1>${transNum}</h1>
                                        </div>
                                        <div class="payFlex">
                                        <p>Account Name</p>
                                         <h1>${transNam}</h1>
                                         </div>
                                         <div class="payFlex">
                                        <p>Paid with</p>
                                         <h1 id="payMethod"></h1>
                                         </div>
                                         <div class="payFlex">
                                         <p>SessionID</p>
                                          <h1>${transaction}</h1>
                                          </div>
                                          <div class="payFlex">
                                          <p>VAT</p>
                                           <h1>₦0.00</h1>
                                           </div>
                                           <div class="payFlex">
                                          <p>Remark</p>
                                           <h1>${rem.value}</h1>
                                           </div>
                                           <div class="payFlex">
                                           <hr>
                                           <p>Transaction Number</p>
                                            <h1>${transactio}</h1>
                                            </div>
                                    </div>
                                    <button onclick="screeen()">history Reciept</button>
                                    </div>
                                     
                                    `
                                     
                                    history.innerHTML += `
                                    <div class="white">
                                    <div><i class='bx bx-wallet-alt'></i></div>
                                    <div class="pay-flex">
                                        <div>
                                            <h1>Money <span>${who}</span></h1>
                                            
                                        </div>
                                        <div>
                                            <h1><span>-</span><span>${amount}</span></h1>
                                            
                                        </div>
                                    </div>
                                    
                                    
                                 </div>
                                    `
                                    // download.innerHTML =`
                                    // <div class="rec-top">
                                    // <button onclick="bck()"><i class='bx bx-chevron-left bx-flashing'></i></button> 
                                    // <span>Transaction details</span>
                                    // </div>  
                                    // <div class = "rec-body">
                                    // <div class="rec-flex">
                                    //  <div class ="rec-icon">
                                    //  <i class='bx bxs-check-circle'></i>
                                    //  <p>Payment successful</p>
                                    //  <div class="payFlex">
                                    //  <p>Order Amount</p>
                                    //   <h1>₦${amount}</h1>
                                    //   </div>
                                    //   <div class="payFlex">
                                    //  <p>Fee</p>
                                    //   <h1>₦0.00</h1>
                                    //   </div>
                                    //   <div class ="rec-time"></div>
                                    //   <div class="payFlex">
                                    //   <p>Status</p>
                                    //    <h1>Success</h1>
                                    //    </div>
                                    //    <div class="payFlex">
                                    //    <p>Bank Name</p>
                                    //     <h1>Piggy Vest</h1>
                                    //     </div>
                                    //     <div class="payFlex">
                                    //     <p>Account Number</p>
                                    //      <h1>${transNum}</h1>
                                    //  </div>
                                    //  <div class="payFlex">
                                    //     <p>Account Name</p>
                                    //      <h1>${transNam}</h1>
                                    //      </div>
                                    //      <div class="payFlex">
                                    //     <p>Sender Account</p>
                                    //      <h1>${senderAcc}</h1>
                                    //      </div>
                                    //      <div class="payFlex">
                                    //      <p>Sender Name</p>
                                    //       <h1>${fullName}</h1>
                                    //       </div>
                                    //      <div class="payFlex">
                                    //      <p>Remark</p>
                                    //       <h1>${rem.value}</h1>
                                    //       </div>
                                    //       <div class="payFlex">
                                    //       <hr>
                                    //       <p>Transaction Number</p>
                                    //        <h1>${transactio}</h1>
                                    //        </div>
                                    // `
                
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
                                            const who = "received";
                                             trans.style.display = "none"
                                            reciept.style.display ="block"

                                            history.innerHTML += `
                                            <div class="white">
                                            <div><i class='bx bx-wallet-alt'></i></div>
                                            <div class="pay-flex">
                                                <div>
                                                    <h1>Money <span>${who}</span></h1>
                                                    
                                                </div>
                                                <div>
                                                    <h1><span>*</span><span>${amount}</span></h1>
                                                    
                                                </div>
                                            </div>
                                            
                                            
                                         </div>
                                            `
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
                              
                            }else{
                                alert("invalid pin")
                            }
                           
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


    function screeen(){
        finalPay()
        window.print(download.innerHTML)
    }

let bot = document.querySelector('#bot');
    let aside = document.querySelector('.aside');

    bot.onclick = function () {
        aside.classList.toggle('active');

    };



   

    
