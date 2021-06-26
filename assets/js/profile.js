firebase.auth().onAuthStateChanged((user) => {
    if(user){
        angelBrokingProfileDetails()
		firebaseProfileDetails()
    }
})

async function angelBrokingProfileDetails() {
	var snapshot = await firebase.database().ref(`owner/AngelBrokingID`).once('value');
	var abUsername = snapshot.val();
	document.getElementById('abUsername').value = abUsername;
}

async function firebaseProfileDetails() {
	var user = firebase.auth().currentUser;
	fbEmail = user.email;
	document.getElementById('fbEmail').value = fbEmail;
}

function updateAngelBrokingDetails() {
	// Form validation
	var abUsername = document.getElementById('abUsername').value;
	if (abUsername == "") { alert("Username Can't be Empty"); return}
	var abPassword = document.getElementById('abPassword').value;
	var abPassword2 = document.getElementById('abPassword2').value;
	// Confirmation
	if((abPassword == abPassword2) && (abPassword != "" )) {
		if(confirm("Confirm To Change Angel Broking Details")) {
			firebase.database().ref('owner').update({
				AngelBrokingID: abUsername,
				AngelBrokingPassword: abPassword
			})
			alert('Details updated successfully!')
			location.reload()
		}
	}
	else {
		alert("Password Doesn't Match! OR Password Can't be Empty");
		location.reload()
	}
}

function updateFirebaseDetails() {
	// Form validation
	var fbEmail = document.getElementById('fbEmail').value;
	if (fbEmail == "") { alert("Email Can't be Empty"); return}
	var fbCurrentPassword = document.getElementById('fbCurrentPassword').value;
	var fbPassword = document.getElementById('fbPassword').value;
	var fbPassword2 = document.getElementById('fbPassword2').value;
	// Confirmation
	if((fbPassword == fbPassword2) && (fbPassword != "") ) {
		firebase.auth().signInWithEmailAndPassword(fbEmail, fbCurrentPassword)
			.then((userCredential) => {
				var user = userCredential.user;
				// after Succesfull Login - Update Password
				if(confirm("Confirm to change Firebase Credentials ?")) {
					user.updatePassword(fbPassword)
						.then(() => {
							alert('Successfully updated password')
						}).catch((error) => {
							alert(error);
						});
				}
				else {
					alert("No Update in Firebase Credentials")
				}
			}).catch((error) => {
				alert(error)
			});
	}
	else {
		alert("Password Doesn't Match! OR Password Can't be Empty");
	}
}
