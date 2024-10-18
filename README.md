# Movies App

Movies App — это приложение для просмотра списка фильмов с возможностью поиска,
оценки и сохранения понравившихся фильмов. Приложение использует API [The Movie Database
(TMDb)](https://developer.themoviedb.org/docs/getting-started) для загрузки данных о фильмах.
<br><br>
Развернутое приложение доступно на странице [Movies App](https://movies-six-rho.vercel.app).
<br>

### Установка и запуск

Клонирование репозитория

```
git clone https://github.com/tpodkur/Movies.git
cd Movies
```

Настройка API

- Зарегистрируйтесь на сайте [The Movie Database (TMDb)](https://www.themoviedb.org).
- Получите API ключ и токен.
- Добавьте API ключ и токен в файл конфигурации приложения — api-config.js.
<br>Пример:
<br>```const API_KEY = 'YOUR_API_KEY_HERE';```
<br>```const API_ACCESS_TOKEN = 'YOUR_API_ACCESS_TOKEN_HERE';```
<br>
<!-- end of the list -->

Запуск приложения
```
npm install
npm start
```
Приложение будет запущено по адресу http://localhost:3000.
<br>

### Стек технологий

**Frontend:** React, JavaScript, SASS, Eslint, Prettier
<br>
**Хранение данных:** localStorage (для сохранения оценённых фильмов на стороне клиента)
<br>
**API:** The Movie Database API (TMDb)

