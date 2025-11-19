
const categories = {
    hackathon: ["1st Place", "2nd Place", "3rd Place", "Winner", "Participation"],
    awards: ["1st Place", "2nd Place", "3rd Place", "Winner",  "Participation Certificate"],
    volunteering: ["Community Service", "Environmental Clean-up", "Event Support"],
    exchange: ["Exchange Program", "Dual Degree Program"],
    event: ["Organization", "Speech / Presentation", "Participant"],
    sports: ["Football", "Basketball", "Swimming", "others"],
    conference: ["International", "National", "Local"],
    patent: ["Patent Granted", "Patent Filed"],
    project: ["Research Project", "Team Project", "Independent Project"],
    competition: []
};


function fillFormFromProfile() {
    const currentStudent = JSON.parse(localStorage.getItem("currentStudent"));

    if (currentStudent) {
        document.getElementById("fullname").value = currentStudent.fullName || "";
        document.getElementById("faculty").value = currentStudent.faculty || "";
        document.getElementById("program").value = currentStudent.program || "";
        document.getElementById("studentId").value = currentStudent.studentNumber || "";
    }
}

window.addEventListener("DOMContentLoaded", fillFormFromProfile);


document.getElementById("category").addEventListener("change", function () {
    const selectedCategory = this.value;
    const subcatSelect = document.getElementById("subcategory");


    subcatSelect.innerHTML = `<option value="">Select subcategory</option>`;

    if (categories[selectedCategory]) {
        categories[selectedCategory].forEach(sub => {
            const option = document.createElement("option");
            option.value = sub;
            option.textContent = sub;
            subcatSelect.appendChild(option);
        });
    }
});


document.querySelector(".achivement__form").addEventListener("submit", function (e) {
    e.preventDefault();

    const fullName = document.getElementById("fullname").value;
    const faculty = document.getElementById("faculty").value;
    const program = document.getElementById("program").value;
    const studentId = document.getElementById("studentId").value;
    const category = document.getElementById("category").value;
    const subcategory = document.getElementById("subcategory").value;
    const description = document.getElementById("description").value;
    const proof = document.querySelector('input[type="url"]').value;

    const requestId = Math.floor(Math.random() * 900000) + 100000;

    const newAchievement = {
        fullName,
        faculty,
        program,
        studentId,
        category,
        subcategory,
        description,
        proof,
        status: "Pending",
        coins: 0,
        requestId
    };


    let achievements = JSON.parse(localStorage.getItem("achievements")) || [];
    achievements.push(newAchievement);
    localStorage.setItem("achievements", JSON.stringify(achievements));

    alert(`Your achievement request has been submitted.\nRequest ID: ${requestId}`);
    window.location.href = "./profile.html";
});

