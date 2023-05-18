package config

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strings"

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
}

func SetupDB() {
	b, err := os.ReadFile("./server/config/load.sql")
    if err != nil {
        fmt.Print(err)
    }
	str := string(b)

	ex, _ := filepath.Abs("./server/config/cars.csv")
	str2 := "'" + filepath.Dir(ex) + "/cars.csv" + "'"

	str = strings.Replace(str, "carsfile", str2, 1)
	fmt.Println(str)
	_, err = db.Exec(str)

	if err != nil {
		panic(err)
	}

	fmt.Println("Succefully setup database!")
}

func GetDB() *sql.DB {
	return db
}
