import { ReactNode } from 'react';

export interface ComboboxItem {
  id: string | number;
  label: string;
  [key: string]: any;
}

export interface ComboboxProps<T extends ComboboxItem> {
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
