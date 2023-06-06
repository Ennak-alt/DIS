package controllers

import (
	"fmt"
	"crypto/sha256"
	"net/http"
	"strings"
	"math/rand"

	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/models"
	"github.com/Ennak-alt/DIS/server/services"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func GetUser(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	
	id := c.Param("id")
	db := config.GetDB()

	var user models.User
	requester := services.CheckSession(c.GetHeader("Token"))
	if requester == -1 {
		err := db.QueryRow(`SELECT DISTINCT ON (userdata.uid) userdata.*, COALESCE(AVG(rating), -1) AS rating, COUNT(rating) AS num_ratings FROM (SELECT uid, fname, lname, email FROM users WHERE uid = $1) userdata LEFT JOIN ratings ON ratee_id = uid GROUP BY uid, fname, lname, email;`, id).Scan(
			&user.UID,
			&user.First_name,
			&user.Last_name,
			&user.Email,
			&user.Rating,
			&user.Num_ratings)
	
		if err != nil {
			panic(err)
		}

		c.String(http.StatusOK,
			fmt.Sprintf("{\"uid\":\"%d\",\"name\":\"%s %s\",\"email\":\"%s\",\"rating\":%f,\"numRatings\":%d}",
				user.UID,
				user.First_name,
				user.Last_name,
				user.Email,
				user.Rating,
				user.Num_ratings));	
	} else {
		err := db.QueryRow(`SELECT DISTINCT ON (userdata.uid) userdata.*, COALESCE(AVG(rating), -1) AS rating, COUNT(rating) AS num_ratings FROM (SELECT uid, fname, lname, email FROM users WHERE uid = $1) userdata LEFT JOIN ratings ON ratee_id = uid AND rater_id != $2 GROUP BY uid, fname, lname, email;`, id, requester).Scan(
			&user.UID,
			&user.First_name,
			&user.Last_name,
			&user.Email,
			&user.Rating,
			&user.Num_ratings)
	
		if err != nil {
			panic(err)
		}

		var rating int
		err = db.QueryRow("SELECT rating FROM ratings WHERE rater_id=$1 AND ratee_id=$2;", requester, id).Scan(&rating)
		if err != nil {
			rating = -1
		}

		c.String(http.StatusOK,
			fmt.Sprintf("{\"uid\":\"%d\",\"name\":\"%s %s\",\"email\":\"%s\",\"rating\":%f,\"numRatings\":%d,\"userRating\":%d}",
				user.UID,
				user.First_name,
				user.Last_name,
				user.Email,
				user.Rating,
				user.Num_ratings,
				rating));	
	}
}

func GetSeller(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	
	id := c.Param("id")
	db := config.GetDB()

	var seller models.Seller
	requester := services.CheckSession(c.GetHeader("Token"))
	if requester == -1 {
		fmt.Printf("GO GO\n");
		err := db.QueryRow(`SELECT DISTINCT ON (userdata.uid) userdata.*, COALESCE(AVG(rating), -1) AS rating, COUNT(rating) AS num_ratings, address, phone FROM (SELECT uid, fname, lname, email FROM users WHERE uid = $1) userdata LEFT JOIN ratings ON ratee_id = uid NATURAL JOIN sellers GROUP BY uid, fname, lname, email, address, phone;`, id).Scan(
			&seller.UID,
			&seller.First_name,
			&seller.Last_name,
			&seller.Email,
			&seller.Rating,
			&seller.Num_ratings,
			&seller.Address,
			&seller.Phone)
	
		if err != nil {
			panic(err)
		}
		fmt.Printf("GO GO\n");

		c.String(http.StatusOK,
			fmt.Sprintf("{\"uid\":\"%d\",\"name\":\"%s %s\",\"email\":\"%s\",\"phone\":\"%s\",\"rating\":%f,\"numRatings\":%d,\"address\":\"%s\",\"phone\":\"%s\"}",
				seller.UID,
				seller.First_name,
				seller.Last_name,
				seller.Email,
				seller.Phone,
				seller.Rating,
				seller.Num_ratings,
				seller.Address,
				seller.Phone));	
	} else {
		err := db.QueryRow(`SELECT DISTINCT ON (userdata.uid) userdata.*, COALESCE(AVG(rating), -1) AS rating, COUNT(rating) AS num_ratings, address, phone FROM (SELECT uid, fname, lname, email FROM users WHERE uid = $1) userdata LEFT JOIN ratings ON ratee_id = uid AND rater_id != $2 GROUP BY uid, fname, lname, email, address, phone;`, id, requester).Scan(
			&seller.UID,
			&seller.First_name,
			&seller.Last_name,
			&seller.Email,
			&seller.Phone,
			&seller.Rating,
			&seller.Num_ratings,
			&seller.Address,
			&seller.Phone)
	
		if err != nil {
			panic(err)
		}

		var rating int
		err = db.QueryRow("SELECT rating FROM ratings WHERE rater_id=$1 AND ratee_id=$2;", requester, id).Scan(&rating)
		if err != nil {
			rating = -1
		}

		c.String(http.StatusOK,
			fmt.Sprintf("{\"uid\":\"%d\",\"name\":\"%s %s\",\"email\":\"%s\",\"phone\":\"%s\",\"rating\":%f,\"numRatings\":%d,\"userRating\":%d,\"address\":\"%s\",\"phone\":\"%s\"}",
				seller.UID,
				seller.First_name,
				seller.Last_name,
				seller.Email,
				seller.Phone,
				seller.Rating,
				seller.Num_ratings,
				rating,
				seller.Address,
				seller.Phone));	
	}
}

func AddRating(c *gin.Context) {
	rater  := services.CheckSession(c.GetHeader("Token"))
	ratee  := c.PostForm("uid")
	rating := c.PostForm("rating")

	c.Header("Access-Control-Allow-Origin", "*")

	if rater == -1 {
		c.String(http.StatusOK, "{\"success\":false}") // TODO
		return;
	}

	db := config.GetDB()
	sql := fmt.Sprintf("DO $$ BEGIN IF NOT EXISTS (SELECT rating FROM ratings WHERE rater_id=%[1]d AND ratee_id=%[2]s) THEN INSERT INTO ratings(rater_id, ratee_id, rating) VALUES(%[1]d, %[2]s, %[3]s); ELSE UPDATE ratings SET rating=%[3]s WHERE rater_id=%[1]d AND ratee_id=%[2]s; END IF; END $$;", rater, ratee, rating)
	_, err := db.Query(sql)
	if err != nil {
		fmt.Println(err)
		c.String(http.StatusOK, "{\"success\":false}") // TODO
	} else {
		c.String(http.StatusOK, "{\"success\":true}") // TODO
	}
}

var charset = []byte("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqurstuvwxyz1234567890+-_.,:;!#%&/(){}[]=@$<>")
func GenSalt() string {
	salt := make([]byte, 32)
	for i := 0; i < 32; i++ {
        salt[i] = charset[rand.Intn(len(charset))]
    }
	return string(salt)
}

func Register(c *gin.Context) {
	name     := c.PostForm("name")
	email    := c.PostForm("email")
	password := c.PostForm("password")

	names := strings.Split(name, " ")
	fname, lname := names[len(names)-1], strings.Join(names[:len(names)-1], " ")
	pws := GenSalt()

	hash := sha256.New()
	hash.Write([]byte(password))
	hash.Write([]byte(pws))
	pwh := fmt.Sprintf("%x", hash.Sum(nil))

	uid := config.GenerateSnowflake()

	c.Header("Access-Control-Allow-Origin", "*")
	db := config.GetDB()

	// TODO: Sanitize
	sqlStatement2 := `INSERT INTO users(uid, pws, pwh, fname, lname, email, phone) VALUES($1, $2, $3, $4, $5, $6, $7);`
	_, err := db.Query(sqlStatement2, uid, pws, pwh, fname, lname, email, "0")

	if err != nil {
		c.String(http.StatusOK, "{\"success\":false}")
		panic(err)
	}
	// TODO: Handle user not found
	
	var token = services.MakeSession(uid)
	c.String(http.StatusOK,
		fmt.Sprintf("{\"success\":true,\"uid\":\"%d\",\"name\":\"%s %s\",\"token\":\"%s\",\"expiresin\":%d}",
			uid,
			fname,
			lname,
			token.Token,
			token.ExpiresIn));
}

func Login(c *gin.Context) {
	email    := c.PostForm("email")
	password := c.PostForm("password")

	c.Header("Access-Control-Allow-Origin", "*")
	db := config.GetDB()

	var user models.User
	// TODO: Sanitize
	sqlStatement2 := `SELECT uid, pws, pwh, fname, lname FROM users WHERE email=$1;`
	err := db.QueryRow(sqlStatement2, email).Scan(
		&user.UID,
		&user.Password_salt,
		&user.Password_hash,
		&user.First_name,
		&user.Last_name)

	if err != nil {
		c.String(http.StatusOK, "{\"success\":false}")
		panic(err)
	}
	// TODO: Handle user not found
	
	hash := sha256.New()
	hash.Write([]byte(password))
	hash.Write([]byte(user.Password_salt))
	bs := fmt.Sprintf("%x", hash.Sum(nil))

	if bs == user.Password_hash {
		var token = services.MakeSession(user.UID)
		c.String(http.StatusOK,
			fmt.Sprintf("{\"success\":true,\"uid\":\"%d\",\"name\":\"%s %s\",\"token\":\"%s\",\"expiresin\":%d}",
				user.UID,
				user.First_name,
				user.Last_name,
				token.Token,
				token.ExpiresIn));
	} else {
		c.String(http.StatusOK, "{\"success\":false}") // TODO
	}
}

func Logout(c *gin.Context) {
	c.Header("Access-Control-Allow-Origin", "*")
	
	// TODO: Sanitize
	token := c.PostForm("token")
	services.DestroySession(token)
	c.String(http.StatusOK, "{\"success\":true}") // TODO
}
