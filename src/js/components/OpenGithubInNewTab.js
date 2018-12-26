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
      if (githubLink.classList.contains('create-pullrequest-link')) {
        this.enableBetterCreatePullRequestLink(githubLink);
      }

      window.open(githubLink.href, '_blank');
    });
  }

  enableBetterCreatePullRequestLink(githubLink) {
    try {
      let branchName = githubLink.parentElement.parentElement.querySelector(
        '.branch-link'
      ).title;
      githubLink.href = `${githubLink.href}/master...${encodeURI(branchName)}`;
    } catch (e) {
      console.warn(e);
    }
  }
}
