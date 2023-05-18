package routes

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/models"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func CreateApiRoutes(port int) {
	r := gin.Default()

	r.GET("/ping", getPing)
	r.GET("/post/:id", getPost)
	r.GET("/post", getPosts)

	r.Run(fmt.Sprintf(":%d", port))
	fmt.Println("Created api routes at port:", port)
}

func getPing(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	c.JSON(http.StatusOK, gin.H{
		"message": fmt.Sprintf("pong %d", rand.Int63()),
	})
	log.Printf("Ping api was called\n")
}

func getPost(c *gin.Context) {
	id := c.Param("id")
	c.Header("Access-Control-Allow-Origin", "*")
	db := config.GetDB()

	var post models.Post
	sqlStatement := `SELECT idx, region FROM post WHERE id=$1;`
	err := db.QueryRow(sqlStatement, id).Scan(
		&post.Idx,
		&post.Region)

	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, post)
}

func getPosts(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	
	db := config.GetDB()

	number := c.Query("number")

	fmt.Println(number)

	sql := `SELECT idx, id, region, price, manufacturer, model FROM post LIMIT 10 OFFSET $1`
	rows, err := db.Query(sql, number)

	posts := make([]models.Post, 0)

	if err != nil {
		panic(err)
	}

	for rows.Next() {
		var post models.Post
		err = rows.Scan(
			&post.Idx, 
			&post.Id, 
			&post.Region, 
			&post.Price, 
			&post.Manufacturer, 
			&post.Model,
		)	

		if err != nil {
			panic(err)
		}
		posts = append(posts, post)
	}

	err = rows.Err()
	if err != nil {
		panic(err)
	}

	c.JSON(http.StatusOK, posts)
}
