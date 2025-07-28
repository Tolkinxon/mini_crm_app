-- Active: 1749045156534@@127.0.0.1@3306@crm_database
CREATE DATABASE IF NOT EXISTS crm_database;

USE crm_database;

CREATE TABLE IF NOT EXISTS roles(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(250) NOT NULL,
    PRIMARY KEY(id)
);
insert INTO roles(name) VALUES 
('Admin'),
('Teacher'),
('Assistant'),
('Student');


CREATE TABLE IF NOT EXISTS users(
    id INT AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    username VARCHAR(250) NOT NULL,
    passsword VARCHAR(250) NOT NULL,
    contact VARCHAR(250) NOT NULL,
    state INT DEFAULT 1,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    Foreign Key (role_id) REFERENCES roles(id)
);
INSERT INTO users(first_name, last_name, username, passsword, contact, role_id) VALUES
('Ali', 'Qodirov', "nabi", "9999", '998999999999', 2),
('Vali', 'Mansurov', "vali", "9999", '998999999999', 3),
('Nabi', 'Jumayev', "nabi", "9999", '998999999999', 4),
("G'ani", 'Luqmonov', "gani", "9999", '998999999999', 4);
ALTER TABLE users ADD COLUMN gender INT NOT NULL default 1;



CREATE TABLE IF NOT EXISTS students(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
INSERT INTO students(user_id) VALUES (3), (4);

CREATE TABLE IF NOT EXISTS teachers(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
INSERT INTO teachers(user_id) VALUES (1);

CREATE TABLE IF NOT EXISTS assistants(
    id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);
INSERT INTO assistants(user_id) VALUES (2); 

CREATE TABLE IF NOT EXISTS groups_crm(
    id INT AUTO_INCREMENT NOT NULL,
    group_name VARCHAR(250) NOT NULL,
    teacher_id INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(teacher_id) REFERENCES teachers(id)
);
INSERT INTO groups_crm(group_name, teacher_id) VALUES ("NodeJs", 1); 

CREATE TABLE IF NOT EXISTS group_students(
    group_id INT NOT NULL,
    student_id INT NOT NULL,
    PRIMARY KEY(group_id, student_id),
    FOREIGN KEY(student_id) REFERENCES students(id)
);
INSERT INTO group_students(group_id, student_id) VALUES (1, 1), (1, 2); 

CREATE TABLE IF NOT EXISTS group_assistants(
    group_id INT NOT NULL,
    assistant_id INT NOT NULL,
    PRIMARY KEY(group_id, assistant_id),
    FOREIGN KEY(assistant_id) REFERENCES assistants(id)
);
INSERT INTO group_assistants(group_id, assistant_id) VALUES (1, 1);


CREATE TABLE IF NOT EXISTS scores(
    id INT AUTO_INCREMENT NOT NULL,
    student_id INT NOT NULL,
    group_id INT NOT NULL,
    teacher_id INT NOT NULL,
    score_desc TEXT NOT NULL,
    ball INT DEFAULT 0 NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(student_id) REFERENCES students(id),
    FOREIGN KEY(group_id) REFERENCES groups_crm(id),
    FOREIGN KEY(teacher_id) REFERENCES teachers(id)
);
INSERT INTO scores(student_id, teacher_id, group_id, ball, score_desc) VALUES
(1, 1, 1, 40, "Ko'proq o'qing!"),
(2, 1, 1, 87, "Zo'r");


-- GROUPS
SELECT g.id, g.group_name, CONCAT(u.first_name, ' ' , u.last_name) as teacher_full_name, t.id as teacher_id,
    CASE  
    WHEN u.gender=1 THEN 'erkak'
    ELSE 'ayol' END as teacher_gender, u.contact as teacher_contact, 
    u.username as teacher_username from groups_crm g 
    INNER JOIN teachers t ON t.id=g.teacher_id
    INNER JOIN users u ON u.id=t.user_id;



-- STUDENTS
SELECT 
    CONCAT(u.first_name, ' ', u.last_name) AS student_full_name,
    CASE  
        WHEN u.gender = 1 THEN 'erkak'
        ELSE 'ayol'
    END AS student_gender, 
    u.contact AS student_contact, 
    u.username AS student_username
FROM users u 
INNER JOIN students s ON s.user_id = u.id
INNER JOIN group_students gs ON gs.student_id = s.id
INNER JOIN groups_crm g ON g.id = gs.group_id
INNER JOIN teachers t ON t.id = g.teacher_id
WHERE u.role_id = 4  AND (1 > 0 AND t.id = 1) OR (1 > 0 AND g.id = 1);

