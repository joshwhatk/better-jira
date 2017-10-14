import Standup from './components/Standup';
import DetailResizer from './components/DetailResizer';

class BetterJira
{
  constructor() {
    this.data = {};
    this.Storage = chrome.storage.sync;
    this.loadListener = null;
  }

  initiate() {
    this._preemptiveStrike();

    this.loadListener = this._initialColumnResize.bind(this);
    window.addEventListener('load', this.loadListener);
  }

  updateColumnWidths(detail) {
    if(!detail.enabled) {
      document.body.classList.remove('better-jira');
      return;
    }
    document.body.classList.add('better-jira');
    this._getPreferredWidth(detail)
  }

  _preemptiveStrike() {
    document.body.classList.add('better-jira');
    this._ifEnabled(() => {
      this.Storage.get('poolWidth', (storage) => {
        if(storage.poolWidth < 10 || isNaN(storage.poolWidth)) {
          return;
        }
        console.log('🔧: Preemptively setting width now');
        this._setPoolWidth(storage.poolWidth);
      });

      this.Storage.get('detailViewWidth', (storage) => {
        if(storage.detailViewWidth === undefined) {
          return;
        }
        console.log('🔧: Setting Detail View width now!');
        this._setDetailViewWidth(storage.detailViewWidth);
      });
    });
  }

  _ifEnabled(successCallback, failureCallback) {
    this.Storage.get('enabled', (storage) => {
      if(!storage.enabled) {
        if(typeof failureCallback === 'function') failureCallback();
        return;
      }

      successCallback();
    });
  }

  _initialColumnResize() {
    window.removeEventListener('load', this.loadListener);
    console.log('🔧: Page loaded, running Better JIRA now.');

    setTimeout(this._resizeColumns.bind(this), 700);
  }

  _resizeColumns() {
    if(document.querySelector('.ghx-swimlane') === null) {
      return;
    }

    //-- Disallow setting columns if the plugin is not enabled
    let enabled = () => {
      document.body.classList.add('better-jira');

      this.Storage.get('columnWidth', this._getPreferredWidth.bind(this));
    };
    let disabled = () => {
      document.body.classList.remove('better-jira');
    };
    this._ifEnabled(enabled.bind(this), disabled.bind(this));

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

    //-- Handle Smaller Boards
    if(width < window.innerWidth) {
      let gh = document.querySelector('#gh');
      width = (parseInt(gh.offsetWidth) - parseInt(window.getComputedStyle(gh, null).getPropertyValue('padding-left')));
    }

    try {
      let items = {poolWidth: width};
      this.Storage.set(items);

      this._setPoolWidth(width);
    } catch(e) {
      console.error(e);
    }
  }

  _setPoolWidth(width) {
    document.documentElement.style.setProperty('--viewport-width', `${width}px`);
  }

  _setDetailViewWidth(width) {
    document.documentElement.style.setProperty('--detail-view-width', width);
  }
}

let betterJira = new BetterJira();
betterJira.initiate();
DetailResizer.run();

document.addEventListener('better-jira:updated', (event) => {
  console.log('🔧: woohoo!', event.detail);
  betterJira.updateColumnWidths(event.detail);

  Standup.run(event.detail.standup);
});
