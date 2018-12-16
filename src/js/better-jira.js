import DetailResizer from './components/DetailResizer';
import BetterJira from './components/BetterJira';

let betterJira = BetterJira.initialize();
DetailResizer.run();

document.addEventListener('better-jira:updated', (event) => {
  console.log('🔧: ', event.detail);
  betterJira.update(event);
});
