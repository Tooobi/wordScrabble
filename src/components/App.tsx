import * as React from 'react';

import Typography from "@material-ui/core/Typography";


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
        console.log("Trying to fetch data for word: ", word);

        this.setState({isLoading: true})

        const url = this.buildOpenthesaurusUri(word);
        console.log("XXX - url: ", url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.table(data.hits)
                this.setState({ data: data.synsets })});
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
        console.table(this.state.data? this.state.data : "");
        return (
            <>
                <div>
                    <Typography>This is the word search for our game.</Typography>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Word:
                            <input type="text" value={this.state.word} onChange={this.handleChange}/>
                        </label>
                        <input type="submit" value="Submit"/>
                    </form>

                    {this.state.data &&
                        <>
                            <h1>data has been loaded: </h1>
                            <ul>
                            {this.state.data.map(hit =>
                                    <li key={hit.id}>
                                        Katergory: {hit.categories}
                                        <ul>
                                            Synonym:
                                            {hit.terms.map(term =>
                                            <li key={term.term}>
                                                {term.term}
                                            </li>
                                        )}
                                        </ul>
                                    </li>
                                )}
                            </ul>
                        </>
                    }
                </div>
            </>
        );
    }
}

export default App;
