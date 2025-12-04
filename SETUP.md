# Как запустить приложение

Это руководство поможет вам запустить demo приложение с примерами использования Combobox.

## Предварительные требования

Убедитесь, что у вас установлены:
- **Node.js** версии 18 или выше
- **npm** (устанавливается вместе с Node.js)

Проверить версии можно командами:
```bash
node --version
npm --version
```

## Шаги для запуска

### 1. Установите зависимости

В корневой директории проекта выполните:

```bash
npm install
```

Эта команда установит все необходимые зависимости:
- `react` и `react-dom` - библиотека React
- `downshift` - библиотека для создания combobox
- `vite` - современный сборщик и dev-сервер
- `typescript` - для поддержки TypeScript

### 2. Запустите dev-сервер

```bash
npm run dev
```

Эта команда:
- Запустит Vite dev-сервер
- Откроет браузер автоматически
- Приложение будет доступно по адресу `http://localhost:3000`

### 3. Просмотрите примеры

После запуска вы увидите страницу с 5 примерами использования:

1. **Базовый пример** - простой combobox с фруктами
2. **CustomItemRenderer** - combobox с кастомными элементами (пользователи)
3. **С состоянием загрузки** - демонстрация loading state
4. **OptionAccount** - combobox с банковскими счетами
5. **Отключенный компонент** - disabled state

## Дополнительные команды

### Build для production

```bash
npm run build
```

Создаст оптимизированную production сборку в папке `dist/`

### Предпросмотр production сборки

```bash
npm run preview
```

Запустит локальный сервер для просмотра production сборки

### Build библиотеки

```bash
npm run build:lib
```

Скомпилирует TypeScript в JavaScript для использования в других проектах

## Структура проекта

```
/home/user/dws/
├── index.html          # HTML entry point
├── vite.config.ts      # Vite конфигурация
├── package.json        # Зависимости и scripts
├── tsconfig.json       # TypeScript конфигурация
├── src/
│   ├── main.tsx        # React entry point
│   ├── App.tsx         # Главный компонент приложения
│   ├── Example.tsx     # Компонент с примерами
│   ├── Combobox.tsx    # Основной Combobox компонент
│   ├── Combobox.css    # Стили Combobox
│   ├── OptionAccount.tsx      # Компонент для банковских счетов
│   ├── OptionAccount.css      # Стили OptionAccount
│   ├── CustomItemRenderer.tsx # Компонент для кастомных элементов
│   ├── CustomItemRenderer.css # Стили CustomItemRenderer
│   ├── types.ts        # TypeScript типы
│   └── index.ts        # Экспорты библиотеки
└── README.md           # Документация
```

## Горячая перезагрузка (Hot Module Replacement)

Vite поддерживает HMR - при изменении файлов приложение автоматически обновится в браузере без полной перезагрузки страницы.

Попробуйте изменить любой файл в `src/` и посмотрите как изменения мгновенно отображаются в браузере!

## Решение проблем

### Ошибка "Cannot find module"

Убедитесь, что вы выполнили `npm install`

### Порт 3000 уже занят

Измените порт в `vite.config.ts`:
```typescript
server: {
  port: 3001, // или любой другой свободный порт
}
```

### Ошибки TypeScript

Проверьте `tsconfig.json` и убедитесь, что все пути настроены правильно

## Использование компонентов в своем проекте

Чтобы использовать компоненты в своем проекте, импортируйте их из `src/index.ts`:

```typescript
import { Combobox, OptionAccount, CustomItemRenderer } from './src';
import type { Account, CustomItem, ComboboxItem } from './src';
```

Подробную документацию смотрите в [README.md](./README.md)
