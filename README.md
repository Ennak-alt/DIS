# Running dev environment
## Client side
Assuming that all npm packages are installed, go to the client directory and run the following command:
```bash
npm run dev
```

## Server side
To run the go server, either run it with the go command:
```bash
go run main.go
``` 
or build with `go build main.go` and then run the executable.

These commands will run the the server with the current build in the client directory, to update the client directory run the following command in the client directory:
```bash
npm run build
```

## Connecting to database
The go server will probably fail if 
