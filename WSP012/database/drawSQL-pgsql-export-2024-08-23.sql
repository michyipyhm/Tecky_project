CREATE TABLE "user"(
    "id" INTEGER NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "nickname" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "phonenumber" VARCHAR(255) NOT NULL,
    "birthday" VARCHAR(255) NOT NULL,
    "integral" VARCHAR(255) NOT NULL,
    "shopping_list" VARCHAR(255) NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "Shopping_history" VARCHAR(255) NOT NULL,
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
CREATE TABLE "admin"(
    "id" INTEGER NOT NULL,
    "admin_name" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "sales_records" VARCHAR(255) NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "order" VARCHAR(255) NOT NULL,
    "setting" VARCHAR(255) NOT NULL,
    "stock" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "admin" ADD PRIMARY KEY("id");
ALTER TABLE
    "admin" ADD CONSTRAINT "admin_admin_name_unique" UNIQUE("admin_name");
CREATE TABLE "newslaters"(
    "id" INTEGER NOT NULL,
    "email" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "newslaters" ADD PRIMARY KEY("id");
CREATE TABLE "order_details"(
    "id" INTEGER NOT NULL,
    "order_id" VARCHAR(255) NOT NULL,
    "product_id" VARCHAR(255) NOT NULL,
    "product_brand" VARCHAR(255) NOT NULL,
    "quantity" VARCHAR(255) NOT NULL,
    "payment_type" VARCHAR(255) NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "product_price" VARCHAR(255) NOT NULL,
    "total_price" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "order_details" ADD PRIMARY KEY("id");
CREATE TABLE "admin_post"(
    "id" INTEGER NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "product_image" VARCHAR(255) NOT NULL,
    "product_details" VARCHAR(255) NOT NULL,
    "product_price" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "admin_post" ADD PRIMARY KEY("id");
CREATE TABLE "product_details"(
    "id" INTEGER NOT NULL,
    "production_year" VARCHAR(255) NOT NULL,
    "weight" VARCHAR(255) NOT NULL,
    "pixel" VARCHAR(255) NOT NULL,
    "camern_type" VARCHAR(255) NOT NULL,
    "product_brand" VARCHAR(255) NOT NULL,
    "product_status" VARCHAR(255) NOT NULL,
    "ISO" VARCHAR(255) NOT NULL,
    "format" VARCHAR(255) NOT NULL,
    "origin" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "product_details" ADD PRIMARY KEY("id");
CREATE TABLE "order"(
    "id" INTEGER NOT NULL,
    "user_id" VARCHAR(255) NOT NULL,
    "payment_id" VARCHAR(255) NOT NULL,
    "paying_amount" VARCHAR(255) NOT NULL,
    "product_quantity" VARCHAR(255) NOT NULL,
    "transection" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "order_date" VARCHAR(255) NOT NULL,
    "payment_type" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "order" ADD PRIMARY KEY("id");
CREATE TABLE "product"(
    "id" INTEGER NOT NULL,
    "product_name" VARCHAR(255) NOT NULL,
    "product_price" VARCHAR(255) NOT NULL,
    "product_brand" VARCHAR(255) NOT NULL,
    "product_type" VARCHAR(255) NOT NULL,
    "product_quantity" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "product_image" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "product" ADD PRIMARY KEY("id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_payment_id_foreign" FOREIGN KEY("payment_id") REFERENCES "product"("product_quantity");
ALTER TABLE
    "order_details" ADD CONSTRAINT "order_details_quantity_foreign" FOREIGN KEY("quantity") REFERENCES "product_details"("camern_type");
ALTER TABLE
    "product" ADD CONSTRAINT "product_id_foreign" FOREIGN KEY("id") REFERENCES "product_details"("id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_order_date_foreign" FOREIGN KEY("order_date") REFERENCES "order_details"("payment_type");
ALTER TABLE
    "user" ADD CONSTRAINT "user_shopping_list_foreign" FOREIGN KEY("shopping_list") REFERENCES "product"("product_name");
ALTER TABLE
    "order_details" ADD CONSTRAINT "order_details_product_id_foreign" FOREIGN KEY("product_id") REFERENCES "product"("id");