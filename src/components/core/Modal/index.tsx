import React from 'react';
import { getStyles } from 'helpers';
import './styles.scss';

type Props = {
  contentWrapStyles?: string[];
  isHeaderHidden?: boolean;
  modalStyles?: string[];
  title: string;
  cbClose: () => void;
};

const Modal: React.FC<React.PropsWithChildren<Props>> = ({
  children,
  contentWrapStyles,
  isHeaderHidden,
  modalStyles,
  title,
  cbClose,
}) => (
  <div
    id="modal"
    className={getStyles({ styles: modalStyles, defaultStyle: 'modal' })}
  >
    <div
      className={getStyles({
        styles: contentWrapStyles,
        defaultStyle: 'modalContentWrap',
      })}
    >
      <div id="modal_content" className="modalContent">
        {/* header */}
        {!isHeaderHidden && (
          <div id="modal_header" className="modalHeader">
            {/* text */}
            <h3>{title}</h3>
            {/* x button */}
            <button
              className="cancel"
              onClick={cbClose}
              type="button"
              aria-label="Cancel"
            >
              <span className="icon-cross" />
            </button>
          </div>
        )}
        {/* Body */}
        <div id="modal_body" className="modalBody">
          {children}
        </div>
      </div>
    </div>
  </div>
);

export default Modal;
