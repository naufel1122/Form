const firebaseConfig = {
    apiKey: "AIzaSyAvMlGgfn2eqD6ZFtwiUkXYZ8fCPTFXJ0Y",
    authDomain: "contactform-e25a9.firebaseapp.com",
    databaseURL: "https://contactform-e25a9-default-rtdb.firebaseio.com",
    projectId: "contactform-e25a9",
    storageBucket: "contactform-e25a9.appspot.com",
    messagingSenderId: "482383108431",
    appId: "1:482383108431:web:0e2c7262e3c24f8bee8d3a"
};

firebase.initializeApp(firebaseConfig);

const ContactFormDB = firebase.database().ref('ContactForm');

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    var name = getElementVal("name");
    var emailid = getElementVal("emailid");
    var msgContent = getElementVal("msgContent");

    saveMessages(name, emailid, msgContent);



    if (name.length > 4) {
        document.querySelector('.alert').style.display = "block";

        setTimeout(() => {
            document.querySelector('.alert').style.display = "none";
        }, 3000)

        document.getElementById("contactForm").reset()

    } else {
        document.querySelector('.alerts').style.display = "block";

        setTimeout(() => {
            document.querySelector('.alerts').style.display = "none";
        }, 3000)

    }
}

const saveMessages = (name, emailid, msgContent) => {
    var newContactForm = ContactFormDB.push();
    newContactForm.set({
        name: name,
        emailid: emailid,
        msgContent: msgContent,
    })
}

const getElementVal = (id) => {
    return document.getElementById(id).value
}