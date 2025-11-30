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
      itemToString={(item) => (item ? item.label : '')}
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
| `itemToString` | `(item: T \| null) => string` | ❌ | Функция преобразования элемента в строку (для поиска и отображения) |
| `getItemId` | `(item: T) => string \| number` | ❌ | Функция для получения уникального ID элемента |

### Типы

Компонент работает с **любыми типами данных** без ограничений! Вы можете использовать любую структуру объектов.

#### Встроенные типы для удобства

**ComboboxItem** - стандартный тип для базового использования:

```typescript
interface ComboboxItem {
  id: string | number;
  label: string;
  [key: string]: any;
}
```

**Account** - независимый тип для банковских счетов:

```typescript
interface Account {
  id: string;
  label: string;
  iban: string;
  type: string;
  internal_number: number;
}
```

**CustomItem** - независимый тип для кастомных элементов:

```typescript
interface CustomItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
}
```

#### Работа с любыми типами данных

Combobox может работать с **любыми** объектами! Если у объекта есть поле `id`, оно будет использоваться автоматически. Если нет - используйте `getItemId`:

**Пример 1: Объект с полем id**
```typescript
interface Product {
  id: number;
  name: string;
  price: number;
}

<Combobox<Product>
  items={products}
  itemToString={(item) => item ? item.name : ''}
  // id берется автоматически из product.id
/>
```

**Пример 2: Объект без поля id**
```typescript
interface Color {
  hex: string;
  name: string;
  rgb: [number, number, number];
}

<Combobox<Color>
  items={colors}
  getItemId={(color) => color.hex}
  itemToString={(item) => item ? item.name : ''}
/>
```

**Пример 3: Простые значения**
```typescript
const fruits = ['Яблоко', 'Банан', 'Апельсин'];

<Combobox<string>
  items={fruits}
  getItemId={(item) => item}
  itemToString={(item) => item || ''}
/>
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

### С компонентом CustomItemRenderer

Пример использования готового компонента `CustomItemRenderer` для отображения пользователей:

```tsx
import { useState } from 'react';
import { Combobox, CustomItemRenderer, CustomItem } from './src';

function CustomRendererExample() {
  const [selectedItem, setSelectedItem] = useState<CustomItem | null>(null);
  const [inputValue, setInputValue] = useState('');

  const items: CustomItem[] = [
    {
      id: 1,
      label: 'Иван Иванов',
      description: 'ivan@example.com • Разработчик',
      color: '#3b82f6',
    },
    {
      id: 2,
      label: 'Мария Петрова',
      description: 'maria@example.com • Дизайнер',
      color: '#ec4899',
    },
  ];

  return (
    <Combobox
      items={items}
      selectedItem={selectedItem}
      onSelectedItemChange={setSelectedItem}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      placeholder="Начните вводить имя..."
      renderItem={(item, isHighlighted) => (
        <CustomItemRenderer item={item} isHighlighted={isHighlighted} />
      )}
      itemToString={(item) => (item ? `${item.label} ${item.description || ''}` : '')}
    />
  );
}
```

Компонент `CustomItemRenderer` предоставляет:
- Круглую иконку с инициалами или кастомным значением
- Настраиваемый цвет иконки
- Название и описание
- Анимацию при выделении

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

### С компонентом OptionAccount (Банковские счета)

Пример использования независимого типа `Account` с готовым компонентом `OptionAccount`:

```tsx
import { useState } from 'react';
import { Combobox, OptionAccount, Account } from './src';

function AccountExample() {
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [inputValue, setInputValue] = useState('');

  const accounts: Account[] = [
    {
      id: 'acc-001',
      label: 'Основной счет',
      iban: 'RU1234567890123456789012',
      type: 'checking',
      internal_number: 40817810099910004312,
    },
    {
      id: 'acc-002',
      label: 'Сберегательный счет',
      iban: 'RU9876543210987654321098',
      type: 'savings',
      internal_number: 42306810000000001234,
    },
  ];

  return (
    <Combobox
      items={accounts}
      selectedItem={selectedAccount}
      onSelectedItemChange={setSelectedAccount}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      placeholder="Начните вводить номер счета или IBAN..."
      renderItem={(account, isHighlighted) => (
        <OptionAccount account={account} isHighlighted={isHighlighted} />
      )}
      renderSelectedItem={(account) => (
        <span>{account.label} • {account.iban}</span>
      )}
      itemToString={(account) =>
        account ? `${account.label} ${account.iban} ${account.internal_number}` : ''
      }
    />
  );
}
```

**Тип Account** (независимый тип, не наследуется от ComboboxItem):

```typescript
interface Account {
  id: string;
  label: string;
  iban: string;
  type: string; // 'checking' | 'savings' | 'credit' | 'deposit' | 'current'
  internal_number: number;
}
```

Компонент `OptionAccount` предоставляет:
- Иконку с цветом в зависимости от типа счета (синий, зеленый, оранжевый, фиолетовый, голубой)
- Форматированный IBAN (разбивка на блоки по 4 символа)
- Бейдж с типом счета (Расчетный, Сберегательный, Кредитный, Депозитный, Текущий)
- Внутренний номер счета
- Анимацию при выделении
- Иконку галочки при выделении

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

## Архитектура независимых компонентов

Ключевая особенность этого Combobox - **полная гибкость типов данных и независимые компоненты рендеринга**.

### Принципы

1. **Без ограничений**: Combobox работает с **ЛЮБЫМИ** типами данных - объектами, строками, числами, чем угодно!
2. **Автоматическое определение ID**: Если у объекта есть поле `id`, используется автоматически. Для других случаев - используйте `getItemId`
3. **Независимые типы**: `Account`, `CustomItem`, `ComboboxItem` - все полностью независимы друг от друга
4. **Специализированные компоненты**: `OptionAccount` и `CustomItemRenderer` - независимые компоненты для рендеринга
5. **Максимальная гибкость**: Расширяйте любые типы без ограничений, не нужно наследоваться от базовых интерфейсов

### Преимущества

- ✅ **Полная свобода**: Работает с любыми типами данных без ограничений
- ✅ **Нет наследования**: Не нужно расширять базовые типы или интерфейсы
- ✅ **Автоматика**: Поле `id` определяется автоматически, если оно есть
- ✅ **Независимость**: Каждый компонент рендеринга инкапсулирует свою логику
- ✅ **Type Safety**: TypeScript полностью понимает все типы
- ✅ **Расширяемость**: Легко добавлять новые типы и компоненты

### Пример создания нового типа и компонента

```typescript
// 1. Создаем тип (независимый)
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

// 2. Создаем компонент рендеринга
function ProductRenderer({ item, isHighlighted }: { item: Product; isHighlighted: boolean }) {
  return (
    <div style={{ backgroundColor: isHighlighted ? '#dbeafe' : 'transparent' }}>
      <img src={item.image} alt={item.name} />
      <div>{item.name}</div>
      <div>${item.price}</div>
    </div>
  );
}

// 3. Используем с Combobox
<Combobox<Product>
  items={products}
  renderItem={(item, highlighted) => <ProductRenderer item={item} isHighlighted={highlighted} />}
  itemToString={(item) => item ? `${item.name} ${item.price}` : ''}
  // ...
/>
```

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
