import { ReactNode } from 'react';

// Базовый интерфейс для элементов Combobox - минимальные требования
export interface ComboboxItemBase {
  id: string | number;
}

// Стандартный тип элемента с label для базового использования
export interface ComboboxItem extends ComboboxItemBase {
  id: string | number;
  label: string;
  [key: string]: any;
}

// Независимый тип для банковских счетов
export interface Account {
  id: string;
  label: string;
  iban: string;
  type: string;
  internal_number: number;
}

export interface ComboboxProps<T extends ComboboxItemBase> {
  items: T[];
  selectedItem: T | null;
  onSelectedItemChange: (item: T | null) => void;
  inputValue: string;
  onInputValueChange: (value: string) => void;
  placeholder?: string;
  renderItem?: (item: T, isHighlighted: boolean) => ReactNode;
  renderSelectedItem?: (item: T) => ReactNode;
  noResultsText?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  itemToString?: (item: T | null) => string;
}
