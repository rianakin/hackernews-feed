import React, { Component } from 'react';
import './style.css';
import store from '../newsfeed/store';

export default class NewsFeedHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreFilter: 0,
            activeTab: "all"
        }
    }

    render() {
        return (
            <nav>
                <header>
                    <div className="slider">
                        <output name="scoreFilter" id="scoreFilter">{this.state.scoreFilter}</output>
                        <input 
                            type="range"
                            min="0" max="500"
                            value={this.state.scoreFilter}
                            step="1"
                            data-ui="score-filter"
                            onChange={this._changeScoreFilter.bind(this)}
                            onClick={this._changeFilter.bind(this)}
                        />
                    </div>
                    <div className="btn-group">
                        <button className={this.state.activeTab === "all" ? 'active' : ''} onClick={this._changeFilter.bind(this)} value="all" data-ui="type-filter">Show All</button>
                        <button className={this.state.activeTab === "unread" ? 'active' : ''} onClick={this._changeFilter.bind(this)} value="unread" data-ui="type-filter">Show Unread</button>
                        <button className={this.state.activeTab === "read" ? 'active' : ''} onClick={this._changeFilter.bind(this)} value="read" data-ui="type-filter">Show Read</button>
                    </div>
                </header>
            </nav>
        );
    }

    _changeFilter(ev) {
        this._setActive(ev);
        if (ev.target.getAttribute("data-ui") === "type-filter")
            store.filterType = ev.target.value;
        else if (ev.target.getAttribute("data-ui") === "score-filter")
            store.filterScore = Number(ev.target.value)
    }

    _setActive(ev) {
        this.setState({ activeTab: ev.target.value })
    }

    _changeScoreFilter(ev) {
        this.setState({
            scoreFilter: ev.target.value
        })
    }
}