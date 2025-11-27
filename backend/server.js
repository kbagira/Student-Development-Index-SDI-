const express = require("express");
const cors = require("cors");
const pool = require("./db"); // подключаем db.js

const app = express();
app.use(cors());
app.use(express.json());

// API: получить список студентов
app.get("/api/students", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                s.student_id,
                s.university_id,
                s.first_name,
                s.last_name,
                s.faculty,
                s.group_name,
                s.enrollment_year,
                COALESCE(w.score, 0) AS total_coins
            FROM students s
            LEFT JOIN wallets w ON s.student_id = w.student_id
            ORDER BY w.score DESC NULLS LAST
        `);

        res.json(result.rows);
    } catch (err) {
        console.error("Ошибка:", err);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));



// Admin list 
app.get('/api/requests', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                tr.request_id AS order_num,
                s.university_id AS student_id,
                CONCAT(s.first_name, ' ', s.last_name) AS student_name,
                s.group_name AS student_group,
                t.category AS activity,
                t.score AS coins
            FROM task_requests tr
            JOIN students s ON tr.student_id = s.student_id
            JOIN tasks t ON tr.task_id = t.task_id
            ORDER BY tr.request_id ASC;
        `);

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});


