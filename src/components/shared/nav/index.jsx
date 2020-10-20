import * as React from 'react';
import { Link } from 'gatsby';
import Seo from '../../seo';
import { useState, useEffect } from 'react';
// can't use as <img /> because we want to be able to dynamically change the fill color
const HamburgerIcon = () => (
  <svg width="30px" height="30px" viewBox="0 0 60 51" version="1.1">
    <title>Group</title>
    <desc>Created with Sketch.</desc>
    <g
      id="Navigation"
      stroke="none"
      strokeWidth="1"
      fill="currentColor"
      fillRule="evenodd"
    >
      <g
        id="Home_Navigation_Mobile"
        transform="translate(-618.000000, -78.000000)"
        stroke="currentColor"
        strokeWidth="6"
      >
        <g id="Group" transform="translate(618.000000, 81.000000)">
          <path d="M0,0.5 L60,0.5" id="Line"></path>
          <path d="M0,22.5 L60,22.5" id="Line-Copy"></path>
          <path d="M0,44.5 L60,44.5" id="Line-Copy-2"></path>
        </g>
      </g>
    </g>
  </svg>
);

const CloseIcon = () => (
  <svg width="30px" height="30px" viewBox="0 0 48 47" version="1.1">
    <title>Group</title>
    <desc>Created with Sketch.</desc>
    <g
      id="Navigation"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Home_Navigation_Mobile_Subnavi-close"
        transform="translate(-624.000000, -80.000000)"
        stroke="currentColor"
        strokeWidth="6"
      >
        <g id="Group" transform="translate(625.566757, 81.066757)">
          <path
            d="M-7.56675683,22.5 L52.4332432,22.5"
            id="Line-Copy-3"
            transform="translate(22.433243, 22.500000) rotate(45.000000) translate(-22.433243, -22.500000) "
          ></path>
          <path
            d="M-8,22.5 L52,22.5"
            id="Line-Copy-4"
            transform="translate(22.000000, 22.500000) scale(-1, 1) rotate(45.000000) translate(-22.000000, -22.500000) "
          ></path>
        </g>
      </g>
    </g>
  </svg>
);

const activeStyle = {
  fontWeight: '900',
  textShadow: '0.5px 0',
};

const MenuDropdownForDesktop = props => {
  const styles = {
    color: props.inverted ? 'white' : 'black',
    paddingBottom: '30px',
    display: 'block',
  };

  let className = 'tracks-menu tracks-menu--desktop ';

  if (props.inverted) {
    className += 'tracks-menu--desktop--inverted';
  }

  return (
    <div
      className={className}
      onMouseLeave={props.handleOnMouseLeave}
      onMouseEnter={props.handleOnMouseEnter}
    >
      <Link
        to="/tracks/software-engineering/"
        style={styles}
        activeStyle={activeStyle}
      >
        Software Engineer
      </Link>
      <Link
        to="/tracks/artificial-intelligence/"
        style={styles}
        activeStyle={activeStyle}
      >
        AI Engineer
      </Link>
      <Link
        to="/tracks/interaction-design/"
        style={styles}
        activeStyle={activeStyle}
      >
        Interaction Designer
      </Link>
      <Link
        to="/tracks/product-management/"
        style={{ ...styles, paddingBottom: '0' }}
        activeStyle={activeStyle}
      >
        Product Manager
      </Link>
    </div>
  );
};

const MenuDropDownForMobile = props => {
  const styles = {
    paddingBottom: '30px',
    display: 'block',
    fontSize: '14px',
    paddingLeft: '14px',
  };

  return (
    <div className="tracks-menu tracks-menu--mobile">
      <h4> Tracks </h4>
      <Link to="/tracks/software-engineering/" style={styles}>
        Software Engineer
      </Link>
      <Link to="/tracks/artificial-intelligence/" style={styles}>
        AI Engineer
      </Link>
      <Link to="/tracks/interaction-design/" style={styles}>
        Interaction Designer
      </Link>
      <Link
        to="/tracks/product-management/"
        style={{ ...styles, paddingBottom: '0' }}
      >
        Product Manager
      </Link>
    </div>
  );
};

