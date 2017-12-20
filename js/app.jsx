console.log("hello world");

import React from 'react';
import ReactDOM from 'react-dom';
import { Router,
    Route,
    Link,
    IndexLink,
    IndexRoute,
    hashHistory
} from 'react-router';

class TV extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: "",
            text: "",
            start: "",
            img: "",
            search: "",
            results: "",
        }
    }

    handleChange = (event) => {
        this.setState({
            search: event.target.value
        })
    }

    // bezposrednie i dokladne podanie nazwy serialu
    // handleClick = (e) => {
    //     e.preventDefault();
    //     console.log("click")
    //     fetch(`https://www.episodate.com/api/show-details?q=${this.state.search}`
    //     ).then(resp => resp.json()).then(data => {return this.setState({title: data.tvShow.name,
    //         text: data.tvShow.description,
    //         start: data.tvShow.start_date,
    //         img: data.tvShow.image_path,
    //         })} )
    //     console.log(this.state.search)
    // }

    wyszukiwarka
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.search)
        fetch(`https://www.episodate.com/api/search?q=${this.state.search}&page=1`
        ).then(resp => resp.json())
            .then(data => {return this.setState({results: data.tv_shows.map((el, index)=>{return <li key={el.id} onClick={this.handleSearchClick}>{el.name}</li>})})})
    }

    handleSearchClick = (e) => {
        e.preventDefault();
        console.log('search-click')

    }

    render(){
      return <div>
          <form>
              <input onChange={this.handleChange} value={this.state.search}/>
              <button onClick={this.handleClick}>Szukaj</button>
          </form>
                <h1>{this.state.title}</h1>
                <h3>{this.state.text}</h3>
                <h2>{this.state.start}</h2>
                <img src={this.state.img}/>
                <h2>{this.state.results}</h2>
            </div>
        }
    }

class App extends React.Component {
    render(){
        return (
            <TV />
        )
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});