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
            next: "",
            img: "",
            search: "",
            results: "",
            bla: "",
            test: "",
            test2: "",
        }
    }

    //ladowanie serialu na starcie z podanego state.search
    componentWillMount() {
        fetch(`https://www.episodate.com/api/most-popular?page=1`
        ).then(resp => resp.json())
            .then(data => {
                return this.setState({
                    results: data.tv_shows.map((el, index) => {
                        return <div key={el.id} className="col-12 col-md-12 col-lg-4">#{index + 1}
                            <div data-mov={el.id} className="card bg-secondary text-white" style={{width: 20 + 'rem'}}>
                                <img onClick={this.handleSearchClick} className="card-img-top"
                                     src={el.image_thumbnail_path} style={{height: 25 + 'rem'}} alt="Card image cap"/>
                                <div className="card-body">
                                    <h2 className="card-title" style={{height: 5 + 'rem'}}>{el.name}</h2>
                                </div>
                            </div>
                        </div>
                        {/*{el.name}<img src={el.image_thumbnail_path}/>*/
                        }
                    }),
                    // test: data.tvShows.map((el, index) => {
                    //     return <div className="carousel-item active">
                    //         <img className="d-block w-100" src={el.pictures} alt="First slide"/>
                    //     </div> })
                })
            })
        this.setState({
            title: "",
            text: "",
            start: "",
            next: "",
            img: "",
            bla: "",
        })
    }

    handleChange = (event) => {
        console.log('clickclick')
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

    //wyszukiwarka i tworzenie wyszukanych pozycji
    handleClick = (e) => {
        e.preventDefault();
        console.log(this.state.search)
        console.log(this.state.title)
        fetch(`https://www.episodate.com/api/search?q=${this.state.search}&page=1`
        ).then(resp => resp.json())
            .then(data => {
                return this.setState({
                    results: data.tv_shows.map((el, index) => {
                        return <div key={el.id} className="col-12 col-md-12 col-lg-4">
                            <div data-mov={el.id} className="card bg-secondary text-white" style={{width: 20 + 'rem'}}>
                                <img onClick={this.handleSearchClick} className="card-img-top"
                                     src={el.image_thumbnail_path} style={{height: 25 + 'rem'}} alt="Card image cap"/>
                                <div className="card-body">
                                    <h2 className="card-title" style={{height: 5 + 'rem'}}>{el.name}</h2>
                                </div>
                            </div>
                        </div>
                        {/*{el.name}<img src={el.image_thumbnail_path}/>*/
                        }
                    })
                })
            })
        this.setState({
            title: "",
            text: "",
            start: "",
            next: "",
            img: "",
            bla: "",
        })
    }

    //wyswietlanie serialu po wybraniu wyszukanego serialu
    handleSearchClick = (e) => {
        // e.preventDefault();
        // e.target.dataset.mov - dostanie sie do wnetrza elementu
        //console.log(e.target.parentElement.parentElement)
        this.setState({bla: e.target.parentElement.parentElement.dataset.mov})
        fetch(`https://www.episodate.com/api/show-details?q=${e.target.parentElement.dataset.mov}`
        ).then(resp => resp.json()).then(data => {
            return this.setState({
                title: data.tvShow.name,
                text: data.tvShow.description,
                start: data.tvShow.start_date,
                // next: data.tvShow.countdown.air_date,
                img: data.tvShow.image_path,
                // test: data.tvShow.pictures[3],
                // test2: data.tvShow.countdown.season
            })
        })
        this.setState({
            results: ""
        })
    }

    //render calej strony
    render() {
        return <div>
            <div className='main'>
                <nav className="navbar navbar-dark bg-dark justify-content-between">
                    <a className="navbar-brand" href={"/"}>TV-SHOWS MANAGER <i className="fa fa-television fa-1.5x" aria-hidden="true"></i></a>
                    <form className="form-inline">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                               onChange={this.handleChange} value={this.state.search}/>
                        <button className="btn btn-outline-secondary my-2 my-sm-0" type="submit"
                                onClick={this.handleClick}>Search
                        </button>
                    </form>
                </nav>
                < div className='container'>
                    <div className='row'>
                        <div className='col-12' style={{height: 7 + 'rem'}}><p style={{textAlign: 'center',fontSize: 5 + 'rem', color: 'grey', fontWeight: 900, marginBottom: 8 + 'rem'}}>TV SHOWS</p></div>
                    </div>
                    <div className='row justify-content-between'>
                        <div className='col-auto'>
                            <h1>{this.state.title}</h1>
                        </div>
                        <div className='col-auto'>
                            <button type="button" className="btn btn-outline-success btn-lg">Add</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <img className='mainImg' src={this.state.img}/>
                        </div>
                        <div className='col'>
                            <p>{this.state.text}</p>
                        </div>
                    </div>
                    <div className='row justify-content-end'>
                        <div className='col-auto'>
                            <img src={this.state.test}></img>
                            <p>{this.state.test2}</p>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <Popular results={this.state.text} />
                    <div className="row">{this.state.results}</div>
                </div>
            </div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="/">
                        TV SHOWS <i className="fa fa-television fa-1.5x" aria-hidden="true"></i>
                        <i className="fa fa-facebook-official" aria-hidden="true"></i>
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                        <i className="fa fa-imdb" aria-hidden="true"></i>
                        <i className="fa fa-twitter-square" aria-hidden="true"></i>
                    </a>
                    <a className="navbar-brand" href='https://github.com/piotrrawski'><i className="fa fa-github" aria-hidden="true"></i></a>
                </nav>
            </div>
        </div>
    }
}

class Popular extends React.Component {
    render(){
        if (this.props.results == ""){
            return  <div className='row justify-content-end' >
                <div className='col-12'>
                    <h1>Most Popular</h1>
                </div>
            </div>
        }else{
            return <h1></h1>
        }
    }
}


class App extends React.Component {
    render() {
        return <TV />
    }
}

document.addEventListener('DOMContentLoaded', function(){
    ReactDOM.render(
        <App/>,
        document.getElementById('app')
    );
});

