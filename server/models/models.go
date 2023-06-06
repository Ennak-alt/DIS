package models

// TODO: Split to two files

type Post struct {
	Idx            int    `json:"idx"`
	Id             string `json:"id"`
	Region         string `json:"region"`
	Price          int    `json:"price"`
	Caryear        string `json:"caryear"` // Should be a number
	Manufacturer   string `json:"manufacturer"`
	Model          string `json:"model"`
	Condition      string `json:"condition"`
	Cylinders      string `json:"cylinders"` // Should be a number
	Fuel           string `json:"fuel"`
	Odometer       string `json:"odometer"` // Should be a number
	Transmission   string `json:"transmission"`
	VIN            string `json:"VIN"`
	Drive          string `json:"drive"`
	Size           string `json:"size"`
	Cartype        string `json:"cartype"`
	Paint_color    string `json:"paint_color"`
	Cardescription string `json:"cardescription"`
	County         string `json:"county"`
	Carstate       string `json:"carstate"`
	Posting_date   string `json:"posting_date"`
	Seller_id      string `json:"seller_id"`
}

type User struct {
	// User ID
	UID int64 `json:"uid"` // Snowflake

	// Password
	Password_salt string `json:"-"` // Salt
	Password_hash string `json:"-"` // SHA-256 hash

	// Contact info
	First_name string `json:"fname"`
	Last_name  string `json:"lname"`
	Email      string `json:"email"`
	Phone      string `json:"phone"`

	// Meta
	Rating      float32 `json:"rating"`
	Num_ratings uint32  `json:"numRatings"`
}

type Categories struct {
	Cartype       []string `json:"cartype"`
	PriceFrom     int      `json:"priceFrom"`
	PriceTo       int      `json:"priceTo"`
	CylindersFrom int      `json:"cylindersFrom"`
	CylindersTo   int      `json:"cylindersTo"`
	Color         []string `json:"paint_color"`
	OdometerFrom  int      `json:"odometerFrom"`
	OdometerTo    int      `json:"odometerTo"`
	Drive         []string `json:"drive"`
	Size          []string `json:"size"`
	Condition     []string `json:"condition"`
	Fuel          []string `json:"fuel"`
	Transmission  []string `json:"transmission"`
}
