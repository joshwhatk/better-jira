import Jira from './Jira';

class Standup {
  constructor() {
    this.cssClass = 'standup';
    this.instructionsCssClass = 'BetterJira-instructions';
    this.data = {};
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

    this.initializeStandup();
  }

  initializeStandup() {
    if (!this.running) {
      return;
    }

    this._listener = (click) => {
      let closeButton = click.target.closest('[data-standup-close]');
      if (!closeButton) {
        return;
      }

      chrome.storage.sync.set({ standup: false }, () => {
        this._cleanupStandup();
      });
    };
    document.addEventListener('click', this._listener);

    window.standup = true;

    //-- Add `standup` class to the body
    document.body.classList.add(this.cssClass);

    //-- Add Instructions element
    let instructionsEl = document.createElement('div');
    instructionsEl.setAttribute('data-standup-close', '');
    instructionsEl.classList.add(this.instructionsCssClass);
    instructionsEl.innerHTML = `
      <span class="text">Close Standup Mode <span class="close">&nbsp;&plus;&nbsp;</span></span>
    `;
    document.body.appendChild(instructionsEl);
  }

  _cleanupStandup() {
    document.body.classList.remove(this.cssClass);
    window.standup = false;

    //-- Clear the event listener
    document.removeEventListener('click', this._listener);

    //-- remove Instructions element
    let instructions = document.querySelector(`.${this.instructionsCssClass}`);
    if (instructions !== null) {
      instructions.remove();
    }
  }
}
export default new Standup();
