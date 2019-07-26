import React from 'react';
import rightArrow from './iconmonstr-arrow-25 (1).svg';
import leftArrow from './iconmonstr-arrow-64.svg';
import './BigImageWheel.css';

export default class BigImageWheel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            img: 0,
        }
    }
    nextProp() {
        this.setState(() => {
            if (this.state.img == this.props.images.length - 1) {
                return {
                    img: 0,
                }
            }
            return {
                img: this.state.img + 1,
            }
        })

    }

    prevProp() {
        this.setState(() => {
            if (this.state.img == 0) {
                return {
                    img: this.props.images.length - 1,
                }
            }
            return {
                img: this.state.img - 1,
            }
        })
    }

    render() {
        return (

            <div className="big-wheel-div">
                <button className="carousel-button left-carousel-button big-arrow-left" onClick={() => this.prevProp()}>
                    <img src={leftArrow} className="big-arrow" />
                </button>
                <button className="carousel-button right-carousel-button big-arrow-right" onClick={() => this.nextProp()}>
                    <img src={rightArrow} className="big-arrow" />
                </button>
                <img src={this.props.images[this.state.img]} className="img-test" />

            </div>
        )

    }
}