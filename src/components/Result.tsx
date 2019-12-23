import * as React from "react";


export default function Result(props) {
    return(
        <>
            <h1>data has been loaded: </h1>
            
            <ul>
                {props.content.map(hit =>
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
    );
}
