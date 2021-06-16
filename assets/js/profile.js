firebase.auth().onAuthStateChanged((user) => {
    if(user){
        angelBrokingProfileDetails()
		firebaseProfileDetails()
    }
})

// console.log("Hello")
firebase.auth().onAuthStateChanged((user) => {
    const authPages = ['login']
    var currentPage = window.location.pathname.split('/')
    var currentPage = currentPage[currentPage.length-1].split('.')[0]

    if (user && authPages.includes(currentPage)) {
        window.location.href = 'index.html'
    } 
    else if(!user && !authPages.includes(currentPage)) {
      // User is NOT signed in, redirecting to auth page
      window.location.href = 'login.html'
    }
});  

async function angelBrokingProfileDetails() {
	var snapshot = await firebase.database().ref(`owner`).once('value');
	var data = snapshot.val();
	abUsername = data.AngelBrokingID
	abCurrentPassword = data.AngelBrokingPassword
	document.getElementById('abUsername').value = abUsername;
	document.getElementById('abCurrentPassword').value = abCurrentPassword;
}

async function firebaseProfileDetails() {
	var user = firebase.auth().currentUser;
	fbEmail = user.email;
	document.getElementById('fbEmail').value = fbEmail;
}

function updateAngelBrokingDetails() {
	var abUsername = document.getElementById('abUsername').value;
	if (abUsername == "") { confirm("Username Can't be Empty"); exit();}
	var abPassword = document.getElementById('abPassword').value;
	var abPassword2 = document.getElementById('abPassword2').value;
	// console.log(abUsername, abPassword)
	if((abPassword == abPassword2) && (abPassword != "" )) {
		if(confirm("Confirm To Change Angel Broking Details") == true) {
			firebase.database().ref('owner').update({AngelBrokingID: abUsername})
			firebase.database().ref('owner').update({AngelBrokingPassword: abPassword}); 
		}
	}
	else {
		alert("Password Doesn't Match! OR Password Can't be Empty");
	}	
}

function updateFirebaseDetails() {
	// var user = firebase.auth().currentUser;
	var fbEmail = document.getElementById('fbEmail').value;
	if (fbEmail == "") { confirm("Email Can't be Empty"); exit();}

	var fbCurrentPassword = document.getElementById('fbCurrentPassword').value;
	console.log("fbCurrentPassword", fbCurrentPassword)
	var fbPassword = document.getElementById('fbPassword').value;
	var fbPassword2 = document.getElementById('fbPassword2').value;
	console.log(fbPassword, fbPassword2)
	if((fbPassword == fbPassword2) && (fbPassword != "") ) {
		// First Login then Update the Password
		firebase.auth().signInWithEmailAndPassword(fbEmail, fbCurrentPassword)
     	.then((userCredential) => {
     		var user = userCredential.user;
    		// after Succesfull Login - Update Password
    		if(confirm("Confirm to change Firebase Credentials ?")) {
				user.updatePassword(fbPassword).then(() => {
				// Update successful.
				}).catch((error) => {
					console.log(error);
				});
				console.log('Log in')
			}
			else {
				alert("No Update in Firebase Credentials")
			}
    	}).catch((error) => {
  			// An error ocurred
  			console.log("Failed Login Internally",error)
		});
	}
	else {
		alert("Password Doesn't Match! OR Password Can't be Empty");
	}

}