import { links } from "../config.js";
import { fetchQuery } from "../lib/connection.js";

export const groups = async () => {
    let groups = await fetchQuery(`SELECT g.id, g.group_name, CONCAT(u.first_name, ' ' , u.last_name) as teacher_full_name, t.id as teacher_id,
    CASE  
    WHEN u.gender=1 THEN 'erkak'
    ELSE 'ayol' END as teacher_gender, u.contact as teacher_contact, 
    u.username as teacher_username from groups_crm g 
    INNER JOIN teachers t ON t.id=g.teacher_id
    INNER JOIN users u ON u.id=t.user_id;`);    
    let table = {
        N: groups.length,
        'group name': groups.map((group) => ({type: "link", text: group.group_name, href: `students?groupId=${group.id}&teacherId=${group.teacher_id}`})),
        'teacher': groups.map((group) => ({type: "link", text: group.teacher_full_name, href: `groups?teacherId=${group.teacher_id}`})),
        'contact': groups.map((group) => ({type: "text", text: group.teacher_contact})),
        'username': groups.map((group) => ({type: "text", text: group.teacher_username})),
        'gender': groups.map((group) => ({type: "text", text: group.teacher_gender})),
    };
    return {
        route_name: 'Groups', 
        links,
        html: "table.ejs",
        data: {table}
    }
}