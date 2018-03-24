/*
Navicat MySQL Data Transfer

Source Server         : Aliyun
Source Server Version : 50718
Source Host           : 119.23.232.219:3306
Source Database       : order_system

Target Server Type    : MYSQL
Target Server Version : 50718
File Encoding         : 65001

Date: 2018-03-24 16:47:50
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for attachments
-- ----------------------------
DROP TABLE IF EXISTS `attachments`;
CREATE TABLE `attachments` (
  `id` varchar(255) NOT NULL,
  `user_id` int(11) NOT NULL,
  `year` varchar(255) NOT NULL,
  `month` varchar(255) NOT NULL,
  `date` varchar(255) NOT NULL,
  `extname` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `attachments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for bills
-- ----------------------------
DROP TABLE IF EXISTS `bills`;
CREATE TABLE `bills` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `payment_type` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `payment_type` (`payment_type`),
  CONSTRAINT `bills_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `bills_ibfk_2` FOREIGN KEY (`payment_type`) REFERENCES `payment_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` varchar(255) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `sender_info_id` int(11) NOT NULL,
  `receiver_id` int(11) NOT NULL,
  `receiver_info_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `details` text NOT NULL,
  `address` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `has_paid` tinyint(1) NOT NULL DEFAULT '0',
  `has_refunded` tinyint(1) NOT NULL DEFAULT '0',
  `has_finished` tinyint(1) NOT NULL DEFAULT '0',
  `has_evaluated` tinyint(1) NOT NULL DEFAULT '0',
  `amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  KEY `sender_id` (`sender_id`),
  KEY `sender_info_id` (`sender_info_id`),
  KEY `receiver_id` (`receiver_id`),
  KEY `receiver_info_id` (`receiver_info_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`sender_info_id`) REFERENCES `user_infos` (`id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`receiver_info_id`) REFERENCES `user_infos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for payment_types
-- ----------------------------
DROP TABLE IF EXISTS `payment_types`;
CREATE TABLE `payment_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for recipe_categories
-- ----------------------------
DROP TABLE IF EXISTS `recipe_categories`;
CREATE TABLE `recipe_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipe_categories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for recipe_evaluations
-- ----------------------------
DROP TABLE IF EXISTS `recipe_evaluations`;
CREATE TABLE `recipe_evaluations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_info_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT '5',
  `content` varchar(255) NOT NULL,
  `is_auto` tinyint(1) NOT NULL DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `user_info_id` (`user_info_id`),
  KEY `target_id` (`target_id`),
  CONSTRAINT `recipe_evaluations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `recipe_evaluations_ibfk_2` FOREIGN KEY (`user_info_id`) REFERENCES `user_infos` (`id`),
  CONSTRAINT `recipe_evaluations_ibfk_3` FOREIGN KEY (`target_id`) REFERENCES `recipes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for recipes
-- ----------------------------
DROP TABLE IF EXISTS `recipes`;
CREATE TABLE `recipes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `avatar` varchar(255) DEFAULT NULL,
  `content` text,
  `status` int(11) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `recipe_categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for SequelizeMeta
-- ----------------------------
DROP TABLE IF EXISTS `SequelizeMeta`;
CREATE TABLE `SequelizeMeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Table structure for user_evaluations
-- ----------------------------
DROP TABLE IF EXISTS `user_evaluations`;
CREATE TABLE `user_evaluations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `user_info_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `score` int(11) NOT NULL DEFAULT '5',
  `content` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `is_auto` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `user_info_id` (`user_info_id`),
  KEY `target_id` (`target_id`),
  CONSTRAINT `user_evaluations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `user_evaluations_ibfk_2` FOREIGN KEY (`user_info_id`) REFERENCES `user_infos` (`id`),
  CONSTRAINT `user_evaluations_ibfk_3` FOREIGN KEY (`target_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_infos
-- ----------------------------
DROP TABLE IF EXISTS `user_infos`;
CREATE TABLE `user_infos` (
  `id` int(11) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `birthday` datetime DEFAULT NULL,
  `sex` int(11) NOT NULL DEFAULT '0',
  `address` varchar(255) DEFAULT '',
  `contact` varchar(255) DEFAULT '',
  `intro` varchar(255) DEFAULT '',
  `avatar` varchar(255) DEFAULT '',
  `banner` text,
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  CONSTRAINT `user_infos_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_secrets
-- ----------------------------
DROP TABLE IF EXISTS `user_secrets`;
CREATE TABLE `user_secrets` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  UNIQUE KEY `phone` (`phone`),
  UNIQUE KEY `email` (`email`),
  CONSTRAINT `user_secrets_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user_types
-- ----------------------------
DROP TABLE IF EXISTS `user_types`;
CREATE TABLE `user_types` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) DEFAULT NULL,
  `type` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `password_salt` varchar(255) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `balance` decimal(10,2) NOT NULL DEFAULT '0.00',
  `created_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  `updated_at` datetime NOT NULL DEFAULT '2018-03-08 02:33:56',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  KEY `parent_id` (`parent_id`),
  KEY `type` (`type`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `users` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`type`) REFERENCES `user_types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10005 DEFAULT CHARSET=utf8;
