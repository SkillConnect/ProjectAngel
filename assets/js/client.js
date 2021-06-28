function addClient(){
    firebase.database().ref('newClientId').once('value', async (snapshot) => {
        let count = snapshot.val();
        var name = document.getElementById('name').value;
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        var password2 = document.getElementById('password2').value;
        var multiplier = document.getElementById('multiplier').value;
        var status = document.getElementById('status').value;
        category = ["NSE", "NFO", "BSE", "MCX"]
        var market = ""
        for( i=0; i<category.length; i++) {
            var check = document.getElementById(category[i]);
            if (check.checked == true) {
                market += category[i];
                market += ", "
            }
        }
        market = market.slice(0,-2)
        // console.log("market", market)
        if ((password == password2) && password2!="") {
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
        }
        else {
            alert("Password Doesn't Match! OR Password Can't be Empty");
        }
        
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
        // var market = document.getElementById('exampleFormControlSelect11').value;
        category = ["NSE", "NFO", "BSE", "MCX"]
        market = ""
        for( i=0; i<category.length; i++) {
            var check = document.getElementById(category[i]);
            if (check.checked == true) {
                market += category[i];
                market += ", "
            }
        }
        market = market.slice(0,-2)
        // console.log("market", market)
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
        // document.getElementById("exampleFormControlSelect11").value = data.marketCategory;

    });
}
// market = []
// function myFunction(type) {
  // Get the checkbox
  // var checkBox = document.getElementById("NSE");
  // Get the output text
  // var text = document.getElementById("text");

  // If the checkbox is checked, display the output text
  // if (checkBox.checked == true){
      // market += type.value
      // market += ', '
    // console.log("changing market", market)
    // text.style.display = "block";
  // } 
// }
