DROP TABLE IF EXISTS post;

CREATE TABLE post (
    idx INT,
    id VARCHAR(50),
    region VARCHAR(50),
    price INT,
    caryear VARCHAR(50),
    manufacturer VARCHAR(50),
    model VARCHAR(50),
    condition VARCHAR(50),
    cylinders VARCHAR(50),
    fuel VARCHAR(50),
    odometer VARCHAR(50),
    transmission VARCHAR(50),
    VIN VARCHAR(50),
    drive VARCHAR(50),
    size VARCHAR(50),
    cartype VARCHAR(50),
    paint_color VARCHAR(50),
    cardescription VARCHAR(100000),
    county VARCHAR(50),
    carstate VARCHAR(2),
    posting_date VARCHAR(50)
);

COPY post FROM carsfile DELIMITER ';';
