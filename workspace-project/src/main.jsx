/* This .jsx file will import and render different components to the HTML structure. */

import { StrictMode } from 'react' /* Warns about potential problems in the code while developing. */
import { createRoot } from 'react-dom/client' /* Pulls in the function that tells React where in the HTML to show the app. */
import './index.css' /* Loads the CSS file that contains the styles for the app. */
import CalendarTable from './calendar-table.jsx' /* Brings in CalendarTable component so it can be shown on the screen. */

createRoot(document.getElementById('root')).render(
/*
Finds the empty <div id="root"></div> in the index.html - our HTML structure.
Tells React: “Use this space to show the Calendar.”
*/
  
  <StrictMode>
    <CalendarTable />
  </StrictMode>,
  /*
  Tells React: “Start the app by rendering this component.”
  It wraps the CalendarTable component in <StrictMode> to help catch mistakes.
  */

)
