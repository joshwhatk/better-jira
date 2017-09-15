(function()
{
  'use strict';

  let data = {};

  function initiate() {
    window.removeEventListener('load', initiate);

    setTimeout(resizeColumns, 700);
  }

  function resizeColumns() {
    if(document.querySelector('.ghx-swimlane') === null) {
      return;
    }

    chrome.storage.sync.get('columnWidth', getPreferredWidth);
  }

  function getPreferredWidth(storage) {
    data.columnWidth = storage.columnWidth;

    if(isNaN(data.columnWidth)) {
      data.columnWidth = 200;
    }

    setPreferredWidth();
  }

  function setPreferredWidth() {
    let preferredWidth, columnCount, padding, width;

    preferredWidth = data.columnWidth;

    columnCount = document.querySelector('.ghx-swimlane > .ghx-columns')
      .querySelectorAll('.ghx-column.ghx-narrow-card')
      .length;

    padding = columnCount * 12;
    width = (columnCount * preferredWidth) + padding;

    document.documentElement.style.setProperty('--viewport-width', `${width}px`);
  }

  window.addEventListener('load', initiate);
})();
