import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Newsitem extends Component {

    constructor() {
        super();
        this.state = {
            bedgeColor: ""
        }
    }

    render() {
        let { title, description, imageurl, url, author, publishedAt, source } = this.props;
        return (
            < div className="card" >
                <img src={imageurl} className="card-img-top" alt="..." style={{ width: "100%", height: "220px" }} />
                <div className="card-body">
                    <h5 className="card-title" style={{ display: "inline" }}>{title}</h5>
                    <span className="start-100 badge rounded-pill bg-danger mx-2">
                        {source}
                    </span>
                    <p className="card-text mt-2" style={{ fontSize: "0.9rem" }}>{description}</p>
                    <p className="card-text" style={{ fontSize: "0.8rem" }}><small className="text-muted">By {author ? author : "Unknown"} on {new Date(publishedAt).toGMTString()}</small></p>
                    <a href={url} target="_rj" className="btn btn-dark btn-sm">View full news</a>
                </div>
            </div >
        )
    }

    static propTypes = {
        imageurl: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        url: PropTypes.string,
    }
}

export default Newsitem

