document.querySelector(".login__form").addEventListener("submit", function () {
    const studentNumber = document.getElementById("studentNumber").value.trim();
    const password = document.getElementById("password").value.trim();

    const students = JSON.parse(localStorage.getItem("students")) || [];

    const found = students.find(
        s => s.studentNumber === studentNumber && s.password === password
    );

    if (!found) {
        alert("Incorrect student number or password");
        return;
    }
    localStorage.setItem("currentStudent", JSON.stringify(found));

    window.location.href = "./pages/profile.html";
});

