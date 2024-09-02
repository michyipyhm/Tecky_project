DROP DATABASE IF EXISTS wsp012_project;
CREATE DATABASE wsp012_project;

\c wsp012_project


CREATE TABLE member(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) UNIQUE,
    "gender" VARCHAR(255),
    "birthday" DATE ,
    "phone" INTEGER ,
    "address" VARCHAR(255) ,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "verification_code" VARCHAR(255) ,
    "status" VARCHAR(255)
);

CREATE TABLE admin(
    "id" SERIAL PRIMARY KEY,
    "admin_name" VARCHAR(255) UNIQUE NOT NULL,
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE newsletters(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE format(
    "id" SERIAL PRIMARY KEY,
    "format_name" VARCHAR(255) NOT NULL
);

CREATE TABLE origin(
    "id" SERIAL PRIMARY KEY,
    "origin_country" VARCHAR(255) NOT NULL
);

CREATE TABLE brand(
    "id" SERIAL PRIMARY KEY,
    "brand_name" VARCHAR(255) NOT NULL,
    "brand_logo" VARCHAR(255) NOT NULL
);


CREATE TABLE product(
    "id" SERIAL PRIMARY KEY,
    "product_name" VARCHAR(255) NOT NULL,
    "product_type" VARCHAR(255) NOT NULL,
    "camera_type" VARCHAR(255),
    "brand_id" INTEGER NOT NULL,
    "origin_id" INTEGER NOT NULL,
    "format_id" INTEGER NOT NULL,
    "product_price" INTEGER NOT NULL,
    "product_quantity" INTEGER NOT NULL,
    "production_year" INTEGER,
    "weight" INTEGER,
    "pixel" INTEGER,
    "iso" INTEGER,
    "is_used" BOOLEAN NOT NULL,
    FOREIGN KEY (brand_id) REFERENCES brand(id),
    FOREIGN KEY (origin_id) REFERENCES origin(id),
    FOREIGN KEY (format_id) REFERENCES format(id)
);

CREATE TABLE shopping_cart(
    "id" SERIAL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE orders(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "order_date" DATE NOT NULL,
    "stripe_id" INTEGER NOT NULL,
    "payment_type" VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES member(id)
);

CREATE TABLE product_image(
    "id" SERIAL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "image_path" VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE order_details(
    "id" SERIAL PRIMARY KEY,
    "orders_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_price" INTEGER NOT NULL,
    "subtoal" INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id),
    FOREIGN KEY (orders_id) REFERENCES orders(id)
);

CREATE TABLE admin_post(
    "id" SERIAL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "cover_image" VARCHAR(255) NOT NULL,
    FOREIGN KEY (product_id) REFERENCES product(id)
);

CREATE TABLE comment(
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL,
    "orders_id" INTEGER NOT NULL,
    "product_id" INTEGER NULL,
    "comment_image" VARCHAR(255) NOT NULL,
    "comment_text" VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES member(id),
    FOREIGN KEY (orders_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES product(id)
);




