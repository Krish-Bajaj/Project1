// Firebase coding
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB3d2d_FlGFk3dnRpBhUG1MJDltfBubw9Y",
    authDomain: "krish-b2b3c.firebaseapp.com",
    databaseURL: "https://krish-b2b3c.firebaseio.com",
    projectId: "krish-b2b3c",
    storageBucket: "krish-b2b3c.appspot.com",
    messagingSenderId: "801274066955",
    appId: "1:801274066955:web:c3efa2e1ad7688bb9daf0e",
    measurementId: "G-P65PKFHBHJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Making constants for authentication and database
  var auth = firebase.auth();
  var db = firebase.firestore();

  //Creating a database with name Task1
  var messagesRef = firebase.database().ref('Task1');

  // Keeping track of the users status
  auth.onAuthStateChanged(user => {
      if(user){
            //Getting the data from firebase from firestore
            db.collection('complaints').get().then(snapshot => {
            setupComplaints(snapshot.docs);
            setupUI(user);
        });
      }else {
          setupComplaints([]);
          setupUI();
      }
  })

  // SIGN UP

  // Listen for form submit(Need this so that whenever we press submit it does all the necessary actions)
  //contactForm is the form for the signup element
  document.getElementById('contactForm').addEventListener('submit',submitForm);

// Submit Form
function submitForm(e){
    e.preventDefault();

    var r_email = contactForm['r_email'].value;
    var r_pass = contactForm['r_password'].value;

    saveMessage(r_email,r_pass);

    // Show a alert(This code is for the green alert which pops up after clicking on the sign up button)
    document.querySelector('.r_alert').style.display = 'block';

    // hide alert after 3 seconds
    setTimeout(function(){
    document.querySelector('.r_alert').style.display = 'none';
    },2000);

    // Not sure but i think this is the part of authentication that is actually signing up a new user in real time with firebase
    auth.createUserWithEmailAndPassword(r_email,r_pass).then(cred =>      //asynchronous task
        {
             //console.log('Signed Up');
             // Clearing the form after clicking sign up
             document.getElementById('contactForm').reset();    
        });
}

// Not sure but i think this is the part which stores the info in the real time database
function saveMessage(r_email,r_pass){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
          Email : r_email,
          Password : r_pass
    });
}

// LOG IN

document.getElementById('loginForm').addEventListener('submit',submitLoginForm);

function submitLoginForm(e){
    e.preventDefault();

    var l_email = loginForm['l_email'].value;
    var l_pass = loginForm['l_password'].value;

    document.querySelector('.l_alert').style.display = 'block';
    setTimeout(function(){
        document.querySelector('.l_alert').style.display = 'none';
    },2000);

    auth.signInWithEmailAndPassword(l_email, l_pass).then(cred => 
        {
        //console.log('Logged In');   
        // Clearing the form after clicking logging in
         document.getElementById('loginForm').reset();
      });  
}

// LOG OUT

const logout = document.querySelector('#myBtn3');
  logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
    //console.log('user logged out');
  });

// CREATING A COMPLAINT

const createForm = document.querySelector('complaintForms');

document.getElementById('complaintForms').addEventListener('submit',complaintForm);

function complaintForm(e){
    e.preventDefault();

    var title = complaintForms['title'].value;
    var content = complaintForms['content'].value;

    db.collection('complaints').add({
        Title: title,
        Content: content
    }).then(() => {
        document.querySelector('.c_alert').style.display = 'block';
        setTimeout(function(){
            document.querySelector('.c_alert').style.display = 'none';
            },2000);
        document.getElementById('complaintForms').reset();
        console.log('no error??')
    })
// Video no.12 time 6:16 : Method he uses to clear the modal once he finishes using it
    
}