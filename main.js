// All the coding part relating to the modal parts of the 5 Elements of the navbar
// Get the modal
var modal1 = document.getElementById("myModal1");

// Get the button that opens the modal
var btn1 = document.getElementById("myBtn1");

// Get the <span> element that closes the modal
var span1 = document.getElementsByClassName("close1")[0];

// When the user clicks on the button, open the modal
btn1.onclick = function() {
modal1.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span1.onclick = function() {
modal1.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal1) {
    modal1.style.display = "none";
}
}

var modal2 = document.getElementById("myModal2");

// Get the button that opens the modal
var btn2 = document.getElementById("myBtn2");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close2")[0];

// When the user clicks on the button, open the modal
btn2.onclick = function() {
modal2.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
modal2.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
if (event.target == modal2) {
    modal2.style.display = "none";
}
}

// var modal3 = document.getElementById("myModal3");
// var btn3 = document.getElementById("myBtn3");
// var span3 = document.getElementsByClassName("close3")[0];
// btn3.onclick = function() {
// modal3.style.display = "block";
// }
// span3.onclick = function() {
// modal3.style.display = "none";
// }
// window.onclick = function(event) {
// if (event.target == modal3) {
//     modal3.style.display = "none";
// }
// }

var modal4 = document.getElementById("myModal4");
var btn4 = document.getElementById("myBtn4");
var span4 = document.getElementsByClassName("close4")[0];
btn4.onclick = function() {
modal4.style.display = "block";
}
span4.onclick = function() {
modal4.style.display = "none";
}
window.onclick = function(event) {
if (event.target == modal4) {
    modal4.style.display = "none";
}
}

var modal5 = document.getElementById("myModal5");
var btn5 = document.getElementById("myBtn5");
var span5 = document.getElementsByClassName("close5")[0];
btn5.onclick = function() {
modal5.style.display = "block";
}
span5.onclick = function() {
modal5.style.display = "none";
}
window.onclick = function(event) {
if (event.target == modal5) {
    modal5.style.display = "none";
}
}

// function Login(){
//     var vis = "loginForm";
//     document.getElementById('modal-content1').style.visibility = "hidden";
// }

// Code for the info in the complaints
const complaintList = document.querySelector('.complaints');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.modal-content5');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if(user){
        if(user.admin){
            adminItems.forEach(item => item.style.display = 'block');
        }
        const html = `
        <div><h2>Account Information</h2></div><br>
        <div>Logged in as ${user.email}</div> <br>
        <div>${user.admin ? 'Admin' : ''}</div>
        `;
        accountDetails.innerHTML = html;
        // Blocked means those elements will be shown
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }else {
        accountDetails.innerHTML = '';

        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        adminItems.forEach(item => item.style.display = 'none');
    }
}


// setup complaints
const setupComplaints = (data) => {
    if (data.length) {
    let html = '';
    data.forEach(doc => {
        const guide = doc.data();
        // creating a template string called li
        const li = `
        <li>
            <div class="panel-heading">
            <h3 class="panel-title">${guide.Title}</h3>
            </div>
            <div class="panel-body">${guide.Content}
            </div>
        </li>
        `;
        html += li;
    })
    complaintList.innerHTML = html;
    }else {
        complaintList.innerHTML = '<br><h4 class = "center-align">Login to view Complaints!</h4>'
    }
}



