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
-- Temporary view structure for view `onlineorderview`
--

DROP TABLE IF EXISTS `onlineorderview`;
/*!50001 DROP VIEW IF EXISTS `onlineorderview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `onlineorderview` AS SELECT 
 1 AS `oo_id`,
 1 AS `oo_cust_id`,
 1 AS `oo_date`,
 1 AS `oo_time`,
 1 AS `oo_price`,
 1 AS `oo_status`,
 1 AS `oo_phnumber`,
 1 AS `oo_address`,
 1 AS `dishes_ID`,
 1 AS `o.order_ID`,
 1 AS `o_qty`,
 1 AS `dish_id`,
 1 AS `dish_name`,
 1 AS `dish_desc`,
 1 AS `dish_price`,
 1 AS `cust_id`,
 1 AS `cust_name`,
 1 AS `cust_number`,
 1 AS `cust_address`,
 1 AS `cust_email`,
 1 AS `cust_password`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `orderview`
--

DROP TABLE IF EXISTS `orderview`;
/*!50001 DROP VIEW IF EXISTS `orderview`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `orderview` AS SELECT 
 1 AS `order_id`,
 1 AS `order_price`,
 1 AS `order_date`,
 1 AS `order_time`,
 1 AS `d_ID`,
 1 AS `o_ID`,
 1 AS `qty`,
 1 AS `dish_id`,
 1 AS `dish_name`,
 1 AS `dish_desc`,
 1 AS `dish_price`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `onlineorderview`
--

/*!50001 DROP VIEW IF EXISTS `onlineorderview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `onlineorderview` AS select `a`.`oo_id` AS `oo_id`,`a`.`oo_cust_id` AS `oo_cust_id`,`a`.`oo_date` AS `oo_date`,`a`.`oo_time` AS `oo_time`,`a`.`oo_price` AS `oo_price`,`a`.`oo_status` AS `oo_status`,`a`.`oo_phnumber` AS `oo_phnumber`,`a`.`oo_address` AS `oo_address`,`b`.`dishes_ID` AS `dishes_ID`,`b`.`o.order_ID` AS `o.order_ID`,`b`.`o_qty` AS `o_qty`,`c`.`dish_id` AS `dish_id`,`c`.`dish_name` AS `dish_name`,`c`.`dish_desc` AS `dish_desc`,`c`.`dish_price` AS `dish_price`,`d`.`cust_id` AS `cust_id`,`d`.`cust_name` AS `cust_name`,`d`.`cust_number` AS `cust_number`,`d`.`cust_address` AS `cust_address`,`d`.`cust_email` AS `cust_email`,`d`.`cust_password` AS `cust_password` from (((`onlineorders` `a` join `onlineorder_has_dishes` `b`) join `dishes` `c`) join `customers` `d`) where ((`a`.`oo_id` = `b`.`o.order_ID`) and (`b`.`dishes_ID` = `c`.`dish_id`) and (`a`.`oo_cust_id` = `d`.`cust_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `orderview`
--

/*!50001 DROP VIEW IF EXISTS `orderview`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `orderview` AS select `a`.`order_id` AS `order_id`,`a`.`order_price` AS `order_price`,`a`.`order_date` AS `order_date`,`a`.`order_time` AS `order_time`,`b`.`d_ID` AS `d_ID`,`b`.`o_ID` AS `o_ID`,`b`.`qty` AS `qty`,`c`.`dish_id` AS `dish_id`,`c`.`dish_name` AS `dish_name`,`c`.`dish_desc` AS `dish_desc`,`c`.`dish_price` AS `dish_price` from ((`orders` `a` join `order_has_dishes` `b`) join `dishes` `c`) where ((`a`.`order_id` = `b`.`o_ID`) and (`b`.`d_ID` = `c`.`dish_id`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-07  3:43:17
