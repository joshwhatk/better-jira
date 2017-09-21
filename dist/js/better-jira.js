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
      window.removeEventListener('load', this.initiate);
      console.log('Page loaded, running Better JIRA now.');

      setTimeout(this._resizeColumns.bind(this), 700);
    }

    updateColumnWidths(detail) {
      if(!detail.enabled) {
        document.documentElement.style.setProperty('--viewport-width', 'inherit');
        return;
      }
      this._getPreferredWidth(detail)
    }

    handleStandup(state) {
      let cssClass = 'standup';
      if(state) {
        document.getElementsByTagName('body')[0].classList.add(cssClass);
      } else {
        document.getElementsByTagName('body')[0].classList.remove(cssClass);
      }
    }

    _resizeColumns() {
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

      this.Storage.get('standup', (storage) => {
        this.handleStandup(storage.standup);
      });
    }

    _getPreferredWidth(storage) {
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
        .querySelectorAll('.ghx-column')
        .length;

      padding = columnCount * 12;
      width = (columnCount * preferredWidth) + padding;

      if(width < 10) {
        return;
      }

      document.documentElement.style.setProperty('--viewport-width', `${width}px`);
    }
  }

  let app = new BetterJira();
  window.addEventListener('load', app.initiate.bind(app));

  document.addEventListener('better-jira:updated', (event) => {
    console.log('woohoo!', event.detail);
    app.updateColumnWidths(event.detail);

    app.handleStandup(event.detail.standup);
  });
})();

//# sourceMappingURL=better-jira.js.map
