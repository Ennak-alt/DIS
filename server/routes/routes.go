package routes

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"

	"github.com/Ennak-alt/DIS/server/controllers"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func CreateApiRoutes(port int) {
	r := gin.Default()

	pr := r.Group("/posts")
	{
		pr.GET("/", controllers.GetPosts)
		pr.GET("/:id", controllers.GetPost)
		pr.GET("/alike_post", controllers.GetRecommendedPosts)
	}

	r.GET("/ping", getPing)

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
