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

// https://stackoverflow.com/questions/29418478/go-gin-framework-cors
func CORSMiddleware() gin.HandlerFunc {
    return func(c *gin.Context) {
        c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, accept, origin, Cache-Control, X-Requested-With, Token")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

        if c.Request.Method == "OPTIONS" {
            c.AbortWithStatus(204)
            return
        }

        c.Next()
    }
}

func CreateApiRoutes(port int) {
	r := gin.Default()
	r.Use(CORSMiddleware())

	pr := r.Group("/posts")
	{
		pr.GET("/", controllers.GetPosts)
		pr.GET("/:id", controllers.GetPost)
		//pr.GET("/alike_post", controllers.GetRecommendedPosts)
	}

	ur := r.Group("/users") 
	{
		ur.GET("/:id", controllers.GetUser)
		ur.POST("/:id/ratings", controllers.AddRating)
	}
	r.POST("/login",  controllers.Login)
	r.POST("/register",  controllers.Register)
	r.POST("/logout", controllers.Logout)

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
