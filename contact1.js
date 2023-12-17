let name = document.getElementById("name");
let Email = document.getElementById("email");
let Phone = document.getElementById("phone");
let Company = document.getElementById("company");
let Message = document.getElementById("message");
let sendbutton = document.getElementById("sendbutton");


let popupbox = document.getElementById("popupbox");
let popuph1 = document.getElementById("popuph1");
let popuph2 = document.getElementById("popuph2");
let popuphp = document.getElementById("popuphp");
let closeit = document.getElementById("closeit");

sendbutton.addEventListener('click',(e)=> {
    e.preventDefault();
    fetch("https://traveller-jt36.onrender.com/comments",{
        method:"POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({
            Name : name.value,
            Email : Email.value,
            Phone : Phone.value,
            Company : Company.value,
            Message : Message.value
        })
    })
    if(name.value) {
        popuph1.textContent = "Thanks for your feedback.";
        popupbox.style.visibility = "visible";
    } else {
        popuph1.textContent = "Please fill all the fields to give feedback";
        popupbox.style.visibility = "visible";
    }
    
    
})

closeit.addEventListener('click',(e)=> {
    popupbox.style.visibility = "hidden"
})