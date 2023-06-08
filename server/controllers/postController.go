package controllers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/Ennak-alt/DIS/config"
	"github.com/Ennak-alt/DIS/models"
	"github.com/Ennak-alt/DIS/repositories"
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

type GPStruct struct {
	Count int           `json:"count"`
	Cars  []models.Post `json:"cars"`
}

func GetPosts(c *gin.Context) {

	c.Header("Access-Control-Allow-Origin", "*")

	// var post models.Post
	// post.Id = c.DefaultQuery("id", "")
	// post.Cartype = c.DefaultQuery("car_type", "")
	// post.Paint_color = c.DefaultQuery("paint_color", "")
	// post.Seller_id = c.DefaultQuery("seller_id", "")
	// var price = c.DefaultQuery("price", "-1")

	// var err1 error
	// post.Price, err1 = strconv.Atoi(price)

	// if post.Price != -1 {
	// 	post.Price += 10000
	// }

	// if err1 != nil {
	// 	c.JSON(http.StatusBadRequest, "Price could not be converted to int.")
	// }

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

	posts, count, err := repositories.QueryPosts(idx, c.Request.URL.Query())

	var gp GPStruct

	gp.Cars = posts
	gp.Count = count

	if err != nil {
		fmt.Println(err)
		c.JSON(http.StatusBadRequest, "Something went wrong when retrieving")
		return
	}

	c.JSON(http.StatusOK, gp)
}

func GetCategories(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")

	var categories models.Categories

	// type
	categories.Cartype = repositories.QueryCategory("cartype")

	// price
	categories.PriceFrom, categories.PriceTo = repositories.QueryCategoryMinMax("price")

	// cylinders
	categories.CylindersFrom, categories.CylindersTo = repositories.QueryCategoryMinMax("cylinders")

	// color
	categories.Color = repositories.QueryCategory("paint_color")

	// odometer
	categories.OdometerFrom, categories.OdometerTo = repositories.QueryCategoryMinMax("odometer")

	// drive
	categories.Drive = repositories.QueryCategory("drive")

	// size
	categories.Size = repositories.QueryCategory("size")

	// condition
	categories.Condition = repositories.QueryCategory("condition")

	// fuel
	categories.Fuel = repositories.QueryCategory("fuel")

	// trans
	categories.Transmission = repositories.QueryCategory("transmission")

	c.JSON(http.StatusOK, categories)
}
