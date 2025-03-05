import React, { MouseEventHandler } from 'react';

import './styles.scss';

type Props = {
  toggleLeftSidebar?: MouseEventHandler<HTMLButtonElement>;
};

const Header: React.FC<Props> = ({ toggleLeftSidebar }) => {
  return (
    <header id="header" className="header">
      <div id="header_container" className="container">
        {window.history.length > 0 && (
          <button
            type="button"
            className="backBtn"
            onClick={toggleLeftSidebar}
            aria-label="Back Button"
          >
            <span className="icon-back clickable" />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
