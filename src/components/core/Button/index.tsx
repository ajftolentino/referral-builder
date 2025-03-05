import React, { memo, useCallback } from 'react';

import './styles.scss';

type Props = {
  disabled?: boolean;
  label?: string;
  styles?: string[];
  type?: 'button' | 'submit';
  onClick: () => void;
};

const Button: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  disabled = false,
  label,
  styles = [],
  type = 'button',
  onClick,
}) => {
  const onButtonClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <button
      className={`button clickable${styles.length > 0 ? ` ${styles.join(' ')}` : ''}`}
      disabled={disabled}
      onClick={onButtonClick}
      type={type}
    >
      {label}
      {children}
    </button>
  );
};

export default memo(Button);
