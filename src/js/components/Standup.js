import Jira from './Jira';

class Standup {
  constructor() {
    this.cssClass = 'standup';
    this.instructionsCssClass = 'instructions';
    this.data = {};
    this.standupListener = this.doStandup.bind(this);
    this.running = true;
  }

  run(state) {
    if (Jira.isNotPresent()) {
      this.running = false;
      return;
    }

    if (!state) {
      this._cleanupStandup();
      return;
    }

    //-- Add `standup` class to the body
    document.body.classList.add(this.cssClass);

    //-- Start listening for keystrokes
    window.addEventListener('keydown', this.standupListener);

    //-- Add Instructions element
    let instructionsEl = document.createElement('div');
    instructionsEl.classList.add(this.instructionsCssClass);
    instructionsEl.innerHTML = `
      <span class="text">Close Standup Mode <span close class="close">&nbsp;&plus;&nbsp;</span></span>
    `;
    document.body.appendChild(instructionsEl);
    let closeButton = document.querySelector(
      `.${this.instructionsCssClass} [close]`
    );
    closeButton.addEventListener(
      'click',
      () => {
        chrome.storage.sync.set({ standup: false }, () => {
          this._cleanupStandup();
        });
      },
      { once: true }
    );
    this.initializeStandup();
  }

  initializeStandup() {
    if (!this.running) {
      return;
    }

    window.standup = true;
    this.data.swimlanes = [];
    Array.from(document.querySelectorAll('.ghx-swimlane')).forEach((el) => {
      let columns = el.querySelectorAll('.ghx-columns > .ghx-column');

      this.data.columnCount = columns.length;
      this.data.pointer = this.data.columnCount - 1;
      columns[this.data.pointer].classList.add('large-column');
      this.data.swimlanes.push(columns);
    });

    let headerColumns = document
      .getElementById('ghx-column-header-group')
      .querySelectorAll('.ghx-column');
    headerColumns[this.data.pointer].classList.add('large-column');
    this.data.swimlanes.push(headerColumns);
  }

  _cleanupStandup() {
    document.body.classList.remove(this.cssClass);
    window.standup = false;
    window.removeEventListener('keydown', this.standupListener);

    if (this.data.pointer === undefined || this.data.swimlanes === undefined) {
      return;
    }

    //-- remove Instructions element
    let instructions = document.querySelector(`.${this.instructionsCssClass}`);
    if (instructions !== null) {
      instructions.remove();
    }

    this._clearColumnBackground();
  }

  doStandup(event) {
    if (!this.running) {
      return;
    }

    //-- Advance down the board
    if (event.key === 'ArrowLeft' && event.shiftKey) {
      event.preventDefault();
      if (this.data.pointer - 1 < 0) {
        return;
      }

      this._clearColumnBackground();
      this.data.pointer = this.data.pointer - 1;
      this._setColumnBackground();
    }

    //-- Advance up the board
    if (event.key === 'ArrowRight' && event.shiftKey) {
      event.preventDefault();
      if (this.data.pointer + 1 === this.data.columnCount) {
        return;
      }

      this._clearColumnBackground();
      this.data.pointer = this.data.pointer + 1;
      this._setColumnBackground();
    }
  }

  _clearColumnBackground() {
    this.data.swimlanes.forEach((columns) => {
      columns[this.data.pointer].classList.remove('large-column');
    });
  }

  _setColumnBackground() {
    if (!this.running) {
      return;
    }

    this.data.swimlanes.forEach((columns) => {
      columns[this.data.pointer].classList.add('large-column');
    });
  }
}
export default new Standup();
