package config

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "ams"
	dbname   = "postgres"
)

var (
	db *sql.DB
)

func ConnectDB() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	d, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Println("Could not connect to the database!")
		return
	} else {
		fmt.Println("Connected to database!")
	}

	db = d

	// defer db.Close() Maybe ?

	err = db.Ping()
	if err != nil {
		fmt.Println("Could not ping the database!")
		return
	} else {
		fmt.Println("It was pinged!")
	}

	/*
		sqlStatement := `SELECT * FROM teaches`
		row := db.QueryRow(sqlStatement)
		var t string
		var y string
		row.Scan(&t, &y)
		fmt.Println(t, y)
		fmt.Println("Successfully connected to database!")
	*/
}

func GetDB() *sql.DB {
	return db
}
