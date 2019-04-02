#设置链接服务器的编码
SET NAMES UTF8;
#丢弃数据库smallmi,如果存在
DROP DATABASE IF EXISTS smallmi;
#创建数据库smallmi，设置存储编码
CREATE DATABASE smallmi CHARSET=UTF8;
#进入数据库
USE smallmi;
#创建部门表
#用户注册信息表
CREATE TABLE xm_user(
	uid INT PRIMARY KEY AUTO_INCREMENT,
	uname VARCHAR(32),
	upwd  VARCHAR(32),
	upwd1 VARCHAR(32),
	uphone VARCHAR(16)
);
#首页明星单品
CREATE TABLE xm_only_star(
	oid INT PRIMARY KEY AUTO_INCREMENT,
	opicture VARCHAR(128),
	oname VARCHAR(128),
	odetails VARCHAR(128),
	opic VARCHAR(128)
);
INSERT INTO xm_only_star VALUES
('1','../image/pinpai1.png','小米MIX','5月9日-21日享花呗12期分期免息','3499元起'),
('2','../image/pinpai2.png','小米5S','5月9日-10日下单立减200元','1999元'),
('3','../image/pinpai3.png','小米手机5 64GB','5月9日-10日下单立减100元','1799元起'),
('4','../image/pinpai4.png','小米电视3s 55英寸','5月9日下单立减200元','3499元起'),
('5','../image/pinpai5.png','小米笔记本电脑','更轻更薄想杂志一样随身携带','3599元起');
#用户个人中心
CREATE TABLE xm_user_details(
	did INT PRIMARY KEY NOT NULL AUTO_INCREMENT,   
	danme VARCHAR(32) UNIQUE,
	dpwd VARCHAR(32),
	dphone VARCHAR(16) UNIQUE,
	demail VARCHAR(32) UNIQUE,
	dsignature VARCHAR(128),
	dhobby VARCHAR(128),
	dsite VARCHAR(128)
);
#用户购物车
CREATE TABLE xm_user_shoppingcat(
	sid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	picture VARCHAR(128),
	typeA VARCHAR(128),
	details VARCHAR(128),
	price DECIMAL(10,2),
	uid INT
);
#用户订单
CREATE TABLE xm_user_order(
	oid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	uname VARCHAR(128),
	oname VARCHAR(128),
	ostatus INT,
	oprice DECIMAL(10,2),
	otime DATETIME
);
#小米手机列表
CREATE TABLE xm_phone_list(
	lid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	picture VARCHAR(128),
	typeA VARCHAR(128),
	details VARCHAR(128),
	price DECIMAL(10,2)
);
INSERT INTO xm_phone_list VALUES
('1','../image/liebiao_xiaomi6.jpg','小米6','5.16早十点开售,下单立减100元',2499.00),
('2','../image/liebiao_xiaomi5c.jpg','小米手机5c','搭载澎湃S1八核高性能处理器',2799.00),
('3','../image/liebiao_xiaomint2.jpg','小米Note2','5月9号-20号小米note2享花呗12期分期免息',2499.00),
('4','../image/liebiao_xiaomimix.jpg','小米MIX','5月9号-20号小米MIX享花呗12期分期免息',3499.00),
('5','../image/liebiao_xiaomi5s.jpg','小米5s','暗夜之眼超感光相机/无孔式超声波',1999.00),
('6','../image/liebiao_xiaomi5.jpg','小米手机5','骁龙820处理器/UF8 2.0 闪存',1799.00),
('7','../image/liebiao_hongmin4.jpg','红米Note4','十核旗舰处理器/UF8 2.0 闪存',1399.00),
('8','../image/pinpai3.png','小米手机5 64GB','5月9日-10日下单立减100元',1799.00),
('9','../image/liebiao_hongmin42.jpg','红米4','2.5D玻璃，金属一体化机身',999.00),
('10','../image/liebiao_hongmin4x.jpg','红米Note 4X 全网通版','多彩金属/4200mAh超长续航',1299.00);
#小米手机详情
CREATE TABLE xm_phone_details(
	pid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	picture VARCHAR(128),
	typeA VARCHAR(128),
	details VARCHAR(1000),
	price  DECIMAL(10,2),
	versions VARCHAR(128),
	color VARCHAR(64)
);
INSERT INTO xm_phone_details VALUES
(NULL,'./img/liebiao_xiaomi6.jpg','小米6','的股份大股东的','2499.00','全网通版6GB+64GB','亮黑色');
#首页轮播图
CREATE TABLE xm_list_slideshow(
	sid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	picture VARCHAR(128)
);

INSERT INTO xm_list_slideshow VALUES
('1','./img/banner.jpg'),
('2','./img/banner2.jpg'),
('3','./img/pinghengche.jpg'),
('4','./img/xiaomi5.jpg'),
('5','./img/hongmi4x.png'),
('6','./img/peijian1.jpg'),
('7','./img/peijian6.png'),
('8','./img/hongmin4.png'),
('9','./img/liulangengduo.png');

#小米配件
CREATE TABLE xm_peijian(
	jid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	picture VARCHAR(128),
	jname VARCHAR(64),
	price DECIMAL(10,2),
	enumber INT 
);
INSERT INTO xm_peijian VALUES
('1','./img/liebiao_xiaomi6.jpg','小米6 硅胶保护套',49.00,372),
('2','./img/liebiao_xiaomi6.jpg','小米手机4c 小米4c 智能',29.00,345),
('3','./img/liebiao_xiaomi6.jpg','红米NOTE 4X 红米note4X',19.00,433),
('4','./img/liebiao_xiaomi6.jpg','小米支架式自拍杆',89.00,345),
('5','./img/liebiao_xiaomi6.jpg','小米指环支架',19.00,456),
('6','./img/liebiao_xiaomi6.jpg','米家随身风扇',19.00,63),
('7','./img/liebiao_xiaomi6.jpg','红米4X 高透软胶保护套',59.00,432);
