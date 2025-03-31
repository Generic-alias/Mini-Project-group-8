create database mini;
use mini;
CREATE TABLE `diet_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(1024) DEFAULT NULL,
  `serving_in_g` bigint DEFAULT NULL,
  `calories` bigint DEFAULT NULL,
  `protein` bigint DEFAULT NULL,
  `cholesterol` bigint DEFAULT NULL,
  `carbohydrate` bigint DEFAULT NULL,
  `total_fat` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
)