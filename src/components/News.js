import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import localNews from '../news.json'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pagesize: 6,
    category: 'general',
    searchQuery: ''
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
      usingFallback: false
    }
  }

  async fetchNews() {
    const { category, country, searchQuery } = this.props;
    this.setState({ loading: true });

    try {
      // Primary Hostable Open API (Supports CORS, free for hosted deployment)
      const primaryUrl = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/${country}.json`;
      let response = await fetch(primaryUrl);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let parsedData = await response.json();
      let articles = parsedData.articles || [];

      // If user typed a search query, filter articles by title or description
      if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        articles = articles.filter(item => 
          (item.title && item.title.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query))
        );
      }

      this.setState({
        articles: articles,
        totalResults: articles.length,
        loading: false,
        usingFallback: false
      });

    } catch (error) {
      console.warn("Primary API fetch failed, loading local fallback data:", error);
      
      // Fallback to local json dataset so app never breaks when offline or throttled
      let fallbackArticles = localNews.articles || [];

      if (category && category !== 'general') {
        const catQuery = category.toLowerCase();
        const filtered = fallbackArticles.filter(item =>
          (item.title && item.title.toLowerCase().includes(catQuery)) ||
          (item.description && item.description.toLowerCase().includes(catQuery))
        );
        if (filtered.length > 0) {
          fallbackArticles = filtered;
        }
      }

      if (searchQuery && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        fallbackArticles = fallbackArticles.filter(item => 
          (item.title && item.title.toLowerCase().includes(query)) ||
          (item.description && item.description.toLowerCase().includes(query))
        );
      }

      this.setState({
        articles: fallbackArticles,
        totalResults: fallbackArticles.length,
        loading: false,
        usingFallback: true
      });
    }
  }

  async componentDidMount() {
    await this.fetchNews();
  }

  async componentDidUpdate(prevProps) {
    if (
      prevProps.category !== this.props.category ||
      prevProps.searchQuery !== this.props.searchQuery
    ) {
      this.setState({ page: 1 }, () => {
        this.fetchNews();
      });
    }
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  handleNextClick = () => {
    const pageSize = this.props.pagesize || 6;
    const maxPage = Math.ceil(this.state.articles.length / pageSize);
    if (this.state.page < maxPage) {
      this.setState({ page: this.state.page + 1 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  render() {
    const pageSize = this.props.pagesize || 6;
    const { articles, loading, page, usingFallback } = this.state;
    const { category, searchQuery } = this.props;

    // Slice articles for local pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedArticles = articles.slice(startIndex, startIndex + pageSize);
    const totalPages = Math.ceil(articles.length / pageSize) || 1;

    const capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
      <div className="container my-4">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <h2 className="fw-bold mb-2 mb-md-0 text-capitalize">
            Top {capitalize(category)} Headlines
            {searchQuery && <span className="text-secondary fs-5 ms-2">(Search: "{searchQuery}")</span>}
          </h2>
          {usingFallback && (
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
              Offline Demo Mode (Local Data)
            </span>
          )}
        </div>

        {loading && <Spinner />}

        {!loading && paginatedArticles.length === 0 && (
          <div className="text-center my-5 py-5">
            <h4 className="text-muted">No news articles found for "{searchQuery || category}".</h4>
            <p className="text-secondary">Try searching for a different keyword or topic.</p>
          </div>
        )}

        <div className="row">
          {!loading && paginatedArticles.map((element, index) => {
            return (
              <div className="col-12 col-md-6 col-lg-4 d-flex align-items-stretch" key={element.url || index}>
                <Newsitem
                  title={element.title ? element.title.slice(0, 60) + (element.title.length > 60 ? "..." : "") : "No Title"}
                  description={element.description ? element.description.slice(0, 100) + (element.description.length > 100 ? "..." : "") : "No Description Available"}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source ? element.source.name : category}
                />
              </div>
            )
          })}
        </div>

        {!loading && articles.length > pageSize && (
          <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top">
            <button
              disabled={page <= 1}
              type="button"
              onClick={this.handlePrevClick}
              className="btn btn-outline-dark px-4 fw-bold"
            >
              &larr; Previous
            </button>
            <span className="text-muted fw-semibold fs-6">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page >= totalPages}
              type="button"
              onClick={this.handleNextClick}
              className="btn btn-outline-dark px-4 fw-bold"
            >
              Next &rarr;
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default News

