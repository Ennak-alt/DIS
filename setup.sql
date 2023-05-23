CREATE USER dis_user WITH ENCRYPTED PASSWORD 'FvNe4D6ef8u7Rrfax6kRmdfSMu4N5b';
GRANT pg_read_server_files TO dis_user;
CREATE DATABASE dis OWNER dis_user;
