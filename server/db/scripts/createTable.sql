-- Table: meets.MarketPlace

-- DROP TABLE IF EXISTS meets."MarketPlace";

CREATE TABLE IF NOT EXISTS meets."MarketPlace"
(
    "Location" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "MarketPlaceId" integer NOT NULL DEFAULT nextval('meets."MarketPlace_MarketPlaceId_seq"'::regclass),
    "RequesterId" integer NOT NULL,
    "SportsId" integer NOT NULL,
    "Title" character varying(50) COLLATE pg_catalog."default" NOT NULL,
    "NumberOfPlayers" integer NOT NULL,
    "StartDate" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "InviteesIds" text COLLATE pg_catalog."default",
    "Description" text COLLATE pg_catalog."default" NOT NULL,
    "EndDate" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "StartTime" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "EndTime" character varying(10) COLLATE pg_catalog."default" NOT NULL,
    "Acceptedids" text COLLATE pg_catalog."default",
    CONSTRAINT "MarketPlace_pkey" PRIMARY KEY ("MarketPlaceId"),
    CONSTRAINT "MarketPlace_SportsId_fkey" FOREIGN KEY ("SportsId")
        REFERENCES meets."Sports" ("SportId") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS meets."MarketPlace"
    OWNER to postgres;



-- Table: meets.Role

-- DROP TABLE IF EXISTS meets."Role";

CREATE TABLE IF NOT EXISTS meets."Role"
(
    roleid integer NOT NULL DEFAULT nextval('meets."Role_roleid_seq"'::regclass),
    name character varying(10) COLLATE pg_catalog."default" NOT NULL,
    isactive boolean NOT NULL,
    CONSTRAINT "Role_pkey" PRIMARY KEY (roleid)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS meets."Role"
    OWNER to postgres;




-- Table: meets.Sports

-- DROP TABLE IF EXISTS meets."Sports";

CREATE TABLE IF NOT EXISTS meets."Sports"
(
    "SportId" integer NOT NULL DEFAULT nextval('meets."Sports_SportId_seq"'::regclass),
    "Name" character varying(15) COLLATE pg_catalog."default",
    isactive boolean,
    CONSTRAINT "Sports_pkey" PRIMARY KEY ("SportId"),
    CONSTRAINT "Sports_Name_key" UNIQUE ("Name")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS meets."Sports"
    OWNER to postgres;




    -- Table: meets.User

-- DROP TABLE IF EXISTS meets."User";

CREATE TABLE IF NOT EXISTS meets."User"
(
    "FirstName" character varying(15) COLLATE pg_catalog."default" NOT NULL,
    "LastName" character varying(15) COLLATE pg_catalog."default" NOT NULL,
    "Email" character varying(20) COLLATE pg_catalog."default" NOT NULL,
    "StudentId" character varying(6) COLLATE pg_catalog."default" NOT NULL,
    "Mobile" character varying(11) COLLATE pg_catalog."default",
    "Password" character varying(10) COLLATE pg_catalog."default",
    isactive boolean,
    "RoleId" integer,
    "UserId" integer NOT NULL DEFAULT nextval('meets."User_UserId_seq"'::regclass),
    CONSTRAINT "User_pkey" PRIMARY KEY ("UserId"),
    CONSTRAINT "User_StudentId_key" UNIQUE ("StudentId"),
    CONSTRAINT "User_RoleId_fkey" FOREIGN KEY ("RoleId")
        REFERENCES meets."Role" (roleid) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS meets."User"
    OWNER to postgres;