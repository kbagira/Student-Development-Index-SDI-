const categories = {
    hackathon: ["1st Place", "2nd Place", "3rd Place", "Winner", "Participation", "Others"],
    awards: ["1st Place", "2nd Place", "3rd Place", "Winner", "Participation Certificate", "Others"],
    volunteering: ["Community Service", "Environmental Clean-up", "Event Support", "Others"],
    exchange: ["Exchange Program", "Dual Degree Program", "Others"],
    event: ["Organization", "Speech / Presentation", "Participant", "Others"],
    sports: ["Football", "Basketball", "Swimming", "Others"],
    conference: ["International", "National", "Local", "Others"],
    patent: ["Patent Granted", "Patent Filed", "Others"],
    project: ["Research Project", "Team Project", "Independent Project", "Others"],
    competition: ["Others"]
};


function fillFormFromProfile() {
    const currentStudent = JSON.parse(localStorage.getItem("currentStudent"));
    if (!currentStudent) {
        window.location.href = "../index.html";
        return;
    }

    document.getElementById("fullname").value = currentStudent.fullName || "";
    document.getElementById("faculty").value = currentStudent.faculty || "";
    document.getElementById("program").value = currentStudent.program || "";
    document.getElementById("studentId").value = currentStudent.studentNumber || "";
}


function setupCategorySelect() {
    const categorySelect = document.getElementById("category");
    const subcategorySelect = document.getElementById("subcategory");

    const otherInput = document.createElement("input");
    otherInput.type = "text";
    otherInput.id = "otherSubcategory";
    otherInput.className = "achivement__input";
    otherInput.placeholder = "Specify other subcategory";
    otherInput.style.display = "none";
    otherInput.required = false;
    subcategorySelect.parentNode.appendChild(otherInput);

    categorySelect.addEventListener("change", () => {
        const selectedCat = categorySelect.value;
        const subs = categories[selectedCat] || [];
        subcategorySelect.innerHTML = `<option value="" disabled selected>Select subcategory</option>`;
        subs.forEach(sub => {
            const option = document.createElement("option");
            option.value = sub;
            option.textContent = sub;
            subcategorySelect.appendChild(option);
        });
        otherInput.style.display = "none";
        otherInput.required = false;
    });

    subcategorySelect.addEventListener("change", () => {
        if (subcategorySelect.value === "Others") {
            otherInput.style.display = "block";
            otherInput.required = true;
        } else {
            otherInput.style.display = "none";
            otherInput.required = false;
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
    fillFormFromProfile();
    setupCategorySelect();

    const form = document.querySelector(".achivement__form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const students = JSON.parse(localStorage.getItem("students")) || [];
        let currentStudent = JSON.parse(localStorage.getItem("currentStudent"));

        const category = document.getElementById("category").value;
        let subcategory = document.getElementById("subcategory").value;
        if (subcategory === "Others") {
            subcategory = document.getElementById("otherSubcategory").value.trim();
        }

        const description = document.getElementById("description").value;

        const newAch = {
            description,
            category,
            subcategory,
            status: "Pending",
            coins: 0
        };

        currentStudent.achievements.push(newAch);

        const index = students.findIndex(s => s.studentNumber === currentStudent.studentNumber);
        if (index > -1) {
            students[index] = currentStudent;
        }

        localStorage.setItem("students", JSON.stringify(students));
        localStorage.setItem("currentStudent", JSON.stringify(currentStudent));

        alert("Achievement added successfully!");
        window.location.href = "./profile.html"; 
    });
});

