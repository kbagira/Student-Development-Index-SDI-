document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login__form");
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const studentNumber = document.getElementById("studentNumber").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!studentNumber || !password) {
            alert("Please enter your login and password");
            return;
        }

        const students = JSON.parse(localStorage.getItem("students")) || [];

        const user = students.find(s =>
            s.studentNumber === studentNumber && s.password === password
        );

        if (!user) {
            alert("Incorrect student number or password");
            return;
        }

        localStorage.setItem("currentStudent", JSON.stringify(user));
        window.location.href = "./pages/profile.html";
    });
});


