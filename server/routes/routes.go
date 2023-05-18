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

	r.GET("/ping", pingRoute)
	r.GET("/post/:id", getPost)

	r.Run(fmt.Sprintf(":%d", port))
	fmt.Println("Created api routes at port:", port)
}

func pingRoute(c *gin.Context) {
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
	sqlStatement2 := `SELECT idx, region FROM post WHERE id=$1;`
	err := db.QueryRow(sqlStatement2, id).Scan(
		&post.Idx,
		&post.Region)

	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, post)
}
