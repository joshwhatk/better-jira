class DetailResizer {
  constructor() {
    this.id = 'ghx-detail-view';
    this.Storage = chrome.storage.sync;
    this.listening = false;
  }

  run() {
    let detailView = document.getElementById(this.id);
    detailView.addEventListener('mouseenter', () => {

      if(detailView.querySelector('.better-resize') !== null) {
        return;
      }

      let resizer = document.createElement('div');
      resizer.classList.add('better-resize');
      detailView.appendChild(resizer);

      detailView.querySelector('.better-resize').addEventListener('mousedown', (event) => {
        event.preventDefault();
        if(event.button === 2) {
          return;
        }

        document.addEventListener('mousemove', this.manageMouse);
        this.listening = true;
      });

      document.addEventListener('mouseup', (event) => {
        if(!this.listening) {
          return;
        }

        document.removeEventListener('mousemove', this.manageMouse);
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
    let width = (window.innerWidth - event.pageX) + 2;

    if((window.newJira !== undefined && window.newJira) || document.querySelector('.adg3') !== null) {
      width = width - 32;
      window.newJira = true;
    } else {
      window.newJira = false;
    }
    document.documentElement.style.setProperty('--detail-view-width', `${width}px`);
  }

  saveDetailViewWidth() {
    console.log('🔧: Detail Width', document.documentElement.style.getPropertyValue('--detail-view-width'));
    this.Storage.set({detailViewWidth: document.documentElement.style.getPropertyValue('--detail-view-width')});
  }
}
export default new DetailResizer;
