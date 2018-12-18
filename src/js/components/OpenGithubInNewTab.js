export default class OpenGithubInNewTab {
  static initialize() {
    return new this();
  }

  constructor() {
    document.addEventListener('click', (click) => {
      let githubLink = click.target.closest('.pullrequest-link');
      if (!githubLink) {
        return;
      }

      click.preventDefault();
      window.open(githubLink.href, '_blank');
    });
  }
}
