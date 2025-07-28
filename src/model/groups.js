export const groups = async () => {
    let groups = await fetch(`SELECT g.id, g.group_name, CONCAT(u.first_name, ' ' , u.last_name) as teacher_full_name,
    CASE  
    WHEN u.gender=1 THEN 'erkak'
    ELSE 'ayol' END as teacher_gender, u.contact as teacher_contact, 
    u.username as teacher_username from \`groups\` g 
    INNER JOIN teachers t ON t.id=g.teacher_id
    INNER JOIN users u ON u.id=t.user_id`);    
    let table = {
        'group name': groups.map((group) => ({type: "link", text: group.group_name, href: `/students?groupId=${group.id}`})),
    };
    return {
        links,
        html: "table.ejs",
        data: {table}
    }
}