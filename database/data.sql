\c wsp012_project

/*do not copy

brand_id: 1 = canon, 2 = leica, 3 = rollei, 4 = fujifilm, 5 = nikon, 6 = olympus, 7 = kodak
origin_id: 1 = japan, 2 = germany, 3 = usa
format_id: 1 = 135mm, 2 = digital

do not copy*/

INSERT INTO member (username,password,nickname,email)
    VALUES ('michael', '12345678', 'mickkkkkk', 'mick@example.com');

INSERT INTO admin (admin_name,password)
    VALUES ('admin1', '12345678');
    
INSERT INTO brand (brand_name, brand_logo)
    VALUES  ('canon', 'WSP012/photo/CameraLogo/canon.png'),
    ('leica', 'WSP012/photo/CameraLogo/leica.png'), 
    ('rollei', 'WSP012/photo/CameraLogo/rollei.png'), 
    ('fujifilm', '/WSP012/photo/Cameralogo/fujifilm.png'), 
    ('nikon', 'WSP012/photo/CameraLogo/nikon.png'), 
    ('olympus', 'WSP012/photo/CameraLogo/olympus.png'), 
    ('kodak', 'WSP012/photo/CameraLogo/kodak.png');

/*
UPDATE brand
SET brand_logo = 'WSP012/photo/Logo/canon.png'
WHERE brand_name = 'canon';*/

INSERT INTO origin (id, origin_country)
    VALUES (1, 'japan'), (2, 'germany'), (3, 'usa');


INSERT INTO format (id, format_name)
    VALUES (1, '135mm'), (2, 'digital');

    
/*相機*/
INSERT INTO product (product_name,product_type,camera_type,brand_id,origin_id,format_id,product_price,product_quantity,production_year,weight,pixel,is_used) 
    VALUES ('Canon Canonet QL17 GIII','camera','film',1,1,1,2000,1,1972,620,0,true),
    ('Leica M3','camera','film',2,2,1,3000,1,1954,580,0,true);
    -- ('Rollei 35','camera','film',3,2,1,2500,1,1966,370,0,0,true),
    -- ('Fujifilm finepix 2700','camera','digital',4,1,2,1500,1,1999,250,0,0,true),
    -- ('Nikon coolpix 2700','camera','digital',5,1,2,1200,1,2013,125,0,0,true),
    -- ('Olympus fe-3010','camera','digital',6,1,2,800,1,2009,108,0,0,true),
    -- ('Nikon coolpix s2', 'camera', 'digital', 5,1,2,80 ̰,1,2005,160,0,0,true),
    -- ('Canon IXY digital 800IS', 'camera', 'digital',1,1,2,1400,1,2006,195,0,0,true),
    -- ('Fujifilm z700 EXR', 'camera', 'digital',4,1,2,1500,1,2010,158,0,0,true);


/*菲林*/
INSERT INTO product (product_name,product_type,brand_id,origin_id,format_id,product_price,product_quantity,iso,is_used) 
    VALUES ('Fujifilm color 100', 'film',4,1,1,100,20,100,false),
    ('Fujifilm Superia Venus 800', 'film', 4,1,1,150,10,800,false);
    -- ('Fujifilm Superia 400', 'film', 4,1,1,120,20,400,false),
    -- ('Kodak colour plus 200', 'film', 7,3,1,120,40,200,false),
    -- ('Kodak gold 200', 'film', 7,3,1,100,50,200,false),
    -- ('Kodak ultramax 400', 'film', 7,3,1,140,20,400,false);


