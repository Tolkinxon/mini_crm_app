export const getTeachers = async () => {
    let teachers = await fetch(`SELECT
    t.id as teacher_id,
    CONCAT(u.first_name, ' ', u.last_name) as teacher_full_name,
    u.contact as teacher_contact,
    CASE 
        WHEN u.gender = 1 THEN 'erkak'
        ELSE 'ayol' 
    END as teacher_gender
    from users u 
    INNER JOIN teachers t ON t.user_id=u.id`);
    let table = {
        'full name': teachers.map(teacher => ({type: "link", text: teacher.teacher_full_name, href: `/students?teacherId=${teacher.teacher_id}`})),
        'contact': teachers.map(teacher => ({type: "link", text: teacher.teacher_contact, href: `tel:+${teacher.teacher_contact}`})),
        'gender': teachers.map(teacher => ({type: "text", text: teacher.teacher_gender})),
        'groups': teachers.map(teacher => ({type: "link", text: 'groups', href: `/groups?teacherId=${teacher.teacher_id}`}))
    };
    if(teachers){
        return {
            title: `Ustoz: ${teachers[0].teacher_full_name}`,
            links,
            html: "table.ejs",
            data: {table}
        }
    }
}