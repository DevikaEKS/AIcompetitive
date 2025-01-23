-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: competitive_lms
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity`
--

DROP TABLE IF EXISTS `activity`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity` (
  `activityid` int NOT NULL AUTO_INCREMENT,
  `pageid` int NOT NULL,
  `context_id` int NOT NULL,
  `restricted_access` text,
  `available_from` datetime DEFAULT NULL,
  `available_until` datetime DEFAULT NULL,
  `completion_criteria` text,
  `group_mode` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`activityid`),
  KEY `fk_context` (`context_id`),
  KEY `fk_page` (`pageid`),
  CONSTRAINT `fk_context` FOREIGN KEY (`context_id`) REFERENCES `context` (`context_id`),
  CONSTRAINT `fk_page` FOREIGN KEY (`pageid`) REFERENCES `pages` (`pageid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity`
--

LOCK TABLES `activity` WRITE;
/*!40000 ALTER TABLE `activity` DISABLE KEYS */;
/*!40000 ALTER TABLE `activity` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `auth_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `has_paid` tinyint(1) DEFAULT '0',
  `company_id` int DEFAULT NULL,
  `certificate_id` int DEFAULT NULL,
  PRIMARY KEY (`auth_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_auth_role` (`role_id`),
  KEY `fk_auth_user` (`user_id`),
  CONSTRAINT `fk_auth_role` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `fk_auth_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (23,'siva.v@kgisl.microcollege.in','$2b$10$GZQxG3Lxs13Yo0ICdEPVSejtw3oiWawSrSl5RpZKFWH/2KDjbFdii',4,'2024-11-19 10:15:01',29,0,NULL,2),(24,'devika.eks@kggeniuslabs.com','$2b$10$znQ9OTlNEDwtOoBAhTxtjOCat..q8bf8HEFCELOXLtLhr9Pqrd4Q6',4,'2024-11-27 04:16:07',30,0,NULL,1),(26,'johnpaul.j@kggeniuslabs.com','$2b$10$7Gd94UM8p2q7.YpBZblayuMQeMa4NH3DOA0LT1fA23xdp56936s3K',4,'2024-11-27 07:18:47',32,0,NULL,2),(27,'instructor@gmail.com','$2b$10$suMpfgaAWdt6o64twoHpAeCWS9DjUrQ5cKdwXpEkW5H76GYFkKnXS',2,'2024-11-29 11:27:13',33,0,NULL,1);
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business_register`
--

DROP TABLE IF EXISTS `business_register`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `business_register` (
  `company_id` int NOT NULL AUTO_INCREMENT,
  `company_name` varchar(255) NOT NULL,
  `company_email_id` varchar(255) NOT NULL,
  `country` varchar(100) NOT NULL,
  `zipcode` varchar(10) NOT NULL,
  `company_phone_number` varchar(20) NOT NULL,
  `spoc_name` varchar(255) NOT NULL,
  `spoc_email_id` varchar(255) NOT NULL,
  `spoc_phone_number` varchar(20) NOT NULL,
  `company_size` int NOT NULL,
  `company_type` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `context_id` int DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business_register`
--

LOCK TABLES `business_register` WRITE;
/*!40000 ALTER TABLE `business_register` DISABLE KEYS */;
/*!40000 ALTER TABLE `business_register` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `checkout_details`
--

DROP TABLE IF EXISTS `checkout_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `checkout_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `transaction_id` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` text,
  `quantity` int NOT NULL,
  `pay_date` datetime NOT NULL,
  `pay_status` enum('pending','completed','failed') NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `checkout_details`
--

LOCK TABLES `checkout_details` WRITE;
/*!40000 ALTER TABLE `checkout_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `checkout_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `context`
--

DROP TABLE IF EXISTS `context`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `context` (
  `context_id` int NOT NULL AUTO_INCREMENT,
  `contextlevel` int DEFAULT NULL,
  `instanceid` int DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `depth` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`context_id`),
  KEY `fk_contextlevel` (`contextlevel`),
  CONSTRAINT `fk_contextlevel` FOREIGN KEY (`contextlevel`) REFERENCES `context_level_description` (`contextlevel`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `context`
--

LOCK TABLES `context` WRITE;
/*!40000 ALTER TABLE `context` DISABLE KEYS */;
INSERT INTO `context` VALUES (100,3,5,'2/5',NULL,'2024-11-14 05:34:28'),(101,5,21,'2/5','0/1','2024-11-14 05:35:27'),(102,8,1,'2/5/21','0/1','2024-11-14 07:45:54'),(104,8,3,'2/5/21','0/2','2024-11-14 07:52:55'),(105,3,6,'3/6',NULL,'2024-11-14 08:01:06'),(106,5,22,'3/6','0/1','2024-11-14 08:02:19'),(107,8,4,'3/6/22','0/1','2024-11-14 08:04:47'),(108,5,23,'2/5','0/2','2024-11-18 06:11:37'),(109,8,5,'2/5/23','0/1','2024-11-18 06:11:58'),(110,2,29,NULL,NULL,'2024-11-19 10:15:02'),(111,2,30,NULL,NULL,'2024-11-27 04:16:07'),(112,2,31,NULL,NULL,'2024-11-27 07:14:47'),(113,2,32,NULL,NULL,'2024-11-27 07:18:47'),(114,3,7,'4/7',NULL,'2024-11-27 11:00:17'),(115,3,8,'4/8',NULL,'2024-11-27 11:02:18'),(116,3,9,'6/9',NULL,'2024-11-27 11:26:04'),(117,2,33,NULL,NULL,'2024-11-29 11:27:13');
/*!40000 ALTER TABLE `context` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `context_level_description`
--

DROP TABLE IF EXISTS `context_level_description`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `context_level_description` (
  `contextlevel` int NOT NULL AUTO_INCREMENT,
  `contextlevel_desc` varchar(255) NOT NULL,
  PRIMARY KEY (`contextlevel`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `context_level_description`
--

LOCK TABLES `context_level_description` WRITE;
/*!40000 ALTER TABLE `context_level_description` DISABLE KEYS */;
INSERT INTO `context_level_description` VALUES (1,'student'),(2,'user'),(3,'course'),(4,'quiz'),(5,'module'),(6,'course_content'),(7,'company'),(8,'submodule');
/*!40000 ALTER TABLE `context_level_description` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_category`
--

DROP TABLE IF EXISTS `course_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_category` (
  `course_category_id` int NOT NULL AUTO_INCREMENT,
  `course_category_name` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `certificate_id` int DEFAULT NULL,
  PRIMARY KEY (`course_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_category`
--

LOCK TABLES `course_category` WRITE;
/*!40000 ALTER TABLE `course_category` DISABLE KEYS */;
INSERT INTO `course_category` VALUES (2,'TNPSC',NULL,NULL),(3,'UPSC',NULL,NULL),(4,'Google Cloud','/uploads/categoryImage-1732704454504-431862453.png',2),(6,'Azure Cloud','/uploads/categoryImage-1732706674167-997571844.png',2);
/*!40000 ALTER TABLE `course_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_difficulty_level`
--

DROP TABLE IF EXISTS `course_difficulty_level`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `course_difficulty_level` (
  `difficulty_level_id` int NOT NULL AUTO_INCREMENT,
  `difficulty_level_name` varchar(255) NOT NULL,
  PRIMARY KEY (`difficulty_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_difficulty_level`
--

LOCK TABLES `course_difficulty_level` WRITE;
/*!40000 ALTER TABLE `course_difficulty_level` DISABLE KEYS */;
/*!40000 ALTER TABLE `course_difficulty_level` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `courseid` int NOT NULL AUTO_INCREMENT,
  `coursename` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `course_short_name` varchar(255) DEFAULT NULL,
  `course_category_id` int DEFAULT NULL,
  `course_start_date` date DEFAULT NULL,
  `course_end_date` date DEFAULT NULL,
  `course_image` varchar(255) DEFAULT 'default_image.jpg',
  `course_desc` text,
  `course_creator_id` int DEFAULT NULL,
  `difficulty_level_id` int DEFAULT NULL,
  PRIMARY KEY (`courseid`),
  KEY `fk_course_category` (`course_category_id`),
  KEY `fk_difficulty_level` (`difficulty_level_id`),
  CONSTRAINT `fk_course_category` FOREIGN KEY (`course_category_id`) REFERENCES `course_category` (`course_category_id`),
  CONSTRAINT `fk_difficulty_level` FOREIGN KEY (`difficulty_level_id`) REFERENCES `course_difficulty_level` (`difficulty_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (5,'Railways','2024-11-14 05:34:28','group1',2,'2024-11-14','2024-11-30','\\uploads\\courseImage-1731562468107-602539038.jpg','Group 1 exam',NULL,NULL),(6,'IAS','2024-11-14 08:01:06','upsc',3,'2024-11-14','2024-11-30','\\uploads\\courseImage-1731571266268-274770380.jpg','UPSC Exam Test',NULL,NULL),(7,'Google Associate Cloud Engineer','2024-11-27 11:00:17','cloud engineer',4,'2024-11-27','2024-11-30','\\uploads\\courseImage-1732705217627-181638665.png','Google Associate Cloud Engineer ',NULL,NULL),(8,'Google Professional Cloud Architect','2024-11-27 11:02:18','cloud architect',4,'2024-11-28','2024-11-30','\\uploads\\courseImage-1732705338541-600817074.png','Google Professional Cloud Architect',NULL,NULL),(9,'Microsoft Azure Fundamentals','2024-11-27 11:26:04','Azure',6,'2024-11-20','2024-11-28','\\uploads\\courseImage-1732706764310-85363402.png','Microsoft Azure Fundamentals',NULL,NULL);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dept_id` int NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(100) NOT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invite_learners`
--

DROP TABLE IF EXISTS `invite_learners`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `invite_learners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `remainder` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invite_learners`
--

LOCK TABLES `invite_learners` WRITE;
/*!40000 ALTER TABLE `invite_learners` DISABLE KEYS */;
/*!40000 ALTER TABLE `invite_learners` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `license`
--

DROP TABLE IF EXISTS `license`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `license` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `license` int DEFAULT '0',
  `invite` int DEFAULT '0',
  `enrolled` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `license`
--

LOCK TABLES `license` WRITE;
/*!40000 ALTER TABLE `license` DISABLE KEYS */;
/*!40000 ALTER TABLE `license` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_options`
--

DROP TABLE IF EXISTS `match_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subquestion_id` int DEFAULT NULL,
  `option_text` text NOT NULL,
  `is_correct` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `subquestion_id` (`subquestion_id`),
  CONSTRAINT `match_options_ibfk_1` FOREIGN KEY (`subquestion_id`) REFERENCES `match_subquestions` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_options`
--

LOCK TABLES `match_options` WRITE;
/*!40000 ALTER TABLE `match_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `match_subquestions`
--

DROP TABLE IF EXISTS `match_subquestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `match_subquestions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quiz_text_id` int DEFAULT NULL,
  `subquestion_text` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `quiz_text_id` (`quiz_text_id`),
  CONSTRAINT `match_subquestions_ibfk_1` FOREIGN KEY (`quiz_text_id`) REFERENCES `quiz_text` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `match_subquestions`
--

LOCK TABLES `match_subquestions` WRITE;
/*!40000 ALTER TABLE `match_subquestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `match_subquestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `moduleid` int NOT NULL AUTO_INCREMENT,
  `modulename` varchar(255) NOT NULL,
  `version` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `courseid` int DEFAULT NULL,
  `module_image` varchar(255) DEFAULT NULL,
  `module_enable` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`moduleid`),
  UNIQUE KEY `moduleid` (`moduleid`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (21,'Aptitude',NULL,'2024-11-14 05:35:27',5,'\\uploads\\moduleImage-1731656665944-57602827.jpg',1),(22,'Reasoning',NULL,'2024-11-14 08:02:19',6,'\\uploads\\moduleImage-1731571339712-430629744.png',1),(23,'Verbal and Reasoning',NULL,'2024-11-18 06:11:37',5,'\\uploads\\moduleImage-1731910297234-782210422.png',1);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offlinetransaction`
--

DROP TABLE IF EXISTS `offlinetransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offlinetransaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `company_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `checkno` varchar(100) DEFAULT NULL,
  `transaction_id` varchar(100) DEFAULT NULL,
  `quantity` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` char(1) NOT NULL,
  `approved` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offlinetransaction`
--

LOCK TABLES `offlinetransaction` WRITE;
/*!40000 ALTER TABLE `offlinetransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `offlinetransaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `pageid` int NOT NULL AUTO_INCREMENT,
  `courseid` int NOT NULL,
  `moduleid` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  `page_content` mediumtext NOT NULL,
  `context_id` int DEFAULT NULL,
  `activity_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pageid`),
  KEY `courseid` (`courseid`),
  KEY `pages_ibfk_2_idx` (`moduleid`),
  KEY `moduleid_idx` (`moduleid`),
  KEY `fk_pages_context` (`context_id`),
  CONSTRAINT `fk_pages_context` FOREIGN KEY (`context_id`) REFERENCES `context` (`context_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `past_pappers_quiz_text`
--

DROP TABLE IF EXISTS `past_pappers_quiz_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `past_pappers_quiz_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `option` json NOT NULL,
  `correct_answer` text NOT NULL,
  `question_type` varchar(50) NOT NULL,
  `year` int NOT NULL,
  `month` varchar(20) NOT NULL,
  `difficulty_level` tinyint NOT NULL,
  `courseid` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `past_pappers_quiz_text`
--

LOCK TABLES `past_pappers_quiz_text` WRITE;
/*!40000 ALTER TABLE `past_pappers_quiz_text` DISABLE KEYS */;
/*!40000 ALTER TABLE `past_pappers_quiz_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `practice_quiz_text`
--

DROP TABLE IF EXISTS `practice_quiz_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practice_quiz_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `correct_answer` text NOT NULL,
  `option` json NOT NULL,
  `question_type` varchar(50) NOT NULL,
  `courseid` int NOT NULL,
  `difficulty_level` tinyint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `practice_quiz_text_chk_1` CHECK ((`difficulty_level` between 1 and 3))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `practice_quiz_text`
--

LOCK TABLES `practice_quiz_text` WRITE;
/*!40000 ALTER TABLE `practice_quiz_text` DISABLE KEYS */;
/*!40000 ALTER TABLE `practice_quiz_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `practice_test`
--

DROP TABLE IF EXISTS `practice_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `practice_test` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `submodule_id` json NOT NULL,
  `difficulty_level` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `practice_test`
--

LOCK TABLES `practice_test` WRITE;
/*!40000 ALTER TABLE `practice_test` DISABLE KEYS */;
INSERT INTO `practice_test` VALUES (2,29,'[1, 3]',3,'2024-11-20 10:06:02','2024-11-21 07:36:21'),(3,29,'[1]',2,'2024-11-21 07:23:45','2024-11-21 07:23:45'),(4,29,'[3]',2,'2024-11-21 07:26:55','2024-11-21 07:26:55'),(5,29,'[1, 5]',2,'2024-11-21 08:34:00','2024-11-21 08:34:00'),(6,29,'[1]',2,'2024-11-21 10:08:16','2024-11-21 10:08:16'),(7,29,'[1, 3]',2,'2024-11-21 10:09:08','2024-11-21 10:09:08'),(8,29,'[1, 3]',2,'2024-11-21 10:23:49','2024-11-21 10:23:49'),(9,29,'[1, 3]',2,'2024-11-21 10:42:24','2024-11-21 10:42:24'),(10,29,'[1, 3]',2,'2024-11-22 04:08:13','2024-11-22 04:08:13'),(11,29,'[1, 3]',3,'2024-11-22 04:13:08','2024-11-22 04:13:08'),(12,29,'[1]',3,'2024-11-25 04:10:09','2024-11-25 04:10:09'),(13,29,'[1]',2,'2024-11-25 05:17:36','2024-11-25 05:17:36'),(14,29,'[3]',2,'2024-11-26 11:17:59','2024-11-26 11:17:59'),(15,29,'[3]',1,'2024-11-26 11:19:28','2024-11-26 11:19:28');
/*!40000 ALTER TABLE `practice_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz`
--

DROP TABLE IF EXISTS `quiz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz` (
  `quiz_id` int NOT NULL AUTO_INCREMENT,
  `courseid` int DEFAULT NULL,
  `moduleid` int DEFAULT NULL,
  `max_no_of_questions` int DEFAULT NULL,
  `question_ids` json DEFAULT NULL,
  `context_id` int DEFAULT NULL,
  `type_of_section` int DEFAULT NULL,
  `max_no_of_attempts` int DEFAULT NULL,
  `max_score` decimal(10,2) DEFAULT NULL,
  `max_grade` decimal(10,2) DEFAULT NULL,
  `pass_grade` decimal(10,2) DEFAULT NULL,
  `min_grade` decimal(10,2) DEFAULT NULL,
  `difficulty_level` varchar(50) DEFAULT NULL,
  `quiz_name` varchar(255) DEFAULT NULL,
  `quiz_type_id` int DEFAULT NULL,
  PRIMARY KEY (`quiz_id`),
  KEY `fk_quiz_context` (`context_id`),
  KEY `fk_quiz_course` (`courseid`),
  KEY `fk_quiz_module` (`moduleid`),
  KEY `fk_quiz_type` (`quiz_type_id`),
  CONSTRAINT `fk_quiz_context` FOREIGN KEY (`context_id`) REFERENCES `context` (`context_id`),
  CONSTRAINT `fk_quiz_course` FOREIGN KEY (`courseid`) REFERENCES `courses` (`courseid`),
  CONSTRAINT `fk_quiz_module` FOREIGN KEY (`moduleid`) REFERENCES `modules` (`moduleid`),
  CONSTRAINT `fk_quiz_type` FOREIGN KEY (`quiz_type_id`) REFERENCES `quiz_type` (`quiz_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz`
--

LOCK TABLES `quiz` WRITE;
/*!40000 ALTER TABLE `quiz` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_attempt`
--

DROP TABLE IF EXISTS `quiz_attempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_attempt` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `result` json NOT NULL,
  `attempt_count` int NOT NULL DEFAULT '0',
  `assessment_type` varchar(50) NOT NULL,
  `attempt_timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `score` int DEFAULT NULL,
  `moduleid` int DEFAULT NULL,
  `total_question` int DEFAULT NULL,
  `correct_question` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=251 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_attempt`
--

LOCK TABLES `quiz_attempt` WRITE;
/*!40000 ALTER TABLE `quiz_attempt` DISABLE KEYS */;
/*!40000 ALTER TABLE `quiz_attempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_text`
--

DROP TABLE IF EXISTS `quiz_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` longtext,
  `option` json NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `correct_answer` longtext,
  `question_type` enum('multiple_choice','descriptive','match','check') NOT NULL,
  `answer_format` text,
  `moduleid` int DEFAULT NULL,
  `courseid` int DEFAULT NULL,
  `check_data` json DEFAULT NULL,
  `feedback` json DEFAULT NULL,
  `submoduleid` int DEFAULT NULL,
  `difficulty_level` int NOT NULL DEFAULT '1',
  `created_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_quiztext_course` (`courseid`),
  KEY `fk_quiztext_module` (`moduleid`),
  CONSTRAINT `fk_quiztext_course` FOREIGN KEY (`courseid`) REFERENCES `courses` (`courseid`),
  CONSTRAINT `fk_quiztext_module` FOREIGN KEY (`moduleid`) REFERENCES `modules` (`moduleid`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_text`
--

LOCK TABLES `quiz_text` WRITE;
/*!40000 ALTER TABLE `quiz_text` DISABLE KEYS */;
INSERT INTO `quiz_text` VALUES (109,'<p>A train running at the speed of 60 km/hr crosses a pole in 9 seconds. What is the length of the train?</p><p><br></p>','[{\"option\": \"120 metres\", \"feedback\": \"\"}, {\"option\": \"180 metres\", \"feedback\": \"\"}, {\"option\": \"324 metres\", \"feedback\": \"\"}, {\"option\": \"150 metres\", \"feedback\": \"\"}]','2024-11-15 04:29:56','150 metres','multiple_choice',NULL,21,5,NULL,NULL,1,1,NULL),(110,'<p>The length of the bridge, which a train 130 metres long and travelling at 45 km/hr can cross in 30 seconds, is:</p>','[{\"option\": \"200m\", \"feedback\": \"\"}, {\"option\": \"225m\", \"feedback\": \"\"}, {\"option\": \"245m\", \"feedback\": \"\"}, {\"option\": \"250m\", \"feedback\": \"\"}]','2024-11-15 07:24:38','245m','multiple_choice',NULL,21,5,NULL,NULL,1,1,NULL),(111,'<div class=\"bix-td-qtxt table-responsive w-100\">A\r\n train passes a station platform in 36 seconds and a man standing on the\r\n platform in 20 seconds. If the speed of the train is 54 km/hr, what is \r\nthe length of the platform?\r\n</div>','[{\"option\": \"120 m\", \"feedback\": \"\"}, {\"option\": \"240 m\", \"feedback\": \"\"}, {\"option\": \"300 m\", \"feedback\": \"\"}, {\"option\": \"None of these\", \"feedback\": \"\"}]','2024-11-15 07:27:09','240 m','multiple_choice',NULL,21,5,NULL,NULL,1,1,NULL),(113,'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?','[{\"option\": \"65 sec\", \"feedback\": \"\"}, {\"option\": \"89 sec\", \"feedback\": \"\"}, {\"option\": \"100 sec\", \"feedback\": \"\"}, {\"option\": \"150 sec\", \"feedback\": \"\"}]','2024-11-15 10:14:49','89 sec','multiple_choice',NULL,21,5,NULL,NULL,1,1,NULL),(114,'<p>A boat can travel with a speed of 13 km/hr in still water. If the speed \r\nof the stream is 4 km/hr, find the time taken by the boat to go 68 km \r\ndownstream.</p>','[{\"option\": \"2 hours\", \"feedback\": \"\"}, {\"option\": \"3 hours\", \"feedback\": \"\"}, {\"option\": \"4 hours\", \"feedback\": \"\"}, {\"option\": \"5 hours\", \"feedback\": \"\"}]','2024-11-19 04:37:07','4 hours','multiple_choice',NULL,21,5,NULL,NULL,3,1,NULL),(115,'<p>A man\'s speed with the current is 15 km/hr and the speed of the current is 2.5 km/hr. The man\'s speed against the current is:\r\n</p>','[{\"option\": \"8.5 km/hr\", \"feedback\": \"\"}, {\"option\": \"9 km/hr\", \"feedback\": \"\"}, {\"option\": \"10 km/hr\", \"feedback\": \"\"}, {\"option\": \" 12.5 km/hr\", \"feedback\": \"\"}]','2024-11-19 04:39:24','10 km/hr','multiple_choice',NULL,21,5,NULL,NULL,3,1,NULL),(116,'<p>A boat running upstream takes 8 hours 48 minutes to cover a certain \r\ndistance, while it takes 4 hours to cover the same distance running \r\ndownstream. What is the ratio between the speed of the boat and speed of\r\n the water current respectively?\r\n</p>','[{\"option\": \"2 : 1\", \"feedback\": \"\"}, {\"option\": \" 3 : 2\", \"feedback\": \"\"}, {\"option\": \"8 : 3\", \"feedback\": \"\"}, {\"option\": \"Cannot be determined\", \"feedback\": \"\"}, {\"option\": \"None of these\", \"feedback\": \"\"}]','2024-11-19 04:43:33','8 : 3','multiple_choice',NULL,21,5,NULL,NULL,3,1,NULL),(117,'<p>A motorboat, whose speed in 15 km/hr in still water goes 30 km \r\ndownstream and comes back in a total of 4 hours 30 minutes. The speed of\r\n the stream (in km/hr) is:</p>','[{\"option\": \"4\", \"feedback\": \"\"}, {\"option\": \"5\", \"feedback\": \"\"}, {\"option\": \"6\", \"feedback\": \"\"}, {\"option\": \"10\", \"feedback\": \"\"}]','2024-11-19 04:56:23','5','multiple_choice',NULL,21,5,NULL,NULL,3,1,NULL),(118,'<p>A boat running downstream covers a distance of 16 km in 2 hours while \r\nfor covering the same distance upstream, it takes 4 hours. What is the \r\nspeed of the boat in still water?</p>','[{\"option\": \"4 km/hr\", \"feedback\": \"\"}, {\"option\": \" 6 km/hr\", \"feedback\": \"\"}, {\"option\": \"8 km/hr\", \"feedback\": \"\"}, {\"option\": \"Data inadequate\", \"feedback\": \"\"}]','2024-11-21 07:46:42',' 6 km/hr','multiple_choice',NULL,21,5,NULL,NULL,3,2,NULL),(119,'<p>The speed of a boat in still water in 15 km/hr and the rate of current \r\nis 3 km/hr. The distance travelled downstream in 12 minutes is:</p>','[{\"option\": \"1.2 km\", \"feedback\": \"\"}, {\"option\": \"1.8 km\", \"feedback\": \"\"}, {\"option\": \"2.4 km\", \"feedback\": \"\"}, {\"option\": \"3.6 km\", \"feedback\": \"\"}]','2024-11-21 07:48:58','3.6 km','multiple_choice',NULL,21,5,NULL,NULL,3,2,NULL),(120,'<p>A boat takes 90 minutes less to travel 36 miles downstream than to \r\ntravel the same distance upstream. If the speed of the boat in still \r\nwater is 10 mph, the speed of the stream is:</p>','[{\"option\": \" 2 mph\", \"feedback\": \"\"}, {\"option\": \"2.5 mph\", \"feedback\": \"\"}, {\"option\": \"3 mph\", \"feedback\": \"\"}, {\"option\": \"4 mph\", \"feedback\": \"\"}]','2024-11-21 07:51:32',' 2 mph','multiple_choice',NULL,21,5,NULL,NULL,3,2,NULL),(121,'<p>A man can row at 5 kmph in still water. If the velocity of current is 1 \r\nkmph and it takes him 1 hour to row to a place and come back, how far is\r\n the place?\r\n</p>','[{\"option\": \"2.4 km\", \"feedback\": \"\"}, {\"option\": \"2.5 km\", \"feedback\": \"\"}, {\"option\": \" 3 km\", \"feedback\": \"\"}, {\"option\": \"3.6 km\", \"feedback\": \"\"}]','2024-11-21 07:53:17','2.4 km','multiple_choice',NULL,21,5,NULL,NULL,3,3,NULL),(122,'<div class=\"bix-td-qno\" id=\"qno10\" rowspan=\"2\"><br></div><div class=\"bix-td-qtxt table-responsive w-100\">\r\nA boat covers a certain distance downstream in 1 hour, while it comes back in 1<img src=\"https://www.indiabix.com/_files/images/aptitude/1-div-1by2.gif\"> hours. If the speed of the stream be 3 kmph, what is the speed of the boat in still water?\r\n</div>','[{\"option\": \"12 kmph\", \"feedback\": \"\"}, {\"option\": \"13 kmph\", \"feedback\": \"\"}, {\"option\": \"14 kmph\", \"feedback\": \"\"}, {\"option\": \"15 kmph\", \"feedback\": \"\"}, {\"option\": \" None of these\", \"feedback\": \"\"}]','2024-11-21 07:54:53','15 kmph','multiple_choice',NULL,21,5,NULL,NULL,3,3,NULL),(123,'<p>A train 360 m long is running at a speed of 45 km/hr. In what time will it pass a bridge 140 m long?\r\n</p>','[{\"option\": \"40 sec\", \"feedback\": \"\"}, {\"option\": \"42 sec\", \"feedback\": \"\"}, {\"option\": \"45 sec\", \"feedback\": \"\"}, {\"option\": \"48 sec\", \"feedback\": \"\"}]','2024-11-21 07:57:26','40 sec','multiple_choice',NULL,21,5,NULL,NULL,1,2,NULL),(124,'<div class=\"bix-td-qno\" id=\"qno9\" rowspan=\"2\"><br></div><div class=\"bix-td-qtxt table-responsive w-100\">Two trains are moving in opposite directions @ 60 km/hr and 90 km/hr. \r\nTheir lengths are 1.10 km and 0.9 km respectively. The time taken by the\r\n slower train to cross the faster train in seconds is:\r\n</div>','[{\"option\": \"36\", \"feedback\": \"\"}, {\"option\": \"45\", \"feedback\": \"\"}, {\"option\": \"48\", \"feedback\": \"\"}, {\"option\": \"49\", \"feedback\": \"\"}]','2024-11-21 07:59:04','48','multiple_choice',NULL,21,5,NULL,NULL,1,2,NULL),(125,'<p>A jogger running at 9 kmph alongside a railway track in 240 metres ahead\r\n of the engine of a 120 metres long train running at 45 kmph in the same\r\n direction. In how much time will the train pass the jogger?</p>','[{\"option\": \" 3.6 sec\", \"feedback\": \"\"}, {\"option\": \"18 sec\", \"feedback\": \"\"}, {\"option\": \"36 sec\", \"feedback\": \"\"}, {\"option\": \"72 sec\", \"feedback\": \"\"}]','2024-11-21 08:02:51','72 sec','multiple_choice',NULL,21,5,NULL,NULL,1,2,NULL),(126,'<p>A 270 metres long train running at the speed of 120 kmph crosses another\r\n train running in opposite direction at the speed of 80 kmph in 9 \r\nseconds. What is the length of the other train?\r\n</p>','[{\"option\": \"230 m\", \"feedback\": \"\"}, {\"option\": \"240 m\", \"feedback\": \"\"}, {\"option\": \"260 m\", \"feedback\": \"\"}, {\"option\": \"320 m\", \"feedback\": \"\"}, {\"option\": \"None of these\", \"feedback\": \"\"}]','2024-11-21 08:04:54','230 m','multiple_choice',NULL,21,5,NULL,NULL,1,3,NULL),(127,'<p>A goods train runs at the speed of 72 kmph and crosses a 250 m long \r\nplatform in 26 seconds. What is the length of the goods train?\r\n</p>','[{\"option\": \" 230 m\", \"feedback\": \"\"}, {\"option\": \"240 m\", \"feedback\": \"\"}, {\"option\": \"260 m\", \"feedback\": \"\"}, {\"option\": \"270 m\", \"feedback\": \"\"}]','2024-11-21 08:05:48','270 m','multiple_choice',NULL,21,5,NULL,NULL,1,3,NULL),(128,'<p>Two trains, each 100 m long, moving in opposite directions, cross each \r\nother in 8 seconds. If one is moving twice as fast the other, then the \r\nspeed of the faster train is:\r\n</p>','[{\"option\": \"30 km/hr\", \"feedback\": \"\"}, {\"option\": \"45 km/hr\", \"feedback\": \"\"}, {\"option\": \" 60 km/hr\", \"feedback\": \"\"}, {\"option\": \"75 km/hr\", \"feedback\": \"\"}]','2024-11-21 08:07:00',' 60 km/hr','multiple_choice',NULL,21,5,NULL,NULL,1,3,NULL),(129,'<p>A boatman goes 2 km against the current of the stream in 1 hour and goes\r\n 1 km along the current in 10 minutes. How long will it take to go 5 km \r\nin stationary water?\r\n</p>','[{\"option\": \"40 minutes\", \"feedback\": \"\"}, {\"option\": \"1 hour\", \"feedback\": \"\"}, {\"option\": \" 1 hr 15 min\", \"feedback\": \"\"}, {\"option\": \"1 hr 30 min\", \"feedback\": \"\"}]','2024-11-21 08:08:53',' 1 hr 15 min','multiple_choice',NULL,21,5,NULL,NULL,3,3,NULL),(130,'<p>DIVA:OPERA</p>','[{\"option\": \"producer:theatre\", \"feedback\": \"\"}, {\"option\": \"director:drama\", \"feedback\": \"\"}, {\"option\": \"conductor:bus\", \"feedback\": \"\"}, {\"option\": \" thespian:play\", \"feedback\": \"\"}]','2024-11-21 08:11:33',' thespian:play','multiple_choice',NULL,23,5,NULL,NULL,5,1,NULL),(131,'<p>GRAIN:SALT</p>','[{\"option\": \" shard:pottery\", \"feedback\": \"\"}, {\"option\": \"shred:wood\", \"feedback\": \"\"}, {\"option\": \"blades:grass\", \"feedback\": \"\"}, {\"option\": \"chip:glass\", \"feedback\": \"\"}]','2024-11-21 08:12:35','chip:glass','multiple_choice',NULL,23,5,NULL,NULL,5,1,NULL),(132,'<p>THRUST:SPEAR</p>','[{\"option\": \"mangle:iron\", \"feedback\": \"\"}, {\"option\": \"scabbard:sword\", \"feedback\": \"\"}, {\"option\": \"bow:arrow\", \"feedback\": \"\"}, {\"option\": \" fence:epee\", \"feedback\": \"\"}]','2024-11-21 08:13:28',' fence:epee','multiple_choice',NULL,23,5,NULL,NULL,5,2,NULL),(133,'<div class=\"bix-td-qno\" id=\"qno1\" rowspan=\"2\"><br></div><div class=\"bix-td-qtxt table-responsive w-100\">After driving professor Kumar to the museum she dropped him at his hotel.</div>','[{\"option\": \"After being driven to the museum, Professor Kumar was dropped at his hotel.\", \"feedback\": \"\"}, {\"option\": \"Professor Kumar was being driven dropped at his hotel.\", \"feedback\": \"\"}, {\"option\": \"After she had driven Professor Kumar to the museum she had dropped him at his hotel.\", \"feedback\": \"\"}, {\"option\": \" After she was driven Professor Kumar to the museum she had dropped him at his hotel.\", \"feedback\": \"\"}]','2024-11-23 08:28:42','After being driven to the museum, Professor Kumar was dropped at his hotel.','multiple_choice',NULL,23,5,NULL,NULL,5,2,NULL);
/*!40000 ALTER TABLE `quiz_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `quiz_type`
--

DROP TABLE IF EXISTS `quiz_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `quiz_type` (
  `quiz_type_id` int NOT NULL AUTO_INCREMENT,
  `quiz_type_name` varchar(50) NOT NULL,
  PRIMARY KEY (`quiz_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `quiz_type`
--

LOCK TABLES `quiz_type` WRITE;
/*!40000 ALTER TABLE `quiz_type` DISABLE KEYS */;
INSERT INTO `quiz_type` VALUES (1,'Past Paper'),(2,'Mock Test'),(3,'Module Practice');
/*!40000 ALTER TABLE `quiz_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin'),(5,'company'),(2,'instructor'),(4,'student'),(3,'teacher');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_mock_test_text`
--

DROP TABLE IF EXISTS `sample_mock_test_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_mock_test_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `option` json NOT NULL,
  `correct_answer` text NOT NULL,
  `question_type` varchar(50) NOT NULL,
  `courseid` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_mock_test_text`
--

LOCK TABLES `sample_mock_test_text` WRITE;
/*!40000 ALTER TABLE `sample_mock_test_text` DISABLE KEYS */;
INSERT INTO `sample_mock_test_text` VALUES (1,'<p>Which of the following is a fully managed serverless compute service in Google Cloud?</p>','[{\"option\": \"Google Kubernetes Engine (GKE)\", \"feedback\": \"\"}, {\"option\": \"App Engine\", \"feedback\": \"\"}, {\"option\": \"Cloud Functions\", \"feedback\": \"\"}, {\"option\": \"Compute Engine\", \"feedback\": \"\"}]','App Engine','multiple_choice',7,'2024-11-29 07:00:31'),(2,'<p>Which Google Cloud service would you use to deploy and manage virtual machines (VMs) in the cloud?</p>','[{\"option\": \"Google Kubernetes Engine\", \"feedback\": \"\"}, {\"option\": \"Google App Engine\", \"feedback\": \"\"}, {\"option\": \"Google Compute Engine\", \"feedback\": \"\"}, {\"option\": \"Google Cloud Functions\", \"feedback\": \"\"}]','Google Compute Engine','multiple_choice',7,'2024-11-29 10:10:30');
/*!40000 ALTER TABLE `sample_mock_test_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_module_practice_text`
--

DROP TABLE IF EXISTS `sample_module_practice_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_module_practice_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `option` json NOT NULL,
  `correct_answer` text NOT NULL,
  `question_type` varchar(50) NOT NULL,
  `courseid` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_module_practice_text`
--

LOCK TABLES `sample_module_practice_text` WRITE;
/*!40000 ALTER TABLE `sample_module_practice_text` DISABLE KEYS */;
INSERT INTO `sample_module_practice_text` VALUES (1,'<p>Which Google Cloud service provides a distributed, scalable relational database?</p>','[{\"option\": \"BigQuery\", \"feedback\": \"\"}, {\"option\": \"Firestore\", \"feedback\": \"\"}, {\"option\": \"Cloud Spanner\", \"feedback\": \"\"}, {\"option\": \"Cloud SQL\", \"feedback\": \"\"}]','Cloud Spanner','multiple_choice',7,'2024-11-29 07:05:22');
/*!40000 ALTER TABLE `sample_module_practice_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_past_paper_text`
--

DROP TABLE IF EXISTS `sample_past_paper_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_past_paper_text` (
  `id` int NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `option` json NOT NULL,
  `correct_answer` text NOT NULL,
  `question_type` varchar(50) NOT NULL,
  `courseid` int NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `year` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_past_paper_text`
--

LOCK TABLES `sample_past_paper_text` WRITE;
/*!40000 ALTER TABLE `sample_past_paper_text` DISABLE KEYS */;
INSERT INTO `sample_past_paper_text` VALUES (1,'<p>What is the main function of Google Cloud Storage?</p>','[{\"option\": \"Host virtual machines\", \"feedback\": \"\"}, {\"option\": \"Store and retrieve data on Google Cloud\", \"feedback\": \"\"}, {\"option\": \"Create serverless applications\", \"feedback\": \"\"}, {\"option\": \"Manage databases\", \"feedback\": \"\"}]','Store and retrieve data on Google Cloud','multiple_choice',7,'2024-11-29 06:57:44',NULL),(2,'<p>Which Google Cloud service is used to manage containerized applications?</p>','[{\"option\": \"Google Compute Engine\", \"feedback\": \"\"}, {\"option\": \"Google Kubernetes Engine\", \"feedback\": \"\"}, {\"option\": \"Google Cloud Functions\", \"feedback\": \"\"}, {\"option\": \"Google App Engine\", \"feedback\": \"\"}]','Google Kubernetes Engine','multiple_choice',7,'2024-11-29 09:41:56','2020 - 2024'),(3,'<p>Which of the following is a feature of Google Cloud Storage?</p>','[{\"option\": \"Persistent block storage for virtual machines\", \"feedback\": \"\"}, {\"option\": \"Object storage with unlimited scalability\", \"feedback\": \"\"}, {\"option\": \"Managed SQL database service\", \"feedback\": \"\"}, {\"option\": \"Serverless compute platform\", \"feedback\": \"\"}]','Object storage with unlimited scalability','multiple_choice',7,'2024-11-29 09:44:00','2020 - 2024'),(4,'<p>Which GCP service is best suited for real-time messaging between independent services?</p>','[{\"option\": \"Cloud Pub/Sub\", \"feedback\": \"\"}, {\"option\": \"Cloud Functions\", \"feedback\": \"\"}, {\"option\": \"Cloud Storage\", \"feedback\": \"\"}, {\"option\": \"Cloud Datastore\", \"feedback\": \"\"}]','Cloud Pub/Sub','multiple_choice',7,'2024-11-29 09:45:35','2020 - 2024'),(5,'<p>You need to grant a user permission to read data from a Cloud Storage bucket. Which IAM role should you assign to the user?</p>','[{\"option\": \"roles/storage.objectAdmin\", \"feedback\": \"\"}, {\"option\": \"roles/storage.objectViewer\", \"feedback\": \"\"}, {\"option\": \"roles/storage.objectCreator\", \"feedback\": \"\"}, {\"option\": \"roles/storage.admin\", \"feedback\": \"\"}]','roles/storage.objectViewer','multiple_choice',7,'2024-11-29 09:46:57','2020 - 2024');
/*!40000 ALTER TABLE `sample_past_paper_text` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sample_quiz_attempt`
--

DROP TABLE IF EXISTS `sample_quiz_attempt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sample_quiz_attempt` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `result` json NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `score` int NOT NULL,
  `totalquestion` int NOT NULL,
  `correctquestion` int NOT NULL,
  `quiz_type` int NOT NULL,
  `courseid` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sample_quiz_attempt`
--

LOCK TABLES `sample_quiz_attempt` WRITE;
/*!40000 ALTER TABLE `sample_quiz_attempt` DISABLE KEYS */;
INSERT INTO `sample_quiz_attempt` VALUES (1,29,'[{\"correct\": true, \"question_id\": 1, \"user_answer\": \"Store and retrieve data on Google Cloud\"}, {\"correct\": true, \"question_id\": 2, \"user_answer\": \"Google Kubernetes Engine\"}, {\"correct\": false, \"question_id\": 3, \"user_answer\": \"Managed SQL database service\"}, {\"correct\": false, \"question_id\": 4, \"user_answer\": \"Cloud Storage\"}, {\"correct\": false, \"question_id\": 5, \"user_answer\": \"roles/storage.admin\"}]','2024-11-29 16:10:41',2,5,2,1,NULL),(2,29,'[{\"correct\": true, \"question_id\": 1, \"user_answer\": \"Store and retrieve data on Google Cloud\"}, {\"correct\": true, \"question_id\": 2, \"user_answer\": \"Google Kubernetes Engine\"}, {\"correct\": false, \"question_id\": 3, \"user_answer\": \"Managed SQL database service\"}, {\"correct\": false, \"question_id\": 4, \"user_answer\": \"Cloud Storage\"}, {\"correct\": false, \"question_id\": 5, \"user_answer\": \"roles/storage.admin\"}]','2024-11-29 16:11:13',2,5,2,1,NULL),(3,29,'[{\"correct\": true, \"question_id\": 1, \"user_answer\": \"Store and retrieve data on Google Cloud\"}, {\"correct\": true, \"question_id\": 2, \"user_answer\": \"Google Kubernetes Engine\"}, {\"correct\": true, \"question_id\": 3, \"user_answer\": \"Object storage with unlimited scalability\"}, {\"correct\": false, \"question_id\": 4, \"user_answer\": \"Cloud Functions\"}, {\"correct\": false, \"question_id\": 5, \"user_answer\": \"roles/storage.objectCreator\"}]','2024-11-29 16:13:37',3,5,3,1,7),(4,29,'[{\"correct\": true, \"question_id\": 1, \"user_answer\": \"Store and retrieve data on Google Cloud\"}, {\"correct\": true, \"question_id\": 2, \"user_answer\": \"Google Kubernetes Engine\"}, {\"correct\": false, \"question_id\": 3, \"user_answer\": \"Managed SQL database service\"}, {\"correct\": false, \"question_id\": 4, \"user_answer\": \"Cloud Storage\"}, {\"correct\": false, \"question_id\": 5, \"user_answer\": \"roles/storage.objectCreator\"}]','2024-11-29 16:28:43',2,5,2,1,7),(5,29,'[{\"correct\": true, \"question_id\": 1, \"user_answer\": \"Store and retrieve data on Google Cloud\"}, {\"correct\": true, \"question_id\": 2, \"user_answer\": \"Google Kubernetes Engine\"}, {\"correct\": false, \"question_id\": 3, \"user_answer\": \"Serverless compute platform\"}, {\"correct\": false, \"question_id\": 4, \"user_answer\": \"Cloud Storage\"}, {\"correct\": false, \"question_id\": 5, \"user_answer\": \"roles/storage.objectCreator\"}]','2024-11-29 16:40:30',2,5,2,1,7),(6,29,'[{\"correct\": false, \"question_id\": 1, \"user_answer\": \"Create serverless applications\"}, {\"correct\": true, \"question_id\": 2, \"user_answer\": \"Google Kubernetes Engine\"}, {\"correct\": true, \"question_id\": 3, \"user_answer\": \"Object storage with unlimited scalability\"}, {\"correct\": false, \"question_id\": 4, \"user_answer\": \"Cloud Functions\"}, {\"correct\": true, \"question_id\": 5, \"user_answer\": \"roles/storage.objectViewer\"}]','2024-11-29 16:53:34',3,5,3,1,7),(7,29,'[{\"correct\": true, \"question_id\": 1, \"user_answer\": \"Store and retrieve data on Google Cloud\"}, {\"correct\": true, \"question_id\": 2, \"user_answer\": \"Google Kubernetes Engine\"}, {\"correct\": true, \"question_id\": 3, \"user_answer\": \"Object storage with unlimited scalability\"}, {\"correct\": false, \"question_id\": 4, \"user_answer\": \"Cloud Functions\"}, {\"correct\": true, \"question_id\": 5, \"user_answer\": \"roles/storage.objectViewer\"}]','2024-11-29 17:06:06',4,5,4,1,7);
/*!40000 ALTER TABLE `sample_quiz_attempt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phoneno` varchar(15) NOT NULL,
  `address` text NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `emp_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`staff_id`),
  UNIQUE KEY `email` (`email`),
  KEY `fk_staff_role_id` (`role_id`),
  CONSTRAINT `fk_staff_role_id` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `standardlog`
--

DROP TABLE IF EXISTS `standardlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `standardlog` (
  `log_id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `eventname` varchar(255) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`),
  UNIQUE KEY `log_id` (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1002 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `standardlog`
--

LOCK TABLES `standardlog` WRITE;
/*!40000 ALTER TABLE `standardlog` DISABLE KEYS */;
INSERT INTO `standardlog` VALUES (951,29,'login','logged','2024-11-19 10:16:18'),(952,29,'login','logged','2024-11-19 12:17:30'),(953,29,'login','logged','2024-11-19 12:33:03'),(954,29,'login','logged','2024-11-20 03:52:11'),(955,29,'login','logged','2024-11-20 06:58:40'),(956,29,'login','logged','2024-11-20 06:59:34'),(957,29,'login','logged','2024-11-20 07:01:35'),(958,29,'login','logged','2024-11-21 05:09:35'),(959,29,'login','logged','2024-11-21 05:42:07'),(960,29,'login','logged','2024-11-21 07:18:36'),(961,29,'logout','logged out','2024-11-21 07:42:27'),(962,29,'login','logged','2024-11-21 08:33:34'),(963,29,'login','logged','2024-11-21 10:20:56'),(964,29,'login','logged','2024-11-21 10:34:44'),(965,29,'login','logged','2024-11-22 04:07:33'),(966,29,'login','logged','2024-11-23 05:44:06'),(967,29,'login','logged','2024-11-25 04:08:02'),(968,29,'login','logged','2024-11-26 04:48:55'),(969,29,'login','logged','2024-11-26 10:56:44'),(970,29,'logout','logged out','2024-11-26 11:01:16'),(971,29,'login','logged','2024-11-26 11:01:38'),(972,29,'logout','logged out','2024-11-26 11:02:33'),(973,29,'login','logged','2024-11-26 11:05:55'),(974,29,'logout','logged out','2024-11-26 11:06:26'),(975,29,'login','logged','2024-11-26 11:17:27'),(976,29,'logout','logged out','2024-11-26 11:21:24'),(977,29,'login','logged','2024-11-27 04:20:08'),(978,29,'login','logged','2024-11-27 04:22:53'),(979,30,'login','logged','2024-11-27 04:23:45'),(980,30,'login','logged','2024-11-27 04:41:30'),(981,30,'login','logged','2024-11-27 04:46:16'),(982,29,'login','logged','2024-11-27 06:57:04'),(983,31,'login','logged','2024-11-27 07:15:22'),(984,31,'login','logged','2024-11-27 07:15:36'),(985,31,'login','logged','2024-11-27 07:15:53'),(986,32,'login','logged','2024-11-27 07:19:19'),(987,30,'login','logged','2024-11-27 07:24:31'),(988,30,'login','logged','2024-11-27 07:25:01'),(989,30,'login','logged','2024-11-27 07:54:29'),(990,29,'login','logged','2024-11-27 11:06:52'),(991,29,'logout','logged out','2024-11-27 11:26:10'),(992,29,'login','logged','2024-11-27 11:26:23'),(993,29,'login','logged','2024-11-29 04:16:50'),(994,29,'login','logged','2024-11-29 04:55:36'),(995,29,'login','logged','2024-11-29 07:10:49'),(996,29,'login','logged','2024-11-29 09:47:22'),(997,29,'login','logged','2024-11-29 10:11:27'),(998,33,'login','logged','2024-11-29 11:28:43'),(999,29,'login','logged','2024-11-29 11:35:04'),(1000,33,'login','logged','2024-11-29 11:51:16'),(1001,33,'login','logged','2024-11-29 11:57:49');
/*!40000 ALTER TABLE `standardlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phoneno` varchar(15) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `role_id` int NOT NULL,
  `dept_id` int DEFAULT NULL,
  `dept_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  KEY `fk_student_department` (`dept_id`),
  CONSTRAINT `fk_student_department` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`),
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student`
--

LOCK TABLES `student` WRITE;
/*!40000 ALTER TABLE `student` DISABLE KEYS */;
/*!40000 ALTER TABLE `student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_category`
--

DROP TABLE IF EXISTS `sub_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_category` (
  `sub_category_id` int NOT NULL AUTO_INCREMENT,
  `certificate_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`sub_category_id`),
  KEY `certificate_id` (`certificate_id`),
  CONSTRAINT `sub_category_ibfk_1` FOREIGN KEY (`certificate_id`) REFERENCES `type_of_certificate` (`certificate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_category`
--

LOCK TABLES `sub_category` WRITE;
/*!40000 ALTER TABLE `sub_category` DISABLE KEYS */;
INSERT INTO `sub_category` VALUES (1,1,'Bank Exams','bank','2024-11-27 05:57:25','2024-11-27 05:57:25'),(2,1,'Railway Exams','railway','2024-11-27 05:57:25','2024-11-27 05:57:25'),(3,1,'Medical Exams','medical','2024-11-27 05:57:25','2024-11-27 05:57:25'),(4,2,'AWS ','aws','2024-11-27 05:57:25','2024-11-27 07:02:37'),(5,2,'Azure','azure','2024-11-27 05:57:25','2024-11-27 07:02:37'),(6,2,'Google ','gcloud','2024-11-27 05:57:25','2024-11-27 07:02:37');
/*!40000 ALTER TABLE `sub_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcourses`
--

DROP TABLE IF EXISTS `subcourses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subcourses` (
  `subcourse_id` int NOT NULL AUTO_INCREMENT,
  `sub_category_id` int NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `description` text,
  `duration` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`subcourse_id`),
  KEY `sub_category_id` (`sub_category_id`),
  CONSTRAINT `subcourses_ibfk_1` FOREIGN KEY (`sub_category_id`) REFERENCES `sub_category` (`sub_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcourses`
--

LOCK TABLES `subcourses` WRITE;
/*!40000 ALTER TABLE `subcourses` DISABLE KEYS */;
INSERT INTO `subcourses` VALUES (1,1,'SBI PO Exam Preparation','Comprehensive training for SBI PO exam covering all sections.','6 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(2,1,'IBPS Clerk Exam Preparation','Focused preparation for IBPS Clerk exam with practice papers.','5 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(3,1,'RBI Assistant Exam Preparation','Preparation course for RBI Assistant exams with syllabus coverage.','4 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(4,2,'RRB ALP Exam Preparation','Complete syllabus for RRB Assistant Loco Pilot exams.','6 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(5,2,'RRB Group D Exam Preparation','Dedicated training for RRB Group D exams with mock tests.','5 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(6,3,'NEET UG Crash Course','Intensive short-term course for NEET UG with practice exams.','3 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(7,3,'AIIMS Entrance Exam Prep','Comprehensive preparation for AIIMS entrance with detailed coverage.','1 year','2024-11-27 06:00:41','2024-11-27 06:00:41'),(8,4,'AWS Solutions Architect - Associate','Detailed training for AWS Solutions Architect Associate exam.','3 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(9,4,'AWS Certified Developer','Comprehensive preparation for AWS Certified Developer exam.','2 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(10,5,'Microsoft Azure Fundamentals','Introduction to Azure cloud services and core concepts.','2 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(11,5,'Microsoft Azure Administrator','Intermediate Azure training for administrator certification.','4 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(12,6,'Google Associate Cloud Engineer','Comprehensive training for Google Associate Cloud Engineer certification.','3 months','2024-11-27 06:00:41','2024-11-27 06:00:41'),(13,6,'Google Professional Cloud Architect','Advanced preparation for Google Professional Cloud Architect certification.','4 months','2024-11-27 06:00:41','2024-11-27 06:00:41');
/*!40000 ALTER TABLE `subcourses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `submodule`
--

DROP TABLE IF EXISTS `submodule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `submodule` (
  `submodule_id` int NOT NULL AUTO_INCREMENT,
  `submodulename` varchar(255) NOT NULL,
  `courseid` int NOT NULL,
  `moduleid` int NOT NULL,
  `context_id` int DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`submodule_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `submodule`
--

LOCK TABLES `submodule` WRITE;
/*!40000 ALTER TABLE `submodule` DISABLE KEYS */;
INSERT INTO `submodule` VALUES (1,'Train',5,21,102,'2024-11-14 07:45:54'),(3,'Boats & Streams',5,21,104,'2024-11-14 07:52:55'),(4,'Verbal',6,22,107,'2024-11-14 08:04:47'),(5,'Verbal Ability',5,23,109,'2024-11-18 06:11:58');
/*!40000 ALTER TABLE `submodule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_details`
--

DROP TABLE IF EXISTS `test_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_details` (
  `test_id` int NOT NULL AUTO_INCREMENT,
  `test_name` varchar(255) NOT NULL,
  `total_questions` int NOT NULL,
  `test_timing` int NOT NULL,
  `negative_marks` tinyint(1) NOT NULL,
  `submodules` json DEFAULT NULL,
  `test_image` varchar(255) DEFAULT NULL,
  `difficulty_level` enum('Easy','Medium','Hard') NOT NULL,
  `easy_pass_mark` int DEFAULT NULL,
  `medium_pass_mark` int DEFAULT NULL,
  `hard_pass_mark` int DEFAULT NULL,
  `courseid` int NOT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_details`
--

LOCK TABLES `test_details` WRITE;
/*!40000 ALTER TABLE `test_details` DISABLE KEYS */;
/*!40000 ALTER TABLE `test_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_of_certificate`
--

DROP TABLE IF EXISTS `type_of_certificate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_of_certificate` (
  `certificate_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`certificate_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_of_certificate`
--

LOCK TABLES `type_of_certificate` WRITE;
/*!40000 ALTER TABLE `type_of_certificate` DISABLE KEYS */;
INSERT INTO `type_of_certificate` VALUES (1,'Competitive Exams','2024-11-26 11:15:13'),(2,'Global Certificate Exams','2024-11-26 11:15:13');
/*!40000 ALTER TABLE `type_of_certificate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_of_section`
--

DROP TABLE IF EXISTS `type_of_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_of_section` (
  `type_of_section_id` int NOT NULL AUTO_INCREMENT,
  `type_of_section` varchar(50) NOT NULL,
  PRIMARY KEY (`type_of_section_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_of_section`
--

LOCK TABLES `type_of_section` WRITE;
/*!40000 ALTER TABLE `type_of_section` DISABLE KEYS */;
/*!40000 ALTER TABLE `type_of_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `phone_no` varchar(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `context_id` int DEFAULT NULL,
  `has_paid` tinyint(1) DEFAULT '0',
  `qualification` varchar(255) DEFAULT NULL,
  `profession` varchar(255) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `enrolled_courses` json DEFAULT NULL,
  `certificate_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `phone_no` (`phone_no`),
  KEY `fk_user_context` (`context_id`),
  CONSTRAINT `fk_user_context` FOREIGN KEY (`context_id`) REFERENCES `context` (`context_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (29,'siva.v@kgisl.microcollege.in','8608053257','$2b$10$GZQxG3Lxs13Yo0ICdEPVSejtw3oiWawSrSl5RpZKFWH/2KDjbFdii','2024-11-19 10:15:01','Siva V',NULL,110,0,'MCA','Employee','\\uploads\\face1.jpg','TN','IN','Coimbatore','[5]',2),(30,'devika.eks@kggeniuslabs.com','8608053256','$2b$10$znQ9OTlNEDwtOoBAhTxtjOCat..q8bf8HEFCELOXLtLhr9Pqrd4Q6','2024-11-27 04:16:07','Devika',NULL,111,0,'MCA','Employee','\\uploads\\face1.jpg','TN','IN','Coimbatore','[6]',1),(32,'johnpaul.j@kggeniuslabs.com','8608053258','$2b$10$7Gd94UM8p2q7.YpBZblayuMQeMa4NH3DOA0LT1fA23xdp56936s3K','2024-11-27 07:18:47','John Paul',NULL,113,0,'MSC','Employee','\\uploads\\face1.jpg','TN','IN','Coimbatore',NULL,2),(33,'instructor@gmail.com','8608055678','$2b$10$suMpfgaAWdt6o64twoHpAeCWS9DjUrQ5cKdwXpEkW5H76GYFkKnXS','2024-11-29 11:27:13','Instructor',NULL,117,0,'MSc','Employee','\\uploads\\face1.jpg','TN','IN','Coimbatore',NULL,1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_course_completion`
--

DROP TABLE IF EXISTS `user_course_completion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_course_completion` (
  `completion_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `courseid` int NOT NULL,
  `time_completed` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`completion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_course_completion`
--

LOCK TABLES `user_course_completion` WRITE;
/*!40000 ALTER TABLE `user_course_completion` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_course_completion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_enrollment`
--

DROP TABLE IF EXISTS `user_enrollment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_enrollment` (
  `enrollment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `time_started` timestamp NULL DEFAULT NULL,
  `time_end` timestamp NULL DEFAULT NULL,
  `company_id` int DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`enrollment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_enrollment`
--

LOCK TABLES `user_enrollment` WRITE;
/*!40000 ALTER TABLE `user_enrollment` DISABLE KEYS */;
INSERT INTO `user_enrollment` VALUES (1,29,'2024-11-19 11:13:47',NULL,NULL,NULL,NULL),(2,29,'2024-11-19 11:39:42',NULL,NULL,NULL,NULL),(3,29,'2024-11-19 11:40:52',NULL,NULL,NULL,NULL),(4,29,'2024-11-19 12:33:16',NULL,NULL,NULL,NULL),(5,29,'2024-11-21 10:35:59',NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `user_enrollment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_lastaccess`
--

DROP TABLE IF EXISTS `user_lastaccess`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_lastaccess` (
  `access_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `courseid` int NOT NULL,
  `timeaccess` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`access_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_lastaccess`
--

LOCK TABLES `user_lastaccess` WRITE;
/*!40000 ALTER TABLE `user_lastaccess` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_lastaccess` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_msg_compose`
--

DROP TABLE IF EXISTS `user_msg_compose`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_msg_compose` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sender_name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `receiver_email` varchar(255) NOT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_msg_compose`
--

LOCK TABLES `user_msg_compose` WRITE;
/*!40000 ALTER TABLE `user_msg_compose` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_msg_compose` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_track`
--

DROP TABLE IF EXISTS `user_track`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_track` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '0',
  `timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_track`
--

LOCK TABLES `user_track` WRITE;
/*!40000 ALTER TABLE `user_track` DISABLE KEYS */;
INSERT INTO `user_track` VALUES (17,29,1,'2024-11-29 17:05:04'),(18,30,1,'2024-11-27 13:24:29'),(19,31,1,'2024-11-27 12:45:53'),(20,32,1,'2024-11-27 12:49:19'),(21,33,1,'2024-11-29 17:27:50');
/*!40000 ALTER TABLE `user_track` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-29 18:19:46
