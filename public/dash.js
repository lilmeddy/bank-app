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

 

   const user = firebase.auth().currentUser;
 
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
    let download = document.getElementById("download")
    let history = document.getElementById("history")
    let transac =  Math.floor(Math.random() * 10000000000000000000)
    let transactio =  Math.floor(Math.random() * 10000000000000000)
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
                lastName.textContent = ` ${doc.data().last}`
                firstName.textContent = ` ${doc.data().displayName} pocket`
                raydee.textContent = `₦${doc.data().balance}`
              

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
    

         function log(){
            firebase.auth().signOut().then(() => {
  alert ("Sign-out successful.")
  window.location.href ="index.html"
}).catch((error) => {
    alert(error)
});
         }
      
         function myAirtime(){
            let buyAirtime = document.getElementById("buyAirtime")
         buyAirtime.style.display="block"
    }
    function setAirtimeAmount(amount) {
        const amountInput = document.getElementById("airtimeAmount");
        amountInput.value = amount;
      }
      


function buyAirtime() {
    const amountInput = document.getElementById("airtimeAmount");
    const amount = amountInput.value;

    const networkSelect = document.getElementById("network");
    const network = networkSelect.value;

    const recipientNumberInput = document.getElementById("recipientNumber");
    const recipientNumber = recipientNumberInput.value;
    
    

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var uid = user.uid;
            var docRef = db.collection("account").doc(`${uid}`);
            docRef.get().then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    const currentBalance = userData.balance;

                    if (currentBalance >= amount) {
                        const newBalance = currentBalance - amount;
                     
                        if(recipientNumber.length = 11){
                        
                        db.collection("account").doc(uid).update({
                            balance: newBalance
                        }).then(() => {
                            raydee.textContent = ` ₦${newBalance.toFixed(2)}`;

                            
                            const transactionsRef = db.collection("transactions").doc();
                            const date = new Date();

                            transactionsRef.set({
                                senderUID: uid,
                                receiverUID: null,  
                                senderDetails: null,
                                receiverDetails: null, 
                                transac: null,  
                                amount: amount,
                                transactio: null,  
                                transactionType: "Airtime Purchase",
                                date: date,
                                recipientNumber:recipientNumber,
                                network:network,
                                
                            }).then(() => {
                                alert("Airtime purchase transaction successful ");
                               console.log(recipientNumber);
                                let buyAirtime = document.getElementById("buyAirtime")
                                buyAirtime.style.display="none"
                            }).catch((error) => {
                               alert("Error adding airtime purchase transaction: ", error);
                            });
                        }).catch(error => {
                           alert("Error updating balance:", error);
                        });
                    }else{
                        alert("Number must be up to 11 digits")
                    }
                    } else {
                        alert("Insufficient balance");
                    }
                }
            });
        } else {
            alert("No such document!");
        }
    }).catch((error) => {
        alert("Error getting document:", error);
    });
}



    function myTransfer(){
           transferr.style.display ="block"
    }
    document.getElementById("payBut").style.display = "none"
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
                showName.innerHTML = `
                <i class='bx bxs-user-check'></i>
                ${accountName} ${accountLast} `;
            tranNam.innerHTML = `${accountName} ${accountLast}`;
            tranNum.innerHTML =`${accountNum}`
            document.getElementById("payBut").style.display = "block"

            } else {
                showName.innerHTML = "Account not found.";
            }
        })
    }
   

   
       
