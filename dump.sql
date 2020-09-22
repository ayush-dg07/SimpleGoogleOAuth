drop table if exists users;
create table users( uid int not null auto_increment, gid text, name text, regdate date, primary key(uid) );
