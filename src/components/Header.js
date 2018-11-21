import React from 'react';

// stateless functional component below as this object only returns an HTML element
//implicit reurn ->

const Header = (props) => (
    <header className="top">
      <h1>Catch
        <span className="ofThe">
          <span className="of">Of</span>
          <span className="the">The</span>
        </span>
        Day</h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  );

export default Header;
