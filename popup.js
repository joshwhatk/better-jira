(function()
{
  'use strict';

  window.addEventListener('load', function initiate() {
    window.removeEventListener('load', initiate);

    let Storage = chrome.storage.sync;
    let app = {
      data: {},
      defaults: {
        columnWidth: 200,
      },
      main: function() {
        app.setDefaults();
        app.handleFormSubmissions();
      },
      setDefaults: function() {
        Storage.get('columnWidth', (storage) => {
          let value = storage.columnWidth;
          console.log('columnWidth from Storage', value);
          if(!value) {
            value = app.defaults.columnWidth;
            Storage.set({columnWidth: value});
          }
          app.data.columnWidth = value;

          app.addValuesToInputs();
        });
      },
      addValuesToInputs: function() {
        document.getElementById('columnWidth').value = app.data.columnWidth;
      },
      handleFormSubmissions: function() {
        document.getElementById('better-jira').addEventListener('submit', function(event) {
          event.preventDefault();
          console.log('form submission information', arguments);
          app.data.columnWidth = document.getElementById('columnWidth').value;
          app.save();
        });
      },
      save: function() {
        Storage.set({columnWidth: app.data.columnWidth});
      }
    };

    app.main();

    console.log('You are here!');
  })
})();
