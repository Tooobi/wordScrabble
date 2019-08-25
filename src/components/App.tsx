import * as React from 'react';

import PageInterface from '../PageInterface';
import {WordSearch} from "./WordSearch";

class App extends React.Component<PageInterface, {}> {
    render() {
        return (<div>
                <h1>This is the word search for our game.</h1>
                <p>This has to be a input field</p>
                <WordSearch word={"Tobi"}/>
            </div>
        );
    }
}

export default App;
