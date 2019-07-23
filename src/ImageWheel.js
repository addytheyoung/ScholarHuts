import React from 'react';
import './ImageWheel.css';
import rightArrow from './iconmonstr-arrow-25 (1).svg';
import leftArrow from './iconmonstr-arrow-64.svg';
import Carousel from 'react-bootstrap/Carousel';


export default class ImageWheel extends React.Component {
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
        const temp = this.props.images.map(ele => {
            return (
                <Carousel.Item>
                    <img src={ele} className="img-test" />
                </Carousel.Item>
            )
        })
        return (

            <div className="img-wheel carousel slide" id="img-wheel">

                <Carousel
                    interval={null}
                >
                    {temp}
                </Carousel>
            </div>
        )

    }
}