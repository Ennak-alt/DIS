package main

import (
	"fmt"
	"net/http"

	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/routes"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

/*
func connect2db() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Println("Could not connect to the database!")
		return
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		fmt.Println("Could not ping the database!")
		return
	}

	sqlStatement := `SELECT * FROM teaches`
	row := db.QueryRow(sqlStatement)
	var t string
	var y string
	row.Scan(&t, &y)
	fmt.Println(t, y)
	fmt.Println("Successfully connected to database!")
}
*/

func serveStaticFiles(port int) {
	r := gin.Default()
	r.StaticFS("/", http.Dir("client/dist"))
	r.Run(fmt.Sprintf(":%d", port))
	fmt.Println("Serving static files at port:", port)
}

func main() {
	config.ConnectDB()
	go serveStaticFiles(8080)
	routes.CreateApiRoutes(8088)
}
