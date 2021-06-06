FROM reactnativecommunity/react-native-android

WORKDIR /app

COPY ./package.json ./

RUN npm install

COPY . .

CMD npm run start