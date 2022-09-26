async function login() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    if(email.value && password.value) {
        const response = await fetch("http://localhost:8080/user/login", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: email.value, password: password.value}),
        });

        if(response.status == 200) {
            window.location.href = "../pages/employee.html"
        }
    }
}