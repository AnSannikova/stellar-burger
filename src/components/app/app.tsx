import '../../index.css';
import styles from './app.module.css';

import { AppHeader } from '@components';
import { Router } from './router';

const App = () => (
  <>
    <div className={styles.app}>
      <AppHeader />
      <Router />
    </div>
  </>
);

export default App;
