import { links } from "../config.js";
import { fetchQuery } from "../lib/connection.js";

// export const groups = async () => {
//     let groups = await fetchQuery(`SELECT g.id, g.group_name, CONCAT(u.first_name, ' ' , u.last_name) as teacher_full_name, t.id as teacher_id,
//     CASE  
//     WHEN u.gender=1 THEN 'erkak'
//     ELSE 'ayol' END as teacher_gender, u.contact as teacher_contact, 
//     u.username as teacher_username from groups_crm g 
//     INNER JOIN teachers t ON t.id=g.teacher_id
//     INNER JOIN users u ON u.id=t.user_id;`);    
//     let table = {
//         N: groups.length,
//         'group name': groups.map((group) => ({type: "link", text: group.group_name, href: `students?groupId=${group.id}&teacherId=${group.teacher_id}`})),
//         'teacher': groups.map((group) => ({type: "link", text: group.teacher_full_name, href: `groups?teacherId=${group.teacher_id}`})),
//         'contact': groups.map((group) => ({type: "text", text: group.teacher_contact})),
//         'username': groups.map((group) => ({type: "text", text: group.teacher_username})),
//         'gender': groups.map((group) => ({type: "text", text: group.teacher_gender})),
//     };
//     return {
//         route_name: 'Groups', 
//         links,
//         html: "table.ejs",
//         data: {table}
//     }
// }

export const groups = async (studentId = 0, teacherId=0) => {
    let whereCondition = [];
    let params = [];
    if(studentId){
        whereCondition.push(`gs.student_id=?`);
        params.push(studentId)
    };
    if(teacherId){
        whereCondition.push(`t.id=?`);
        params.push(teacherId)
    }
    let whereClause = whereCondition.length ? "WHERE  " + whereCondition.join(" AND "): '';
    let groups = await fetchQuery(`SELECT 
    g.id, 
    g.group_name, 
    CONCAT(u.first_name, ' ', u.last_name) AS teacher_full_name,
    CASE  
        WHEN u.gender = 1 THEN 'erkak'
        ELSE 'ayol'
    END AS teacher_gender, 
    u.contact AS teacher_contact, 
    u.username AS teacher_username, 
    t.id AS teacher_id,
    COUNT(gs.student_id) AS student_count
FROM groups_crm g 
INNER JOIN teachers t ON t.id = g.teacher_id
INNER JOIN users u ON u.id = t.user_id
INNER JOIN group_students gs ON gs.group_id = g.id
${whereClause}
GROUP BY 
    g.id, 
    g.group_name, 
    u.first_name, 
    u.last_name, 
    u.gender, 
    u.contact, 
    u.username, 
    t.id;`, false, ...params);    
    let table = {
        N: groups.length,
        'group name': groups.map((group) => ({type: "link", text: group.group_name, href: `students?groupId=${group.id}&teacherId=${group.teacher_id}`})),
        'teacher': groups.map((group) => ({type: "link", text: group.teacher_full_name, href: `groups?teacherId=${group.teacher_id}`})),
        'assistants': groups.map((group) => ({type: "link", text: 'assistentlar', href: `assistants?groupId=${group.id}`})),
        "o'quvchilar": groups.map((group) => ({type: "text", text: group.student_count}))
    };
    let student;
    if(studentId){
        student = await fetchQuery(`SELECT CONCAT(u.first_name, ' ' , u.last_name) as student_full_name
        from users u 
        INNER JOIN students s ON s.user_id=u.id WHERE u.role=4  AND s.id=?;`, true, studentId);
    }
    let title;
    if(studentId){
        title = `${student.student_full_name} guruhlari`
    };
    if(teacherId && groups){
        title = `Ustoz ${groups[0].teacher_full_name} guruhlari`
    }
    return {
        links,
        route_name: 'Groups', 
        html: "table.ejs",
        data: {table}
    }
}
