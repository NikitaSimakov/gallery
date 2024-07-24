# Gallery Project

Этот проект состоит из фронтенда на `create-react-app` и бэкенда на `Directus`, завернутых в Docker контейнеры и обслуживаемых через Nginx.

## Содержание

- [Требования](#требования)
- [Установка](#установка)
- [Запуск проекта](#запуск-проекта)
- [Переменные окружения](#переменные-окружения)
- [Структура проекта](#структура-проекта)
- [Инструкции для разработки](#инструкции-для-разработки)

## Требования

- Docker
- Docker Compose
- Git

## Установка

1. Клонируйте репозиторий:

   ```sh
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```

2. Создайте файлы `.env` для фронтенда и бэкенда на основе примеров:

   ```sh
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   ```

3. Отредактируйте файлы `.env` и укажите необходимые значения.

## Запуск проекта

1. Соберите и запустите контейнеры:

   ```sh
   docker-compose up --build
   ```

2. Приложение будет доступно по адресу `http://localhost:3000`, а Directus API по адресу `http://localhost:8055`.

## Переменные окружения

### Фронтенд

**frontend/.env.example**:

```dotenv
REACT_APP_API_URL=http://localhost:8055
```

## Админка Directus

### Логин admin@admin.com

### Пароль adminpassword
