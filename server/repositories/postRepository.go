package repositories

import (
	"database/sql"
	"fmt"
	_ "net/http"
	"strconv"
	"strings"

	"github.com/Ennak-alt/DIS/config"
	"github.com/Ennak-alt/DIS/models"
	_ "github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func constructQuery(number int, queryStrings map[string][]string) (string, []any) {
	queryString := ""
	queryArguments := make([]any, 0)

	for key, val := range queryStrings {
		fmt.Println("key", key)
		fmt.Println("val", val)
		fmt.Println("args", queryArguments)
		if val == nil || key == "idx_order" {
			continue
		}

		queryString += " AND ("

		switch key {
		case "idx":
			order, found := queryStrings["idx_order"]
			if found && order[0] == "prev" {
				queryString += fmt.Sprintf("$%d < idx ", number)
			} else {
				queryString += fmt.Sprintf("$%d > idx ", number)
			}
			number += 1

		case "id":
			queryString += fmt.Sprintf(" %s != $%d ", key, number)
			fmt.Println("hello", queryString)
			number += 1

		case "price", "odometer", "cylinders":
			Range := strings.Split(val[0], ",")
			if len(Range) != 2 {
				continue
			}
			fmt.Println(Range[0])
			fmt.Println(Range[1])
			from, err1 := strconv.Atoi(Range[0])
			to, err2 := strconv.Atoi(Range[1])
			if err1 != nil && err2 == nil {
				queryString += fmt.Sprintf(" %s <= $%d )", key, number)
				number += 1
				queryArguments = append(queryArguments, to)
				continue
			} else if err1 == nil && err2 != nil {
				queryString += fmt.Sprintf(" $%d <= %s )", number, key)
				number += 1
				queryArguments = append(queryArguments, from)
				continue
			}
			queryString += fmt.Sprintf(" $%d <= %s AND %s <= $%d )", number, key, key, number+1)
			number += 2
			queryArguments = append(queryArguments, from, to)
			continue

		default:
			for i := range val {
				queryString += fmt.Sprintf(" %s = $%d ", key, number)
				number += 1
				if i != len(val)-1 {
					queryString += " OR "
				}
			}
		}

		queryString += ")"

		for _, q := range val {
			queryArguments = append(queryArguments, q)
		}
	}

	return queryString, queryArguments
}

func QueryPosts(idx int, queryStrings map[string][]string) ([]models.Post, int, error) {
	db := config.GetDB()

	for key, val := range queryStrings {
		fmt.Println(key, val)
	}

	count := 0

	var (
		rows *sql.Rows
		row  *sql.Row
		err  error
	)

	queryString, queryParams := constructQuery(1, queryStrings)

	if queryString == "" {
		sql :=
			`SELECT *
			FROM post
			ORDER BY idx DESC
			LIMIT 10`

		rows, err = db.Query(sql)
		if err != nil {
			fmt.Println(err)
		}

		sql =
			`SELECT COUNT(*)
			FROM post`

		row = db.QueryRow(sql)
		err = row.Scan(&count)
		if err != nil {
			fmt.Println(err)
		}

	} else if val, ok := queryStrings["idx_order"]; ok && len(val) != 0 && val[0] == "prev" {
		sql :=
			fmt.Sprintf(
				`SELECT *
				FROM (SELECT *
					FROM post
					WHERE %s
					ORDER BY idx ASC
					LIMIT 10) AS X
				ORDER BY idx DESC`,
				queryString[4:],
			)
		fmt.Println(sql)
		rows, err = db.Query(sql, queryParams...)
		if err != nil {
			fmt.Println(err)
		}

		sql =
			fmt.Sprintf(
				`SELECT COUNT(*)
				FROM post
				WHERE %s`,
				queryString[4:],
			)

		row = db.QueryRow(sql, queryParams...)
		err = row.Scan(&count)
		if err != nil {
			fmt.Println(err)
		}

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
		rows, err = db.Query(sql, queryParams...)
		if err != nil {
			fmt.Println(err)
		}

		sql =
			fmt.Sprintf(
				`SELECT COUNT(*)
				FROM post
				WHERE %s`,
				queryString[4:],
			)
		row = db.QueryRow(sql, queryParams...)
		err = row.Scan(&count)
		if err != nil {
			fmt.Println(err)
		}
	}

	posts := make([]models.Post, 0)

	fmt.Println("Going through rows1")

	if err != nil {
		fmt.Println(err)
		return posts, count, err
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
			return posts, count, err
		}
		posts = append(posts, post)
	}
	err = rows.Err()
	return posts, count, err
}

func QueryCategory(cat string) []string {
	db := config.GetDB()
	sql := fmt.Sprintf("SELECT DISTINCT %s FROM post", cat)

	rows, err := db.Query(sql)

	cats := make([]string, 0)

	if err != nil {
		fmt.Println(err)
		return cats
	}

	for rows.Next() {
		var catn string
		err = rows.Scan(&catn)

		if err != nil {
			fmt.Println(err)
			return cats
		}
		cats = append(cats, catn)
	}
	fmt.Println(cats)
	return cats
}

func QueryCategoryMinMax(cat string) (int, int) {
	db := config.GetDB()
	sqlMIN := fmt.Sprintf("SELECT DISTINCT MIN(%s) FROM post", cat)
	sqlMAX := fmt.Sprintf("SELECT DISTINCT MAX(%s) FROM post", cat)

	row := db.QueryRow(sqlMIN)
	var min int
	err1 := row.Scan(&min)

	if err1 != nil {
		fmt.Println(err1)
	}

	row = db.QueryRow(sqlMAX)
	var max int
	err2 := row.Scan(&max)

	if err2 != nil {
		fmt.Println(err2)
	}

	return min, max
}
