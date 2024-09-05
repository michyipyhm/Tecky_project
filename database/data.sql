\c wsp012_project

/*do not copy

brand_id: 1 = canon, 2 = leica, 3 = rollei, 4 = fujifilm, 5 = nikon, 6 = olympus, 7 = kodak
origin_id: 1 = japan, 2 = germany, 3 = usa
format_id: 1 = 135mm, 2 = digital

do not copy*/
    
INSERT INTO brand (brand_name, brand_logo)
    VALUES  ('canon', '../photo/CameraLogo/canon.png'),
    ('leica', '../photo/CameraLogo/leica.png'),
    ('rollei', 'WSP012/photo/CameraLogo/rollei.png'), 
    ('fujifilm', '/WSP012/photo/Cameralogo/fujifilm.png'), 
    ('nikon', 'WSP012/photo/CameraLogo/nikon.png'), 
    ('olympus', 'WSP012/photo/CameraLogo/olympus.png'), 
    ('kodak', 'WSP012/photo/CameraLogo/kodak.png');


INSERT INTO origin ( origin_country)
    VALUES ( 'japan'), ( 'germany'), ( 'usa');


INSERT INTO format ( format_name)
    VALUES ( '135mm'), ( '120mm');


/*相機*/
INSERT INTO product (product_name,product_type,camera_type,brand_id,origin_id,format_id,product_price,product_quantity,production_year,weight,iso,pixel,is_used) 
    VALUES ('Canon Canonet QL17 GIII','camera','film',1,1,1,2000,1,1972,620,800,0,true),
    ('Leica M3','camera','film',2,2,1,3000,1,1954,580,1000,0,true),
    ('Rollei 35','camera','film',3,2,1,2500,1,1966,370,1600,0,true);

/*菲林*/
INSERT INTO product (product_name,product_type,brand_id,origin_id,format_id,product_price,product_quantity,iso,is_used) 
    VALUES ('Fujifilm color 100', 'film',4,1,1,100,20,100,false),
    -- ('Fujifilm Superia Venus 800', 'film', 4,1,1,150,10,800,false),
    ('Fujifilm Superia 400', 'film', 4,1,1,120,20,400,false),
    ('Kodak colour plus 200', 'film', 7,3,1,120,40,200,false),
    -- ('Kodak gold 200', 'film', 7,3,1,100,50,200,false),
    ('Kodak ultramax 400', 'film', 7,3,1,140,20,400,false);

INSERT INTO product (product_name,product_type,camera_type,brand_id,origin_id,format_id,product_price,product_quantity,production_year,weight,pixel,is_used) 
    VALUES
    ('Fujifilm finepix 2700','camera','digital',4,1,2,1500,1,1999,250,0,true),
    ('Nikon coolpix 2700','camera','digital',5,1,2,1200,1,2013,125,0,true),
    ('Olympus fe-3010','camera','digital',6,1,2,800,1,2009,108,0,true),
    ('Nikon coolpix s2', 'camera', 'digital', 5,1,2,800,1,2005,160,0,true),
    ('Canon IXY digital 800IS', 'camera', 'digital',1,1,2,1400,1,2006,195,0,true),
    ('Fujifilm z700 EXR', 'camera', 'digital',4,1,2,1500,1,2010,158,0,true);



INSERT INTO product_image (product_id, image_path) 
    VALUES 
    (1,'/photo/Camera/filmcamera/CanonCanonetQL17a1.webp'),
    -- (1,'/photo/Camera/filmcamera/CanonCanonetQL17a2.webp');
    -- ('photo/Camera/filmcamera/CanonCanonetQL17a3.webp'),
    -- ( '/photo/Camera/filmcamera/CanonCanonetQL17a4.webp'),
    -- ( '/photo/Camera/filmcamera/CanonCanonetQL17a5.webp'),
    -- ( '/photo/Camera/filmcamera/CanonCanonetQL17a6.webp'),
    -- ( '/photo/Camera/filmcamera/CanonCanonetQL17a7.webp'),
    (2, '/photo/Camera/filmcamera/leicaM3b1.webp'),
    -- ( '/photo/Camera/filmcamera/leicaM3b2.webp'),
    -- ( '/photo/Camera/filmcamera/leicaM3b3.webp'),
    -- ( '/photo/Camera/filmcamera/leicaM3b4.webp'),
    -- ( '/photo/Camera/filmcamera/leicaM3b5.webp'),
    -- ( '/photo/Camera/filmcamera/leicaM3b6.webp'),
    -- ( '/photo/Camera/filmcamera/leicaM3b7.webp'),
    (3, '/photo/Camera/filmcamera/Rollei35c1.webp'),
    -- ( 'WS/photo/Camera/filmcamera/Rollei35c2.webp'),
    -- ( '/photo/Camera/filmcamera/Rollei35c3.webp'),
    -- ( '/photo/Camera/filmcamera/Rollei35c4.webp'),
    -- ( '/photo/Camera/filmcamera/Rollei35c5.webp'),
    -- ( '/photo/Camera/filmcamera/Rollei35c6.webp'),
    -- ( '/photo/Camera/filmcamera/Rollei35c7.webp'),
    (8, '/photo/Camera/digitalcamera/camA1.jpg'),
    -- ( '/photo/Camera/digitalcamera/camA2.jpg'),
    -- ( '/photo/Camera/digitalcamera/camA3.jpg'),
    -- ( '/photo/Camera/digitalcamera/camA4.jpg'),
    -- ( '/photo/Camera/digitalcamera/camA5.jpg'),
    (9, '/photo/Camera/digitalcamera/camB1.jpg'),
    -- ( '/photo/Camera/digitalcamera/camB2.jpg'),
    -- ( '/photo/Camera/digitalcamera/camB3.jpg'),
    -- ( '/photo/Camera/digitalcamera/camB4.jpg'),
    (10, '/photo/Camera/digitalcamera/camC1.jpg'),
    -- ( '/photo/Camera/digitalcamera/camC2.jpg'),
    -- ( '/photo/Camera/digitalcamera/camC3.jpg'),
    -- ( '/photo/Camera/digitalcamera/camC4.jpg'),
    (11, '/photo/Camera/digitalcamera/camD1.jpg'),
    -- ( '/photo/Camera/digitalcamera/camD2.jpg'),
    -- ( '/photo/Camera/digitalcamera/camD3.jpg'),
    -- ( '/photo/Camera/digitalcamera/camD4.jpg'),
    (12, '/photo/Camera/digitalcamera/camE1.jpg'),
    -- ( '/photo/Camera/digitalcamera/camE2.jpg'),
    -- ( '/photo/Camera/digitalcamera/camE3.jpg'),
    -- ( '/photo/Camera/digitalcamera/camE4.jpg'),
    (13, '/photo/Camera/digitalcamera/camF1.jpg'),
    -- ( '/photo/Camera/digitalcamera/camF2.jpg'),
    -- ( '/photo/Camera/digitalcamera/camF3.jpg'),
    -- ( '/photo/Camera/digitalcamera/camF4.jpg'),
    (4, '/photo/film/fujicolor100.webp'),
    -- (11, '/photo/film/fujicolorSuperiaVenus800.webp'),
    (5, '/photo/film/fujifilmSuperia400.webp'),
    (6, '/photo/film/kodakcolourplus200.webp'),
    -- (14, '/photo/film/kodakgold200.webp'),
    (7,'/photo/film/kodakultramax400.webp');


INSERT INTO shopping_cart (product_id,member_id,quantity) VALUES
    (1,1,1),
    (2,1,2),
    (3,2,3),
    (4,2,4),
    (5,3,5),
    (6,3,6);


