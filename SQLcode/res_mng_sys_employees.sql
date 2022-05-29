CREATE DATABASE  IF NOT EXISTS `res_mng_sys` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `res_mng_sys`;
-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: res_mng_sys
-- ------------------------------------------------------
-- Server version	8.0.27

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
-- Table structure for table `employees`
--

DROP TABLE IF EXISTS `employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employees` (
  `emp_id` int NOT NULL,
  `empcat_id` int DEFAULT NULL,
  `emp_name` varchar(255) NOT NULL,
  `hire_date` date DEFAULT NULL,
  `CNIC_no` varchar(15) DEFAULT NULL,
  `emp_phone_no` varchar(15) DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `emp_email` varchar(100) NOT NULL,
  `emp_password` varchar(100) NOT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `empcat_id_idx` (`empcat_id`),
  CONSTRAINT `empcat_id` FOREIGN KEY (`empcat_id`) REFERENCES `employeecategories` (`emp_cat_id`),
  CONSTRAINT `check_cnic` CHECK (((`CNIC_no` like _utf8mb4'_____-_______-_') and (length(`CNIC_no`) = 15))),
  CONSTRAINT `check_emp_email` CHECK ((`emp_email` like _utf8mb4'%_@__%.__%')),
  CONSTRAINT `check_emp_no` CHECK (((`emp_phone_no` like _utf8mb4'03%') and (length(`emp_phone_no`) = 11))),
  CONSTRAINT `check_emp_pass` CHECK ((length(`emp_password`) >= 8)),
  CONSTRAINT `check_emp_salary` CHECK ((`salary` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employees`
--

LOCK TABLES `employees` WRITE;
/*!40000 ALTER TABLE `employees` DISABLE KEYS */;
/*!40000 ALTER TABLE `employees` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-07  3:43:15
