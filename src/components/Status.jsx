import React from 'react';

import './Status.scss';

function Status() {
  const [status, setStatus] = React.useState('');
  const [statusOpen, setStatusOpen] = React.useState(false);

  const onInput = (e) => {
    setStatus(e.target.value);
  }

  const onKeyDown = (e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      setStatusOpen(!statusOpen);
    }
  }

  const onStatusButtonClick = () => {
    setStatusOpen(!statusOpen);
  }

  return (
    <>
      <button
        type="button"
        className="status-btn"
        onClick={onStatusButtonClick}
      >{statusOpen ? 'Сохранить статус' : 'Изменить статус'}</button>
      <div className="status-field">
        {statusOpen
          ? <input type="text" value={status} onChange={onInput} onKeyDown={onKeyDown} placeholder={status}/> 
          : !!status.length && <div className="status-text">{status}</div>
        }
      </div>   
    </>
  )
}

export default Status;
