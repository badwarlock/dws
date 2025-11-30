import { useState } from 'react';
import { Combobox } from './Combobox';
import { ComboboxItem } from './types';

interface User extends ComboboxItem {
  id: number;
  label: string;
  email: string;
  role: string;
  avatar?: string;
}

const users: User[] = [
  { id: 1, label: 'Иван Иванов', email: 'ivan@example.com', role: 'Разработчик' },
  { id: 2, label: 'Мария Петрова', email: 'maria@example.com', role: 'Дизайнер' },
  { id: 3, label: 'Алексей Сидоров', email: 'alexey@example.com', role: 'Менеджер' },
  { id: 4, label: 'Екатерина Смирнова', email: 'ekaterina@example.com', role: 'Разработчик' },
  { id: 5, label: 'Дмитрий Козлов', email: 'dmitry@example.com', role: 'Тестировщик' },
  { id: 6, label: 'Анна Новикова', email: 'anna@example.com', role: 'Дизайнер' },
  { id: 7, label: 'Сергей Морозов', email: 'sergey@example.com', role: 'Разработчик' },
  { id: 8, label: 'Ольга Волкова', email: 'olga@example.com', role: 'Менеджер' },
];

export function Example() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px', fontSize: '24px', fontWeight: 'bold' }}>
        Примеры использования Combobox
      </h1>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          1. Базовый пример
        </h2>
        <BasicExample />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          2. С кастомными элементами списка
        </h2>
        <Combobox
          items={users}
          selectedItem={selectedUser}
          onSelectedItemChange={setSelectedUser}
          inputValue={inputValue}
          onInputValueChange={setInputValue}
          placeholder="Начните вводить имя..."
          renderItem={(user, isHighlighted) => (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '8px',
                backgroundColor: isHighlighted ? '#dbeafe' : 'transparent',
                borderRadius: '4px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '14px',
                }}
              >
                {user.label.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontWeight: '500',
                    color: isHighlighted ? '#1e40af' : '#111827',
                  }}
                >
                  {user.label}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {user.email} • {user.role}
                </div>
              </div>
            </div>
          )}
          renderSelectedItem={(user) => (
            <span>
              {user.label} ({user.email})
            </span>
          )}
        />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          3. С состоянием загрузки
        </h2>
        <LoadingExample />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          4. Отключенный компонент
        </h2>
        <DisabledExample />
      </div>
    </div>
  );
}

function BasicExample() {
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [inputValue, setInputValue] = useState('');

  const items: ComboboxItem[] = [
    { id: 1, label: 'Яблоко' },
    { id: 2, label: 'Банан' },
    { id: 3, label: 'Апельсин' },
    { id: 4, label: 'Виноград' },
    { id: 5, label: 'Клубника' },
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

function LoadingExample() {
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(true);

  const items: ComboboxItem[] = [
    { id: 1, label: 'React' },
    { id: 2, label: 'Vue' },
    { id: 3, label: 'Angular' },
  ];

  return (
    <div>
      <Combobox
        items={items}
        selectedItem={selectedItem}
        onSelectedItemChange={setSelectedItem}
        inputValue={inputValue}
        onInputValueChange={setInputValue}
        placeholder="Выберите фреймворк..."
        loading={loading}
        loadingText="Загружаем данные..."
      />
      <button
        onClick={() => setLoading(!loading)}
        style={{
          marginTop: '12px',
          padding: '8px 16px',
          fontSize: '14px',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        {loading ? 'Показать данные' : 'Показать загрузку'}
      </button>
    </div>
  );
}

function DisabledExample() {
  const [selectedItem, setSelectedItem] = useState<ComboboxItem | null>(null);
  const [inputValue, setInputValue] = useState('');

  const items: ComboboxItem[] = [
    { id: 1, label: 'JavaScript' },
    { id: 2, label: 'TypeScript' },
    { id: 3, label: 'Python' },
  ];

  return (
    <Combobox
      items={items}
      selectedItem={selectedItem}
      onSelectedItemChange={setSelectedItem}
      inputValue={inputValue}
      onInputValueChange={setInputValue}
      placeholder="Компонент отключен..."
      disabled
    />
  );
}
