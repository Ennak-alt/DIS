package models

type Post struct {
	idx            int    `json:"idx"`
	id             string `json:"id"`
	region         string `json:"region"`
	price          int    `json:"price"`
	caryear        string `json:"caryear"` // Should be a number
	manufacturer   string `json:"manufacturer"`
	model          string `json:"model"`
	condition      string `json:"condition"`
	cylinders      string `json:"cyliders"` // Should be a number
	fuel           string `json:"fuel"`
	odometer       string `json:"odometer"` // Should be a number
	transmission   string `json:"transmission"`
	VIN            string `json:"VIN"`
	drive          string `json:"drive"`
	size           string `json:"size"`
	cartype        string `json:"cartype"`
	paint_color    string `json:"paint_color"`
	cardescription string `json:"cardescription"`
	county         string `json:"county"`
	carstate       string `json:"carstate"`
	posting_date   string `json:"posting_date`
}
