import { ReactNode } from 'react';

// Стандартный тип элемента с label для базового использования
export interface ComboboxItem {
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

export interface ComboboxProps<T> {
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
  getItemId?: (item: T) => string | number;
}
