package controllers

import (
	_ "fmt"
	"net/http"
	"strconv"

	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/models"
	"github.com/Ennak-alt/DIS/server/repositories"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func GetPost(c *gin.Context) {
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

// Dont recommend the same car.
func GetAlikePosts(c *gin.Context) {
	car_type := c.Query("car_type", )
	paint_color := c.Query("paint_color")
	Qprice := c.Query("price")
	price, err := strconv.Atoi(Qprice)
	price += 10000
	
	c.Header("Access-Control-Allow-Origin", "*")
	db := config.GetDB()

	sql := `SELECT id, price, manufacturer, model, cartype, paint_color, odometer FROM post WHERE cartype=$1 AND paint_color=$2 AND price BETWEEN 0 AND $3 LIMIT 5;`
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
		&post.Manufacturer,
		&post.Model,
		&post.Cartype,
		&post.Paint_color,
	        &post.Odometer)
	    if err != nil {
		panic(err)
	    }
	    posts = append(posts, post)
	}	
	c.JSON(http.StatusOK, posts)
}

func GetPosts(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")

	idxStr := c.DefaultQuery("idx", "none")

	idx := -1

	if idxStr != "none" {
		idxInt, err := strconv.Atoi(idxStr)
		if err != nil || idxInt < 0 {
			c.JSON(http.StatusBadRequest, "Parameter idx is not valid")
			return
		}
		idx = idxInt
	}
	
	posts, err :=  repositories.QueryPosts(idx) 

	if err != nil {
		c.JSON(http.StatusBadRequest, "Something went wrong when retrieving")	
	}

	c.JSON(http.StatusOK, posts)
}