-- Generation time: Wed, 09 Jan 2019 13:31:24 +0000
-- Host: mysql.hostinger.ro
-- DB name: u574849695_22
/*!40030 SET NAMES UTF8 */;
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `pictures`;
CREATE TABLE `pictures` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pic` longtext COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(9) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO `pictures` VALUES ('1','http://lorempixel.com/400/300/people/','181'),
('2','http://lorempixel.com/400/300/people/','106'),
('3','http://lorempixel.com/400/300/people/','189'),
('4','http://lorempixel.com/400/300/people/','167'),
('5','http://lorempixel.com/400/300/people/','128'),
('6','http://lorempixel.com/400/300/people/','132'),
('7','http://lorempixel.com/400/300/people/','125'),
('8','http://lorempixel.com/400/300/people/','200'),
('9','http://lorempixel.com/400/300/people/','184'),
('10','http://lorempixel.com/400/300/people/','186'),
('11','http://lorempixel.com/400/300/people/','198'),
('12','http://lorempixel.com/400/300/people/','120'),
('13','http://lorempixel.com/400/300/people/','101'),
('14','http://lorempixel.com/400/300/people/','177'),
('15','http://lorempixel.com/400/300/people/','197'),
('16','http://lorempixel.com/400/300/people/','138'),
('17','http://lorempixel.com/400/300/people/','126'),
('18','http://lorempixel.com/400/300/people/','114'),
('19','http://lorempixel.com/400/300/people/','191'),
('20','http://lorempixel.com/400/300/people/','133'),
('21','http://lorempixel.com/400/300/people/','187'),
('22','http://lorempixel.com/400/300/people/','171'),
('23','http://lorempixel.com/400/300/people/','121'),
('24','http://lorempixel.com/400/300/people/','119'),
('25','http://lorempixel.com/400/300/people/','199'),
('26','http://lorempixel.com/400/300/people/','105'),
('27','http://lorempixel.com/400/300/people/','124'),
('28','http://lorempixel.com/400/300/people/','115'),
('29','http://lorempixel.com/400/300/people/','116'),
('30','http://lorempixel.com/400/300/people/','188'),
('31','http://lorempixel.com/400/300/people/','193'),
('32','http://lorempixel.com/400/300/people/','150'),
('33','http://lorempixel.com/400/300/people/','165'),
('34','http://lorempixel.com/400/300/people/','153'),
('35','http://lorempixel.com/400/300/people/','190'),
('36','http://lorempixel.com/400/300/people/','104'),
('37','http://lorempixel.com/400/300/people/','156'),
('38','http://lorempixel.com/400/300/people/','192'),
('39','http://lorempixel.com/400/300/people/','182'),
('40','http://lorempixel.com/400/300/people/','137'),
('41','http://lorempixel.com/400/300/people/','180'),
('42','http://lorempixel.com/400/300/people/','129'),
('43','http://lorempixel.com/400/300/people/','176'),
('44','http://lorempixel.com/400/300/people/','134'),
('45','http://lorempixel.com/400/300/people/','178'),
('46','http://lorempixel.com/400/300/people/','147'),
('47','http://lorempixel.com/400/300/people/','136'),
('48','http://lorempixel.com/400/300/people/','131'),
('49','http://lorempixel.com/400/300/people/','145'),
('50','http://lorempixel.com/400/300/people/','155'),
('51','http://lorempixel.com/400/300/people/','183'),
('52','http://lorempixel.com/400/300/people/','144'),
('53','http://lorempixel.com/400/300/people/','122'),
('54','http://lorempixel.com/400/300/people/','164'),
('55','http://lorempixel.com/400/300/people/','173'),
('56','http://lorempixel.com/400/300/people/','117'),
('57','http://lorempixel.com/400/300/people/','163'),
('58','http://lorempixel.com/400/300/people/','127'),
('59','http://lorempixel.com/400/300/people/','107'),
('60','http://lorempixel.com/400/300/people/','135'),
('61','http://lorempixel.com/400/300/people/','159'),
('62','http://lorempixel.com/400/300/people/','175'),
('63','http://lorempixel.com/400/300/people/','109'),
('64','http://lorempixel.com/400/300/people/','103'),
('65','http://lorempixel.com/400/300/people/','139'),
('66','http://lorempixel.com/400/300/people/','157'),
('67','http://lorempixel.com/400/300/people/','111'),
('68','http://lorempixel.com/400/300/people/','172'),
('69','http://lorempixel.com/400/300/people/','146'),
('70','http://lorempixel.com/400/300/people/','194'),
('71','http://lorempixel.com/400/300/people/','174'),
('72','http://lorempixel.com/400/300/people/','151'),
('73','http://lorempixel.com/400/300/people/','179'),
('74','http://lorempixel.com/400/300/people/','112'),
('75','http://lorempixel.com/400/300/people/','185'),
('76','http://lorempixel.com/400/300/people/','162'),
('77','http://lorempixel.com/400/300/people/','196'),
('78','http://lorempixel.com/400/300/people/','141'),
('79','http://lorempixel.com/400/300/people/','161'),
('80','http://lorempixel.com/400/300/people/','154'),
('81','http://lorempixel.com/400/300/people/','113'),
('82','http://lorempixel.com/400/300/people/','195'),
('83','http://lorempixel.com/400/300/people/','152'),
('84','http://lorempixel.com/400/300/people/','166'),
('85','http://lorempixel.com/400/300/people/','108'),
('86','http://lorempixel.com/400/300/people/','142'),
('87','http://lorempixel.com/400/300/people/','170'),
('88','http://lorempixel.com/400/300/people/','118'),
('89','http://lorempixel.com/400/300/people/','158'),
('90','http://lorempixel.com/400/300/people/','102'),
('91','http://lorempixel.com/400/300/people/','149'),
('92','http://lorempixel.com/400/300/people/','148'),
('93','http://lorempixel.com/400/300/people/','130'),
('94','http://lorempixel.com/400/300/people/','160'),
('95','http://lorempixel.com/400/300/people/','168'),
('96','http://lorempixel.com/400/300/people/','143'),
('97','http://lorempixel.com/400/300/people/','123'),
('98','http://lorempixel.com/400/300/people/','110'),
('99','http://lorempixel.com/400/300/people/','140'),
('100','http://lorempixel.com/400/300/people/','169'); 




/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