INSERT INTO product_image (product_id, image_path) 
    VALUES 
    (1,'photo/Camera/filmcamera/CanonCanonetQL17a1.webp'), 
    (1,'photo/Camera/filmcamera/CanonCanonetQL17a2.webp');
    -- (3,'photo/Camera/filmcamera/CanonCanonetQL17a3.webp'),
    -- (4, 'WSP012/photo/Camera/filmcamera/CanonCanonetQL17a4.webp'),
    -- (5, 'WSP012/photo/Camera/filmcamera/CanonCanonetQL17a5.webp'),
    -- (6, 'WSP012/photo/Camera/filmcamera/CanonCanonetQL17a6.webp'),
    -- (7, 'WSP012/photo/Camera/filmcamera/CanonCanonetQL17a7.webp'),
    -- (2, 'photo/Camera/filmcamera/leicaM3b1.webp'),
    -- (9, 'WSP012/photo/Camera/filmcamera/leicaM3b2.webp'),
    -- (10, 'WSP012/photo/Camera/filmcamera/leicaM3b3.webp'),
    -- (11, 'WSP012/photo/Camera/filmcamera/leicaM3b4.webp'),
    -- (12, 'WSP012/photo/Camera/filmcamera/leicaM3b5.webp'),
    -- (13, 'WSP012/photo/Camera/filmcamera/leicaM3b6.webp'),
    -- (14, 'WSP012/photo/Camera/filmcamera/leicaM3b7.webp'),
    -- (15, 'WSP012/photo/Camera/filmcamera/Rollei35c1.webp'),
    -- (16, 'WSP012/photo/Camera/filmcamera/Rollei35c2.webp'),
    -- (17, 'WSP012/photo/Camera/filmcamera/Rollei35c3.webp'),
    -- (18, 'WSP012/photo/Camera/filmcamera/Rollei35c4.webp'),
    -- (19, 'WSP012/photo/Camera/filmcamera/Rollei35c5.webp'),
    -- (20, 'WSP012/photo/Camera/filmcamera/Rollei35c6.webp'),
    -- (21, 'WSP012/photo/Camera/filmcamera/Rollei35c7.webp'),
    -- (22, 'WSP012/photo/Camera/digitalcamera/camA1.jpg'),
    -- (23, 'WSP012/photo/Camera/digitalcamera/camA2.jpg'),
    -- (24, 'WSP012/photo/Camera/digitalcamera/camA3.jpg'),
    -- (25, 'WSP012/photo/Camera/digitalcamera/camA4.jpg'),
    -- (26, 'WSP012/photo/Camera/digitalcamera/camA5.jpg'),
    -- (27, 'WSP012/photo/Camera/digitalcamera/camB1.jpg'),
    -- (28, 'WSP012/photo/Camera/digitalcamera/camB2.jpg'),
    -- (29, 'WSP012/photo/Camera/digitalcamera/camB3.jpg'),
    -- (30, 'WSP012/photo/Camera/digitalcamera/camB4.jpg'),
    -- (31, 'WSP012/photo/Camera/digitalcamera/camC1.jpg'),
    -- (32, 'WSP012/photo/Camera/digitalcamera/camC2.jpg'),
    -- (33, 'WSP012/photo/Camera/digitalcamera/camC3.jpg'),
    -- (34, 'WSP012/photo/Camera/digitalcamera/camC4.jpg'),
    -- (35, 'WSP012/photo/Camera/digitalcamera/camD1.jpg'),
    -- (36, 'WSP012/photo/Camera/digitalcamera/camD2.jpg'),
    -- (37, 'WSP012/photo/Camera/digitalcamera/camD3.jpg'),
    -- (38, 'WSP012/photo/Camera/digitalcamera/camD4.jpg'),
    -- (39, 'WSP012/photo/Camera/digitalcamera/camE1.jpg'),
    -- (40, 'WSP012/photo/Camera/digitalcamera/camE2.jpg'),
    -- (41, 'WSP012/photo/Camera/digitalcamera/camE3.jpg'),
    -- (42, 'WSP012/photo/Camera/digitalcamera/camE4.jpg'),
    -- (43, 'WSP012/photo/Camera/digitalcamera/camF1.jpg'),
    -- (44, 'WSP012/photo/Camera/digitalcamera/camF2.jpg'),
    -- (45, 'WSP012/photo/Camera/digitalcamera/camF3.jpg'),
    -- (46, 'WSP012/photo/Camera/digitalcamera/camF4.jpg'),
    -- (47, 'WSP012/photo/film/fujicolor100.webp'),
    -- (48, 'WSP012/photo/film/fujicolorSuperiaVenus800.webp');
    -- (49, 'WSP012/photo/film/fujifilmSuperia400.webp'),
    -- (50, 'WSP012/photo/film/kodakcolourplus200.webp'),
    -- (51, 'WSP012/photo/film/kodakgold200.webp'),
    -- (52, 'WSP012/photo/film/kodakultramax400.webp');





