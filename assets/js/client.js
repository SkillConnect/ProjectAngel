
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
    if(confirm('Delete client '+ id + '?' )){
        firebase.database().ref('clients/'+ id).remove();
        location.reload();
    }
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
    }
}

function displayClient(){
    var id = location.href.split('?')[1].split('=')[1];
    console.log(id)
    firebase.database().ref('clients/'+id).on('value', (snapshot) => {
        let data=snapshot.val();
        console.log(data.name)
        console.log(data.userID)
        console.log(data.password)
        console.log(data.multiplier)
        console.log(data.status)
        console.log(data.marketCategory)
        document.getElementById("name1").value = data.name;
        document.getElementById("username1").value = data.userID;
        document.getElementById("password1").value = data.password;
        document.getElementById("multiplier1").value = data.multiplier;
        document.getElementById("status1").value = data.status;
        document.getElementById("exampleFormControlSelect11").value = data.marketCategory;
    });
}