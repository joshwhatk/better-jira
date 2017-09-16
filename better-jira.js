(function()
{
  'use strict';

  class BetterJira
  {
    constructor() {
      this.data = {};
      this.Storage = chrome.storage.sync;
    }

    initiate() {
      console.log('this is', this);
      window.removeEventListener('load', this.initiate);

      setTimeout(this._resizeColumns.bind(this), 700);
    }

    updateColumnWidths(data) {
      this._getPreferredWidth(data);
    }

    _resizeColumns() {
      console.log('this is', this);
      if(document.querySelector('.ghx-swimlane') === null) {
        return;
      }

      //-- Disallow setting columns if the plugin is not enabled
      this.Storage.get('enabled', (storage) => {
        if(!storage.enabled) {
          document.documentElement.style.setProperty('--viewport-width', 'inherit');
          return;
        }

        this.Storage.get('columnWidth', this._getPreferredWidth.bind(this));
      });
    }

    _getPreferredWidth(storage) {
      console.log('this is', this);
      this.data.columnWidth = storage.columnWidth;

      if(isNaN(this.data.columnWidth)) {
        this.data.columnWidth = 200;
      }

      this._setPreferredWidth();
    }

    _setPreferredWidth() {
      let preferredWidth, columnCount, padding, width;

      preferredWidth = this.data.columnWidth;

      columnCount = document.querySelector('.ghx-swimlane > .ghx-columns')
        .querySelectorAll('.ghx-column.ghx-narrow-card')
        .length;

      padding = columnCount * 12;
      width = (columnCount * preferredWidth) + padding;

      document.documentElement.style.setProperty('--viewport-width', `${width}px`);
    }
  }

  let app = new BetterJira();
  window.addEventListener('load', app.initiate.bind(app));
})();
