import Standup from './components/Standup';

class BetterJira
{
  constructor() {
    this.data = {};
    this.Storage = chrome.storage.sync;
  }

  preemptiveStrike() {
    document.body.classList.add('better-jira');
    this.Storage.get('poolWidth', (storage) => {
      if(storage.poolWidth < 10 || isNaN(storage.poolWidth)) {
        return;
      }
      console.log('Preemptively setting width now');
      this._setPoolWidth(storage.poolWidth);
    });
  }

  initiate() {
    window.removeEventListener('load', this.initiate, false);
    console.log('Page loaded, running Better JIRA now.');

    setTimeout(this._resizeColumns.bind(this), 700);
  }

  updateColumnWidths(detail) {
    if(!detail.enabled) {
      document.body.classList.remove('better-jira');
      return;
    }
    document.body.classList.add('better-jira');
    this._getPreferredWidth(detail)
  }

  _resizeColumns() {
    if(document.querySelector('.ghx-swimlane') === null) {
      return;
    }

    //-- Disallow setting columns if the plugin is not enabled
    this.Storage.get('enabled', (storage) => {
      if(!storage.enabled) {
        document.body.classList.remove('better-jira');
        return;
      }
      document.body.classList.add('better-jira');

      this.Storage.get('columnWidth', this._getPreferredWidth.bind(this));
    });

    this.Storage.get('standup', (storage) => {
      Standup.run(storage.standup);
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
    this.Storage.set({poolWidth: width});

    this._setPoolWidth(width);
  }

  _setPoolWidth(width) {
    console.log('width', width);
    document.documentElement.style.setProperty('--viewport-width', `${width}px`);
  }
}

let app = new BetterJira();
window.addEventListener('load', app.initiate.bind(app), false);
app.preemptiveStrike();

document.addEventListener('better-jira:updated', (event) => {
  console.log('woohoo!', event.detail);
  app.updateColumnWidths(event.detail);

  Standup.run(event.detail.standup);
});
