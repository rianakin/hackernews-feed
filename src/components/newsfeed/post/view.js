import React, { Component } from 'react';
import { computed, action } from 'mobx';
import { observer } from 'mobx-react';
import './style.css';

@observer
export default class Post extends Component {
    render() {
        return (
            <div className={`Post ${this.store.getPost(this.props.id).isVisited ? 'Post--Visited' : ''}`} onClick={this._onClick.bind(this)}>
                <div className="Post__Favicon">
                    <span>&#x25CB;</span>
                    <img 
                        src={this.props.url ? "https://www.google.com/s2/favicons?domain_url=" + new URL(this.props.url).hostname : "http://via.placeholder.com/30x30"}
                        width={30} 
                        height={30} 
                        alt={"favicon?"+this.props.id}></img>
                </div>
                <div className="Post__Content">
                    <div className="Post__Data">
                        <div className="Post__Link">
                            <span>{this.props.url ? new URL(this.props.url).hostname : ''}</span>
                        </div>
                        <div className="Post__Title">
                            {this.props.title}
                        </div>
                    </div>
                    <div className="Post__Score">
                        {this.props.score}
                    </div>
                </div>
            </div>
        )
    }

    _onClick(ev) {
        window.open(this.props.url, '_blank');
        this.visit();
    }

    @computed get store() {
        return this.props.store;
    }

    @action('visit')
    visit() {
        this.store.setIsVisited(this.props.id);
        // Store visited state in localStorage
        let storedPost = JSON.parse(localStorage.getItem(this.props.id));
        storedPost.isVisited = true;
        localStorage.setItem(this.props.id, JSON.stringify(storedPost));
    }
}
