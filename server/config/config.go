package config

import (
	"database/sql"
	"fmt"
	"os"
	"path/filepath"
	"strings"

	_ "github.com/lib/pq"
	"github.com/spf13/viper"
)

var (
	db *sql.DB
)

func ReadConfig() {
	viper.SetConfigFile(".env")
	viper.ReadInConfig()
}

func ConnectDB() {
	psqlInfo := fmt.Sprintf("host=%s port=%s dbname=%s "+
	    "user=%s password=%s sslmode=disable",
		viper.Get("DB_HOST"), viper.Get("DB_PORT"), viper.Get("DB_NAME"),
		viper.Get("DB_USERNAME"), viper.Get("DB_PASSWORD"))

	d, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Println("Could not connect to the database!")
		return
	}

	db = d

	// defer db.Close() Maybe ?

	err = db.Ping()
	if err != nil {
		fmt.Println("Could not ping the database!")
		return
	} else {
		fmt.Println("Connected to database!")
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
