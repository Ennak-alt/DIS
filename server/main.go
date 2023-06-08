package main

import (
	"github.com/Ennak-alt/DIS/config"
	"github.com/Ennak-alt/DIS/routes"
	_ "github.com/lib/pq"
)

// func serveStaticFiles(port int) {
// 	r := gin.Default()
// 	r.StaticFS("/", http.Dir("client/dist"))
// 	r.Run(fmt.Sprintf(":%d", port))
// 	fmt.Println("Serving static files at port:", port)
// }

func main() {
	config.Init()
	config.ReadConfig()
	config.ConnectDB()
	config.SetupDB()
	// go serveStaticFiles(8080)
	routes.CreateApiRoutes(8088)
}
