
import React from 'react';
import ReactDOM from 'react-dom';
import Header from 'components/header/header';
import Dashboard from 'components/dashboard/dashboard';
import Footer from 'components/footer/footer';

ReactDOM.render(<Header/>,document.getElementById("appHeader"));
ReactDOM.render(<Dashboard/>,document.getElementById("appSection"));
ReactDOM.render(<Footer />,document.getElementById("appFooter"));
