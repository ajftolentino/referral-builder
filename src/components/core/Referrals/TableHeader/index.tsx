import React from 'react';

import './styles.scss';

const TableHeader: React.FC = () => {
  return (
    <div className="tableHeader" role="row">
      <span className="givenName" role="columnheader">
        GIVEN NAME
      </span>
      <span className="surname" role="columnheader">
        SURNAME
      </span>
      <span className="email" role="columnheader">
        EMAIL
      </span>
      <span className="phone" role="columnheader">
        PHONE
      </span>
      <span className="actions" role="columnheader">
        ACTIONS
      </span>
    </div>
  );
};

export default TableHeader;
