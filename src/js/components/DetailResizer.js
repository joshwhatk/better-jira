class DetailResizer {
  constructor() {
    this.id = 'ghx-detail-view';
    this.Storage = chrome.storage.sync;
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
      });

      document.addEventListener('mouseup', (event) => {
        document.removeEventListener('mousemove', this.manageMouse);

        this.saveDetailViewWidth();
      });
    });

    // detailView.addEventListener('mouseleave', () => {
    //   console.log('You are now exiting');
    //   detailView.querySelector('.better-resize').remove();
    // });
  }

  manageMouse(event) {
    let width = (event.screenX * -1) + 2;
    document.documentElement.style.setProperty('--detail-view-width', `${width}px`);
  }

  saveDetailViewWidth() {
    this.Storage.set({detailViewWidth: document.documentElement.style.getPropertyValue('--detail-view-width')});
  }
}
export default new DetailResizer;
