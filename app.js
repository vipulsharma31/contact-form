//Unique Firebase Object
var firebaseConfig = {
  apiKey: "AIzaSyCkHh5zeDWDoZisGgGM9dR-TJToiZ1vtJI",
  authDomain: "contact-form-5a79c.firebaseapp.com",
  databaseURL: "https://contact-form-5a79c-default-rtdb.firebaseio.com",
  projectId: "contact-form-5a79c",
  storageBucket: "contact-form-5a79c.appspot.com",
  messagingSenderId: "554980182488",
  appId: "1:554980182488:web:fc2604d549bfe117e4caad",
  measurementId: "G-CWJW19CLD7"

};

//Initialize Firebase
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

//Variable to access database collection
const db = firestore.collection("fomData");

//Get Submit Form
let submitButton = document.getElementById("submit");

//Create Event Listener To Allow Form Submission
submitButton.addEventListener("click", (e) => {
  //Prevent Default Form Submission Behavior
  e.preventDefault();

  //Get Form Values
  let firstName = document.getElementById("fname").value;
  let lastName = document.getElementById("lname").value;
  let country = document.getElementById("country").value;

  firestore
    .collection("fomData")
    .get()
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        const fn = doc.data().fname;
        if (firstName === fn) {
          console.log("Already Exists");
        }

        // console.log("data", doc.data().fname);
      });
    });
  //Save Form Data To Firebase
  db.doc()
    .set({
      fname: firstName,
      lname: lastName,
      country: country,
    })
    .then(() => { })
    .catch((error) => {
      console.log(error);
    });

  //alert
  alert("Your Form Has Been Submitted Successfully");

  //clear form after submission
  function clearForm() {
    document.getElementById("clearFrom").reset();
  }
  clearForm()
});