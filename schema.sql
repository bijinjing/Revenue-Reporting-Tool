DROP DATABASE IF EXISTS Customer_transaction_summary;
CREATE DATABASE Customer_transaction_summary;
USE Customer_transaction_summary;

CREATE TABLE transactions (
  id int NOT NULL AUTO_INCREMENT,
  description varchar(50) NOT NULL,
  amount DECIMAL(50,4),
  date varchar(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE customers (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  fee_rate DECIMAL(4,4),
  PRIMARY KEY (id)
);

INSERT INTO customers (name, fee_rate) values ('Stay', 0.01);
INSERT INTO customers (name, fee_rate) values ('Airbnb', 0.02);
INSERT INTO customers (name, fee_rate) values ('Uber', 0.025);
INSERT INTO customers (name, fee_rate) values ('Line', 0.02);
INSERT INTO customers (name, fee_rate) values ('Wework', 0.01);
INSERT INTO customers (name, fee_rate) values ('Jumb', 0.02);
INSERT INTO customers (name, fee_rate) values ('CVS', 0.01);
INSERT INTO customers (name, fee_rate) values ('YHome', 0.025);
INSERT INTO customers (name, fee_rate) values ('Mine', 0.03);
INSERT INTO customers (name, fee_rate) values ('Idea', 0.015);

CREATE TABLE identifiers (
  id int NOT NULL AUTO_INCREMENT,
  identifier varchar(100) NOT NULL,
  customer int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (customer)
    REFERENCES customers(id)
    ON DELETE CASCADE
);

INSERT INTO identifiers (identifier, customer) values ('0023', 1);
INSERT INTO identifiers (identifier, customer) values ('0032', 1);
INSERT INTO identifiers (identifier, customer) values ('0027', 1);
INSERT INTO identifiers (identifier, customer) values ('0067', 1);
INSERT INTO identifiers (identifier, customer) values ('0018', 1);
INSERT INTO identifiers (identifier, customer) values ('0456', 2);
INSERT INTO identifiers (identifier, customer) values ('0436', 2);
INSERT INTO identifiers (identifier, customer) values ('0467', 2);
INSERT INTO identifiers (identifier, customer) values ('0765', 2);
INSERT INTO identifiers (identifier, customer) values ('0789', 2);
INSERT INTO identifiers (identifier, customer) values ('1234', 3);
INSERT INTO identifiers (identifier, customer) values ('1245', 3);
INSERT INTO identifiers (identifier, customer) values ('1343', 3);
INSERT INTO identifiers (identifier, customer) values ('1876', 3);
INSERT INTO identifiers (identifier, customer) values ('1845', 3);
INSERT INTO identifiers (identifier, customer) values ('4456', 4);
INSERT INTO identifiers (identifier, customer) values ('4563', 4);
INSERT INTO identifiers (identifier, customer) values ('9875', 4);
INSERT INTO identifiers (identifier, customer) values ('2346', 4);
INSERT INTO identifiers (identifier, customer) values ('4907', 4);
INSERT INTO identifiers (identifier, customer) values ('6754', 5);
INSERT INTO identifiers (identifier, customer) values ('6098', 5);
INSERT INTO identifiers (identifier, customer) values ('6542', 5);
INSERT INTO identifiers (identifier, customer) values ('6523', 5);
INSERT INTO identifiers (identifier, customer) values ('6908', 5);
INSERT INTO identifiers (identifier, customer) values ('5673', 6);
INSERT INTO identifiers (identifier, customer) values ('5321', 6);
INSERT INTO identifiers (identifier, customer) values ('5789', 6);
INSERT INTO identifiers (identifier, customer) values ('5435', 6);
INSERT INTO identifiers (identifier, customer) values ('5678', 6);
INSERT INTO identifiers (identifier, customer) values ('6765', 7);
INSERT INTO identifiers (identifier, customer) values ('6545', 7);
INSERT INTO identifiers (identifier, customer) values ('6780', 7);
INSERT INTO identifiers (identifier, customer) values ('6876', 7);
INSERT INTO identifiers (identifier, customer) values ('6789', 7);
INSERT INTO identifiers (identifier, customer) values ('7653', 8);
INSERT INTO identifiers (identifier, customer) values ('7809', 8);
INSERT INTO identifiers (identifier, customer) values ('7690', 8);
INSERT INTO identifiers (identifier, customer) values ('7654', 8);
INSERT INTO identifiers (identifier, customer) values ('7898', 8);
INSERT INTO identifiers (identifier, customer) values ('14367', 9);
INSERT INTO identifiers (identifier, customer) values ('19087', 9);
INSERT INTO identifiers (identifier, customer) values ('14567', 9);
INSERT INTO identifiers (identifier, customer) values ('13256', 9);
INSERT INTO identifiers (identifier, customer) values ('11909', 9);
INSERT INTO identifiers (identifier, customer) values ('654906', 10);
INSERT INTO identifiers (identifier, customer) values ('678643', 10);
INSERT INTO identifiers (identifier, customer) values ('679870', 10);
INSERT INTO identifiers (identifier, customer) values ('643245', 10);
INSERT INTO identifiers (identifier, customer) values ('678621', 10);

CREATE TABLE GLs (
  id int NOT NULL,
  name varchar(200) NOT NULL,
  category varchar(200) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO GLs (id, name, category) values ('600', 'revenue', 'revenue');
INSERT INTO GLs (id, name, category) values ('605', 'contra revenue', 'revenue');
INSERT INTO GLs (id, name, category) values ('401', 'bank fees', 'COGS');
INSERT INTO GLs (id, name, category) values ('200', 'accounts payable','liability');
INSERT INTO GLs (id, name, category) values ('100', 'cash','asset');

CREATE TABLE General_ledger (
  id int NOT NULL AUTO_INCREMENT,
  entryId varchar(50) NOT NULL,
  transaction int NOT NULL,
  customer int NOT NULL,
  postDate varchar(50) NOT NULL,
  entryDate varchar(50) NOT NULL,
  GL int NOT NULL,
  amount DECIMAL(50,8),
  PRIMARY KEY (id),
  FOREIGN KEY (transaction)
    REFERENCES transactions(id)
    ON DELETE CASCADE,
  FOREIGN KEY (GL)
    REFERENCES GLs(id)
    ON DELETE CASCADE,
  FOREIGN KEY (customer)
    REFERENCES customers(id)
    ON DELETE CASCADE
);





/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
