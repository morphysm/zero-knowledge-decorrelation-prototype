# https://github.com/docker-library/golang
FROM golang:1.19 as build-env

WORKDIR /go/src/app

ADD . ./

RUN go build -ldflags="-s -w" -o /go/bin/famed-zk-prototype


# https://github.com/GoogleContainerTools/distroless
FROM node

COPY --from=build-env /go/bin/famed-zk-prototype /
COPY --from=build-env /go/src/app/zeroknowledge /zeroknowledge
COPY --from=build-env /go/src/app/zkp-merkle-airdrop-lib /zkp-merkle-airdrop-lib

RUN npm install -g ts-node 
RUN rm -rf /zeroknowledge/node_modules /zeroknowledge/package-lock.json && npm --prefix /zeroknowledge install && npm --prefix /zkp-merkle-airdrop-lib install 

CMD ["/famed-zk-prototype"]
