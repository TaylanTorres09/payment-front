async function signUp() {
    const name = document.getElementById("signUp-name");
    const email = document.getElementById("signUp-email");
    const password = document.getElementById("signUp-password");
    const repeatPassword = document.getElementById("signUp-repeat-password");
    if(name.value && email.value && password.value && repeatPassword.value) {
        if(password.value === repeatPassword.value) {
            const response = await fetch("http://localhost:8080/user/register", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    password: password.value,
                }),
            });
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
