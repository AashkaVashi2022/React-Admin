import * as React from "react";
// import { Card, CardContent, CardHeader } from '@mui/material';
import { Container } from "@material-ui/core";
import { Title } from 'react-admin';
import Example from "../Chart/BarChart";
import ExampleBrushBarChart from "../Chart/BrushBarChart";
import ExampleBrushChart from "../Chart/BrushCart";
import ExamplePai from "../Chart/PaiChart";

export const Dashboard = () => (

    <>
        <Title title="Dashboard" />
        <Container>
            <div className="col-12 pt-2">
                <div className="row align-items-stretch">
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Total Users<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">10,500</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Monthly Active Users (MAU)<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">500</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> Weekly Active Users (WAU)<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">1000</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Monthly churn rate (%)<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">6.40%</span>
                        </div>
                    </div>
                </div>
                <div className="row align-items-stretch">
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Average Revenue Per User Per Month<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">500</span><span
                                className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: 480</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Subscriptions Per User (Active or Paused)<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">400</span><span
                                className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: 390</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> % of Nutrition balanced boxes<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">8.20%</span>
                            <span
                                className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: 7.80%</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">% of Autogenerated orders delivered<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">6.40%</span>
                            <span
                                className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: 7.60%</span>
                        </div>
                    </div>
                </div>
                <div className="row align-items-stretch">
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Operating margin for raw material costs (from 30DMAC)<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">10,500</span>
                            <span
                                className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: 11,750</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">% Replacements requested<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">50%</span><span
                                className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: 30%</span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title"> % Mid Week Refills Ordered<svg
                                className="MuiSvgIcon-root-19" focusable="false" viewBox="0 0 24 24" aria-hidden="true" role="presentation">
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z">
                                </path>
                            </svg></h4><span className="hind-font caption-12 c-dashboardInfo__count">45.08%</span>
                            <span
                                className="hind-font caption-12 c-dashboardInfo__subInfo">Last month: 30%</span>

                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 pt-2">
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <span className='text-center pt-2'>Revenue (Month wise/ Week wise/ Date wise)</span>
                            <Example />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <span className='text-center pt-2'>% Mid Week Refills Ordered</span>
                            <ExamplePai />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <div className="card">
                            <span className='text-center pt-2 '>Revenue (Location wise)</span>
                            <ExampleBrushBarChart />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="card">
                            <span className='text-center pt-2 '>Number of Active Subscriptions (Box type/Box Size/Box Category)</span>
                            <ExampleBrushChart />
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    </>
);

