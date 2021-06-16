firebase.auth().onAuthStateChanged((user) => {
    if(user){
        displayClientDetails();
    }
})




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


async function displayClientDetails() {
	var snapshot = await firebase.database().ref(`clients`).once('value');
	var data = snapshot.val();
	eachRow = ""
	jQuery.each(data, function(ID, details) {
		// console.log(ID, details)
        if(details) {
        	let marketCategory = details.marketCategory;
        	let multiplier = details.multiplier;
        	let name = details.name;
        	let password = details.password;
        	let status = details.status;
        	let userID = details.userID;

        	eachRowContent = `<tr> <td>${ID}</td>
        	<td>${name}</td> 
        	<td>${userID}</td> 
        	<td>${password}</td>
        	<td>${marketCategory}</td>
        	<td>${multiplier}</td>
        	<td>${status}</td>
        	<td><div class="d-flex">
                    <a class="btn btn-warning" href="edit-client.html?id=${ID}">Edit</a> </div> </td> 
            <td><div class="d-flex">
                    <a class="btn btn-primary" onclick= 'deleteClient(${ID})'>Delete</a> </div> </td> </tr>`
        	eachRow += eachRowContent
        }
    })
    document.getElementById("clientDetails").innerHTML = eachRow;
}
