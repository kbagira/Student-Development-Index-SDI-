if (!localStorage.getItem("students")) {

    const students = [
        {
            studentNumber: "123456",
            password: "1111",
            fullName: "Aiday A.",
            faculty: "Engineering and Informatics",
            program: "Computer Science",
            email: "aiday@alatoo.edu.kg",
            coins: 120,
            photo: "../img/stud_photo.jpeg",
            achievements: [
                {
                    description: "Environmental clean-up",
                    category: "Volunteering",
                    subcategory: "Event Support",
                    status: "Approved",
                    coins: 20
                },
                {
                    description: "Robotics competition",
                    category: "Competition",
                    status: "Pending",
                    coins: 0
                }
            ]
        },
        {
            studentNumber: "654321",
            password: "2222",
            fullName: "Nursultan A.",
            faculty: "Business Administration",
            program: "Management",
            profile: "International Management",
            email: "nursultan@alatoo.edu.kg",
            coins: 75,
            photo: "./img/stud_photo.jpeg",
            achievements: [
                {
                    description: "Marketing workshop",
                    category: "Event",
                    status: "Approved",
                    coins: 10
                }
            ]
        }
    ];

    localStorage.setItem("students", JSON.stringify(students));
}

