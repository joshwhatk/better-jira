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
        window.addEventListener('keydown', this.doStandup.bind(this));
        this.initializeStandup();
      } else {
        document.getElementsByTagName('body')[0].classList.remove(cssClass);
        window.removeEventListener('keydown', this.doStandup.bind(this));
        this.cleanupStandup();
      }

    }

    initializeStandup() {
      this.data.swimlanes = [];
      Array.from(document.querySelectorAll('.ghx-swimlane')).forEach((el) => {
        let columns = el.querySelectorAll('.ghx-columns > .ghx-column');

        this.data.columnCount = columns.length;
        this.data.pointer = this.data.columnCount - 1;
        columns[this.data.pointer].classList.add('ghx-label-5');
        columns[this.data.pointer].classList.add('large-column');
        this.data.swimlanes.push(columns);
      });
    }

    cleanupStandup() {
      if(this.data.pointer === undefined || this.data.swimlanes === undefined) {
        return;
      }

      this._clearColumnBackground();
    }

    doStandup(event) {
      console.log(event);
      console.log(this.data.pointer, this.data.swimlanes);
      //-- Advance down the board
      if(event.key === '<') {
        if((this.data.pointer - 1) < 0) {
          return;
        }

        this._clearColumnBackground();
        this.data.pointer = this.data.pointer - 1;
        this._setColumnBackground();
      }

      //-- Advance up the board
      if(event.key === '>') {
        if((this.data.pointer + 1) === this.data.columnCount) {
          return;
        }

        this._clearColumnBackground();
        this.data.pointer = this.data.pointer + 1;
        this._setColumnBackground();
      }
    }

    _clearColumnBackground() {
      this.data.swimlanes.forEach((columns) => {
        columns[this.data.pointer].classList.remove('ghx-label-5');
        columns[this.data.pointer].classList.remove('large-column');
      });
    }

    _setColumnBackground() {
      this.data.swimlanes.forEach((columns) => {
        columns[this.data.pointer].classList.add('ghx-label-5');
        columns[this.data.pointer].classList.add('large-column');
      });
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
