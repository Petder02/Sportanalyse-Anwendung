import React from 'react';
import "./index.css";
import footballImage from "./images/american-football.png";
import basketballImage from "./images/basketball-ball.png";
import baseballImage from "./images/baseball.png";
import { useNavigate } from 'react-router-dom';
import '../../styles/index.scss';
import '../../styles/_fonts.scss'

const LandingPage = () => {

    // For routing navigation
    const navigate = useNavigate();
    const redirectToFootballPage = () => {
        navigate("/american-football");
    }

    const redirectToBasketballPage = () => {
        navigate("/basketball");
    }

    const redirectToBaseballPage = () => {
        navigate("/baseball");
    }

    return (
        <div>
            <meta charSet="UTF-8" />
            <title>Home Page</title>
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
                crossOrigin="anonymous"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css"
                integrity="sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
            />
            <link rel="stylesheet" href="index.css" />
            <div className="container-fluid">
                {/* Header */}
                <br />
                <br style={{ display: "block", content: '""', marginTop: 50 }} />
                <h1 className="text-center landing-pg-header">
                <span className="text-center">
                    <b>Sportanalyse-Anwendung 1.0.0</b>
                </span>
                </h1>
                <br />
                <h4 className="text-center">
                    Where your sports analytic dreams become reality!
                </h4>
                <br />
                {/* Sports Page HeaderButtons */}
                <div className="row">
                    {/* Football */}
                    <div
                        className="col-md-3 card border border-dark mr-auto mx-auto"
                        id="american-football"
                    >
                        <div onClick={redirectToFootballPage} className="card-body">
                            <img
                                className="img-center"
                                src={footballImage}
                                width={128}
                                height={128}
                                alt="American Football"
                            />
                            <br />
                            <h3 className="text-center default-fonts">American Football</h3>
                            {/* Dummy link, add analytics page link here when finished */}
                            <a href="#" className="stretched-link" />
                        </div>
                    </div>
                    {/* Basketball */}
                    <div
                        className="col-md-3 card border border-dark mr-auto mx-auto"
                        id="basketball"
                    >
                        <div onClick={redirectToBasketballPage} className="card-body">
                            <img
                                className="img-center"
                                src={basketballImage}
                                width={128}
                                height={128}
                                alt="Basketball"
                            />
                            <br />
                            <h3 className="text-center default-fonts">Basketball</h3>
                            {/* Dummy link, add analytics page link here when finished */}
                            <a href="#" className="stretched-link" />
                        </div>
                    </div>
                    {/* Baseball */}
                    <div
                        className="col-md-3 card border border-dark mr-auto mx-auto"
                        id="baseball"
                    >
                        <div onClick={redirectToBaseballPage} className="card-body">
                            <img
                                className="img-center"
                                src={baseballImage}
                                width={128}
                                height={128}
                                alt="Baseball"
                            />
                            <br />
                            <h3 className="text-center default-fonts">Baseball</h3>
                            {/* Dummy link, add analytics page link here when finished */}
                            <a href="#" className="stretched-link" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;