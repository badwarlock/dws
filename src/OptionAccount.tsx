import { Account } from './types';
import './OptionAccount.css';

interface OptionAccountProps {
  account: Account;
  isHighlighted: boolean;
}

export function OptionAccount({ account, isHighlighted }: OptionAccountProps) {
  const getAccountTypeLabel = (type: string): string => {
    const typeLabels: Record<string, string> = {
      checking: 'Расчетный счет',
      savings: 'Сберегательный счет',
      credit: 'Кредитный счет',
      deposit: 'Депозитный счет',
      current: 'Текущий счет',
    };
    return typeLabels[type] || type;
  };

  const getAccountTypeColor = (type: string): string => {
    const colors: Record<string, string> = {
      checking: '#3b82f6',
      savings: '#10b981',
      credit: '#f59e0b',
      deposit: '#8b5cf6',
      current: '#06b6d4',
    };
    return colors[type] || '#6b7280';
  };

  const formatIban = (iban: string): string => {
    return iban.match(/.{1,4}/g)?.join(' ') || iban;
  };

  return (
    <div
      className={`option-account ${
        isHighlighted ? 'option-account--highlighted' : ''
      }`}
    >
      <div className="option-account__icon-wrapper">
        <div
          className="option-account__icon"
          style={{ backgroundColor: getAccountTypeColor(account.type) }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path
              fillRule="evenodd"
              d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="option-account__content">
        <div className="option-account__header">
          <span className="option-account__label">{account.label}</span>
          <span
            className="option-account__type-badge"
            style={{ backgroundColor: `${getAccountTypeColor(account.type)}15`, color: getAccountTypeColor(account.type) }}
          >
            {getAccountTypeLabel(account.type)}
          </span>
        </div>

        <div className="option-account__details">
          <span className="option-account__iban">
            {formatIban(account.iban)}
          </span>
          <span className="option-account__divider">•</span>
          <span className="option-account__number">
            № {account.internal_number}
          </span>
        </div>
      </div>

      {isHighlighted && (
        <div className="option-account__check-icon">
          <svg
            width="20"
            height="20"
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
