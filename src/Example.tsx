import { useState } from 'react';
import { Combobox } from './Combobox';
import { ComboboxItem, Account } from './types';
import { OptionAccount } from './OptionAccount';
import './OptionAccount.css';

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
          4. С компонентом OptionAccount (Банковские счета)
        </h2>
        <AccountExample />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          5. Отключенный компонент
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
    {
      id: 'acc-003',
      label: 'Кредитная карта',
      iban: 'RU1111222233334444555566',
      type: 'credit',
      internal_number: 45502810800000005678,
    },
    {
      id: 'acc-004',
      label: 'Депозитный счет',
      iban: 'RU7777888899990000111122',
      type: 'deposit',
      internal_number: 42301810400000009876,
    },
    {
      id: 'acc-005',
      label: 'Текущий счет для бизнеса',
      iban: 'RU3333444455556666777788',
      type: 'current',
      internal_number: 40702810300000003456,
    },
  ];

  return (
    <div>
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
          <span>
            {account.label} • {account.iban}
          </span>
        )}
        itemToString={(account) =>
          account ? `${account.label} ${account.iban} ${account.internal_number}` : ''
        }
      />

      {selectedAccount && (
        <div
          style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            fontSize: '14px',
          }}
        >
          <h3 style={{ marginBottom: '12px', fontWeight: '600', color: '#111827' }}>
            Информация о выбранном счете:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: '#374151' }}>
            <div>
              <span style={{ fontWeight: '500' }}>ID:</span> {selectedAccount.id}
            </div>
            <div>
              <span style={{ fontWeight: '500' }}>Название:</span> {selectedAccount.label}
            </div>
            <div>
              <span style={{ fontWeight: '500' }}>IBAN:</span>{' '}
              <code style={{ backgroundColor: '#e5e7eb', padding: '2px 6px', borderRadius: '4px' }}>
                {selectedAccount.iban}
              </code>
            </div>
            <div>
              <span style={{ fontWeight: '500' }}>Тип:</span> {selectedAccount.type}
            </div>
            <div>
              <span style={{ fontWeight: '500' }}>Внутренний номер:</span> {selectedAccount.internal_number}
            </div>
          </div>
        </div>
      )}
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
