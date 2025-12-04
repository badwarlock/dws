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
      // Очищаем поле поиска после выбора
      onInputValueChange('');
    },
    onInputValueChange: ({ inputValue: newInputValue }) => {
      onInputValueChange(newInputValue ?? '');
    },
    // Не подставляем значение в input при выборе
    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges;

      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            inputValue: '', // Очищаем input при выборе
          };
        default:
          return changes;
      }
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

  const defaultRenderItem = (item: T, isHighlighted: boolean, isSelected: boolean) => (
    <div
      className={`combobox-item ${isHighlighted ? 'combobox-item--highlighted' : ''} ${
        isSelected ? 'combobox-item--selected' : ''
      }`}
    >
      {itemToString ? itemToString(item) : JSON.stringify(item)}
      {isSelected && (
        <svg
          className="combobox-item-check"
          width="16"
          height="16"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      )}
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
                filteredItems.map((item, index) => {
                  const isSelected = selectedItem === item;
                  const isHighlighted = highlightedIndex === index;

                  return (
                    <li
                      key={getItemKey(item, index)}
                      {...getItemProps({
                        item,
                        index,
                        className: `combobox-item-wrapper ${
                          isSelected ? 'combobox-item-wrapper--selected' : ''
                        }`,
                      })}
                    >
                      {renderItem ? (
                        <div className="combobox-item-container">
                          {renderItem(item, isHighlighted)}
                          {isSelected && (
                            <svg
                              className="combobox-item-check"
                              width="16"
                              height="16"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      ) : (
                        defaultRenderItem(item, isHighlighted, isSelected)
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
