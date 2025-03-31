CREATE TABLE `sleep_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `age` int DEFAULT NULL,
  `bed_time` time DEFAULT NULL,
  `wake_time` time DEFAULT NULL,
  `awakenings` int DEFAULT NULL,
  `caffeine` int DEFAULT NULL,
  `alcohol` int DEFAULT NULL,
  `smoking` varchar(10) DEFAULT NULL,
  `exercise` int DEFAULT NULL,
  `REM_percentage` int DEFAULT NULL,
  `deep_sleep_percentage` int DEFAULT NULL,
  `sleep_efficiency` float DEFAULT NULL,
  PRIMARY KEY (`id`)
)
