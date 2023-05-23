package repositories

import (
	_ "fmt"
	_ "strconv"
	_ "net/http"

	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/models"
	_ "github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func QueryPosts(idx int) ([]models.Post, error) {
	db := config.GetDB()

	sql := `SELECT * 
			FROM idk 
			WHERE idx < $1 
			LIMIT 10 
			SORT BY idx DSC`
	if idx == -1 {
		sql = 
			`SELECT * 
			FROM post 
			LIMIT 10 
			SORT BY idx DSC`
	}
	
	rows, err := db.Query(sql, idx)

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