About this app:

This is a chat app using websockets, which consists of 2 separate modules:

1. Go (with Gorilla Websocket) | Independent RestAPI backend (JSON provider) | ex. ws://localhost:5000
2. React Native | Mobile frontend (Android) | ex. your Android device IP or AVD emulator

---

Installation (no docker):
- Install Golang from https://golang.org/doc/install
- Install NodeJS (sudo apt install nodejs)
- Install Java JDK (sudo apt install openjdk-11-jdk)
- Install Android Studio (sudo snap install android-studio --classic)
- Install git $sudo apt-get install git-all
- Pull git repo into any directory, - $git clone https://github.com/gregsavvy/React_Go_Chat)
- From frontend directory install npm dependencies ($npm install)

Run:
- From backend run golang server $go build . and then $./React_Go_Chat
- From frontend run React Native server $npm run start
- Build Android $npm run android

---

Installation and running from docker (testing...):
- Install Docker from https://docs.docker.com/engine/install/ubuntu/ & Docker Compose from https://docs.docker.com/compose/install/
- Pull git repo into any directory, - $git clone https://github.com/gregsavvy/React_Go_Chat)
- From main directory $docker-compose up
- Run Android emulator on your host (example, Android Studio AVD) or connect any Android device to your machine
- Bash into "front" container $sudo docker exec -it front bash
- Make a connection to your desired Android machine with ABD (example, abd connect [HOST:PORT])
- Build Android $npm run android

Installation and running from Kubernetes (testing...):
...

---

Scope:
- This chat app is designed specifically not to store any data except on users' devices (Realm).
- No authentication functionality is implemented.
