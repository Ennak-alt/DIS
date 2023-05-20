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
	r.GET("/alike_post/:car_type", getAlikePosts)

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

// LIMIT is not working?
// SQL query works in terminal: select id from post where cartype = 'pickup' limit 3;
// Should match other things e.g. color or price.
func getAlikePosts(c *gin.Context) {
	car_type := c.Param("car_type")
	c.Header("Access-Control-Allow-Origin", "*")
	db := config.GetDB()

	var alike_post models.Post
	sql := `SELECT id FROM post WHERE cartype=$1 LIMIT 10;`
	err := db.QueryRow(sql, car_type).Scan(&alike_post.Id)

	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, alike_post)
}

func getPosts(c *gin.Context) {
	c.Header("Access-Control-Allow-db", "*")

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
