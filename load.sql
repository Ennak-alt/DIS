DROP TABLE IF EXISTS Post;

CREATE TABLE Post (
    carid VARCHAR(50),
    region VARCHAR(50),
    price INT,
    year INT,
    manufacturer VARCHAR(50),
    model VARCHAR(50)
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
    cardescription VARCHAR(500),
    county VARCHAR(50),
    carstate VARCHAR(2),
    posting_date VARCHAR(50)
)

COPY Post FROM '/cars.csv' DELIMITER ',';
