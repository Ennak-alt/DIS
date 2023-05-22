package routes

import (
	"fmt"
	"strconv"
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
	r.GET("/alike_post", getAlikePosts)

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

func getAlikePosts(c *gin.Context) {
	car_type := c.Query("car_type", )
	paint_color := c.Query("paint_color")
	Qprice := c.Query("price")
	price, err := strconv.Atoi(Qprice)
	price += 10000
	
	c.Header("Access-Control-Allow-Origin", "*")
	db := config.GetDB()

	sql := `SELECT id, price FROM post WHERE cartype=$1 AND paint_color=$2 AND price BETWEEN 0 AND $3 LIMIT 10;`
	rows, err := db.Query(sql, car_type, paint_color, price)

	posts := make([]models.Post, 0)
	
	if err != nil {
            panic(err)
	}

	for rows.Next() {
	    var post models.Post
	    err = rows.Scan(
	        &post.Id,
		&post.Price,
	    )
	    if err != nil {
		panic(err)
	    }
	    posts = append(posts, post)
	}	
	c.JSON(http.StatusOK, posts)
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
