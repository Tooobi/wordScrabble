import * as React from 'react';
interface openSaurusResponse {
    synsets: [{terms: [{term: string}] }],
    substringterms: [{term: string}]
}

export class WordSearch extends React.Component<{
    word: string
}, {
    result: [{term: string}],
    isLoading: boolean,
    error: string,
}> {

    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {result: [{term: ""}], isLoading: false, error: null};
    }


    componentDidMount(): void {
        console.log("Trying to fetch data.");

        this.setState({isLoading: true})

        const foo = this.buildOpenthesaurusUri();
        fetch(foo
            // , {
            // // method: "GET",
            // mode: "no-cors",
            // headers: {
            //     "Content-Type": "application/json",
            //     "Author": "tobias.knop@gmx.de",
            //     // "Access-Control-Allow-Origin": "http://localhost"
            //     'Access-Control-Allow-Origin': '*',
            //     'Access-Control-Allow-Headers': '*',
            //
            // }
            // }
        )
            .then(response => response.json())
            .then(data => {
                console.log("data: ", data.substringterms);
                this.setState(
                {result: data.substringterms, isLoading: false}
                )})
            .catch(error => this.setState({ error, isLoading: false }));;

    }


    /**
     * The url should looks like 'https://www.openthesaurus.de/synonyme/search?q=aq&format=application/json&substring=true';
     * Important part is the q-param which represents the search word.
     */
    private buildOpenthesaurusUri() {

        const hostAndPath = "https://www.openthesaurus.de/synonyme/search?";
        let searchquery = "q=" + this.props.word;
        const options = "&format=application/json&substring=true";
        const foo = hostAndPath + searchquery + options;
        return foo;
    }

    render() {
        const { word } = this.props;
        const { result, isLoading, error } = this.state;

        if (error) {
            // return <p>{error.message}</p>;
            return <p>{error}</p>;
        }

        if (isLoading) {
            return <p>Loading ...</p>;
        }


        const listItems = result.map((term) =>
            <li>{term.term}</li>
        );

        return(
            <>
                <div>The word searcher for word '{word}'.</div>
                <div>Result: {listItems}</div>
            </>
        );
    }

}
