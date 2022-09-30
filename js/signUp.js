const url = "https://api-paymen.herokuapp.com";

async function signUp() {
    const name = document.getElementById("signUp-name");
    const email = document.getElementById("signUp-email");
    const password = document.getElementById("signUp-password");
    const repeatPassword = document.getElementById("signUp-repeat-password");
    if(name.value && email.value && password.value && repeatPassword.value) {
        if(password.value === repeatPassword.value) {
            const response = await fetch(`${url}/user/register`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                mode: "cors",
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                }),
            });
            console.log(response)
            const message = await response.json();
            if(response.status === 201) {
                window.location.href = "../pages/employee.html";
            } else {
                alert(message.mensage);
            }
        } else {
            alert("Senhas diferentes");
        }
    }
}
