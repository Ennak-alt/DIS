package controllers

import (
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
	sqlStatement2 := `SELECT idx, id, region, price, caryear, manufacturer, model, condition, cylinders, fuel, odometer, transmission, VIN, drive, size, cartype, paint_color, cardescription, county, carstate, posting_date, seller_id FROM post WHERE id=$1;`
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
		&post.Posting_date,
	    &post.Seller_id)

	if err != nil {
		panic(err)
	}
	c.JSON(http.StatusOK, post)
}

func GetPosts(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")

	var post models.Post
	post.Id = c.DefaultQuery("id", "")
	post.Cartype = c.DefaultQuery("car_type", "")
	post.Paint_color = c.DefaultQuery("paint_color", "")
	post.Seller_id = c.DefaultQuery("seller_id", "")
	var price = c.DefaultQuery("price", "-1")

	var err1 error
	post.Price, err1 = strconv.Atoi(price)

	if post.Price != -1 {
		post.Price += 10000
	}

	if err1 != nil {
		c.JSON(http.StatusBadRequest, "Price could not be converted to int.")
	}

	idxStr := c.DefaultQuery("idx", "")
	idx := -1

	if idxStr != "" {
		idxInt, err := strconv.Atoi(idxStr)
		if err != nil || idxInt < 0 {
			c.JSON(http.StatusBadRequest, "Parameter idx is not valid")
			return
		}
		idx = idxInt
	}
	
	posts, err := repositories.QueryPosts(idx, c.Request.URL.Query())

	if err != nil {
		c.JSON(http.StatusBadRequest, "Something went wrong when retrieving")
		return
	}

	c.JSON(http.StatusOK, posts)
}
