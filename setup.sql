CREATE DATABASE dis;
CREATE USER dis_user WITH ENCRYPTED PASSWORD 'FvNe4D6ef8u7Rrfax6kRmdfSMu4N5b';
GRANT ALL PRIVILEGES ON DATABASE dis TO dis_user;
GRANT pg_read_server_files TO dis_user;