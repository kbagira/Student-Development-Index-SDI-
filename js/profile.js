function loadCurrentStudent() {
    const student = JSON.parse(localStorage.getItem("currentStudent"));
    if (!student) return window.location.href = "../index.html";

    document.querySelector(".profile__header-name").textContent = student.fullName;
    document.querySelector(".profile__avatar-img").src = student.photo || "../img/stud_photo.jpeg";
    document.querySelector(".profile__name").textContent = student.fullName;
    document.querySelector(".profile__faculty-name").textContent = student.faculty;
    document.querySelector(".profile__program-name").textContent = student.program;
    document.querySelector(".profile__id-num").textContent = student.studentNumber;
    document.querySelector(".profile__wallet-coins").textContent = student.coins;

    const tableBody = document.querySelector(".achievements__table tbody");
    tableBody.innerHTML = "";

    (student.achievements || []).forEach(a => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${a.description}</td>
            <td>${a.category}${a.subcategory ? " / " + a.subcategory : ""}</td>
            <td class="status ${a.status.toLowerCase()}">${a.status}</td>
            <td>${a.coins}</td>
        `;
        tableBody.appendChild(tr);
    });
}

window.addEventListener("DOMContentLoaded", loadCurrentStudent);

document.querySelector(".achievements__btn").addEventListener("click", () => {
    window.location.href = "./achievement.html";
});
