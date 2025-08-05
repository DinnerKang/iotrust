import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  title: string;
  contents: string;
  onSuccess?: () => void;
  onCancel: () => void;
  successText: string;
  cancelText: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  contents,
  onSuccess,
  onCancel,
  successText,
  cancelText
}) => {
  // 배경 클릭시 모달 닫기
  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.modal_backdrop}
      onClick={handleBackdropClick}
    >
      <div className={styles.modal_content}>
        {/* 모달 헤더 */}
        <div className={styles.modal_header}>
          <h2>{title}</h2>
        </div>

        {/* 모달 내용 */}
        <div className={styles.modal_body}>
          {contents}
        </div>

        {/* 모달 버튼 */}
        <div className={styles.modal_footer}>
          <button
            onClick={onCancel}
            className={styles.cancel_button}
          >
            {cancelText}
          </button>
          
          {onSuccess && (
            <button
              onClick={onSuccess}
              className={styles.success_button}
            >
              {successText}
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
