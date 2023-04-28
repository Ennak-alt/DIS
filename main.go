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

func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}

	sqlStatement := `SELECT * FROM teaches`
	row := db.QueryRow(sqlStatement)
	var t string
	var y string
	row.Scan(&t, &y)
	fmt.Println(t, y)
	
	fmt.Println("Successfully connected!")
	// Tell go to check the "static directory", it already knowns to look at the "index.html" file, thats what servers do
	// fileServer := http.FileServer(http.Dir("./my-project/dist"))

	// Send that to the fileServer function
	//http.Handle("/", fileServer)

	r := gin.Default()
	//router.Static("/files", "./assets")
	r.StaticFS("/www", http.Dir("my-project/dist"))
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": fmt.Sprintf("pong %d", rand.Int63()),
		})
		log.Printf("Ping api was called")
	})
	fmt.Println("Starting server at port 8080")
	r.Run()

	// // This creates the server
	// if err := http.ListenAndServe(":8080", nil); err != nil {
	// 	log.Fatal(err)
	// }
}
