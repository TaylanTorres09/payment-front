let setStateId, setStateUpdate = false;

async function openTab(name) {
    // Declare all variables
    var i, tabcontent;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    document.getElementById(name).style.display = "block";

    if(name === "table") {
        const data = await getSalary();
        await getEmployee(data);
    }
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
    await cleanForm(name, hours, valuePerHours);
}

async function updateEmployee(id){
    const name = document.getElementById("employee-outSourced-name");
    const hours = document.getElementById("employee-outSourced-hours");
    const valuePerHours = document.getElementById("employee-outSourced-value-hours");

    if(id && name.value && hours.value && valuePerHours.value) {
        const response = await fetch("http://localhost:8080/update", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: parseInt(id, 10),
                name: name.value,
                hours: parseInt(hours.value, 10),
                valuePerHour: parseFloat(valuePerHours.value),
            }),
        });
        const message = await response.json();
        if(response.status === 200) {
            alert("Atualização feita com successo")
        } else {
            alert(message.mensage);
        }
    }
    await cleanForm(name, hours, valuePerHours, additionalCharge);
    setStateUpdate = false;
    document.getElementById("employee-button").innerHTML = "Cadastre-se";
}

async function postOrUpdateEmployee() {
    if(setStateUpdate === true) {
        await updateEmployee(setStateId);
    } else {
        await postEmployee();
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
    await cleanForm(name, hours, valuePerHours, additionalCharge);
}

async function updateEmployeeOutSourced(id){
    const name = document.getElementById("employee-outSourced-name");
    const hours = document.getElementById("employee-outSourced-hours");
    const valuePerHours = document.getElementById("employee-outSourced-value-hours");
    const additionalCharge = document.getElementById("employee-outSourced-additional-charge");

    if(id && name.value && hours.value && valuePerHours.value && additionalCharge.value) {
        const response = await fetch("http://localhost:8080/update/outSourced", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: parseInt(id, 10),
                name: name.value,
                hours: parseInt(hours.value, 10),
                valuePerHour: parseFloat(valuePerHours.value),
                additionalCharge: parseFloat(additionalCharge.value),
            }),
        });
        const message = await response.json();
        if(response.status === 200) {
            alert("Atualização feita com successo")
        } else {
            alert(message.mensage);
        }
    }
    await cleanForm(name, hours, valuePerHours, additionalCharge);
    setStateUpdate = false;
    document.getElementById("employee-OutSourcedButon").innerHTML = "Cadastre-se";
}

async function postOrUpdateEmployeeOutSourced() {
    if(setStateUpdate === true) {
        await updateEmployeeOutSourced(setStateId);
    } else {
        await postEmployeeOutSourced();
    }
}

async function cleanForm(name, hours, valuePerHours, additionalCharge) {
    name.value = "";
    hours.value = "";
    valuePerHours.value = "";
    if(additionalCharge)
        additionalCharge.value = "";
    const data = await getSalary();
    await getEmployee(data);
}

async function getSalary() {
    const response = await fetch("http://localhost:8080/salary");
    const data = await response.json();
    return data;
}

async function getEmployee(data) {
    const tbody = document.getElementById("tbody");
    tbody.innerHTML = "";

    if(data) {
        for(emp of data) {
            const tr = tbody.insertRow();
    
            const tdId = tr.insertCell();
            tdId.innerText = emp.id;
    
            const tdNome = tr.insertCell();
            tdNome.innerText = emp.name;
    
            const tdHoras = tr.insertCell();
            tdHoras.innerText = emp.hours;
            
            const tdvaluePerHour = tr.insertCell();
            tdvaluePerHour.innerText = parseFloat(emp.valuePerHour).toFixed(2);
    
            const tdAdditionalCharge = tr.insertCell();
            tdAdditionalCharge.innerText = emp.additionalCharge ? parseFloat(emp.additionalCharge).toFixed(2) : "";
    
            const tdSalary = tr.insertCell();
            tdSalary.innerText = parseFloat(emp.salary).toFixed(2);
    
            const tdAcoes = tr.insertCell();
            const imgEdit = document.createElement("img");
            imgEdit.src = "../img/edit_icon.svg";
            imgEdit.style.cursor = "pointer";
            imgEdit.setAttribute("onclick", "setValuesEmployeesChangeTab("+ JSON.stringify(emp) +")");
    
            const imgDelete = document.createElement("img");
            imgDelete.src = "../img/remove_icon.svg";
            imgDelete.width = 20
            imgDelete.style.cursor = "pointer";
            imgDelete.setAttribute("onclick", "deleted("+ emp.id +")");
    
            tdAcoes.appendChild(imgEdit);
            tdAcoes.appendChild(imgDelete);
        }
    }
}

async function deleted(id) {
    if(confirm("Deseja deletar os dados do funcionário de id: " + id)) {
        const remove = await fetch(`http://localhost:8080/remove/${id}`,{
            method: "DELETE"
        });
        const { mensage } = await remove.json();
    
        const response = await fetch("http://localhost:8080/salary");
        const data = await response.json();
    
        const elementPos = data.map(x => x.id).indexOf(id);
    
        const tbody = document.getElementById("tbody");
        tbody.deleteRow(elementPos);
    
        alert(mensage);
    }
}

async function setValuesEmployeesChangeTab(emp) {
    let tab = "";
    if (emp.additionalCharge) {
        tab = "employee-outSourced";
        openTab(tab);
        const additionalCharge = document.getElementById("employee-outSourced-additional-charge");
        additionalCharge.value = emp.additionalCharge;
    } else {
        tab = "employee";
        openTab("employee");
    }

    const name = document.getElementById(`${tab}-name`);
    name.value = emp.name;

    const hours = document.getElementById(`${tab}-hours`);
    hours.value = emp.hours;

    const valuePerHours = document.getElementById(`${tab}-value-hours`);
    valuePerHours.value = emp.valuePerHour;

    tab=="employee" 
    ? document.getElementById("employee-button").innerHTML = "Atualizar"
    : document.getElementById("employee-OutSourcedButon").innerHTML = "Atualizar";

    setStateId = emp.id;
    setStateUpdate = true;
    
}