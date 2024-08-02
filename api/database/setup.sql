DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(100) NOT NULL,
    content VARCHAR(500) NOT NULL,
    user_id INT,
    post_timestamp DATE NOT NULL,
    category VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (post_id),
    FOREIGN KEY (user_id) REFERENCES user_account(user_id)
);


INSERT INTO user_account (username, password) VALUES
('user1', 'password1'),
('user2', 'password2'),
('user3', 'password3');


INSERT INTO post (title, content, user_id, post_timestamp, category) VALUES
('Cutie', 'Today I saw a big cutie, I am smitten', 1, '2024-08-01', 'Personal'),
('Big Fight', 'I had a fight with Pedro today, I will never forgive him', 2, '2024-08-02', 'Personal'),
('Interview', 'Today I aced my Interview and got the job!', 1, '2024-08-01', 'Career'),
('Train', 'I missed my train today, what a bummer', 3, '2024-08-01', 'Daily Life');