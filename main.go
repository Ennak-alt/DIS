package main

import (
	"fmt"
	"math/rand"
	"database/sql"
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "your-password"
	dbname   = "axelkanne"
)

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
	}

	sqlStatement := `SELECT * FROM teaches`
	row := db.QueryRow(sqlStatement)
	var t string
	var y string
	row.Scan(&t, &y)
	fmt.Println(t, y)
	fmt.Println("Successfully connected to database!")
}

func serveStaticFiles(port int) {
	r := gin.Default()
	r.StaticFS("/", http.Dir("client/dist"))
	r.Run(fmt.Sprintf(":%d", port))
	fmt.Println("Serving static files at port:", port)
}

func createApiRoutes(port int) {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("pong %d", rand.Int63()),
		})
		log.Printf("Ping api was called\n")
	})
	r.Run(fmt.Sprintf(":%d", port))
	fmt.Println("Created api routes at port:", port)
}


func main() {
	connect2db()
	go serveStaticFiles(8080)
	createApiRoutes(8088)
}
