import './CustomItemRenderer.css';

export interface CustomItem {
  id: string | number;
  label: string;
  description?: string;
  icon?: string;
  color?: string;
}

interface CustomItemRendererProps {
  item: CustomItem;
  isHighlighted: boolean;
}

export function CustomItemRenderer({ item, isHighlighted }: CustomItemRendererProps) {
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      className={`custom-item ${
        isHighlighted ? 'custom-item--highlighted' : ''
      }`}
    >
      <div className="custom-item__icon-wrapper">
        <div
          className="custom-item__icon"
          style={{ backgroundColor: item.color || '#3b82f6' }}
        >
          {item.icon ? (
            <span className="custom-item__icon-text">{item.icon}</span>
          ) : (
            <span className="custom-item__icon-text">{getInitials(item.label)}</span>
          )}
        </div>
      </div>

      <div className="custom-item__content">
        <div
          className="custom-item__label"
          style={{ color: isHighlighted ? '#1e40af' : '#111827' }}
        >
          {item.label}
        </div>
        {item.description && (
          <div className="custom-item__description">{item.description}</div>
        )}
      </div>

      {isHighlighted && (
        <div className="custom-item__check-icon">
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
