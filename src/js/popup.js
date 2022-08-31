console.log('here');

class Popup {
  constructor() {
    this.Storage = chrome.storage.sync;
    this.data = {};
    this.defaults = {
      columnWidth: 200,
      enabled: true,
      standup: false,
      updatedEvent: 'better-jira:updated',
    };

    this.loadListener = this.boot.bind(this);
    window.addEventListener('load', this.loadListener);
  }

  boot() {
    window.removeEventListener('load', this.loadListener);

    this.setDefaults();
    this.handleFormEvents();
  }

  setDefaults() {
    this.Storage.get('columnWidth', (storage) => {
      console.log('storage', storage);
      let value = storage.columnWidth;
      console.log('columnWidth from Storage', value);
      if(!value) {
        value = this.defaults.columnWidth;
        this.Storage.set({columnWidth: value});
      }
      this.data.columnWidth = value;

      //-- Set size selection
      document.querySelectorAll('[data-column-width-selector]').forEach(columnWidthSelector => {
        columnWidthSelector.classList.remove('selected');
      });
      if (this.data.columnWidth === 'sm') {
        document.querySelector('[data-column-width-sm]').classList.add('selected');
      } else if (this.data.columnWidth === 'md') {
        document.querySelector('[data-column-width-md]').classList.add('selected');
      } else if (this.data.columnWidth === 'lg') {
        document.querySelector('[data-column-width-lg]').classList.add('selected');
      } else if (this.data.columnWidth === 'xl') {
        document.querySelector('[data-column-width-xl]').classList.add('selected');
      }

    });

    this.Storage.get('enabled', (storage) => {
      let value = storage.enabled;
      if(value === undefined) {
        value = this.defaults.enabled;
        this.Storage.set({enabled: value});
      }

      this.data.enabled = value;
      console.log('enabled storage', storage);

      document.getElementById('enabled').checked = !! value;
    });

    this.Storage.get('standup', (storage) => {
      let value = storage.standup;
      if(value === undefined) {
        value = this.defaults.standup;
        this.Storage.set({standup: value});
      }

      this.data.standup = value;
      console.log('standup storage', storage);
    });
  }

  handleFormEvents() {
    //-- Trigger Update Column Width (as a 1-click event)
    document.querySelectorAll('[data-column-width-selector]').forEach(columnWidthSelector => {
      columnWidthSelector.addEventListener('click', (event) => {
        this.data.columnWidth = event.target.dataset.columnWidth;
        this.save();
      });
    });

    //-- Trigger Enabled (as a 1-click event)
    let enabled = document.getElementById('enabled');
    enabled.addEventListener('click', (event) => {
      this.data.enabled = enabled.checked;
      this.save();
    });
  }

  save() {
    this.Storage.set({enabled: this.data.enabled}, () => {
      this.Storage.set({columnWidth: this.data.columnWidth}, () => {
        this.setDefaults();
        this.Storage.set({standup: this.data.standup}, this.refresh.bind(this));
      });
    });
  }

  refresh() {
    let code = [
      `(function()`,
      `{`,
        `'use strict';`,

        `let updateEvent = new CustomEvent('${this.defaults.updatedEvent}', {`,
          `detail: {`,
            `columnWidth: '${this.data.columnWidth}',`,
            `enabled: ${this.data.enabled},`,
            `standup: ${this.data.standup},`,
          `}`,
        `});`,
        `document.dispatchEvent(updateEvent);`,
      `})();`,
    ];

    chrome.tabs.executeScript({
      code: code.join('')
    });
  }
}

new Popup;
