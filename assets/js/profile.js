firebase.auth().onAuthStateChanged((user) => {
    if(user){
        angelBrokingProfileDetails()
		firebaseProfileDetails()
    }
})

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
	document.getElementById('abBtn').innerHTML = 'Updating...'
	var abUsername = document.getElementById('abUsername').value;
	if (abUsername == "") { alert("Username Can't be Empty"); return}
	var abPassword = document.getElementById('abPassword').value;
	var abPassword2 = document.getElementById('abPassword2').value;
	if((abPassword == abPassword2) && (abPassword != "" )) {
		if(confirm("Confirm To Change Angel Broking Details")) {
			firebase.database().ref('owner').update({AngelBrokingID: abUsername})
			firebase.database().ref('owner').update({AngelBrokingPassword: abPassword});
			alert('Details updated successfully!')
		}
	}
	else {
		alert("Password Doesn't Match! OR Password Can't be Empty");
	}
}

function updateFirebaseDetails() {
	document.getElementById('fbBtn').innerHTML = 'Updating...'
	var fbEmail = document.getElementById('fbEmail').value;
	if (fbEmail == "") { alert("Email Can't be Empty"); return}
	var fbCurrentPassword = document.getElementById('fbCurrentPassword').value;
	var fbPassword = document.getElementById('fbPassword').value;
	var fbPassword2 = document.getElementById('fbPassword2').value;
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
