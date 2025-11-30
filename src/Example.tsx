import { useState } from 'react';
import { Combobox } from './Combobox';
import { ComboboxItem, Account } from './types';
import { OptionAccount } from './OptionAccount';
import { CustomItemRenderer, CustomItem } from './CustomItemRenderer';
import './OptionAccount.css';
import './CustomItemRenderer.css';

export function Example() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '32px', fontSize: '24px', fontWeight: 'bold' }}>
        Примеры использования Combobox
      </h1>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          1. Базовый пример (ComboboxItem)
        </h2>
        <BasicExample />
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: '600' }}>
          2. С компонентом CustomItemRenderer
        </h2>
        <CustomRendererExample />
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
      itemToString={(item) => (item ? item.label : '')}
    />
  );
}

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
    {
      id: 3,
      label: 'Алексей Сидоров',
      description: 'alexey@example.com • Менеджер',
      color: '#8b5cf6',
    },
    {
      id: 4,
      label: 'Екатерина Смирнова',
      description: 'ekaterina@example.com • Разработчик',
      color: '#10b981',
    },
    {
      id: 5,
      label: 'Дмитрий Козлов',
      description: 'dmitry@example.com • Тестировщик',
      color: '#f59e0b',
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
      renderSelectedItem={(item) => <span>{item.label}</span>}
      itemToString={(item) => (item ? `${item.label} ${item.description || ''}` : '')}
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
        itemToString={(item) => (item ? item.label : '')}
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
      itemToString={(item) => (item ? item.label : '')}
    />
  );
}
