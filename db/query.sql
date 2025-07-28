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
