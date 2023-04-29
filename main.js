//Load employee data from local storage if exists or initialize with empty array.
let empData = JSON.parse(localStorage.getItem('empData')) ?JSON.parse(localStorage.getItem('empData')): [];
//Get the form element and add a submit event listener.
const form = document.getElementById("inp_form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    var name = form.elements['nm'].value;
    var email = form.elements['email'].value;
    var cont = form.elements['num'].value;
    let x, y, z = false;
    if (name === "" && email === "" && cont === "") {
        alert("Fill out the form");
    }
    else {
        x = validName(name);
        if (x) {
            y = validEmail(email);
        }
        if (y) {
            if (cont != "") {
                z = validContact(cont);
            }
        }
        if (x && y) {
            if (z) {
                store(name, email, cont);
            }
            else {
                store(name, email, "NA");
            }
        }
    }
})
//Name validation function
function validName(name) {
    if (name != "" && /^[A-Za-z\s]*$/.test(name) &&
        /[A-Za-z]/.test(name) && name.length > 2) {
        return true;
    }
    else {
        alert("Enter the valid name having letters,spaces and length greater than 2");
        return false;
    }
}
//Email validation function
function validEmail(email) {
    if (email != "" && /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/.test(email)) {
        return true;
    }
    else {
        alert("Enter the valid E-mail");
        return false;
    }
}
//contact validation function
function validContact(cont) {
    if (/^\d{10}$/.test(cont)) {
        return true;
    }
    else {
        alert("Enter the valid 10 digit phone number");
        return false;
    }
}
//Function to store the data from the form in local storage
function store(name, email, cont) {
    d = {
        "name": name,
        "email": email,
        "phone": cont
    }
    empData.push(d);
    localStorage.setItem("empData", JSON.stringify(empData));
    form.elements['nm'].value = "";
    form.elements['email'].value = "";
    form.elements['num'].value = "";
    display();
}
//function to display data in the table
function display() {
    empData = JSON.parse(localStorage.getItem("empData"));
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";
    empData.forEach((item, index) => {
        console.log(item);
        const trow = document.createElement("tr");
        const tdName = document.createElement("td");
        const cell1 = document.createTextNode(item.name);
        tdName.appendChild(cell1);
        const tdEmail = document.createElement("td");
        const cell2 = document.createTextNode(item.email);
        tdEmail.appendChild(cell2);
        const tdPhone = document.createElement("td");
        const cell3 = document.createTextNode(item.phone);
        tdPhone.appendChild(cell3);
        trow.appendChild(tdName);
        trow.appendChild(tdEmail);
        trow.appendChild(tdPhone);
        tbody.appendChild(trow);
    })
}
//To display the data if exist
if (JSON.parse(localStorage.getItem("empData"))) {
    //console.log(data)
    display();
}
//to clear local storage
function rem(){ 
    //clears the entire localStorage
    localStorage.clear();
    window.location.reload();
}
