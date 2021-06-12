function addClient(){
    firebase.database().ref('newClientId').once('value', (snapshot) => {
        let count = snapshot.val();
        var name = document.getElementById('name').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var multiplier = document.getElementById('multiplier').value;
        var status = document.getElementById('status').value;
        var market = document.getElementById('exampleFormControlSelect1').value;
        firebase.database().ref('clients/' + count).set({
            userID: username,
            name: name,
            password: password,
            multiplier: multiplier,
            status: status,
            marketCategory: market,
        });
        firebase.database().ref().update({newClientId: count + 1});
    });
}

function deleteClient(id){
    if(confirm('Delete client'+ id + '?' )){
        firebase.database().ref('clients/'+ id).remove();
        location.reload();
    }
}