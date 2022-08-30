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

    // Open standup listener
    this._listener = (click) => {
      let standupButton = click.target.closest('[data-standup-open]');
      if (!standupButton) {
        return;
      }

      chrome.storage.sync.set({ standup: true }, () => {
        this.initializeStandup(true);
      });
    };
    document.addEventListener('click', this._listener);

    //-- Add open Standup Mode button element
    var openStandupModeBtn = document.createElement('div');
    openStandupModeBtn.setAttribute('data-standup-open', '');
    openStandupModeBtn.classList.add(this.instructionsCssClass);
    openStandupModeBtn.innerHTML = '<span class="text">Standup Mode <span class="open">&nbsp;&laquo;&nbsp;</span></span>';
    openStandupModeBtn.style.display = 'none';
    document.getElementById('ghx-operations').appendChild(openStandupModeBtn);

    // Close standup listener
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

    //-- Add close Standup Mode button element
    var closeStandupModeBtn = document.createElement('div');
    closeStandupModeBtn.setAttribute('data-standup-close', '');
    closeStandupModeBtn.classList.add(this.instructionsCssClass);
    closeStandupModeBtn.innerHTML = '<span class="text">Standup Mode <span class="close">&nbsp;&laquo;&nbsp;</span></span>';
    closeStandupModeBtn.style.display = 'none';
    document.getElementById('ghx-operations').appendChild(closeStandupModeBtn);

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

    //-- Show close standup mode button
    document.querySelector('[data-standup-close]').style.display = 'block';

    //-- Hide open standup mode button
    document.querySelector('[data-standup-open]').style.display = 'none';

    //-- Hide breadcrumbs
    document.querySelector('[data-testid="rapidboard-breadcrumbs"]').style.display = 'none';

  }

  _cleanupStandup() {

    //-- Remove standup class
    document.body.classList.remove(this.cssClass);

    //-- Turn off standup mode
    window.standup = false;

    //-- Hide close standup mode button
    document.querySelector('[data-standup-close]').style.display = 'none';

    //-- Show open standup mode button
    document.querySelector('[data-standup-open]').style.display = 'block';

    //-- Show breadcrumbs
    document.querySelector('[data-testid="rapidboard-breadcrumbs"]').style.display = 'block';

  }
}
export default new Standup();
