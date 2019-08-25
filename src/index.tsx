import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './components/App';
import Child1 from "./components/Child1";
// import {Child1} from "./components/Child1";

ReactDOM.hydrate(
    <App color="Blue"/>,
    document.getElementById("root")
);

// ReactDOM.render(
//     <>
//         <div>ich habe Spaß, ich nehme Gas.</div>
//     </>,
//     document.getElementById("secondElement")
// );
