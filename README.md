About this app:

This is a chat app using websockets, which consists of 2 separate modules:

1. Go (with Gorilla Websocket) | Independent RestAPI backend (JSON provider) | ex. ws://localhost:5000
2. React Native | Mobile frontend (Android) | ex. your Android device IP or AVD emulator

---

Installation (Linux):
1. Install Docker from https://docs.docker.com/engine/install/ubuntu/ & Docker Compose from https://docs.docker.com/compose/install/
2. Initialize git repo in any directory, - $git init
3. Pull git repo into git directory, - $git remote add demo https://github.com/gregsavvy/React_Go_Chat), then $git pull demo main

Run (Linux):
1. From main directory $sudo docker-compose up
2. Run Android emulator on your host (example, Android Studio AVD) or connect any Android device to your machine
3. From another terminal window bash into "front" container, - $sudo docker exec -it front bash
4. Build Android, - $npm run android

Important notice: the app is configured to run with default Android Studio AVD (looks for 10.0.2.2 on port 5000)

---

Scope:
- This chat app is designed specifically not to store any data except on users' devices (Realm).
- No authentication functionality is implemented.
- Messages are not encrypted
