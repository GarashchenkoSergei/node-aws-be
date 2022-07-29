drop table if exists stocks;
drop table if exists products;

create extension if not exists "uuid-ossp";

create table products (
	id uuid not null default uuid_generate_v4() primary key,
	title text not null,
	description text,
	price integer
);

create table stocks (
	product_id uuid,
	count integer,
	foreign key (product_id) references products(id)
);

insert into products (title, description, price) values ('Product1', 'Description1', 10);
insert into products (title, description, price) values ('Product2', 'Description2', 20);

insert into stocks (product_id, count) select id, 100 as count from products where title='Product1';
insert into stocks (product_id, count) select id, 200 as count from products where title='Product2';