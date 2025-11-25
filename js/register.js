document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login__form");

    if (!localStorage.getItem("students")) {
        const students = [];
        localStorage.setItem("students", JSON.stringify(students));
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const studentNumber = document.getElementById("studentNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!email.endsWith("@alatoo.edu.kg")) {
            alert("You must use your university email (@alatoo.edu.kg)");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const students = JSON.parse(localStorage.getItem("students")) || [];
        const exists = students.find(s => s.studentNumber === studentNumber);

        if (exists) {
            alert("A student with this number already exists");
            return;
        }

        const newStudent = {
            studentNumber,
            email,
            password,
            fullName: "",    
            faculty: "",
            program: "",
            coins: 0,
            achievements: [],
            photo: "../img/stud_photo.jpeg"
        };

        students.push(newStudent);
        localStorage.setItem("students", JSON.stringify(students));

        localStorage.setItem("currentStudent", JSON.stringify(newStudent));

        alert("Registration successful!");
        window.location.href = "../pages/profile.html";
    });
});
