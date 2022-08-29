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
    if (document.querySelectorAll(this.instructionsCssClass).length === 0) {
      console.log('made another button here');
      var instructionsEl = document.createElement('div');
      instructionsEl.setAttribute('data-standup-close', '');
      instructionsEl.classList.add(this.instructionsCssClass);
      instructionsEl.innerHTML = '\n        <span class="text">Close Standup Mode <span class="close">&nbsp;&plus;&nbsp;</span></span>\n      ';
      document.body.appendChild(instructionsEl);
    }

    //-- Hide breadcrumbs
    document.querySelector('[data-testid="rapidboard-breadcrumbs"]').style.display = 'none';

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

    //-- Show breadcrumbs
    document.querySelector('[data-testid="rapidboard-breadcrumbs"]').style.display = 'block';

  }
}
export default new Standup();
