export default class Jira {
  static isPresent() {
    try {
      let jira = document.querySelector('meta[name="application-name"]');
      return jira.content === 'JIRA';
    } catch (e) {
      return false;
    }
  }

  static isNotPresent() {
    return !Jira.isPresent();
  }

  static hasLoadedSwimlanes() {
    return !!document.querySelector('.ghx-swimlane');
  }

  static hasNotLoadedSwimlanes() {
    return !Jira.hasLoadedSwimlanes();
  }

  static columns() {
    return document.querySelector('.ghx-swimlane > .ghx-columns');
  }

  static content() {
    return document.getElementById('content');
  }
}
