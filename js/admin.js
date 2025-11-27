document.addEventListener("DOMContentLoaded", loadRequests);

/* =======================
      LOAD REQUESTS
======================= */
function loadRequests() {
    fetch("http://localhost:3000/api/requests")
        .then(response => response.json())
        .then(data => renderRequests(data))
        .catch(err => console.error("Fetch error:", err));
}

function renderRequests(requests) {
    const tableBody = document.getElementById("requests-table");
    tableBody.innerHTML = "";

    requests.forEach(req => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${req.order_num}</td>
            <td>${req.student_id}</td>
            <td>${req.student_name}</td>
            <td>${req.student_group}</td>
            <td>${req.activity}</td>
            <td>${req.coins}</td>
        `;

        // 👉 твой рабочий клик — НЕ ТРОГАЛ
        row.onclick = () => openRequestBox(req);

        tableBody.appendChild(row);
    });
}


/* =======================
      MODAL WINDOW
======================= */

function openRequestBox(req) {
    const modal = document.getElementById("modal-bg");
    modal.classList.remove("hidden"); // show

    document.querySelector(".student-name").textContent = req.student_name;
    document.querySelector(".id").textContent = req.student_id;
    document.querySelector(".group").textContent = req.student_group;
    document.querySelector(".activity").textContent = req.activity;
    document.querySelector(".coins").textContent = req.coins;

    const link = document.querySelector(".pinned-link");
    if (req.pinned_link) {
        link.textContent = req.pinned_link;
        link.href = req.pinned_link;
    } else {
        link.textContent = "No link";
        link.removeAttribute("href");
    }
}

function closeRequestBox() {
    document.getElementById("modal-bg").classList.add("hidden");
}

// Закрытие при клике вне бокса
document.getElementById("modal-bg").addEventListener("click", function(e) {
    const box = document.getElementById("request-box");
    if (!box.contains(e.target)) {
        closeRequestBox();
    }
});
