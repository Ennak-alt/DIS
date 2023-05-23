package repositories

import (
	"database/sql"
	"fmt"
	_ "fmt"
	_ "net/http"
	"strconv"
	_ "strconv"

	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/models"
	_ "github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func createWhere(number int, post models.Post) (string, []string) {
	queryString := ""
	queryArguments := make([]string, 0)

	if post.Id != "" {
		queryString += "AND id != $" + strconv.Itoa(number)
		number += 1
		queryArguments = append(queryArguments, post.Id)
	}

	if post.Cartype != "" {
		queryString += "AND car_type = $" + strconv.Itoa(number)
		number += 1
		queryArguments = append(queryArguments, post.Cartype)
	}

	if post.Paint_color != "" {
		queryString += "AND paint_color != $" + strconv.Itoa(number)
		number += 1
		queryArguments = append(queryArguments, post.Paint_color)
	}

	// if post.Price != -1 {
	// 	queryString += "AND paint_color != $" + strconv.Itoa(number)
	// }
	return queryString, queryArguments
}

func QueryPosts(idx int, post models.Post) ([]models.Post, error) {
	db := config.GetDB()

	var (
		rows *sql.Rows
		err  error
	)

	if idx == -1 {
		sql :=
			`SELECT *
			FROM post
			ORDER BY idx DESC
			LIMIT 10`
		rows, err = db.Query(sql, ...queryParams)
	} else {
		(queryString, queryParams) := createWhere(1, pos)
		sql :=
			fmt.Sprint(
			`SELECT *
			FROM post
			WHERE idx < $1 %s
			ORDER BY idx DESC
			LIMIT 10`, querString
			)
		rows, err = db.Query(sql, idx, ...queryParams)
	}

	posts := make([]models.Post, 0)

	if err != nil {
		return posts, err
	}

	for rows.Next() {
		var post models.Post
		err = rows.Scan(
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
			return posts, err
		}

		posts = append(posts, post)
	}

	err = rows.Err()
	return posts, err
}
