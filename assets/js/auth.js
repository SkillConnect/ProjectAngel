function login(){
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(email,password)
    firebase.auth().signInWithEmailAndPassword(email, password)
     .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log('HI')
    // ...
    })
   .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage,errorCode)
   });
}

function signout(){
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log('BYE')
      }).catch((error) => {
        // An error happened.
      });
}