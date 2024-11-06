import { ReactNode } from "react";

type Props = {
  title: string;
  type: "primary" | "danger" | "warning";
  cancelText?: string;
  submitText?: string;
  onClose?: () => void;
  onSubmit?: () => void;
  children: ReactNode;
};

export default function CustomModal({
  title,
  type,
  cancelText,
  submitText,
  children,
  onClose,
  onSubmit,
}: Props) {
  return (
    <div className="bg-dark bg-opacity-75 position-fixed w-100 h-100 top-0 left-0 right-0 bottom-0 z-1 ">
      <div className="modal fade show d-block " tabIndex={-1}>
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                onClick={onClose}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">{children}</div>
            {onClose && onSubmit && (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                  data-bs-dismiss="modal"
                >
                  {cancelText ? cancelText : "Close"}
                </button>
                <button
                  onClick={onSubmit}
                  type="button"
                  className={`btn btn-${type}`}
                >
                  {submitText ? submitText : "Save changes"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
