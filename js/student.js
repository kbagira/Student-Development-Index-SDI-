// student.js — загружает студентов в таблицу

const tableBody = document.getElementById("students-table");
const searchInput = document.getElementById("search-input");

let students = []; // все студенты из бэка

// Загружаем студентов
async function loadStudents() {
    try {
        const res = await fetch("http://localhost:3000/api/students");
        students = await res.json();
        applyFilters(); // загрузили — применяем фильтры + поиск
    } catch (err) {
        console.error("Ошибка загрузки студентов:", err);
    }
}

function renderStudents(list) {
    tableBody.innerHTML = "";

    list.forEach((s, index) => {
        const tr = document.createElement("tr");
        tr.onclick = () => {
            window.location.href = "../pages/profile.html?id=" + s.student_id;
        };

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${s.university_id}</td>
            <td>${s.first_name} ${s.last_name}</td>
            <td>${s.faculty}</td>
            <td>${s.group_name}</td>
            <td>${s.enrollment_year}</td>
            <td>${s.total_coins}</td>
        `;

        tableBody.appendChild(tr);
    });
}

// Фильтрация + ПОИСК
function applyFilters() {
    const faculty = document.getElementById("filter-faculty").value;
    const group = document.getElementById("filter-group").value;
    const year = document.getElementById("filter-year").value;
    const search = searchInput.value.toLowerCase();

    let filtered = students;

    // --- фильтры ---
    if (faculty) filtered = filtered.filter(s => s.faculty === faculty);
    if (group) filtered = filtered.filter(s => s.group_name === group);
    if (year) filtered = filtered.filter(s => String(s.enrollment_year) === year);

    // --- 🔥 поиск по имени или ID ---
    // --- 🔥 Поиск по имени, фамилии и ID (любой частью текста) ---
    if (search.trim() !== "") {
        filtered = filtered.filter(s => {
            const fullName = (s.first_name + " " + s.last_name).toLowerCase();
            const first = s.first_name.toLowerCase();
            const last = s.last_name.toLowerCase();
            const id = s.university_id.toLowerCase();

            return (
                fullName.includes(search) ||  // ищет в полном ФИО
                first.includes(search) ||     // ищет в имени
                last.includes(search) ||      // ищет в фамилии
                id.includes(search)           // ищет в ID
            );
        });
    }


    renderStudents(filtered);
}

// События
document.getElementById("filter-faculty").addEventListener("change", applyFilters);
document.getElementById("filter-group").addEventListener("change", applyFilters);
document.getElementById("filter-year").addEventListener("change", applyFilters);

// 🔥 Событие поиска
searchInput.addEventListener("input", applyFilters);

// Загружаем список при открытии страницы
loadStudents();
