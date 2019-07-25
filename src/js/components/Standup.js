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

    window.standup = true;

    //-- Add `standup` class to the body
    document.body.classList.add(this.cssClass);

    //-- Add Instructions element
    let instructionsEl = document.createElement('div');
    instructionsEl.setAttribute('standup-close', '');
    instructionsEl.classList.add(this.instructionsCssClass);
    instructionsEl.innerHTML = `
      <span class="text">Close Standup Mode <span class="close">&nbsp;&plus;&nbsp;</span></span>
    `;
    document.body.appendChild(instructionsEl);
    document.addEventListener(
      'click',
      (click) => {
        let closeButton = click.target.closest('[standup-close]');
        if (!closeButton) {
          return;
        }

        chrome.storage.sync.set({ standup: false }, () => {
          this._cleanupStandup();
        });
      },
      { once: true }
    );
  }

  _cleanupStandup() {
    document.body.classList.remove(this.cssClass);
    window.standup = false;

    //-- remove Instructions element
    let instructions = document.querySelector(`.${this.instructionsCssClass}`);
    if (instructions !== null) {
      instructions.remove();
    }
  }
}
export default new Standup();
