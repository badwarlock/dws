import { useCombobox } from 'downshift';
import { useMemo } from 'react';
import { ComboboxItem, ComboboxProps } from './types';
import './Combobox.css';

export function Combobox<T extends ComboboxItem>({
  items,
  selectedItem,
  onSelectedItemChange,
  inputValue,
  onInputValueChange,
  placeholder = 'Выберите элемент...',
  renderItem,
  renderSelectedItem,
  noResultsText = 'Ничего не найдено',
  className = '',
  disabled = false,
  loading = false,
  loadingText = 'Загрузка...',
  itemToString = (item) => (item ? item.label : ''),
}: ComboboxProps<T>) {
  const filteredItems = useMemo(() => {
    if (!inputValue) {
      return items;
    }

    const lowerCasedInput = inputValue.toLowerCase();
    return items.filter((item) =>
      item.label.toLowerCase().includes(lowerCasedInput)
    );
  }, [items, inputValue]);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: filteredItems,
    itemToString,
    selectedItem,
    inputValue,
    onSelectedItemChange: ({ selectedItem: newSelectedItem }) => {
      onSelectedItemChange(newSelectedItem ?? null);
    },
    onInputValueChange: ({ inputValue: newInputValue }) => {
      onInputValueChange(newInputValue ?? '');
    },
  });

  const defaultRenderItem = (item: T, isHighlighted: boolean) => (
    <div
      className={`combobox-item ${isHighlighted ? 'combobox-item--highlighted' : ''}`}
    >
      {item.label}
    </div>
  );

  const defaultRenderSelectedItem = (item: T) => item.label;

  return (
    <div className={`combobox ${className}`}>
      <div className="combobox-label" {...getLabelProps()}>
        Выберите элемент:
      </div>

      <div className="combobox-input-wrapper">
        <input
          {...getInputProps({
            disabled,
            placeholder,
            className: 'combobox-input',
          })}
          value={inputValue}
        />

        <button
          {...getToggleButtonProps({
            disabled,
            className: 'combobox-toggle-button',
            'aria-label': 'Открыть меню',
          })}
          type="button"
        >
          <svg
            className={`combobox-arrow ${isOpen ? 'combobox-arrow--open' : ''}`}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </button>
      </div>

      {selectedItem && !isOpen && (
        <div className="combobox-selected-item">
          Выбрано: {renderSelectedItem ? renderSelectedItem(selectedItem) : defaultRenderSelectedItem(selectedItem)}
        </div>
      )}

      <ul
        {...getMenuProps({
          className: `combobox-menu ${isOpen ? 'combobox-menu--open' : ''}`,
        })}
      >
        {isOpen && (
          <>
            {loading ? (
              <li className="combobox-loading">{loadingText}</li>
            ) : filteredItems.length === 0 ? (
              <li className="combobox-no-results">{noResultsText}</li>
            ) : (
              filteredItems.map((item, index) => (
                <li
                  key={item.id}
                  {...getItemProps({
                    item,
                    index,
                    className: 'combobox-item-wrapper',
                  })}
                >
                  {renderItem
                    ? renderItem(item, highlightedIndex === index)
                    : defaultRenderItem(item, highlightedIndex === index)}
                </li>
              ))
            )}
          </>
        )}
      </ul>
    </div>
  );
}
