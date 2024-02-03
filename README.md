# 📓Notes
When learning different tools, I needed to take notes. 

So I created a note-taking application that I and my mates use on a daily basis.


## Technologies

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Redux Toolkit](https://img.shields.io/badge/RTK-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
<br>
![Firebase](https://img.shields.io/badge/firebase-%23323330.svg?style=for-the-badge&logo=firebase&logoColor=%23#f97316)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-%23082f49.svg?style=for-the-badge&logo=TailwindCSS&logoColor=white) 
![React Quill](https://img.shields.io/badge/💯%20React%20Quill-%23f9a8d4.svg?style=for-the-badge) 


## Project Setup
1. Clone the repository
   ``` bash
   git clone https://github.com/Victor-Maznichenko/Notes.git
   cd Notes
   ```
   
2. Copy your .env file for local development or production
   ``` bash
   cp .env.local.example .env.local
   cp .env.production.local.example .env.production.local
   ```
   
3. Edit your .env file. Make sure your Firebase configuration added
   ``` dotenv
   VITE_FIREBASE_API_KEY: **************************************
   VITE_FIREBASE_AUTH_DOMAIN: ***************************
   VITE_FIREBASE_PROJECT_ID: ***********
   VITE_FIREBASE_STORAGE_BUCKET: ***********************
   VITE_FIREBASE_MESSAGING_SENDER_ID: ***********
   VITE_FIREBASE_APP_ID: ****************************************
   ```

4. Install dependencies
   ``` shell
   npm install
   ```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```
