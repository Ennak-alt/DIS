package models

type Post struct {
	Idx            int    `json:"idx"`
	Id             string `json:"id"`
	Region         string `json:"region"`
	Price          int    `json:"price"`
	Caryear        string `json:"caryear"` // Should be a number
	Manufacturer   string `json:"manufacturer"`
	Model          string `json:"model"`
	Condition      string `json:"condition"`
	Cylinders      string `json:"cyliders"` // Should be a number
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
	Posting_date   string `json:"posting_date`
}
