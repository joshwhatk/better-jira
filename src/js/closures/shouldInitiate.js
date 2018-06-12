export default function shouldInitiate() {
  let jira = document.querySelector('meta[name="application-name"]');

  if(jira === null) {
    return false;
  }

  return document.querySelector('meta[name="application-name"]').content === 'JIRA';
}
