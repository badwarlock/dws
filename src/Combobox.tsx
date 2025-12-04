import { useCombobox } from 'downshift';
import { useMemo } from 'react';
import { ComboboxProps } from './types';
import './Combobox.css';

export function Combobox<T>({
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
  itemToString,
  getItemId,
}: ComboboxProps<T>) {
  const filteredItems = useMemo(() => {
    if (!inputValue || !itemToString) {
      return items;
    }

    const lowerCasedInput = inputValue.toLowerCase();
    return items.filter((item) =>
      itemToString(item).toLowerCase().includes(lowerCasedInput)
    );
  }, [items, inputValue, itemToString]);

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

  const getItemKey = (item: T, index: number): string | number => {
    if (getItemId) {
      return getItemId(item);
    }
    // Попытка получить id из объекта если он есть
    if (item && typeof item === 'object' && 'id' in item) {
      return (item as any).id;
    }
    // Fallback на index
    return index;
  };

  const defaultRenderItem = (item: T, isHighlighted: boolean) => (
    <div
      className={`combobox-item ${isHighlighted ? 'combobox-item--highlighted' : ''}`}
    >
      {itemToString ? itemToString(item) : JSON.stringify(item)}
    </div>
  );

  const defaultRenderSelectedItem = (item: T) =>
    itemToString ? itemToString(item) : JSON.stringify(item);

  return (
    <div className={`combobox ${className}`}>
      <div className="combobox-label" {...getLabelProps()}>
        Выберите элемент:
      </div>

      {/* Триггер - показывает выбранный элемент или placeholder */}
      <button
        {...getToggleButtonProps({
          disabled,
          className: `combobox-trigger ${isOpen ? 'combobox-trigger--open' : ''}`,
          'aria-label': 'Открыть меню',
        })}
        type="button"
      >
        {selectedItem ? (
          <div className="combobox-trigger-content">
            {renderItem
              ? renderItem(selectedItem, false)
              : defaultRenderItem(selectedItem, false)}
          </div>
        ) : (
          <span className="combobox-trigger-placeholder">{placeholder}</span>
        )}
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

      {/* Выпадающее меню с поиском внутри */}
      <div
        {...getMenuProps({
          className: `combobox-menu ${isOpen ? 'combobox-menu--open' : ''}`,
        })}
      >
        {isOpen && (
          <>
            {/* Поле поиска внутри меню */}
            <div className="combobox-search-wrapper">
              <input
                {...getInputProps({
                  disabled,
                  placeholder: 'Поиск...',
                  className: 'combobox-search-input',
                  onClick: (e) => {
                    e.stopPropagation();
                  },
                })}
                value={inputValue}
              />
            </div>

            {/* Список элементов */}
            <ul className="combobox-items-list">
              {loading ? (
                <li className="combobox-loading">{loadingText}</li>
              ) : filteredItems.length === 0 ? (
                <li className="combobox-no-results">{noResultsText}</li>
              ) : (
                filteredItems.map((item, index) => (
                  <li
                    key={getItemKey(item, index)}
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
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