function pay(){
    if(!showName.innerHTML==""  ){
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
              
              const date = new Date(); 
            db.collection("account")
            .where("account", "==", accountNumber)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const accountData = querySnapshot.docs[0].data();
                    const accountName = accountData.displayName; 
                    const accountLast = accountData.last;
                    const accountNum = accountData.account;
                    // const accountID = accountData.id
                    showName.innerHTML = `
                    <i class='bx bxs-user-check'></i>
                    ${accountName} ${accountLast} `;
                tranNam.innerHTML = `${accountName} ${accountLast}`;
                tranNum.innerHTML =`${accountNum}`
                 const transNum = tranNum.innerHTML
                 const transNam = tranNam.innerHTML

              const senderBalance = senderData.balance
             const senderPin = senderData.pin
                if (!senderData || !accountData) {
                                    alert("Sender or receiver not found.");
                                }
                    
                                if (senderBalance < amount) {
                                    alert("Insufficient balance.");
                                }
                                if (final.value =  senderPin){
                                   
                                
                                const newSenderBalance = senderBalance - amount;
                        
                                  db.collection("account").doc(uid).update({
                                    balance: newSenderBalance
                                }).then(() => {
                                    download.innerHTML = `
                                    <div class="close" id="closing" style="margin-top:-8px;">&times;</div>
                                    <div class="payFlex">
                                      <p>Money Recieved</p>
                                       <h1>Success</h1>
                                       </div>
                                       <div class="payFlex">
                                       <p>Bank Name</p>
                                        <h1>Piggy Vest</h1>
                                        </div>
                                         <div class="payFlex">
                                        <p>Sender Account</p>
                                         <h1>${senderAcc}</h1>
                                         </div>
                                         <div class="payFlex">
                                         <p>Sender Name</p>
                                          <h1>${fullName}</h1>
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
                                    `
                                    let closing = document.getElementById("closing")
                                    closing.addEventListener("click", () => {
                                        overlay.style.display = "none"
                                        transferr.style.display = "none"
                                        trans.style.display = "none"
                                    })
                                    raydee.textContent = ` ₦${newSenderBalance.toFixed(2)}`;

                                   
                
                                }).catch(error => {
                                   alert("Error updating balance:", error);
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
                                            // const who = "received";
                                             trans.style.display = "none"
                                            reciept.style.display ="block"

                                      
                                        })
                                        let recNum = document.getElementById("recNum")
                                        let recNam = document.getElementById("recNam")
                                        let recSess = document.getElementById("recSess")
                                        let recRem = document.getElementById("recRem")
                                        let recTra = document.getElementById("recTra")
                                        let recAmt = document.getElementById("recAmt")
                                        recNum.innerHTML = `${accountNumber}`
                                        recNam.innerHTML = `${accountName}`
                                        recAmt.innerHTML = `${amount}`
                                        recSess.innerHTML = `${transac}`
                                        recTra.innerHTML = `${transactio}`
                                        const transactionsRef = db.collection("transactions").doc();
                                        const date = new Date(); 
                                        transactionsRef
                                        .set({
                                          senderUID: senderData.userId,
                                          receiverUID: accountData.userId,
                                          senderDetails : fullName,
                                          receiverDetails:transNam,
                                          transac:transac,
                                          amount: amount,
                                          transactio: transactio,
                                        //   type: sign === '+' ? 'Credited' : 'Debited',
                                        //   sign: sign, 
                                          date: date,
                                        })
                                        .then(() => {
                                          alert("Transaction updated");
                                        })
                                        .catch((error) => {
                                         alert("Error adding transaction: ", error);
                                        })
                                    
                                        .catch((error) => {
                                         alert("Error updating receiver's balance:", error);
                                        });
                                      })
                                      .catch((error) => {
                                       alert("Error retrieving receiver's data:", error);
                                      });
                                  } else {
                                    alert("receiver account not found.");
                                  }
                                })
                                .catch((error) => {
                                 alert("Error querying receiver's account:", error);
                                });
                              
                            }else{
                                alert("invalid pin")
                                return
                            }
                           
                } else {
                    showName.innerHTML = "Account not found.";
                }
            })
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



