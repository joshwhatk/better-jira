import Jira from './Jira';

class DetailResizer {
  constructor() {
    this.id = 'ghx-detail-view';
    this.Storage = chrome.storage.sync;
    this.listening = false;
    this.running = true;
    this.manageMouseListener = this.manageMouse.bind(this);
  }

  run() {
    if (Jira.isNotPresent()) {
      this.running = false;
      return;
    }

    let detailView = document.getElementById(this.id);
    if (!detailView) {
      this.running = false;
      return;
    }
    detailView.addEventListener('mouseenter', () => {
      if (detailView.querySelector('.better-resize') !== null) {
        return;
      }

      let resizer = document.createElement('div');
      resizer.classList.add('better-resize');
      detailView.appendChild(resizer);

      detailView
        .querySelector('.better-resize')
        .addEventListener('mousedown', (event) => {
          event.preventDefault();
          if (event.button === 2) {
            return;
          }

          document.addEventListener('mousemove', this.manageMouseListener);
          this.listening = true;
        });

      document.addEventListener('mouseup', (event) => {
        if (!this.listening) {
          return;
        }

        document.removeEventListener('mousemove', this.manageMouseListener);
        this.listening = false;

        this.saveDetailViewWidth();
      });
    });

    // detailView.addEventListener('mouseleave', () => {
    //   console.log('You are now exiting');
    //   detailView.querySelector('.better-resize').remove();
    // });
  }

  manageMouse(event) {
    if (!this.running) {
      return;
    }

    let width = window.innerWidth - event.pageX + 2;

    document.documentElement.style.setProperty(
      '--detail-view-width',
      `${width}px`
    );
  }

  saveDetailViewWidth() {
    if (!this.running) {
      return;
    }

    console.log(
      '🔧: Detail Width',
      document.documentElement.style.getPropertyValue('--detail-view-width')
    );
    this.Storage.set({
      detailViewWidth: document.documentElement.style.getPropertyValue(
        '--detail-view-width'
      )
    });
  }
}

export default new DetailResizer();
