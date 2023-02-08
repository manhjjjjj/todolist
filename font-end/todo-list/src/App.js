import React, { Component } from 'react';

class App extends Component {

    render() {
        fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then ((data) => console.log(data))
        return (
            <div>
                Hello world
            </div>
        );
    }
}

export default App;