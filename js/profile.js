const student = JSON.parse(localStorage.getItem("currentStudent"));

if (!student) {
    window.location.href = "../index.html"; 
}

document.querySelector(".profile__avatar-img").src = student.photo;
document.querySelector(".profile__name").textContent = student.fullName;
document.querySelector(".profile__faculty-name").textContent = student.faculty;
document.querySelector(".profile__program-name").textContent = student.program;
document.querySelector(".profile__id-num").textContent = student.studentNumber;
document.querySelector(".profile__wallet-coins").textContent = student.coins;



const table = document.querySelector(".achievements__table tbody");
table.innerHTML = "";

student.achievements.forEach(a => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${a.description}</td>
        <td>${a.category}</td>
        <td class="status ${a.status.toLowerCase()}">${a.status}</td>
        <td>${a.coins}</td>
    `;
    table.appendChild(tr);
});
document.addEventListener("DOMContentLoaded", () => {
    const tbody = document.querySelector(".achievements__table tbody");
    const achievements = JSON.parse(localStorage.getItem("achievements")) || [];

    tbody.innerHTML = ""; 

    achievements.forEach(ach => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${ach.description}</td>
            <td>${ach.category}${ach.subcategory ? " / " + ach.subcategory : ""}</td>
            <td class="status ${ach.status.toLowerCase()}">${ach.status}</td>
            <td>${ach.coins}</td>
        `;
        tbody.appendChild(tr);
    });
});


