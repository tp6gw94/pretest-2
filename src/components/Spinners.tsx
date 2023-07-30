import classNames from 'classnames';

const Spinners = ({ fullpage = false }: { fullpage?: boolean }) => {
  return (
    <div className={classNames('modal-backdrop bg-light opacity-75')}>
      <div
        className={classNames('d-flex justify-content-center align-items-center vw-100 vh-100', { 'vw-100 vh-100 align-items-center': fullpage })}>
        <div className="spinner-border " role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Spinners;
