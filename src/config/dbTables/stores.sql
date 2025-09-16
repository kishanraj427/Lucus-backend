-- =============================================
-- Create stores table
-- =============================================
-- This script creates a `stores` table with fields for managing rental stores.
--
-- Table: stores
-- Columns:
--   id            - INT, Primary Key, Auto-incrementing unique identifier for each store.
--   name          - VARCHAR(255), The name of the store. Cannot be null.
--   description   - TEXT, Detailed description of the store. Cannot be null.
--   imageUrl      - VARCHAR(512), URL to the store's image. Optional field.
--   address       - VARCHAR(512), Physical address of the store. Cannot be null.
--   latitude      - DECIMAL(10, 8), Geographic latitude coordinate of the store location.
--   longitude     - DECIMAL(11, 8), Geographic longitude coordinate of the store location.
--   pricePerDay   - DECIMAL(10, 2), Rental price per day. Cannot be null.
--   rating        - DECIMAL(2, 1), Store rating from 0.0 to 5.0. Cannot be null.
--   is_active     - BOOLEAN, A flag to indicate if the store is active (1) or disabled (0). Defaults to true.
--   created_at    - TIMESTAMP, Automatically set to the current timestamp when a record is created.
--   updated_at    - TIMESTAMP, Automatically updates to the current timestamp whenever the record is modified.
--
CREATE TABLE IF NOT EXISTS `stores` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `imageUrl` VARCHAR(512) NULL,
  `address` VARCHAR(512) NOT NULL,
  `latitude` DECIMAL(10, 8) NOT NULL,
  `longitude` DECIMAL(11, 8) NOT NULL,
  `pricePerDay` DECIMAL(10, 2) NOT NULL,
  `rating` DECIMAL(2, 1) NOT NULL DEFAULT 0.0,
  `is_active` BOOLEAN NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;