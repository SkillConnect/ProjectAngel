function addClient(){
    firebase.database().ref('newClientId').once('value', async (snapshot) => {
        let count = snapshot.val();
        var name = document.getElementById('name').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var multiplier = document.getElementById('multiplier').value;
        var status = document.getElementById('status').value;
        var market = document.getElementById('exampleFormControlSelect1').value;
        await firebase.database().ref('clients/' + count).set({
            userID: username,
            name: name,
            password: password,
            multiplier: multiplier,
            status: status,
            marketCategory: market,
        });
        await firebase.database().ref().update({newClientId: count + 1});
        alert('Your changes have been saved')
        window.location.reload()
    });
}

function editClient(){
    var id = location.href.split('?')[1].split('=')[1];
    if(confirm('Are you sure you want to save changes for client '+ id + '?')){
        var name = document.getElementById('name1').value;
        var username = document.getElementById('username1').value;
        var password = document.getElementById('password1').value;
        var multiplier = document.getElementById('multiplier1').value;
        var status = document.getElementById('status1').value;
        var market = document.getElementById('exampleFormControlSelect11').value;
        firebase.database().ref('clients/' + id).set({
            userID: username,
            name: name,
            password: password,
            multiplier: multiplier,
            status: status,
            marketCategory: market,
        });

        alert('Configuration updated!')
        window.location.href = 'index.html'
    }
}

function displayClient(){
    var id = location.href.split('?')[1].split('=')[1];
    firebase.database().ref('clients/'+id).on('value', (snapshot) => {
        let data = snapshot.val();
        document.getElementById("name1").value = data.name;
        document.getElementById("username1").value = data.userID;
        document.getElementById("password1").value = data.password;
        document.getElementById("multiplier1").value = data.multiplier;
        document.getElementById("status1").value = data.status;
        document.getElementById("exampleFormControlSelect11").value = data.marketCategory;
    });
}
