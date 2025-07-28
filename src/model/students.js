import { links } from "../config.js";
import { fetchQuery } from "../lib/connection.js";

// export const students = async (teacherId = 0, groupId = 0) => {
//     let students = await fetch(`SELECT 
//     CONCAT(u.first_name, ' ', u.last_name) AS student_full_name,
//     CASE  
//         WHEN u.gender = 1 THEN 'erkak'
//         ELSE 'ayol'
//     END AS student_gender, 
//     u.contact AS student_contact, 
//     u.username AS student_username
// FROM users u 
// INNER JOIN students s ON s.user_id = u.id
// INNER JOIN group_students gs ON gs.student_id = s.id
// INNER JOIN groups_crm g ON g.id = gs.group_id
// INNER JOIN teachers t ON t.id = g.teacher_id
// WHERE u.role_id = 4  AND (? > 0 AND t.id = ?) OR (? > 0 AND g.id = ?);`, false, teacherId, teacherId, groupId, groupId);
//         let table = {
//         "student name": students.map((student) => ({type: "link", text: student.student_full_name, href: `/groups?studentId=${student.id}`})),
//         'contact': students.map((student) => ({type: "link", text: student.student_contact, href: `tel:+${student.student_contact}`})),
//     };
//     return {
//         route_name: `Talabalar`,
//         links,
//         html: "table.ejs",
//         data:{table}
//     }
// }

export const students = async (teacherId = 0, groupId = 0) => {
    let whereClause = 'WHERE u.role_id = 4';
    const params = [];

    if (teacherId > 0) {
        whereClause += ' AND t.id = ?';
        params.push(teacherId);
    }

    if (groupId > 0) {
        whereClause += ' AND g.id = ?';
        params.push(groupId);
    }

    const query = `
              SELECT 
        g.group_name,
            s.id,
            CONCAT(u.first_name, ' ', u.last_name) AS student_full_name,
            CASE  
                WHEN u.gender = 1 THEN 'erkak'
                ELSE 'ayol'
            END AS student_gender, 
            u.contact AS student_contact, 
            u.username AS student_username,
            SUM(sc.ball) as student_ball
        FROM users u 
        INNER JOIN students s ON s.user_id = u.id
        INNER JOIN group_students gs ON gs.student_id = s.id
        INNER JOIN groups_crm g ON g.id = gs.group_id
        INNER JOIN teachers t ON t.id = g.teacher_id
        INNER JOIN scores sc ON sc.student_id=s.id
        ${whereClause}
        GROUP BY g.group_name,
    s.id,
    u.first_name,
    u.last_name,
    u.gender,
    u.contact,
    u.username;
    `;

    const students = await fetchQuery(query, false, ...params);
    let teacher;
    if(teacherId){
        teacher = await fetchQuery(`SELECT 
        CONCAT(u.first_name, ' ', u.last_name) as teacher_full_name
        FROM groups_crm g 
        INNER JOIN teachers t ON t.id = g.teacher_id
        INNER JOIN users u ON u.id = t.user_id 
        WHERE t.id=?`, true, teacherId)
    }

    let table = {
        N: students.length,
        "student name": students.map((student) => ({type: "link", text: student.student_full_name, href: `groups?studentId=${student.id}`})),
        'contact': students.map((student) => ({type: "link", text: student.student_contact, href: `tel:+${student.student_contact}`})),
        'groups': students.map(student => ({type: "link", text: student.group_name, href: `groups?studentId=${student.id}`})),
        'username': students.map(student => ({type: "text", text: student.student_username})),
        'gender': students.map(student => ({type: "text", text: student.student_gender})),
        'balls': students.map(student => ({type: "text", text: student.student_ball}))
    };
    return {
        links,
        route_name: `Talabalar`,
        extra_info: teacherId ? (await teacher.teacher_full_name) + "ning o'quvchilari" : '',
        html: "table.ejs",
        data:{table}
    }
}