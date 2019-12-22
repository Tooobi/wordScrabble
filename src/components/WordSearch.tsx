import * as React from 'react';
import {Button} from "@material-ui/core";
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
                {/*<div>Result: {listItems}</div>*/}
            </>
        );
    }

}
