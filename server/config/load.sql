DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS ratings;
DROP TABLE IF EXISTS users;

-------- User --------
CREATE TABLE users (
    -- User ID
    uid BIGINT, -- A Snowflake

    -- Password
    pws VARCHAR(32), -- Salt
    pwh VARCHAR(64), -- SHA-256 hash

    -- Contact info
    fname VARCHAR(160),
    lname VARCHAR(40),
    email VARCHAR(100),
    phone VARCHAR(15), -- International standards allow up to 15 digits

    -- Unique constraints
    PRIMARY KEY (uid)--,
    --CONSTRAINT AK_email UNIQUE(email)
);

COPY users FROM usersfile DELIMITER ';';


CREATE TABLE ratings (
    rater_id BIGINT REFERENCES users(uid)
                 ON UPDATE CASCADE
                 ON DELETE CASCADE,

    ratee_id BIGINT REFERENCES users(uid)
                 ON UPDATE CASCADE
                 ON DELETE CASCADE,

    rating INT,
    
    PRIMARY KEY (rater_id, ratee_id)
);

COPY ratings FROM ratingsfile DELIMITER ';';



-------- Post --------
CREATE TABLE post (
    idx INT,
    id VARCHAR(50),
    region VARCHAR(50),
    price INT,
    caryear INT,
    manufacturer VARCHAR(50),
    model VARCHAR(400),
    condition VARCHAR(50),
    cylinders INT,
    fuel VARCHAR(50),
    odometer INT,
    transmission VARCHAR(50),
    VIN VARCHAR(50),
    drive VARCHAR(50),
    size VARCHAR(50),
    cartype VARCHAR(50),
    paint_color VARCHAR(50),
    cardescription VARCHAR(100000),
    county VARCHAR(50),
    carstate VARCHAR(50),
    posting_date VARCHAR(50),
    
    seller_id BIGINT REFERENCES users(uid)
                 ON UPDATE CASCADE
                 ON DELETE CASCADE,

    PRIMARY KEY (id),
    CONSTRAINT AK_idx UNIQUE(idx)
);

COPY post FROM carsfile DELIMITER ';';
