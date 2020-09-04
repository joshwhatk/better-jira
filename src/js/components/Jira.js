class Jira {
  constructor() {
    this._isPresent = null;
  }

  isPresent() {
    if (this._isPresent !== null) {
      return this._isPresent;
    }

    try {
      let jira = document.querySelector('meta[name="application-name"]');
      return (this._isPresent = jira.content === 'JIRA');
    } catch (e) {
      return (this._isPresent = false);
    }
  }

  isNotPresent() {
    return !this.isPresent();
  }

  hasLoadedSwimlanes() {
    return !!document.querySelector(
      '.ghx-swimlane, #ghx-mapping, #jira-board > div > div'
    );
  }

  hasNotLoadedSwimlanes() {
    return !this.hasLoadedSwimlanes();
  }

  columnsContainer() {
    return document.querySelector(
      '.ghx-swimlane > .ghx-columns, #ghx-mapping, .aui-page-panel-content > #jira-board'
    );
  }

  columns() {
    return this.columnsContainer().querySelectorAll(
      '.ghx-column, .ghx-column-wrapper, [class*="hook__column"]'
    );
  }

  content() {
    return document.getElementById('content');
  }
}

export default new Jira();
