(function()
{
  'use strict';

  class Popup {
    constructor() {
      this.Storage = chrome.storage.sync;
      this.data = {};
      this.defaults = {
        columnWidth: 200,
      };

      this.setDefaults();
      this.handleFormSubmissions();
    }

    setDefaults() {
      this.Storage.get('columnWidth', (storage) => {
        let value = storage.columnWidth;
        console.log('columnWidth from Storage', value);
        if(!value) {
          value = this.defaults.columnWidth;
          this.Storage.set({columnWidth: value});
        }
        this.data.columnWidth = value;

        this.addValuesToInputs();
      });
    }

    addValuesToInputs() {
      document.getElementById('columnWidth').value = this.data.columnWidth;
    }

    handleFormSubmissions() {
      document.getElementById('better-jira').addEventListener('submit', (event) => {
        event.preventDefault();
        console.log('form submission information', arguments);
        this.data.columnWidth = document.getElementById('columnWidth').value;
        this.save();
      });
    }

    save() {
      this.Storage.set({columnWidth: this.data.columnWidth});
    }
  }

  window.addEventListener('load', function initiate() {
    window.removeEventListener('load', initiate);

    new Popup();

    console.log('You are here!');
  })
})();
