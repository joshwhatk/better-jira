export default class OpenGithubInNewTab {
  static initialize() {
    return new this();
  }

  constructor() {
    document.addEventListener('click', (click) => {
      let githubLink = click.target.closest(
        '.pullrequest-link, .repository-link, .branch-link, .create-pullrequest-link, .changesetid, .filename a, .filerow a.more-files-info'
      );
      if (!githubLink) {
        return;
      }

      click.preventDefault();

      let newWindow = window.open(githubLink.href, '_blank');
      newWindow.opener = null;
    });
  }
}
