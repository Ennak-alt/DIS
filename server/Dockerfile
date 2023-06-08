FROM golang:1.20.5-alpine3.18
WORKDIR /app
COPY . .
RUN go install
CMD ["go", "run", "main.go"]
EXPOSE 8088
