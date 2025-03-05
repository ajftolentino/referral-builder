import React from 'react';
import './styles.scss';

type Props = { errors?: string | string[] };

const ErrorMessages: React.FC<Props> = ({ errors }) => {
  if (!errors || !errors.length) {
    return null;
  }

  if (typeof errors === 'string') {
    return (
      <div
        className="errorMessages"
        dangerouslySetInnerHTML={{
          __html: errors,
        }}
      />
    );
  }

  return (
    <div className="errorMessages">
      {errors.map((error, i) => (
        <p
          key={i}
          dangerouslySetInnerHTML={{
            __html: error,
          }}
        />
      ))}
    </div>
  );
};

export default ErrorMessages;
