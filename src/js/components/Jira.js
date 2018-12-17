class Jira {
  constructor() {
    this._isPresent = null;
    this._columnsContainer = null;
    this._columns = null;
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
    return !!document.querySelector('.ghx-swimlane, #ghx-mapping');
  }

  hasNotLoadedSwimlanes() {
    return !this.hasLoadedSwimlanes();
  }

  columnsContainer() {
    if (this._columnsContainer !== null) {
      return this._columnsContainer;
    }

    return (this._columnsContainer = document.querySelector(
      '.ghx-swimlane > .ghx-columns, #ghx-mapping'
    ));
  }

  columns() {
    if (this._columns !== null) {
      return this._columns;
    }

    return (this._columns = this.columnsContainer().querySelectorAll(
      '.ghx-column, .ghx-column-wrapper'
    ));
  }

  content() {
    return document.getElementById('content');
  }
}

export default new Jira();
