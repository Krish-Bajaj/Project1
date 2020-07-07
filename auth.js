// Firebase coding
// Your web app's Firebase configuration

//THIS all u get from firebase till line 17
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

  // Making constants for authentication and database and functions
  // These are basically variables for the diff functions we import on line 139 of landing.html in that however i called everything
  var auth = firebase.auth();
  var db = firebase.firestore();
  var functions = firebase.functions();


  // add Admin Cloud Function
  // Coding for the admin part of the page
  const adminForms = document.querySelector('.adminForm');  //got a reference to the adminForm when u r an admin
  adminForms.addEventListener('submit', (e) => {  //line 29 and 30 is reqd to listen to a submit button 
      e.preventDefault();  //imp line
      const adminEmail = document.querySelector('#admin-email').value; //getting the email the admin enters
      const addAdminRole = functions.httpsCallable('addAdminRole');    //addAdminRole is a func we have defined in index.js
      addAdminRole({email: adminEmail}).then(result => {       // Didnt quite understand lines 32 33        ************************************
        console.log(result);
        document.querySelector('.adminForm').reset();           //resets the form
      });
  });

  //Creating a database with name Task1
  var messagesRef = firebase.database().ref('Task1');

  // Keeping track of the users status
  // Most important part
  auth.onAuthStateChanged(user => {              //onAuthStateChanged basically tells us if theres a user logged in or no when we opened that page
      if(user){  // same as if(user==true)
          //checking if an admin exists
          //extra line of codes which lets us know if the user which is logged in is an admin or no
          user.getIdTokenResult().then(idTokenResult => {
              user.admin = idTokenResult.claims.admin;
          })
          //Getting the data from firebase from firestore
          db.collection('complaints').onSnapshot(snapshot => {    //if its a user this code gets all the complaints and displays it 
          setupComplaints(snapshot.docs);                         //on the site which is actually done by the func setupUI()
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

    var r_email = contactForm['r_email'].value;      //storing the values we receive
    var r_pass = contactForm['r_password'].value;

    saveMessage(r_email,r_pass); // saves it in the database Task1 we created above

    // Not sure but i think this is the part of authentication that is actually signing up a new user in real time with firebase
    auth.createUserWithEmailAndPassword(r_email,r_pass).then(cred =>      //asynchronous task
        {
             //console.log('Signed Up');
             // Clearing the form after clicking sign up
             document.getElementById('contactForm').reset(); 
             contactForm.querySelector('.error').innerHTML = '';    //ask this line ******************************************************

             // Show a alert(This code is for the green alert which pops up after clicking on the sign up button)
            document.querySelector('.r_alert').style.display = 'block';

            // hide alert after 3 seconds
            setTimeout(function(){
            document.querySelector('.r_alert').style.display = 'none';
        },2000);
        //code for the error message which is displayed below
        }).catch(err => {
            contactForm.querySelector('.error').innerHTML = err.message;
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

    auth.signInWithEmailAndPassword(l_email, l_pass).then(cred => 
        {
        //console.log('Logged In');   
        document.querySelector('.l_alert').style.display = 'block';
    setTimeout(function(){
        document.querySelector('.l_alert').style.display = 'none';
    },2000);
        // Clearing the form after clicking logging in
         document.getElementById('loginForm').reset();
         loginForm.querySelector('.error').innerHTML = '';
         
      }).catch(err => {
          loginForm.querySelector('.error').innerHTML = err.message;
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

const createForm = document.querySelector('complaintForms');   // Dont think we need this line *******************************************

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
            },1000);
        document.getElementById('complaintForms').reset();
    })
// Video no.12 time 6:16 : Method he uses to clear the modal once he finishes using it
    
}