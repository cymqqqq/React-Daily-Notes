import React from "react";

const getChildrenOnDisplayName = (children, displayName) =>
    React.Children.map(children, (child) =>
    child.type.displayName === displayName ? child : null
    );

const Card = ({ children }) => {
    const header = getChildrenOnDisplayName(children, "Header");
    const body = getChildrenOnDisplayName(children, "Body");
    const footer = getChildrenOnDisplayName(children, "Footer");

    return (
        <div style={cardStyle}>
            {header}
            {body}
            {footer}
        </div>
    )
}

const Header = ({ children, style, ...other}) => (
    <div style={{ ...headerStyle, ...style}} {...other}>
        {children}
    </div>
);

Header.displayName = "Header";

Card.Header = Header;

const Body = ({ children, style, ...other}) => (
    <div style={{ ...bodyStyle, ...style}} {...other}>
        {children}
    </div>
);

Body.displayName = "Body";
Card.Body =Body;

const Footer = ({ children, style, ...other}) => (
    <div style={{ ...footerStyle, ...style}} {...other}>
        {children}
    </div>
);

Footer.displayName = "Footer";
Card.Footer = Footer;

export default Card;