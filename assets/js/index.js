displayClientDetails();

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
                    <a class="btn btn-warning" href="edit.html?id=${ID}">Edit</a> </div> </td> 
            <td><div class="d-flex">
                    <a class="btn btn-primary" onclick= 'deleteClient(${ID})'>Delete</a> </div> </td> </tr>`
        	eachRow += eachRowContent
        }
    })
    document.getElementById("clientDetails").innerHTML = eachRow;
}
