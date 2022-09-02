import './hotel.css';
import { Navbar, Header, MailList, Footer } from '../../components';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { MdCancel, MdLocationOn } from 'react-icons/md';
import { useContext, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import { useLocation } from 'react-router-dom';
import { SearchContext } from '../../context/SearchContext';

const Hotel = () => {
    //image Sliding
    const [slideNumber, setSlideNumber] = useState(0);
    const [open, setOpen] = useState(false);

    //Api Fetch
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const { data, loading, error } = useFetch(`/hotels/find${id}}`);

    const { date } = useContext(SearchContext);

    const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
    const dayDifference = (date1, date2) => {
        const timeDiff = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
        return diffDays;
    };

    const handleOpen = (i) => {
        setSlideNumber(i);
        setOpen(true);
    };

    const handleMove = (direction) => {
        let newSlideNumber;

        if (direction === 'l') {
            newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
        } else {
            newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
        }

        setSlideNumber(newSlideNumber);
    };

    return (
        <div>
            <Navbar />
            <Header type="list" />
            {loading ? (
                'Please Wait...'
            ) : (
                <>
                    <div className="hotelContainer">
                        {open && (
                            <div className="slider">
                                <MdCancel
                                    className="close"
                                    onClick={() => setOpen(false)}
                                />
                                <FaArrowAltCircleLeft
                                    className="arrow"
                                    onClick={() => handleMove('l')}
                                />
                                <div className="sliderWrapper">
                                    <img
                                        src={data.photos[slideNumber]}
                                        alt=""
                                        className="sliderImg"
                                    />
                                </div>
                                <FaArrowAltCircleRight
                                    className="arrow"
                                    onClick={() => handleMove('r')}
                                />
                            </div>
                        )}
                        <div className="hotelWrapper">
                            <button className="bookNow">
                                Reserve or Book Now!
                            </button>
                            <h1 className="hotelTitle">{data.name}</h1>
                            <div className="hotelAddress">
                                <MdLocationOn />
                                <span>{data.address}</span>
                            </div>
                            <span className="hotelDistance">
                                Excellent location – {data.distance}m from
                                center
                            </span>
                            <span className="hotelPriceHighlight">
                                Book a stay over ${data.cheapestPrice} at this
                                property and get a free airport taxi
                            </span>
                            <div className="hotelImages">
                                {data.photos?.map((photo, i) => (
                                    <div className="hotelImgWrapper" key={i}>
                                        <img
                                            onClick={() => handleOpen(i)}
                                            src={photo}
                                            alt=""
                                            className="hotelImg"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="hotelDetails">
                                <div className="hotelDetailsTexts">
                                    <h1 className="hotelTitle">{data.title}</h1>
                                    <p className="hotelDesc">{data.desc}</p>
                                </div>
                                <div className="hotelDetailsPrice">
                                    <h1>Perfect for a 9-night stay!</h1>
                                    <span>
                                        Located in the real heart of Krakow,
                                        this property has an excellent location
                                        score of 9.8!
                                    </span>
                                    <h2>
                                        <b>$945</b> (9 nights)
                                    </h2>
                                    <button>Reserve or Book Now!</button>
                                </div>
                            </div>
                        </div>
                        <MailList />
                        <Footer />
                    </div>
                </>
            )}
        </div>
    );
};

export default Hotel;
