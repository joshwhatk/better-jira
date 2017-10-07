class Standup {
  constructor() {
    this.cssClass = 'standup';
    this.data = {
      listening: false,
    };
  }

  run(state) {
    let body = document.querySelector('body');
    if(!state) {
      body.classList.remove(this.cssClass);
      this.cleanupStandup();
      return;
    }

    body.classList.add(this.cssClass);
    if(!this.listening) {
      window.addEventListener('keydown', this.doStandup.bind(this));
      this.listening = true;
      let instructionsEl = document.createElement('div');
      instructionsEl.classList.add('instructions');
      instructionsEl.innerHTML = `<ul><li>Press <kbd>S</kbd> to start walking the board</li>
        <li>Use <kbd>Shift</kbd> + <kbd>&larr;</kbd>/<kbd>&rarr;</kbd> to move up and down the board.</li></ul>`;
      document.body.appendChild(instructionsEl);
    }
    this.initializeStandup();
  }

  initializeStandup() {
    this.data.swimlanes = [];
    Array.from(document.querySelectorAll('.ghx-swimlane')).forEach((el) => {
      let columns = el.querySelectorAll('.ghx-columns > .ghx-column');

      this.data.columnCount = columns.length;
      this.data.pointer = this.data.columnCount - 1;
      columns[this.data.pointer].classList.add('large-column');
      this.data.swimlanes.push(columns);
    });

    let headerColumns = document.getElementById('ghx-column-header-group').querySelectorAll('.ghx-column');
    headerColumns[this.data.pointer].classList.add('large-column');
    this.data.swimlanes.push(headerColumns);
  }

  cleanupStandup() {
    if(this.data.pointer === undefined || this.data.swimlanes === undefined) {
      return;
    }

    this._clearColumnBackground();
  }

  doStandup(event) {
    //-- Advance down the board
    if(event.key === 'ArrowLeft' && event.shiftKey) {
      event.preventDefault();
      if((this.data.pointer - 1) < 0) {
        return;
      }

      this._clearColumnBackground();
      this.data.pointer = this.data.pointer - 1;
      this._setColumnBackground();
    }

    //-- Advance up the board
    if(event.key === 'ArrowRight' && event.shiftKey) {
      event.preventDefault();
      if((this.data.pointer + 1) === this.data.columnCount) {
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
    this.data.swimlanes.forEach((columns) => {
      columns[this.data.pointer].classList.add('large-column');
    });
  }
}
export default new Standup;
