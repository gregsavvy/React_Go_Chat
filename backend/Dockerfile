FROM golang:1.13

RUN mkdir /go/src/React_Go_Chat
WORKDIR /go/src/React_Go_Chat

COPY ./go.mod .
RUN go mod download

COPY . .

RUN go build .

CMD ["./React_Go_Chat"]