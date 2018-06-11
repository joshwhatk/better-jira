import shouldInitiate from '../closures/shouldInitiate';
import Standup from './Standup';

class BetterJira {
  constructor() {
    this.data = {};
    this.Storage = chrome.storage.sync;
    this.loadListener = null;
    this.running = true;
  }

  initiate() {
    if (!shouldInitiate()) {
      this.running = false;
      return;
    }

    this._preemptiveStrike();

    this.loadListener = this._onLoad.bind(this);
    window.addEventListener('load', this.loadListener);
  }

  update(event) {
    this._updateColumnWidths(event.detail);
    this._initiateStandup(event.detail.standup);
  }

  _onLoad() {
    this._initialColumnResize();
    this._protectAgainstReactBoardReloading();
  }

  _reload() {
    this.Storage.get(['enabled', 'columnWidth'], (storage) => {
      let updateWidths = () => {
        console.log('🔧: Attempting to update the widths now!', storage);

        if (!document.querySelector('.ghx-swimlane > .ghx-columns')) {
          console.log('🔧: Waiting...');

          setTimeout(() => {
            updateWidths();
          }, 700);
          return;
        }

        console.log('🔧: Updating the widths now!');
        this._updateColumnWidths(storage);
      };
      setTimeout(() => {
        updateWidths();
      }, 700);
    });
    this._protectAgainstReactBoardReloading();
  }

  _updateColumnWidths(detail) {
    if (!this.running) {
      return;
    }

    if (!detail.enabled) {
      document.body.classList.remove('better-jira');
      return;
    }
    document.body.classList.add('better-jira');
    this._getPreferredWidth(detail);
  }

  _preemptiveStrike() {
    if (!this.running) {
      return;
    }

    document.body.classList.add('better-jira');
    this._ifEnabled(() => {
      this.Storage.get('poolWidth', (storage) => {
        if (storage.poolWidth < 10 || isNaN(storage.poolWidth)) {
          return;
        }
        console.log('🔧: Preemptively setting width now');
        this._setPoolWidth(storage.poolWidth);
      });

      this.Storage.get('detailViewWidth', (storage) => {
        if (storage.detailViewWidth === undefined) {
          return;
        }
        console.log('🔧: Setting Detail View width now!');
        this._setDetailViewWidth(storage.detailViewWidth);
      });
    });
  }

  _ifEnabled(successCallback, failureCallback) {
    if (!this.running) {
      return;
    }

    this.Storage.get('enabled', (storage) => {
      if (!storage.enabled) {
        if (typeof failureCallback === 'function') failureCallback();
        return;
      }

      successCallback();
    });
  }

  _initialColumnResize() {
    if (!this.running) {
      return;
    }

    window.removeEventListener('load', this.loadListener);
    console.log('🔧: Page loaded, running Better JIRA now.');

    setTimeout(this._resizeColumns.bind(this), 700);
  }

  _resizeColumns() {
    if (!this.running) {
      return;
    }

    if (document.querySelector('.ghx-swimlane') === null) {
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
      this._initiateStandup(storage.standup);
    });
  }

  _getPreferredWidth(storage) {
    if (!this.running) {
      return;
    }

    this.data.columnWidth = storage.columnWidth;

    if (isNaN(this.data.columnWidth)) {
      this.data.columnWidth = 200;
    }

    this._setPreferredWidth();
  }

  _setPreferredWidth() {
    if (!this.running) {
      return;
    }

    let preferredWidth, columnCount, padding, width;

    preferredWidth = this.data.columnWidth;

    columnCount = document
      .querySelector('.ghx-swimlane > .ghx-columns')
      .querySelectorAll('.ghx-column').length;

    padding = columnCount * 12;
    width = columnCount * preferredWidth + padding;

    if (width < 10) {
      return;
    }

    //-- Handle Smaller Boards
    if (width < window.innerWidth) {
      let gh = document.querySelector('#gh');
      width =
        parseInt(gh.offsetWidth) -
        parseInt(
          window.getComputedStyle(gh, null).getPropertyValue('padding-left')
        );
    }

    try {
      let items = { poolWidth: width };
      this.Storage.set(items);

      this._setPoolWidth(width);
    } catch (e) {
      console.error(e);
    }
  }

  _setPoolWidth(width) {
    document.documentElement.style.setProperty(
      '--viewport-width',
      `${width}px`
    );
  }

  _setDetailViewWidth(width) {
    document.documentElement.style.setProperty('--detail-view-width', width);
  }

  _initiateStandup(config) {
    Standup.run(config);
  }

  _protectAgainstReactBoardReloading() {
    let boardSwitcher = document.querySelector('[aria-label="Switch boards"]');
    if (!boardSwitcher) {
      return;
    }
    boardSwitcher.addEventListener('click', (event) => {
      console.log('🔧: Preparing to switch to a new board!', event);

      setTimeout(() => {
        let boardsDroplist = document.querySelector(
          '[aria-label="Boards in this Project"]'
        );
        console.log('🔧: boardsDroplist', boardsDroplist);
        if (!boardsDroplist) {
          return;
        }

        boardsDroplist.addEventListener('click', (event) => {
          setTimeout(() => {
            this._reload();
          }, 1);
        });
      }, 1);
    });
  }
}

export default new BetterJira();
