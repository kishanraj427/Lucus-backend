-- =============================================
-- Create users table
-- =============================================
-- This script creates a `users` table with standard fields for managing user accounts.
--
-- Table: users
-- Columns:
--   id            - INT, Primary Key, Auto-incrementing unique identifier for each user.
--   name          - VARCHAR(255), The full name of the user. Cannot be null.
--   email         - VARCHAR(255), The user's email address. Must be unique and cannot be null.
--   password      - VARCHAR(255), Stores the hashed password. Cannot be null.
--   phone         - VARCHAR(20), The user's phone number. Optional field.
--   last_login_at - DATETIME, Timestamp of the user's last login. Null if the user has never logged in.
--   is_active     - BOOLEAN, A flag to indicate if the account is active (1) or disabled (0). Defaults to true.
--   created_at    - TIMESTAMP, Automatically set to the current timestamp when a user is created.
--   updated_at    - TIMESTAMP, Automatically updates to the current timestamp whenever the record is modified.
--
CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `last_login_at` DATETIME NULL,
  `is_active` BOOLEAN NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
