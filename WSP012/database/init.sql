/*do not copy

brand_id: 1 = canon, 2 = leica, 3 = rollei, 4 = fujifilm, 5 = nikon, 6 = olympus, 7 = kodak
origin_id: 1 = japan, 2 = germany, 3 = usa
format_id: 1 = 135mm, 2 = digital

do not copy*/

INSERT INTO brand (id, brand_name, brand_logo)
    VALUES  (1, 'canon', 'WSP012/photo/Logo/canon.png'),
    (2, 'leica', 'WSP012/photo/Logo/leica.png'), 
    (3, 'rollei', 'WSP012/photo/Logo/rollei.png'), 
    (4, 'fujifilm', '/WSP012/photo/logo/fujifilm.png'), 
    (5, 'nikon', 'WSP012/photo/Logo/nikon.png'), 
    (6, 'olympus', 'WSP012/photo/Logo/olympus.png'), 
    (7, 'kodak', 'WSP012/photo/Logo/kodak.png');

/*
UPDATE brand
SET brand_logo = 'WSP012/photo/Logo/canon.png'
WHERE brand_name = 'canon';*/

INSERT INTO origin (id, origin_country)
    VALUES (1, 'japan'), (2, 'germany'), (3, 'usa');


INSERT INTO format (id, format_name)
    VALUES (1, '135mm'), (2, 'digital');

/*相機*/
INSERT INTO product (id,product_name,product_type,camera_type,brand_id,origin_id,format_id,product_price,product_quantity,production_year,weight,pixel,iso,is_used) 
    VALUES (001,'Canon Canonet QL17 GIII','camera','film',1,1,1,2000,1,1972,620,0,0,true),
    (002,'Leica M3','camera','film',2,2,1,3000,1,1954,580,0,0,true),
    (003,'Rollei 35','camera','film',3,2,1,2500,1,1966,370,0,0,true),
    (011,'Fujifilm finepix 2700','camera','digital',4,1,2,1500,1,1999,250,0,0,true),
    (012,'Nikon coolpix 2700','camera','digital',5,1,2,1200,1,2013,125,0,0,true),
    (013, 'Olympus fe-3010','camera','digital',6,1,2,800,1,2009,108,0,0,true),
    (014, 'Nikon coolpix s2', 'camera', 'digital', 5,1,2,800,1,2005,160,0,0,true),
    (015, 'Canon IXY digital 800IS', 'camera', 'digital',1,1,2,1400,1,2006,195,0,0,true),
    (016, 'Fujifilm z700 EXR', 'camera', 'digital',4,1,2,1500,1,2010,158,0,0,true);

/*菲林*/
INSERT INTO product (id,product_name,product_type,brand_id,origin_id,format_id,product_price,product_quantity,iso,is_used) 
    VALUES (021, 'Fujifilm color 100', 'film',4,1,1,100,20,100,true),
    (022, 'Fujifilm Superia Venus 800', 'film', 4,1,1,150,10,800,true),
    (023, 'Fujifilm Superia 400', 'film', 4,1,1,120,20,400,true),
    (024, 'Kodak colour plus 200', 'film', 7,3,1,120,40,200,true),
    (025, 'Kodak gold 200', 'film', 7,3,1,100,50,200,true),
    (026, 'Kodak ultramax 400', 'film', 7,3,1,140,20,400,true);



