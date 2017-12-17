/*
Navicat MySQL Data Transfer

Source Server         : MySQL
Source Server Version : 50720
Source Host           : localhost:3306
Source Database       : order_system

Target Server Type    : MYSQL
Target Server Version : 50720
File Encoding         : 65001

Date: 2017-12-17 23:52:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for bill
-- ----------------------------
DROP TABLE IF EXISTS `bill`;
CREATE TABLE `bill` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pid` bigint(20) NOT NULL COMMENT '商家/客户ID',
  `name` varchar(255) NOT NULL COMMENT '标题',
  `amount` bigint(20) NOT NULL COMMENT '金额（保留两位*100）',
  `balance_before` bigint(20) NOT NULL COMMENT '之前余额（保留两位*100）',
  `balance_after` bigint(20) NOT NULL COMMENT '之后余额（保留两位*100）',
  `type` tinyint(4) NOT NULL COMMENT '收支类型 0.收入 1.支出',
  `createdAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建日期',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of bill
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sid` bigint(20) NOT NULL COMMENT '商家ID',
  `cid` bigint(20) NOT NULL COMMENT '客户ID',
  `detail` longtext NOT NULL COMMENT '订单内容（菜单ID与个数）',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '用户订单状态 0.发起 1.已支付 2.已完成 3.取消 4.已取消 5.已评价',
  `paid_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '支付类型 0.未支付 1.微信支付 2.支付宝支付',
  `bid` bigint(20) DEFAULT NULL COMMENT '账单ID',
  `has_refunded` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否取消 0.未取消 1.已取消',
  `has_finished` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否完成 0.未完成 1.完成',
  `has_evaluated` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否评价 0.未评价 1.已评价',
  `amount` bigint(20) NOT NULL DEFAULT '0' COMMENT '金额（保留两位小数*100）',
  `createdAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `fk_order_cid` (`cid`),
  KEY `fk_order_sid` (`sid`),
  KEY `fk_order_bid` (`bid`),
  CONSTRAINT `fk_order_bid` FOREIGN KEY (`bid`) REFERENCES `bill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_cid` FOREIGN KEY (`cid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_order_sid` FOREIGN KEY (`sid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=880000000001 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for recipe
-- ----------------------------
DROP TABLE IF EXISTS `recipe`;
CREATE TABLE `recipe` (
  `id` bigint(20) NOT NULL,
  `pid` bigint(20) NOT NULL COMMENT '商家ID',
  `cid` bigint(20) NOT NULL COMMENT '类别ID',
  `name` varchar(255) NOT NULL COMMENT '标题',
  `price` bigint(20) NOT NULL DEFAULT '0' COMMENT '价格（保留两位*100）',
  `avatar` varchar(255) DEFAULT NULL COMMENT '菜单图标',
  `content` longtext COMMENT '介绍',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态 0.正常 1.下架',
  PRIMARY KEY (`id`),
  KEY `fk_recipe_pid` (`pid`),
  KEY `fk_recipe_cid` (`cid`),
  CONSTRAINT `fk_recipe_cid` FOREIGN KEY (`cid`) REFERENCES `recipe_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_recipe_pid` FOREIGN KEY (`pid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recipe
-- ----------------------------

-- ----------------------------
-- Table structure for recipe_category
-- ----------------------------
DROP TABLE IF EXISTS `recipe_category`;
CREATE TABLE `recipe_category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pid` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL COMMENT '分类名',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态 0.正常 1.删除',
  PRIMARY KEY (`id`),
  KEY `fk_recipe_category_pid` (`pid`),
  CONSTRAINT `fk_recipe_category_pid` FOREIGN KEY (`pid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recipe_category
-- ----------------------------

-- ----------------------------
-- Table structure for recipe_evaluate
-- ----------------------------
DROP TABLE IF EXISTS `recipe_evaluate`;
CREATE TABLE `recipe_evaluate` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pid` bigint(20) NOT NULL,
  `rid` bigint(20) NOT NULL,
  `score` tinyint(4) NOT NULL DEFAULT '0' COMMENT '评分 0-5',
  `content` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态 0.正常 1.删除',
  PRIMARY KEY (`id`),
  KEY `fk_recipe_evaluate_pid` (`pid`),
  KEY `fk_recipe_evaluate` (`rid`),
  CONSTRAINT `fk_recipe_evaluate` FOREIGN KEY (`rid`) REFERENCES `recipe` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_recipe_evaluate_pid` FOREIGN KEY (`pid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of recipe_evaluate
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` int(11) NOT NULL,
  `uid` varchar(255) NOT NULL COMMENT '用户名',
  `pwd` varchar(255) NOT NULL COMMENT '密码',
  `pwd_salt` varchar(255) NOT NULL COMMENT '密码盐',
  `createdAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '创建时间',
  `updatedAt` datetime NOT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `phone` varchar(255) DEFAULT NULL COMMENT '手机',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '账号状态 0.正常 1.锁定 2.注销',
  `balance` bigint(20) NOT NULL DEFAULT '0' COMMENT '账户余额（保留两位*100）',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_user_email` (`email`),
  UNIQUE KEY `uq_user_phone` (`phone`),
  KEY `fk_user_type` (`type`),
  CONSTRAINT `fk_user_type` FOREIGN KEY (`type`) REFERENCES `user_type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10003 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `id` bigint(20) NOT NULL,
  `nickname` varchar(255) DEFAULT NULL COMMENT '昵称',
  `birthday` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP COMMENT '生日',
  `sex` tinyint(4) DEFAULT '0' COMMENT '性别：0.未知 1.男 2.女',
  `address` varchar(255) DEFAULT NULL COMMENT '地址',
  `intro` varchar(255) DEFAULT '' COMMENT '介绍',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_info_id` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_info
-- ----------------------------

-- ----------------------------
-- Table structure for user_type
-- ----------------------------
DROP TABLE IF EXISTS `user_type`;
CREATE TABLE `user_type` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_type
-- ----------------------------
INSERT INTO `user_type` VALUES ('0', '商家');
INSERT INTO `user_type` VALUES ('1', '客户');
INSERT INTO `user_type` VALUES ('9', '管理员');
