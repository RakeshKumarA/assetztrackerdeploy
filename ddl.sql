
4.DATABASE INFORMATION:

---DATABASE CREATION---

CREATE DATABASE assetztracker;

---CONNECTING TO DATABASE---

\c assetztracker

---USERS TABLE CREATION---

CREATE TABLE users (
userid BIGSERIAL NOT NULL,
name VARCHAR(200) NOT NULL,
email VARCHAR(200) NOT NULL UNIQUE,
password VARCHAR(200) NOT NULL,
role VARCHAR(20) NOT NULL DEFAULT 'view',
createby VARCHAR(20) NOT NULL,
createdat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(userid)
);

---USER TABLE INSERTION(ADMIN)---

INSERT INTO users (name,email, password,role) values ('Rakesh', 'rakesh@example.com','$2y$10$nRlYCXu2zTuDvxhaqmlTR.jopPvQQgTv1Lp4A9rb9HTvdEcc/8oYa','admin', 'System Created');

---USERAUDIT TABLE CREATION---

CREATE TYPE dmltype AS ENUM ('INSERT', 'UPDATE', 'DELETE');

CREATE TABLE useraudit (
dmltype dmltype NOT NULL,
recordid INT NOT NULL,
oldvalue VARCHAR(500) DEFAULT NULL,
newvalue VARCHAR(500) NOT NULL,
createby VARCHAR(20) NOT NULL,
createdat TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

---TRIGGER AND FUNCTION CREATION---

CREATE OR REPLACE FUNCTION user_audit_trigger_func()
RETURNS trigger AS $body$
BEGIN
   if (TG_OP = 'INSERT') then
       INSERT INTO useraudit (
	   dmltype,
           recordid,
           oldvalue,
           newvalue,
           createby
       )
       VALUES(
	   'INSERT',
           NEW.userid,
           null,
           to_jsonb(NEW),
           New.createby
       );

       RETURN NEW;
   elsif (TG_OP = 'UPDATE') then
       INSERT INTO useraudit (
           dmltype,
           recordid,
           oldvalue,
           newvalue,
           createby
       )
       VALUES(
	   'UPDATE',
           NEW.userid,
           to_jsonb(OLD),
           to_jsonb(NEW),
           New.createby
       );

       RETURN NEW;
   elsif (TG_OP = 'DELETE') then
       INSERT INTO useraudit (
           dmltype,
           recordid,
           oldvalue,
           newvalue,
           createby
       )
       VALUES(
	   'DELETE',
           OLD.userid,
           to_jsonb(OLD),
           'Record Deleted',
           OLD.createby
       );

       RETURN OLD;
   end if;

END;
$body$
LANGUAGE plpgsql

CREATE TRIGGER user_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON users
FOR EACH ROW EXECUTE FUNCTION user_audit_trigger_func();

---ASSET TABLE CREATION---

CREATE TABLE asset(
	id serial NOT NULL PRIMARY KEY,
	assetid VARCHAR(20) NOT NULL,
	assetstatus VARCHAR(20) NOT NULL,
	userid bigint,
	empid bigint,
	onboard json NOT NULL,
	software jsonb,
	hardware jsonb,
	depreciation json,
	createdat TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
	returnreason VARCHAR(200) NOT NULL DEFAULT '',
	returnmethod VARCHAR(50) NOT NULL DEFAULT '',
    FOREIGN KEY(userid) 
      REFERENCES users(userid),
	FOREIGN KEY(empid) 
      REFERENCES employee(id)
);

--Employee Table Creation

CREATE TABLE employee (
id BIGSERIAL NOT NULL,
empid VARCHAR(20) NOT NULL,
empName VARCHAR(50) NOT NULL,
countryCode VARCHAR(50) NOT NULL,
createdat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(id)
);

--Asset Tranaction table --
CREATE TABLE assettransaction (
transactionid BIGSERIAL NOT NULL,
transactiontype VARCHAR(20) NOT NULL,
assetid int NOT NULL,
empid bigint,
userid int NOT NULL,
transactionreason VARCHAR(200) NULL,
transactionMethod VARCHAR(200) NULL,
comments VARCHAR(200) NULL,
transactiondate TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(transactionid)
);

--Trigger to asset transaction when asset is onboarded--

CREATE OR REPLACE FUNCTION asset_onboard_trigger_func()
RETURNS trigger AS $body$
BEGIN
   if (TG_OP = 'INSERT') then
       INSERT INTO assettransaction (
			transactiontype,
           assetid,
           empid,
           userid,
           transactionreason,
		   transactionMethod,
		   comments
       )
       VALUES(
           NEW.assetstatus,
           NEW.id,
		   null,
           NEW.userid,
           'Onboarding',
		   NEW.returnmethod,
		   ''
       );
       RETURN NEW;
       elsif (TG_OP = 'UPDATE') then
       INSERT INTO assettransaction (
			transactiontype,
           assetid,
           empid,
           userid,
           transactionreason,
		   transactionMethod,
		   comments
       )
       VALUES(
           NEW.assetstatus,
           NEW.id,
		   NEW.empid,
           NEW.userid,
           NEW.returnreason,
		   NEW.returnmethod,
		   ''
       );
       RETURN NEW;
       elsif (TG_OP = 'DELETE') then
       INSERT INTO assettransaction (
			transactiontype,
           assetid,
           empid,
           userid,
           transactionreason,
		   transactionMethod,
		   comments
       )
       VALUES(
           OLD.assetstatus,
           OLD.id,
		   OLD.empid,
           OLD.userid,
           OLD.returnreason,
		   OLD.returnmethod,
		   ''
       );
       RETURN OLD;
   end if;

END;
$body$
LANGUAGE plpgsql

CREATE TRIGGER asset_onboard_trigger
AFTER INSERT OR UPDATE OR DELETE ON asset
FOR EACH ROW EXECUTE FUNCTION asset_onboard_trigger_func();

---ASSET TYPE TABLE CREATION---

CREATE TABLE assettype (
assettypeid BIGSERIAL NOT NULL,
assettypelev1 VARCHAR(50) NOT NULL,
assettypelev2 varchar(50) NOT NULL,
createdat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(assettypeid)
);

---LOCATION TABLE CREATION---

CREATE TABLE location (
locationid BIGSERIAL NOT NULL,
locationname VARCHAR(10) NOT NULL,
createdat TIMESTAMPTZ NOT NULL DEFAULT NOW(),
PRIMARY KEY(locationid)
);