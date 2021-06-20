// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyDrNCCRVkU9g5ZR10qPNGqPHoC0K9evjCc',
  authDomain: 'projectangel-1cd7f.firebaseapp.com',
  projectId: 'projectangel-1cd7f',
  databaseURL: 'https://projectangel-1cd7f-default-rtdb.firebaseio.com/',
  storageBucket: 'projectangel-1cd7f.appspot.com',
  messagingSenderId: '677738651351',
  appId: '1:677738651351:web:f4fe164e48d110940dda92'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

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

function login(){
    document.getElementById('submitBtn').innerHTML = 'Logging In...'
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        window.location.href = 'index.html';
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(`${errorMessage} ${errorCode}`);
        window.location.reload()
      });
    return false
}

function signout(){
  firebase.auth().signOut().then(() => {
    window.location.href = 'login.html'
  })
}
