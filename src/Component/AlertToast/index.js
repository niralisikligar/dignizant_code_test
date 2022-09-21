import "react-toastify/dist/ReactToastify.min.css";
export function SuccessToast(message) {
  return (
    <>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title">Success</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          {message}
        </span>
      </div>
    </>
  );
}
export function ErrorToast(message) {
  return (
    <>
      <div className="toastify-header">
        <div className="title-wrapper">
          <h6 className="toast-title">Error</h6>
        </div>
      </div>
      <div className="toastify-body">
        <span role="img" aria-label="toast-text">
          {message}
        </span>
      </div>
    </>
  );
}
