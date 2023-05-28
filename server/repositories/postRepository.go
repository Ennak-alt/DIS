package repositories

import (
	"database/sql"
	"fmt"
	_ "net/http"
	"strconv"
	"strings"

	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/models"
	_ "github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func constructQuery(number int, queryStrings map[string][]string) (string, []any) {
	queryString := ""
	queryArguments := make([]any, 0)

	for key, val := range(queryStrings) {
		fmt.Println(val)
		fmt.Println(queryArguments)
		if val == nil {
			continue
		}

		queryString += " AND ("

		switch key {
		case "id": case "seller_id":
			queryString += fmt.Sprintf(" %s != $%d ", key, number)
			number += 1

		case "price":
			priceRange := strings.Split(val[0], ",")
			if len(priceRange) != 2 {
				continue
			}
			from, err1 := strconv.Atoi(priceRange[0])
			to, err2 := strconv.Atoi(priceRange[1])
			if err1 != nil || err2 != nil {
				continue
			}
			queryString += fmt.Sprintf(" $%d < price AND price < $%d )", number, number+1)
			number += 2
			queryArguments = append(queryArguments, from, to)	
			continue

		default:
			for i := range(val) {
				queryString += fmt.Sprintf(" %s = $%d ", key, number)
				number += 1
				if i != len(val)-1 {
					queryString += " OR "
				}
			}
		}

		queryString += ")"

		for _, q := range(val) {
			queryArguments = append(queryArguments, q)	
		}
	}

	return queryString, queryArguments
}

func QueryPosts(idx int, queryStrings map[string][]string) ([]models.Post, error) {
	db := config.GetDB()

	for key, val := range(queryStrings) {
		fmt.Println(key, val)
	}

	var (
		rows *sql.Rows
		err  error
	)

	if idx == -1 {
		queryString, queryParams := constructQuery(1, queryStrings)
		fmt.Println(queryString)
		if queryString == "" {
			sql :=
				`SELECT * 
				FROM post
				ORDER BY idx DESC
				LIMIT 10`
			
			rows, err = db.Query(sql)
		} else {
			sql :=
				fmt.Sprintf(
					`SELECT *
					FROM post
					WHERE %s
					ORDER BY idx DESC
					LIMIT 10`,
					queryString[4:],
				)
			fmt.Println(sql)
			fmt.Println(queryParams)
			rows, err = db.Query(sql, queryParams...)
		}

	} else {
		queryString, queryParams := constructQuery(2, queryStrings)
		sql :=
			fmt.Sprintf(
				`SELECT *
				FROM post
				WHERE idx < $1 %s
				ORDER BY idx DESC
				LIMIT 10`,
				queryString,
			)
		queryParams = append([]any{idx}, queryParams...)
		rows, err = db.Query(sql, queryParams...)
	}

	posts := make([]models.Post, 0)

	fmt.Println("Going through rows1")

	if err != nil {
		fmt.Println(err)
		return posts, err
	}

	fmt.Println("Going through rows2")

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
			&post.Posting_date,
			&post.Seller_id)

		if err != nil {
			return posts, err
		}

		posts = append(posts, post)
	}

	err = rows.Err()
	return posts, err
}


// func constructQuery(number int, post models.Post) (string, []any) {
// 	queryString := ""
// 	queryArguments := make([]any, 0)

// 	if post.Id != "" {
// 		queryString += " AND id != $" + strconv.Itoa(number)
// 		number += 1
// 		queryArguments = append(queryArguments, post.Id)
// 	}

// 	if post.Cartype != "" {
// 		queryString += " AND cartype = $" + strconv.Itoa(number)
// 		number += 1
// 		queryArguments = append(queryArguments, post.Cartype)
// 	}

// 	if post.Paint_color != "" {
// 		queryString += " AND paint_color = $" + strconv.Itoa(number)
// 		number += 1
// 		queryArguments = append(queryArguments, post.Paint_color)
// 	}

// 	if post.Price != -1 {
// 		queryString += " AND price BETWEEN 0 AND $" + strconv.Itoa(number)
// 		number += 1
// 		queryArguments = append(queryArguments, post.Price)
// 	}

// 	if post.Seller_id != "" {
// 		queryString += " AND seller_id = $" + strconv.Itoa(number)
// 		number += 1
// 		queryArguments = append(queryArguments, post.Seller_id)
// 	}

// 	return queryString, queryArguments
// }

// func QueryPosts(idx int, post models.Post) ([]models.Post, error) {
// 	db := config.GetDB()

// 	var (
// 		rows *sql.Rows
// 		err  error
// 	)

// 	if idx == -1 {
// 		queryString, queryParams := constructQuery(1, post)
// 		fmt.Println(queryString)
// 		if queryString == "" {
// 			sql :=
// 				`SELECT *
// 				FROM post
// 				ORDER BY idx DESC
// 				LIMIT 10`
// 			rows, err = db.Query(sql)
// 		} else {
// 			sql :=
// 				fmt.Sprintf(
// 					`SELECT *
// 					FROM post
// 					WHERE %s
// 					ORDER BY idx DESC
// 					LIMIT 10`,
// 					queryString[4:],
// 				)
// 			fmt.Println(sql)
// 			fmt.Println(queryParams)
// 			rows, err = db.Query(sql, queryParams...)
// 		}

// 	} else {
// 		queryString, queryParams := constructQuery(2, post)
// 		sql :=
// 			fmt.Sprintf(
// 				`SELECT *
// 				FROM post
// 				WHERE idx < $1 %s
// 				ORDER BY idx DESC
// 				LIMIT 10`,
// 				queryString,
// 			)
// 		queryParams = append([]any{idx}, queryParams...)
// 		rows, err = db.Query(sql, queryParams...)
// 	}

// 	posts := make([]models.Post, 0)

// 	fmt.Println("Going through rows1")

// 	if err != nil {
// 		return posts, err
// 	}

// 	fmt.Println("Going through rows2")

// 	for rows.Next() {
// 		var post models.Post
// 		err = rows.Scan(
// 			&post.Idx,
// 			&post.Id,
// 			&post.Region,
// 			&post.Price,
// 			&post.Caryear,
// 			&post.Manufacturer,
// 			&post.Model,
// 			&post.Condition,
// 			&post.Cylinders,
// 			&post.Fuel,
// 			&post.Odometer,
// 			&post.Transmission,
// 			&post.VIN,
// 			&post.Drive,
// 			&post.Size,
// 			&post.Cartype,
// 			&post.Paint_color,
// 			&post.Cardescription,
// 			&post.County,
// 			&post.Carstate,
// 			&post.Posting_date,
// 			&post.Seller_id)

// 		if err != nil {
// 			return posts, err
// 		}

// 		posts = append(posts, post)
// 	}

// 	err = rows.Err()
// 	return posts, err
// }
