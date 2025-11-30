# Controlled Combobox Component

Полностью контролируемый компонент выпадающего списка (combobox) с поиском и кастомизацией элементов, построенный на базе библиотеки `downshift` и TypeScript.

## Возможности

- ✅ Полностью контролируемый компонент (controlled component)
- ✅ Поиск по элементам списка
- ✅ Кастомизация отображения элементов
- ✅ TypeScript типизация
- ✅ Поддержка состояния загрузки
- ✅ Accessibility (доступность)
- ✅ Современный дизайн
- ✅ Гибкая настройка

## Установка

```bash
npm install downshift
```

## Быстрый старт

```tsx
import { useState } from 'react';
import { Combobox, ComboboxItem } from './src';

function App() {
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [inputValue, setInputValue] = useState('');

  const items: ComboboxItem[] = [
    { id: 1, label: 'Яблоко' },
    { id: 2, label: 'Банан' },
    { id: 3, label: 'Апельсин' },
  ];

  return (
    <Combobox
      items={items}
      selectedItem={selectedItem}
      onSelectedItemChange={setSelectedItem}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      placeholder="Выберите фрукт..."
    />
  );
}
```

## API

### Props

| Prop | Тип | Обязательный | Описание |
|------|-----|--------------|----------|
| `items` | `T[]` | ✅ | Массив элементов для отображения |
| `selectedItem` | `T \| null` | ✅ | Текущий выбранный элемент |
| `onSelectedItemChange` | `(item: T \| null) => void` | ✅ | Callback при изменении выбранного элемента |
| `inputValue` | `string` | ✅ | Текущее значение поля ввода |
| `onInputValueChange` | `(value: string) => void` | ✅ | Callback при изменении значения поля ввода |
| `placeholder` | `string` | ❌ | Placeholder для поля ввода |
| `renderItem` | `(item: T, isHighlighted: boolean) => ReactNode` | ❌ | Кастомная функция отрисовки элемента списка |
| `renderSelectedItem` | `(item: T) => ReactNode` | ❌ | Кастомная функция отрисовки выбранного элемента |
| `noResultsText` | `string` | ❌ | Текст при отсутствии результатов поиска |
| `className` | `string` | ❌ | Дополнительные CSS классы |
| `disabled` | `boolean` | ❌ | Отключить компонент |
| `loading` | `boolean` | ❌ | Показать состояние загрузки |
| `loadingText` | `string` | ❌ | Текст при загрузке |
| `itemToString` | `(item: T \| null) => string` | ❌ | Функция преобразования элемента в строку |

### Типы

```typescript
interface ComboboxItem {
  id: string | number;
  label: string;
  [key: string]: any;
}
```

Вы можете расширить `ComboboxItem` для добавления дополнительных полей:

```typescript
interface User extends ComboboxItem {
  id: number;
  label: string;
  email: string;
  role: string;
}
```

## Примеры использования

### Базовый пример

```tsx
function BasicExample() {
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [inputValue, setInputValue] = useState('');

  const items: ComboboxItem[] = [
    { id: 1, label: 'React' },
    { id: 2, label: 'Vue' },
    { id: 3, label: 'Angular' },
  ];

  return (
    <Combobox
      items={items}
      selectedItem={selectedItem}
      onSelectedItemChange={setSelectedItem}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
    />
  );
}
```

### С кастомными элементами

```tsx
interface User extends ComboboxItem {
  email: string;
  role: string;
}

function CustomRenderExample() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState('');

  const users: User[] = [
    { id: 1, label: 'Иван Иванов', email: 'ivan@example.com', role: 'Developer' },
    { id: 2, label: 'Мария Петрова', email: 'maria@example.com', role: 'Designer' },
  ];

  return (
    <Combobox
      items={users}
      selectedItem={selectedUser}
      onSelectedItemChange={setSelectedUser}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      renderItem={(user, isHighlighted) => (
        <div style={{
          display: 'flex',
          gap: '12px',
          backgroundColor: isHighlighted ? '#dbeafe' : 'transparent',
          padding: '8px',
        }}>
          <div>
            <div style={{ fontWeight: '500' }}>{user.label}</div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              {user.email} • {user.role}
            </div>
          </div>
        </div>
      )}
    />
  );
}
```

### С состоянием загрузки

```tsx
function LoadingExample() {
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ComboboxItem[]>([]);

  useEffect(() => {
    fetchItems().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  return (
    <Combobox
      items={items}
      selectedItem={selectedItem}
      onSelectedItemChange={setSelectedItem}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      loading={loading}
      loadingText="Загрузка данных..."
    />
  );
}
```

### Асинхронный поиск

```tsx
function AsyncSearchExample() {
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState<ComboboxItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (inputValue) {
      setLoading(true);
      searchAPI(inputValue).then((results) => {
        setItems(results);
        setLoading(false);
      });
    } else {
      setItems([]);
    }
  }, [inputValue]);

  return (
    <Combobox
      items={items}
      selectedItem={selectedItem}
      onSelectedItemChange={setSelectedItem}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      loading={loading}
      placeholder="Начните вводить для поиска..."
    />
  );
}
```

## Контролируемый компонент

Компонент является полностью контролируемым, что означает:

1. **Все состояние управляется родительским компонентом**
   - `selectedItem` и `onSelectedItemChange` для выбранного элемента
   - `inputValue` и `onInputValueChange` для текста ввода

2. **Полный контроль над данными**
   - Вы можете изменять `items` динамически
   - Реализовать асинхронную загрузку
   - Добавить валидацию

3. **Предсказуемое поведение**
   - Состояние всегда синхронизировано
   - Легко интегрируется с формами
   - Простое тестирование

## Стилизация

Компонент предоставляет CSS классы для кастомизации:

- `.combobox` - основной контейнер
- `.combobox-label` - метка
- `.combobox-input` - поле ввода
- `.combobox-toggle-button` - кнопка открытия/закрытия
- `.combobox-menu` - выпадающее меню
- `.combobox-item` - элемент списка
- `.combobox-item--highlighted` - подсвеченный элемент
- `.combobox-selected-item` - отображение выбранного элемента

Вы можете переопределить стили или добавить свои через prop `className`.

## Accessibility

Компонент построен с использованием `downshift`, который обеспечивает:

- Поддержку клавиатурной навигации
- ARIA атрибуты
- Screen reader совместимость
- Фокус-менеджмент

## Лицензия

MIT