function Nav(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMouseOverTracksLink, setIsMouseOverTracksLink] = useState(false);
  const [isMouseOverMenu, setIsMouseOverMenu] = useState(false);
  const [isCookieWarning, setIsCookieWarning] = useState(false);
  const [navBackground, setNavBackground] = useState(false);
  const [position, setPosition] = useState(false);
  const [top, setTop] = useState(false);
  const [height, setHeight] = useState(false);

  const isMouseOverTracks = isMouseOverTracksLink || isMouseOverMenu;
  const addClass = props.addClass || '';
  const logo = props.logo || '/assets/shared/dps-logo-white.svg';
  const menuIconColor = addClass === 'nav--black' ? 'black' : 'white';
  const inverted = addClass === 'nav--black';

  useEffect(() => {
    window.addEventListener('scroll', () => {
      var scrolled = document.scrollingElement.scrollTop;
      const position = scrolled < 0.1 ? '' : 'fixed';
      const top = scrolled < 0.1 ? '' : '0em';
      const height = scrolled < 0.1 ? 'var(--nav-height-desktop)' : '80px';

      switch (props.track) {
        case 'se':
          setNavBackground('var(--hollywoord-cerise)');
          break;
        case 'ixd':
          setNavBackground('var(--yellow-sea)');
          break;
        case 'ai':
          setNavBackground('var(--wisteria)');
          break;
        case 'pm':
          setNavBackground('var(--picton-blue)');
          break;
        case undefined:
          const navBackground =
            scrolled < 0.1 ? 'transparent' : 'var(--deep-cove)';
          setNavBackground(navBackground);
          break;
      }

      setPosition(position);
      setTop(top);
      setHeight(height);
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      document
        .getElementsByTagName('body')[0]
        .classList.add('u-disable-scroll');
    } else {
      document
        .getElementsByTagName('body')[0]
        .classList.remove('u-disable-scroll');
    }
  }, [isOpen]);

  useEffect(() => {
    const cookieKey = 'dps-cookie-acknowledged';
    if (!localStorage.getItem(cookieKey)) {
      setIsCookieWarning(true);
    }
  }, []);

  useEffect(() => {
    const f = () => {
      setIsCookieWarning(false);
    };
    document.addEventListener('cookie-accepted', f);

    return () => document.removeEventListener('cookie-accepted', f);
  }, []);

  let additionalMobileClassToFixCookieLOL = '';

  if (isCookieWarning) {
    additionalMobileClassToFixCookieLOL = ' nav__menu--mobile--cookie ';
  }

  // dimmed background behind the menu on mobile

  const Overlay = () => (
    <div
      onClick={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        top: isCookieWarning ? '336px' : '86px',
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0, 0.56)',
      }}
    ></div>
  );

  return (
    <nav
      className={`nav ${addClass}`}
      style={{
        backgroundColor: `${navBackground}`,
        position: `${position}`,
        top: `${top}`,
        height: `${height}`,
      }}
    >
      <Seo />
      <div
        className={`nav__content u-content ${addClass} nav__content--desktop`}
      >
        <Link to="/">
          <img alt="nav-logo" className="nav__logo" src={`${logo}`} />
        </Link>
        <ul className="nav__menu">
          <li className="nav__menu__item">
            <Link to="/" activeStyle={activeStyle}>
              {' '}
              Home{' '}
            </Link>
          </li>
          <li className="nav__menu__item">
            <Link to="/our-program" activeStyle={activeStyle}>
              {' '}
              Our Program{' '}
            </Link>
          </li>
          <li
            className="nav__menu__item"
            onMouseOver={() => setIsMouseOverTracksLink(true)}
            onMouseLeave={() => setIsMouseOverTracksLink(false)}
          >
            <label
              className={inverted ? `nav__menu__item__tracks--inverted` : ''}
            >
              Tracks
            </label>
            {isMouseOverTracks && (
              <MenuDropdownForDesktop
                inverted={inverted}
                handleOnMouseEnter={() => setIsMouseOverMenu(true)}
                handleOnMouseLeave={() => setIsMouseOverMenu(false)}
              />
            )}
          </li>
          <li className="nav__menu__item">
            <Link to="/apply" activeStyle={activeStyle}>
              {' '}
              Apply{' '}
            </Link>
          </li>
          <li className="nav__menu__item">
            <Link to="/team" activeStyle={activeStyle}>
              {' '}
              Team{' '}
            </Link>
          </li>
          <li className="nav__menu__item">
            <Link to="/partners" activeStyle={activeStyle}>
              {' '}
              Partners{' '}
            </Link>
          </li>
          <li className="nav__menu__item">
            <Link to="/faq" activeStyle={activeStyle}>
              {' '}
              FAQ{' '}
            </Link>
          </li>
        </ul>
      </div>

      {isOpen && <Overlay />}
      <div
        className={`nav__content u-content ${addClass} nav__content--mobile`}
      >
        <Link to="/">
          <img alt="nav-logo" className="nav__logo" src={`${logo}`} />
        </Link>
        {!isOpen && (
          <span
            className="nav__hamburger-icon"
            onClick={() => setIsOpen(_isOpen => !_isOpen)}
            style={{ color: menuIconColor }}
          >
            <HamburgerIcon />
          </span>
        )}
        {isOpen && (
          <span
            className="nav__hamburger-icon"
            onClick={() => setIsOpen(_isOpen => !_isOpen)}
            style={{ color: menuIconColor }}
          >
            <CloseIcon />
          </span>
        )}
        <ul
          className={`nav__menu nav__menu--mobile ${additionalMobileClassToFixCookieLOL}  ${
            isOpen ? 'nav__menu--mobile-open' : ''
          }`}
        >
          <li
            className="nav__menu__item nav__menu__item--mobile"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/"> Home </Link>
          </li>
          <li
            className="nav__menu__item nav__menu__item--mobile"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/our-program"> Our Program </Link>
          </li>
          <li className="nav__menu__item nav__menu__item--mobile">
            <MenuDropDownForMobile />
          </li>
          <li
            className="nav__menu__item nav__menu__item--mobile"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/apply"> Apply </Link>
          </li>
          <li
            className="nav__menu__item  nav__menu__item--mobile"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/team">Team</Link>
          </li>
          <li
            className="nav__menu__item nav__menu__item--mobile"
            onClick={() => setIsOpen(false)}
          >
            <Link to="/faq"> FAQ </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
