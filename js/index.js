const url = "https://api-paymen.herokuapp.com";

async function login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    if(email.value && password.value) {
        const response = await fetch(`${url}/user/login`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email.value, password: password.value}),
        });
        const message = await response.text();
        if(response.status === 200) {
            window.location.href = "pages/employee.html";
        } else {
            const msg = message.split(":")[1].replace("}", "");
            alert(msg);
        }
    }
}