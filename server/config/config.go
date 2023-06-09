package config

import (
	"database/sql"
	"fmt"
	"math/rand"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/bwmarrin/snowflake"

	_ "github.com/lib/pq"
	"github.com/spf13/viper"
)

var (
	db   *sql.DB
	node *snowflake.Node
)

func Init() {
	// Init randomness
	rand.Seed(time.Now().UnixNano())

	// Init slowflake node
	n, err := snowflake.NewNode(1)
	if err != nil {
		panic(err)
	}
	node = n
}

func ReadConfig() {
	viper.AutomaticEnv()
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
	b, err := os.ReadFile("./config/load.sql")
	if err != nil {
		fmt.Print(err)
	}
	str := string(b)

	ex, _ := filepath.Abs("./config/cars.csv")
	str2 := "'" + filepath.Dir(ex) + "/cars.csv" + "'"

	str = strings.Replace(str, "carsfile", str2, 1)

	ex_u, _ := filepath.Abs("./config/users.csv")
	str2_u := "'" + filepath.Dir(ex_u) + "/users.csv" + "'"

	str = strings.Replace(str, "usersfile", str2_u, 1)

	ex_s, _ := filepath.Abs("./config/sellers.csv")
	str2_s := "'" + filepath.Dir(ex_s) + "/sellers.csv" + "'"

	str = strings.Replace(str, "sellersfile", str2_s, 1)

	ex_r, _ := filepath.Abs("./config/ratings.csv")
	str2_r := "'" + filepath.Dir(ex_r) + "/ratings.csv" + "'"

	str = strings.Replace(str, "ratingsfile", str2_r, 1)
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

func GenerateSnowflake() int64 {
	return int64(node.Generate())
}
