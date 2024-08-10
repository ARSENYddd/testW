// index.js

// export { default as Chart1} from '../src/components/Dashboard/Charts/Chart1'
// export { default as Chart2 } from '../src/components/Dashboard/Charts/Chart2';
// export { default as GeneralInfo } from '../src/components/Card/Sections/GeneralInfo';
// export { default as FamilyMembers } from '../src/components/Card/Sections/FamilyMembers';
// export { default as Education } from '../src/components/Card/Sections/Education';
// export { default as Filters } from '../src/components/List/Filters';
import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import './styles/tailwind.css';
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();