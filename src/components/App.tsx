import * as React from 'react';

import Typography from "@material-ui/core/Typography";
import Result from "./Result";


class App extends React.Component<{}, {
    word: string;
    isLoading: boolean;
    data: [{
        id;
        categories: [
            {category}
        ];
        terms: [{
                term;
                level;
            }]
    }]
}> {
    constructor(props) {
        super(props);
        this.state = {word: "", isLoading: false, data: null};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        this.setState({word: event.target.value});
    }

    private handleSubmit(event) {
        event.preventDefault();
        this.fetchData(this.state.word);
    }

    private fetchData(word: string) {
        this.setState({isLoading: true})

        const url = this.buildOpenthesaurusUri(word);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.table(data.hits)
                this.setState({ data: data.synsets, isLoading: false })});
    }
    /**
     * The url should looks like 'https://www.openthesaurus.de/synonyme/search?q=aq&format=application/json&substring=true';
     * Important part is the q-param which represents the search word.
     */
    private buildOpenthesaurusUri(word: string) {

        const hostAndPath = "https://www.openthesaurus.de/synonyme/search?";
        let searchQuery = "q=" + word;
        const options = "&format=application/json&substring=true";
        return hostAndPath + searchQuery + options;
    }

    render() {
        const { data, word, isLoading } = this.state;
        console.table(data? data : "");

        if (isLoading) {
            return <p>Loading ...</p>;
        }

        return (
            <>
                <div>
                    <Typography>This is the word search for our game.</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Word:
                            <input type="text" value={word} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>

                    {data &&
                        <Result content={data}/>
                    }
                </div>
            </>
        );
    }
}

export default App;
