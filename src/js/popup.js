(function()
{
  'use strict';

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

        document.getElementById('columnWidth').value = this.data.columnWidth;
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

        document.getElementById('standup').checked = !! value;
      });
    }

    handleFormEvents() {
      //-- Close the window
      let close = document.getElementById('close');
      close.addEventListener('click', (event) => {
        window.close();
      });

      //-- Trigger Enabled (as a 1-click event)
      let enabled = document.getElementById('enabled');
      enabled.addEventListener('click', (event) => {
        this.data.enabled = enabled.checked;
        this.save();
      });

      //-- Trigger Standup (as a 1-click event)
      let standup = document.getElementById('standup');
      standup.addEventListener('click', (event) => {
        console.log('you clicked it!', standup.checked, event);
        this.data.standup = standup.checked;
        this.save();
      });

      document.getElementById('better-jira').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('form submission information', arguments);
        this.data.columnWidth = document.getElementById('columnWidth').value;
        this.data.enabled = document.getElementById('enabled').checked;
        this.save();
      });
    }

    save() {
      this.Storage.set({enabled: this.data.enabled}, () => {
        this.Storage.set({columnWidth: this.data.columnWidth}, () => {
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
              `columnWidth: ${this.data.columnWidth},`,
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

  window.addEventListener('load', function initiate() {
    window.removeEventListener('load', initiate);

    new Popup();

    console.log('You are here!');
  })
})();
