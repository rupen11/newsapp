import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 8,
        category: "general"
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        console.log("Hello from new constructor");
        this.state = {
            article: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async updateNews() {
        this.props.setProgress(10);
        console.log(this.props.setProgress);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        this.props.setProgress(30);
        let data = await fetch(url);
        let parseData = await data.json();
        this.props.setProgress(70);
        this.setState({
            article: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    handlePrevious = async () => {
        // console.log("previous");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     article: parseData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // });
        // this.setState({ page: this.state.page - 1 });
        // this.updateNews();

    }

    handleNext = async () => {
        // console.log("next");
        // if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {
        //     console.log("No any results");
        // }
        // else {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        // this.setState({ loading: true });
        // let data = await fetch(url);
        // let parseData = await data.json();
        // this.setState({
        //     article: parseData.articles,
        //     page: this.state.page + 1,
        //     loading: false
        // });
        // this.setState({ page: this.state.page + 1 });
        // this.updateNews();
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            article: this.state.article.concat(parseData.articles),
            totalResults: parseData.totalResults,
            loading: false
        });
    };


    deftitle = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit perspiciatis reprehenderit id, corporis iure aliquid vel aut consequatur voluptate eum."
    defdescription = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas nam possimus nesciunt deserunt pariatur nobis voluptates, laudantium dolorum omnis minima repellendus beatae praesentium hic sunt tenetur, corporis quos. Voluptatem, obcaecati."

    render() {
        return (
            <div>
                <InfiniteScroll
                    dataLength={this.state.article.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.article.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container my-5">
                        <h2 className='text-center mb-4'>NewsMomkey Top Headline From {this.capitalizeFirstLetter(this.props.category)} Category</h2>
                        {this.state.loading && <Spinner />}
                        <div className="row gy-3">
                            {
                                !this.state.loading &&
                                this.state.article.map((element, key) => {
                                    return <div className="col-md-4">
                                        <Newsitem key={element.url} id={key} title={element.title ? element.title : this.deftitle} description={element.content ? element.content : this.defdescription} imageurl={element.urlToImage ? element.urlToImage : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"} url={element.url} author={element.author} publishedAt={element.publishedAt} source={element.source.name} />
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between my-5">
                    <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className='btn btn-dark' onClick={this.handleNext}>&rarr; Next</button>
                </div> */}
            </div>
        )
    }
}

export default News
