import * as React from 'react';

export class Child2 extends React.Component<{
    name: string
}, {}> {

    render() {
        const { name } = this.props;

        return(
            <div>I'm Child 2 {name}</div>

        );
    }

}
