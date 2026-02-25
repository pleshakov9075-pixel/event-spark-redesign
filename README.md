# Event Spark Redesign

Редизайн главной страницы личного бренда ведущего Владимира Башмакова.

## Stack

- Vite
- React + TypeScript
- Tailwind CSS
- Framer Motion

## Local Run

```bash
npm i
npm run dev
```

## Build

```bash
npm run build
```

## Media Structure

Локальные ассеты проекта находятся только внутри репозитория:

- `public/assets/photo/vk/`
- `public/assets/photo/generated/`
- `public/assets/video/reels/`
- `src/content/media.ts`

## Deploy Scenario (SSH)

1. Подключиться к серверу:
```bash
ssh <USER>@<HOST>
```

2. Перейти в директорию проекта:
```bash
cd <REMOTE_PROJECT_DIR>
```

3. Обновить код:
```bash
git pull
```

4. Установить зависимости:
```bash
npm i
```

5. Собрать проект:
```bash
npm run build
```

6. Перезапустить сервис по текущей конфигурации проекта:

```bash
# PM2
pm2 restart <PM2_APP_NAME>

# или Docker
docker compose up -d --build

# или systemd
sudo systemctl restart <SERVICE_NAME>
```

7. Проверить статус сервиса и логи.
