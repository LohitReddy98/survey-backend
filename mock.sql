-- Drop tables if they exist to ensure clean creation
DROP TABLE IF EXISTS SurveyResponse;
DROP TABLE IF EXISTS SurveyAssignment;
DROP TABLE IF EXISTS SurveyQuestion;
DROP TABLE IF EXISTS Survey;
DROP TABLE IF EXISTS Patient;
DROP TABLE IF EXISTS Doctor;
DROP TABLE IF EXISTS Authentication;
DROP TABLE IF EXISTS User;

-- Create User Table
CREATE TABLE User (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL, -- Store hashed passwords for security
    role VARCHAR(20) NOT NULL, -- 'patient' or 'doctor'
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Patient Table
CREATE TABLE Patient (
    id INT UNSIGNED PRIMARY KEY REFERENCES User(id) ON DELETE CASCADE, -- Use id as a reference to User.id
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dateOfBirth DATE,
    gender VARCHAR(10),
    phone VARCHAR(20) UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Doctor Table
CREATE TABLE Doctor (
    id INT UNSIGNED PRIMARY KEY REFERENCES User(id) ON DELETE CASCADE, -- Use id as a reference to User.id
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    specialty VARCHAR(100),
    phone VARCHAR(20) UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create Survey Table
CREATE TABLE Survey (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    createdBy INT UNSIGNED REFERENCES Doctor(id) ON DELETE SET NULL, -- Foreign key references Doctor.id
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create SurveyQuestion Table
CREATE TABLE SurveyQuestion (
    questionId INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, -- Use questionId as the primary key
    surveyId INT UNSIGNED REFERENCES Survey(id) ON DELETE CASCADE, -- Match data type with Survey.id
    questionText TEXT NOT NULL,
    questionType VARCHAR(50) NOT NULL, -- MULTIPLE_CHOICE, SHORT_ANSWER, RATING_SCALE
    options JSON, -- Use JSON type to store options array
    isRequired BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (surveyId, questionId) -- Ensure combination of surveyId and questionId is unique
);

-- Create SurveyAssignment Table
CREATE TABLE SurveyAssignment (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    surveyId INT UNSIGNED REFERENCES Survey(id) ON DELETE CASCADE, -- Match data type with Survey.id
    patientId INT UNSIGNED REFERENCES Patient(id) ON DELETE CASCADE, -- Match data type with Patient.id
    doctorId INT UNSIGNED REFERENCES Doctor(id) ON DELETE SET NULL, -- Match data type with Doctor.id
    assignedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create SurveyResponse Table
CREATE TABLE SurveyResponse (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    surveyId INT UNSIGNED REFERENCES Survey(id) ON DELETE CASCADE, -- Match data type with Survey.id
    patientId INT UNSIGNED REFERENCES Patient(id) ON DELETE CASCADE, -- Match data type with Patient.id
    response JSON, -- Use JSON type to store responses
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE (surveyId, patientId) -- Ensure a patient can only submit one response per survey
);

-- Create Authentication Table
CREATE TABLE Authentication (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userId INT UNSIGNED REFERENCES User(id) ON DELETE CASCADE, -- Match data type with User.id
    token VARCHAR(255) UNIQUE NOT NULL, -- Store session or JWT tokens
    expiresAt TIMESTAMP NOT NULL, -- Expiration date and time of the token
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- MySQL dump 10.13  Distrib 9.0.0, for macos14 (arm64)
--
-- Host: localhost    Database: aidar
-- ------------------------------------------------------
-- Server version	9.0.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Authentication`
--

LOCK TABLES `Authentication` WRITE;
/*!40000 ALTER TABLE `Authentication` DISABLE KEYS */;
INSERT INTO `Authentication` (`id`, `userId`, `token`, `expiresAt`, `createdAt`) VALUES (1,1,'token1','2024-10-09 09:36:44','2024-10-08 09:36:44'),(2,2,'token2','2024-10-09 09:36:44','2024-10-08 09:36:44'),(3,3,'token3','2024-10-09 09:36:44','2024-10-08 09:36:44'),(4,4,'token4','2024-10-09 09:36:44','2024-10-08 09:36:44'),(5,5,'token5','2024-10-09 09:36:44','2024-10-08 09:36:44');
/*!40000 ALTER TABLE `Authentication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Doctor`
--

LOCK TABLES `Doctor` WRITE;
/*!40000 ALTER TABLE `Doctor` DISABLE KEYS */;
INSERT INTO `Doctor` (`id`, `firstName`, `lastName`, `specialty`, `phone`, `createdAt`, `updatedAt`) VALUES (1,'John','Doe','General Physician','555-1234','2024-10-08 09:36:44','2024-10-08 09:36:44'),(3,'Richard','Roe','Cardiologist','555-5678','2024-10-08 09:36:44','2024-10-08 09:36:44'),(5,'Susan','Smith','Pediatrician','555-9876','2024-10-08 09:36:44','2024-10-08 09:36:44');
/*!40000 ALTER TABLE `Doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Patient`
--

LOCK TABLES `Patient` WRITE;
/*!40000 ALTER TABLE `Patient` DISABLE KEYS */;
INSERT INTO `Patient` (`id`, `firstName`, `lastName`, `dateOfBirth`, `gender`, `phone`, `createdAt`, `updatedAt`) VALUES (2,'Jane','Doe','1990-05-14','Female','1234567890','2024-10-08 09:36:44','2024-10-08 09:36:44'),(4,'Emily','Doe','1985-11-21','Female','0987654321','2024-10-08 09:36:44','2024-10-08 09:36:44');
/*!40000 ALTER TABLE `Patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Survey`
--

LOCK TABLES `Survey` WRITE;
/*!40000 ALTER TABLE `Survey` DISABLE KEYS */;
INSERT INTO `Survey` (`id`, `title`, `description`, `createdBy`, `createdAt`, `updatedAt`) VALUES (1,'Health Assessment Survey','A general health assessment survey for new patients',1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(2,'Employee Wellness Survey','Survey to assess employee wellness and job satisfaction',3,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(3,'Patient Satisfaction Survey','Survey to gauge patient satisfaction with services',1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(4,'Course Evaluation Survey','Survey for evaluating course effectiveness',5,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(5,'Fitness Center Feedback','Survey to gather feedback on fitness center facilities',3,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(19,'timepass',NULL,1,'2024-10-09 02:38:53','2024-10-09 02:38:53'),(20,'Hello',NULL,1,'2024-10-09 02:51:33','2024-10-09 02:51:33'),(21,'checking required',NULL,1,'2024-10-09 02:55:14','2024-10-09 02:55:14'),(22,'asd',NULL,1,'2024-10-09 03:09:08','2024-10-09 03:09:08');
/*!40000 ALTER TABLE `Survey` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `SurveyAssignment`
--

LOCK TABLES `SurveyAssignment` WRITE;
/*!40000 ALTER TABLE `SurveyAssignment` DISABLE KEYS */;
INSERT INTO `SurveyAssignment` (`id`, `surveyId`, `patientId`, `doctorId`, `assignedAt`) VALUES (1,1,2,1,'2024-10-08 09:36:44'),(2,3,4,1,'2024-10-08 09:36:44'),(3,2,2,3,'2024-10-08 09:36:44'),(4,4,2,5,'2024-10-08 09:36:44'),(5,5,4,3,'2024-10-08 09:36:44'),(9,4,4,1,'2024-10-08 15:11:34'),(10,5,2,1,'2024-10-08 15:11:46'),(15,19,2,1,'2024-10-09 02:39:24'),(16,19,4,1,'2024-10-09 02:39:25'),(17,21,2,1,'2024-10-09 02:55:26'),(18,21,4,1,'2024-10-09 02:58:34'),(19,22,2,1,'2024-10-09 03:09:51'),(20,22,4,1,'2024-10-09 03:09:51');
/*!40000 ALTER TABLE `SurveyAssignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `SurveyQuestion`
--

LOCK TABLES `SurveyQuestion` WRITE;
/*!40000 ALTER TABLE `SurveyQuestion` DISABLE KEYS */;
INSERT INTO `SurveyQuestion` (`questionId`, `surveyId`, `questionText`, `questionType`, `options`, `isRequired`, `createdAt`, `updatedAt`) VALUES (1,1,'How are you feeling today?','MULTIPLE_CHOICE','[\"Good\", \"Okay\", \"Bad\"]',1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(2,1,'Any specific health concerns?','SHORT_ANSWER',NULL,0,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(3,1,'Rate your pain level (1-5)','RATING_SCALE',NULL,1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(4,2,'What do you like about your job?','SHORT_ANSWER',NULL,1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(5,2,'Which of the following benefits do you value most?','MULTIPLE_CHOICE','[\"Health Insurance\", \"Paid Time Off\", \"Retirement Plan\", \"Other\"]',1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(6,3,'How would you rate your experience with our facility?','RATING_SCALE',NULL,1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(7,3,'Was the staff courteous and professional?','MULTIPLE_CHOICE','[\"Yes\", \"No\"]',1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(8,4,'Rate the quality of the course materials (1-5)','RATING_SCALE',NULL,1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(9,4,'Would you recommend this course to others?','MULTIPLE_CHOICE','[\"Yes\", \"No\"]',1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(10,5,'Rate the cleanliness of the facility','RATING_SCALE',NULL,1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(11,5,'Which facilities do you use the most?','MULTIPLE_CHOICE','[\"Gym\", \"Pool\", \"Group Classes\", \"Spa\"]',1,'2024-10-08 09:36:44','2024-10-08 09:36:44'),(24,19,'pain','RATING_SCALE',NULL,0,'2024-10-09 02:38:53','2024-10-09 02:38:53'),(25,19,'who are you','SHORT_ANSWER',NULL,0,'2024-10-09 02:38:53','2024-10-09 02:38:53'),(26,19,'chose','MULTIPLE_CHOICE','[\"1\", \"2\", \"3\"]',0,'2024-10-09 02:38:53','2024-10-09 02:38:53'),(27,20,'asdfasdf','MULTIPLE_CHOICE','[]',0,'2024-10-09 02:51:33','2024-10-09 02:51:33'),(28,21,'asdASD','MULTIPLE_CHOICE','[\"2\", \"3\", \"4\"]',1,'2024-10-09 02:55:14','2024-10-09 02:55:14'),(29,22,'asd','MULTIPLE_CHOICE','[\"qw\", \"qw\", \"wq\"]',0,'2024-10-09 03:09:08','2024-10-09 03:09:08'),(30,22,'qweweq','SHORT_ANSWER',NULL,0,'2024-10-09 03:09:08','2024-10-09 03:09:08'),(31,22,'sdsad','RATING_SCALE',NULL,0,'2024-10-09 03:09:08','2024-10-09 03:09:08');
/*!40000 ALTER TABLE `SurveyQuestion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `SurveyResponse`
--

LOCK TABLES `SurveyResponse` WRITE;
/*!40000 ALTER TABLE `SurveyResponse` DISABLE KEYS */;
INSERT INTO `SurveyResponse` (`id`, `surveyId`, `patientId`, `response`, `createdAt`, `updatedAt`) VALUES (1,1,2,'{\"1\": \"Good\", \"2\": \"I have a slight headache\", \"3\": 2}','2024-10-08 09:36:44','2024-10-08 09:36:44'),(2,2,2,'{\"1\": \"I like the flexible hours\", \"2\": \"Health Insurance\"}','2024-10-08 09:36:44','2024-10-08 09:36:44'),(3,3,4,'{\"1\": 4, \"2\": \"Yes\"}','2024-10-08 09:36:44','2024-10-08 09:36:44'),(4,4,2,'{\"1\": 5, \"2\": \"Yes\"}','2024-10-08 09:36:44','2024-10-08 09:36:44'),(5,5,4,'{\"1\": 4, \"2\": \"Gym\"}','2024-10-08 09:36:44','2024-10-08 09:36:44'),(6,5,2,'{\"10\": 4, \"11\": \"Gym\"}','2024-10-08 15:12:06','2024-10-08 15:12:06'),(10,19,2,'{\"24\": 3, \"25\": \"sasa\", \"26\": \"2\"}','2024-10-09 02:39:50','2024-10-09 02:39:50'),(11,19,4,'{\"24\": \"\", \"25\": \"\", \"26\": \"\"}','2024-10-09 02:41:18','2024-10-09 02:41:18'),(12,21,2,'{\"28\": \"4\"}','2024-10-09 02:58:55','2024-10-09 02:58:55'),(13,22,2,'{\"29\": \"wq\", \"30\": \"asd\", \"31\": 3}','2024-10-09 03:10:24','2024-10-09 03:10:24');
/*!40000 ALTER TABLE `SurveyResponse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `User`
--

LOCK TABLES `User` WRITE;
/*!40000 ALTER TABLE `User` DISABLE KEYS */;
INSERT INTO `User` (`id`, `username`, `email`, `password`, `role`, `createdAt`, `updatedAt`) VALUES (1,'johndoe','john@example.com','$2b$12$Cm1GQaPd1diWm1FM7XV.VO/mIEeFawnxyxlfkmgVGWrzulY/9N2rC','doctor','2024-10-08 09:36:44','2024-10-08 09:36:44'),(2,'janedoe','jane@example.com','$2b$12$whTpwxe.KUqjR3lKdMPFnuhoKFHUK3e30KcCrehSuLQcMxmcAPxby','patient','2024-10-08 09:36:44','2024-10-08 09:36:44'),(3,'drrichard','richard@example.com','$2b$12$DqgvghzPp72HunTwLniw7.GVpC072fwsqMlfDVaKA3lHF5TWaidMW','doctor','2024-10-08 09:36:44','2024-10-08 09:36:44'),(4,'emilydoe','emily@example.com','$2b$12$H7xvnRDD95vx7h0kH7PItuqLapQYcllMRXPWzeaE.M2k.KLNSXqe6','patient','2024-10-08 09:36:44','2024-10-08 09:36:44'),(5,'drsusan','susan@example.com','$2b$12$H7m0LZ7vO4j.OqPFoZBr0eVZWED8heDiYaTazFsBujD4IWQaaY/Bu','doctor','2024-10-08 09:36:44','2024-10-08 09:36:44');
/*!40000 ALTER TABLE `User` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-08 22:46:13
