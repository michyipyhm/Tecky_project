CREATE TABLE "shopping_cart"(
    "id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL
);
ALTER TABLE
    "shopping_cart" ADD PRIMARY KEY("id");
CREATE TABLE "user"(
    "id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(255) NOT NULL,
    "birthday" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "gender" VARCHAR(255) NOT NULL
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
    "id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "image_path" BIGINT NOT NULL
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
    "id" BIGINT NOT NULL,
    "format_name" BIGINT NOT NULL
);
ALTER TABLE
    "format" ADD PRIMARY KEY("id");
CREATE TABLE "order_details"(
    "id" INTEGER NOT NULL,
    "order_id" BIGINT NOT NULL,
    "product_id" VARCHAR(255) NOT NULL,
    "quantity" VARCHAR(255) NOT NULL,
    "product_price" VARCHAR(255) NOT NULL,
    "subtoal" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "order_details" ADD PRIMARY KEY("id");
CREATE TABLE "admin_post"(
    "id" INTEGER NOT NULL,
    "product_id" VARCHAR(255) NOT NULL,
    "cover_image" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "admin_post" ADD PRIMARY KEY("id");
CREATE TABLE "comment"(
    "id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "product_id" BIGINT NULL,
    "comment_image" BIGINT NOT NULL,
    "comment_text" BIGINT NOT NULL
);
ALTER TABLE
    "comment" ADD PRIMARY KEY("id");
CREATE TABLE "order"(
    "id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "payment_id" VARCHAR(255) NOT NULL,
    "total" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "order_date" VARCHAR(255) NOT NULL,
    "payment_type" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "order" ADD PRIMARY KEY("id");
CREATE TABLE "origin"(
    "id" BIGINT NOT NULL,
    "origin_country" BIGINT NOT NULL
);
ALTER TABLE
    "origin" ADD PRIMARY KEY("id");
CREATE TABLE "brand"(
    "id" BIGINT NOT NULL,
    "brand_name" BIGINT NOT NULL,
    "brand_logo" BIGINT NOT NULL
);
ALTER TABLE
    "brand" ADD PRIMARY KEY("id");
CREATE TABLE "product"(
    "id" INTEGER NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "product_price" VARCHAR(255) NOT NULL,
    "brand_id" VARCHAR(255) NOT NULL,
    "origin_id" BIGINT NOT NULL,
    "product_type" VARCHAR(255) NOT NULL,
    "camera_type" BIGINT NOT NULL,
    "product_quantity" VARCHAR(255) NOT NULL,
    "production_year" VARCHAR(255) NOT NULL,
    "weight" BIGINT NOT NULL,
    "pixel" BIGINT NOT NULL,
    "product_status" BIGINT NOT NULL,
    "ISO" BIGINT NOT NULL,
    "format_id" BIGINT NOT NULL
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