DROP DATABASE IF EXISTS example;
DROP DATABASE IF EXISTS prisma_shadow_example;
DROP USER IF EXISTS marcus;
CREATE USER marcus WITH PASSWORD 'marcus';
CREATE DATABASE example OWNER marcus;
CREATE DATABASE prisma_shadow_example OWNER marcus;
