function openTab(evt, name) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(name).style.display = "block";
    evt.currentTarget.className += " active";
}

async function postEmployee(){
    const name = document.getElementById("employee-name");
    const hours = document.getElementById("employee-hours");
    const valuePerHours = document.getElementById("employee-value-hours");
    if(name.value && hours.value && valuePerHours.value) {
        const response = await fetch("http://localhost:8080/register", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                hours: parseInt(hours.value, 10),
                valuePerHour: parseFloat(valuePerHours.value),
            }),
        });
        const message = await response.json();
        console.log(message);
        if(response.status === 201) {
            alert("Cadastro feito com successo")
        } else {
            alert(message.mensage);
        }
    }
}

async function postEmployeeOutSourced(){
    const name = document.getElementById("employee-outSourced-name");
    const hours = document.getElementById("employee-outSourced-hours");
    const valuePerHours = document.getElementById("employee-outSourced-value-hours");
    const additionalCharge = document.getElementById("employee-outSourced-additional-charge");
    if(name.value && hours.value && valuePerHours.value && additionalCharge.value) {
        const response = await fetch("http://localhost:8080/register/outSourced", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name.value,
                hours: parseInt(hours.value, 10),
                valuePerHour: parseFloat(valuePerHours.value),
                additionalCharge: parseFloat(additionalCharge.value),
            }),
        });
        const message = await response.json();
        if(response.status === 201) {
            alert("Cadastro feito com successo")
        } else {
            alert(message.mensage);
        }
    }
}

async function getEmployee(){
    const tbody = document.getElementById("tbody");

    const response = await fetch("http://localhost:8080/listAll");
    const data= await response.json();
    console.log(data);
    for(emp of data) {
        const tr = tbody.insertRow();

        const tdId = tr.insertCell();
        tdId.innerText = emp.id;

        const tdNome = tr.insertCell();
        tdNome.innerText = emp.name;

        const tdHoras = tr.insertCell();
        tdHoras.innerText = emp.hours;
        
        const tdvaluePerHour = tr.insertCell();
        tdvaluePerHour.innerText = emp.valuePerHour;

        const tdAdditionalCharge = tr.insertCell();
        tdAdditionalCharge.innerText = emp.additionalCharge || "";
    }
}