function myHistory() {
    history.style.display="block"
    const user = firebase.auth().currentUser;
    const transactionsList = document.getElementById("transactionsList");
    transactionsList.innerHTML = "";

    if (user) {
        const uid = user.uid;
        const transactionsRef = db.collection("transactions");

        transactionsRef
            .where("senderUID", "==", uid)
            .orderBy("date", "desc")
            .get()
            .then((senderSnapshot) => {
                const senderTransactions = senderSnapshot.docs.map((doc) => {
                    const data = doc.data();
                    return { ...data, isSender: true };
                });

                transactionsRef
                    .where("receiverUID", "==", uid)
                    .orderBy("date", "desc")
                    .get()
                    .then((receiverSnapshot) => {
                        const receiverTransactions = receiverSnapshot.docs.map((doc) => {
                            const data = doc.data();
                            return { ...data, isSender: false };
                        });

                        const transactions = [...senderTransactions, ...receiverTransactions];

                        transactions.sort((a, b) => b.date - a.date);

                        if (transactions.length === 0) {
                            transactionsList.innerHTML = "No transactions found.";
                        } else {
                            transactions.forEach((transaction) => {
                                const listItem = document.createElement("li");
                                const sign = transaction.isSender ? "-" : "+";
                                let transactionDetails = "";
                                const owner = transaction.isSender ? transaction.receiverDetails : transaction.senderDetails;
                                const type = transaction.isSender ? "Debited" : "Credited";
                                const dateOptions = { weekday: 'short', hour: 'numeric', minute: 'numeric' };
                                const formattedDate = transaction.date.toDate().toLocaleDateString('en-US', dateOptions);

                                if (transaction.transactionType === "Airtime Purchase") {
                                    transactionDetails = `
                                        Type: Airtime Purchase<br>
                                        Amount: ${sign}₦${transaction.amount}<br>
                                        Number : ${transaction.recipientNumber} <br>
                                        Network:${transaction.network} <br>
                                          Date: ${formattedDate}<br>
                                    `;
                                } else {
                                    
                                    transactionDetails = `
                                        Type: ${type} 
                                        Name : ${owner}
                                        Amount: ${sign} ₦${transaction.amount}<br>
                                        TransactionId :${transaction.transactio} <br>
                                        Date: ${formattedDate}
                                    `;
                                }

                                listItem.innerHTML = transactionDetails;
                                transactionsList.appendChild(listItem);

                                listItem.style.cursor = "pointer";
                                listItem.addEventListener("click", () => {
                                    const transactionDetailsElement = document.getElementById("transactionDetails");
                                    transactionDetailsElement.innerHTML = transactionDetails;

                                    const modal = document.getElementById("transactionModal");
                                    modal.style.display = "block";

                                    const closeModal = document.querySelector(".close");
                                    closeModal.addEventListener("click", () => {
                                        modal.style.display = "none";
                                    });
                                });
                            });
                        }
                    })
                    .catch((error) => {
                       alert("Error fetching receiver transactions:", error);
                    });
            })
            .catch((error) => {
               alert("Error fetching sender transactions:", error);
            });
    } else {
        transactionsList.innerHTML = "Please log in to view transactions.";
    }
}

finalPay()

const overlay = document.querySelector('.overlay');
    function screeen(){
       
      overlay.style.display = "block"
      download.style.display = "block"
        window.print()
    }

let bot = document.querySelector('#bot');
    let aside = document.querySelector('.aside');

    bot.onclick = function () {
        aside.classList.toggle('active');

    };
    function bak(){
        let buyAirtime = document.getElementById("buyAirtime")
        buyAirtime.style.display = "none"
    }
    function bac(){
        trans.style.display = "none"
    }

function back (){
    transferr.style.display = "none"
}
function bck(){
    reciept.style.display = "none"
    trans.style.display = "block"
}

let closee = document.getElementById("closee")
closee.addEventListener("click", () => {
    history.style.display = "none"
})


const display = (num) => {
    document.getElementById("digits").value += num;
  };
  
  const clr = () => {
    document.getElementById("digits").value = "";
  };
  
   

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    var uid = user.uid;
    const photo = document.getElementById("photo")
    const storageRef = firebase.storage().ref(`profile-images/${uid}_profile.jpg`);
    
    storageRef.getDownloadURL().then((downloadURL) => {
        photo.src = downloadURL;
    }).catch((error) => {
       alert('Error retrieving profile image from Firebase Storage:', error);
    });
    
    }
});


    
