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
	sqlStatement2 := `SELECT idx, id, region, price, caryear, manufacturer, model, condition, cylinders, fuel, odometer, transmission, VIN, drive, size, cartype, paint_color, cardescription, county, carstate, posting_date FROM post WHERE id=$1;`
	err := db.QueryRow(sqlStatement2, id).Scan(
		&post.Idx,
		&post.Id,
		&post.Region,
		&post.Price,
		&post.Caryear,
		&post.Manufacturer,
		&post.Model,
		&post.Condition,
		&post.Cylinders,
		&post.Fuel,
		&post.Odometer,
		&post.Transmission,
		&post.VIN,
		&post.Drive,
		&post.Size,
		&post.Cartype,
		&post.Paint_color,
		&post.Cardescription,
		&post.County,
		&post.Carstate,
		&post.Posting_date)

	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, post)
}
