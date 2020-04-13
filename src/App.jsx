import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom'

const contents = document.getElementById('contents')

import AlbumTable from './components/AlbumTable.jsx'
import About from './components/About.jsx'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import NoMatch from './components/NoMatch.jsx'

import 'bootswatch/dist/materia/bootstrap.min.css'
import './global-style.css'

class App extends React.Component {

  componentDidMount() {
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Navigation />
          <Switch>
            <Route exact path="/" component={AlbumTable}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="*" component={NoMatch}></Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, contents)