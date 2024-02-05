import React, { Component } from 'react'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";
import { CarouselData } from '@/data/homepage-carousel-data';
import Carousel1 from '@/widgets/layout/carsoule';
// import { Carousel1} from '@/widgets/layout/carsoule';

export class HomePageCarousel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentSlide: 0,
            paused: false,
        };
    }

    componentDidMount() {
        setInterval(() => {
            if (this.state.paused === false) {
                let newSlide =
                    this.state.currentSlide === CarouselData.length - 1
                        ? 0
                        : this.state.currentSlide + 1;
                this.setState({ currentSlide: newSlide });
            }
        }, 6000);
    }

    nextSlide = () => {
        let newSlide =
            this.state.currentSlide === CarouselData.length - 1
                ? 0
                : this.state.currentSlide + 1;
        this.setState({ currentSlide: newSlide });
    };

    prevSlide = () => {
        let newSlide =
            this.state.currentSlide === 0
                ? CarouselData.length - 1
                : this.state.currentSlide - 1;
        this.setState({ currentSlide: newSlide });
    };

    setCurrentSlide = (index) => {
        this.setState({ currentSlide: index });
    };

    

    render() {
        return (
            
            <div className="mt-0">
                <Carousel1 />
                <div className="flex overflow-hidden relative">
                
                    <AiOutlineLeft
                        onClick={this.prevSlide}
                        className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                    />
                    
                    {/* <Swipe onSwipeLeft={this.nextSlide} onSwipeRight={this.prevSlide}>
                        {CarouselData.map((slide, index) => {
                            return (
                                <img
                                    src={slide.image}
                                    alt="This is a carousel slide"
                                    key={index}
                                    className={
                                        index === this.state.currentSlide
                                            ? "block w-full hight[5rem] object-cover"
                                            : "block"
                                    }
                                    onMouseEnter={() => {
                                        this.setState({ paused: true });
                                    }}
                                    onMouseLeave={() => {
                                        this.setState({ paused: false });
                                    }}
                                />
                            );
                        })}
                    </Swipe> */}
                    

                    <div className="absolute w-full flex justify-center bottom-0">
                        {CarouselData.map((element, index) => {
                            return (
                                <div
                                    className={
                                        index === this.state.currentSlide
                                            ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                                            : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
                                    }
                                    key={index}
                                    onClick={() => {
                                        this.setCurrentSlide(index);
                                    }}
                                ></div>
                            );
                        })}
                    </div>

                    <AiOutlineRight
                        onClick={this.nextSlide}
                        className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
                    />
                </div>
            </div>
        )
    }
}

export default HomePageCarousel