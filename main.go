package main

import (
	"fmt"
	"net/http"

	"github.com/Ennak-alt/DIS/server/config"
	"github.com/Ennak-alt/DIS/server/routes"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

func serveStaticFiles(port int) {
	r := gin.Default()
	r.StaticFS("/", http.Dir("client/dist"))
	r.Run(fmt.Sprintf(":%d", port))
	fmt.Println("Serving static files at port:", port)
}

func main() {
	config.ReadConfig()
	config.ConnectDB()
	config.SetupDB()
	go serveStaticFiles(8080)
	routes.CreateApiRoutes(8088)
}
