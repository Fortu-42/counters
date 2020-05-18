import React, { useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import paperSvg from '../assets/img/paper.svg';

function Tooltip({ hideTooltip, counter, tooltipVisible }) {
  const text = `${counter.count} x ${counter.title}`;
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (copied && copied === true) {
      setTimeout(() => {
        setCopied(false);
      }, 500);
    }
  }, [copied]);
  return (
    <OutsideClickHandler onOutsideClick={hideTooltip}>
      <div
        className={`${
          tooltipVisible
            ? 'visible opacity-100 pointer-events-auto'
            : 'opacity-0 invisible pointer-events-none'
        } transition-all duration-500 ease-in-out flex items-center bg-white p-2 rounded-md border border-solid border-gray-300 shadow-lg`}>
        <div className='h-full'>
          <h1 className='text-sm font-semibold mb-2'>Share 1 counter</h1>
          <CopyToClipboard
            text={text}
            onCopy={() => {
              setCopied(true);
            }}>
            <div className='relative flex items-center justify-center font-semibold text-xs text-orange-500 bg-white shadow-md rounded px-4 py-2 border-none'>
              <span
                className={`transition-all
              duration-500
              ease-in-out
              absolute ${
                copied
                  ? 'opacity-1 pointer-events-auto visible'
                  : 'opacity-0 pointer-events-none invisible'
              }`}>
                Copied!
              </span>
              <span
                className={`transition-all
              duration-500
              ease-in-out
               ${
                 copied
                   ? 'opacity-0 pointer-events-none invisible'
                   : 'opacity-1 pointer-events-auto visible'
               }`}>
                Copy
              </span>
            </div>
          </CopyToClipboard>
        </div>
        <div className='h-full w-24 relative flex items-center'>
          <img alt='paper sheet' width='100%' src={paperSvg} />
          <small className='top-2 px-6 text-left text-xs absolute'>{text}</small>
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default Tooltip;
