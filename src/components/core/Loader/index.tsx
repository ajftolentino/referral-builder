import React, { memo } from 'react';
import './styles.scss';

type Props = {
  message?: string;
  type?: 'screen' | 'component';
};

const Loader: React.FC<Props> = ({ message = '', type }) => {
  if (message.trim().length > 0) {
    return (
      <div className="fullscreen">
        <div className="wrapper">
          <span className="ringloader">
            <span />
            <span />
            <span />
            <span />
          </span>
          <p dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${type === 'screen' ? 'fullscreen' : !type ? 'default' : 'component'}`}
    >
      <span className="ringloader">
        <span />
        <span />
        <span />
        <span />
      </span>
    </div>
  );
};

export default memo(Loader);
