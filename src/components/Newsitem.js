import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    const defaultImage = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&auto=format&fit=crop&q=60";

    return (
      <div className="my-3">
        <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden position-relative">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '10px', top: '10px', zIndex: '1' }}>
            <span className="badge rounded-pill bg-danger shadow-sm">
              {source ? source : "General"}
            </span>
          </div>
          <img 
            src={imageUrl ? imageUrl : defaultImage} 
            className="card-img-top" 
            alt="News thumbnail" 
            style={{ height: "200px", objectFit: "cover" }}
            onError={(e) => { e.target.onerror = null; e.target.src = defaultImage; }}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-dark fw-bold" style={{ fontSize: '1.05rem', minHeight: '3rem' }}>
              {title ? title : "No Title Available"}
            </h5>
            <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
              {description ? description : "Click read more to get full details about this news story."}
            </p>
            <p className="card-text mb-3">
              <small className="text-secondary">
                By {author ? author : "Unknown"} on {date ? new Date(date).toGMTString() : "Recent"}
              </small>
            </p>
            <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark w-100 fw-semibold py-2">
              Read More &rarr;
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem

