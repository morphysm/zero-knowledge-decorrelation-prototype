# https://github.com/docker-library/golang
FROM golang:1.19 as build-env

WORKDIR /go/src/app

ADD . ./

RUN go build -ldflags="-s -w" -o /go/bin/famed-zk-prototype


# https://github.com/GoogleContainerTools/distroless
FROM node

COPY --from=build-env /go/bin/famed-zk-prototype /

CMD ["/famed-zk-prototype"]
