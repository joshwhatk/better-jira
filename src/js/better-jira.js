import DetailResizer from './components/DetailResizer';
import BetterJira from './components/BetterJira';

BetterJira.initiate();
DetailResizer.run();

document.addEventListener('better-jira:updated', (event) => {
  console.log('🔧: woohoo!', event.detail);
  BetterJira.update(event);
});
