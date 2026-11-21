# Интернет-магазин садовых принадлежностей

Учебный проект на React: каталог, карточка товара, корзина и оформление заказа. Данные — с бэкенда `telran-backend`.

## Запуск

Бэкенд:

```sh
git clone https://github.com/Ray3en/telran-backend
cd telran-backend
npm install
npm run dev      # http://localhost:3333
```

Приложение:

```sh
cd garden-shop
npm install
npm run dev      # http://localhost:5173
```

Адрес API задаётся через `VITE_API_URL` (по умолчанию `http://localhost:3333`). Сборка — `npm run build`.

## Стек

React 19, Vite, Redux Toolkit, React Router, React Hook Form, CSS Modules.

## Функционал

- Каталог категорий и товаров с фильтром по цене, скидкам и сортировкой.
- Карточка товара с выбором количества.
- Корзина с сохранением в localStorage.
- Оформление заказа с валидацией.
- Адаптивная вёрстка и страница 404.

Структура: `garden-shop/src/` — `api/`, `assets/`, `components/`, `pages/`, `store/`, `utils/`.
