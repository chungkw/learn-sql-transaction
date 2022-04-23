CREATE DATABASE IF NOT EXISTS `test_sql_transaction`;
USE `test_sql_transaction`;

CREATE TABLE `user` (
    `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(255) NOT NULL UNIQUE,
    `description` VARCHAR(255) NOT NULL
);
