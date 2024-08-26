CREATE TABLE "shopping_cart"(
    "id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL
);
ALTER TABLE
    "shopping_cart" ADD PRIMARY KEY("id");
CREATE TABLE "user"(
    "id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255) NOT NULL,
    "birthday" DATE NOT NULL,
    "phone" INTEGER NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "verification_code" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "user" ADD PRIMARY KEY("id");
ALTER TABLE
    "user" ADD CONSTRAINT "user_username_unique" UNIQUE("username");
ALTER TABLE
    "user" ADD CONSTRAINT "user_nickname_unique" UNIQUE("nickname");
ALTER TABLE
    "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");
CREATE TABLE "product_image"(
    "id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "image_path" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "product_image" ADD PRIMARY KEY("id");
CREATE TABLE "admin"(
    "id" INTEGER NOT NULL,
    "admin_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "admin" ADD PRIMARY KEY("id");
ALTER TABLE
    "admin" ADD CONSTRAINT "admin_admin_name_unique" UNIQUE("admin_name");
CREATE TABLE "newsletters"(
    "id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "newsletters" ADD PRIMARY KEY("id");
ALTER TABLE
    "newsletters" ADD CONSTRAINT "newsletters_email_unique" UNIQUE("email");
CREATE TABLE "format"(
    "id" INTEGER NOT NULL,
    "format_name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "format" ADD PRIMARY KEY("id");
CREATE TABLE "order_details"(
    "id" INTEGER NOT NULL,
    "order_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "product_price" INTEGER NOT NULL,
    "subtoal" INTEGER NOT NULL
);
ALTER TABLE
    "order_details" ADD PRIMARY KEY("id");
CREATE TABLE "admin_post"(
    "id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "cover_image" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "admin_post" ADD PRIMARY KEY("id");
CREATE TABLE "comment"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "product_id" INTEGER NULL,
    "comment_image" VARCHAR(255) NOT NULL,
    "comment_text" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "comment" ADD PRIMARY KEY("id");
CREATE TABLE "order"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "order_date" DATE NOT NULL,
    "stripe_id" INTEGER NOT NULL,
    "payment_type" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "order" ADD PRIMARY KEY("id");
CREATE TABLE "origin"(
    "id" INTEGER NOT NULL,
    "origin_country" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "origin" ADD PRIMARY KEY("id");
CREATE TABLE "brand"(
    "id" INTEGER NOT NULL,
    "brand_name" VARCHAR(255) NOT NULL,
    "brand_logo" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "brand" ADD PRIMARY KEY("id");
CREATE TABLE "product"(
    "id" INTEGER NOT NULL,
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
    "is_used" BOOLEAN NOT NULL
);
ALTER TABLE
    "product" ADD PRIMARY KEY("id");
ALTER TABLE
    "shopping_cart" ADD CONSTRAINT "shopping_cart_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "product" ADD CONSTRAINT "product_origin_id_foreign" FOREIGN KEY("origin_id") REFERENCES "origin"("id");
ALTER TABLE
    "order_details" ADD CONSTRAINT "order_details_order_id_foreign" FOREIGN KEY("order_id") REFERENCES "order"("id");
ALTER TABLE
    "admin_post" ADD CONSTRAINT "admin_post_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "product_image" ADD CONSTRAINT "product_image_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "order_details" ADD CONSTRAINT "order_details_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "product" ADD CONSTRAINT "product_brand_id_foreign" FOREIGN KEY("brand_id") REFERENCES "brand"("id");
ALTER TABLE
    "product" ADD CONSTRAINT "product_format_id_foreign" FOREIGN KEY("format_id") REFERENCES "format"("id");
ALTER TABLE
    "shopping_cart" ADD CONSTRAINT "shopping_cart_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "comment" ADD CONSTRAINT "comment_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");