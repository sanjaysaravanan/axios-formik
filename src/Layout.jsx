import React, { useState } from 'react';

import { FaSearch, FaHome, FaList, FaPlus, FaHeart } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdLightMode, MdClose, MdDarkMode } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';

import styles from './layout.module.css';
import ThemeMode from './ThemeMode';
import { useSelector } from 'react-redux';

const pages = [
  {
    pathName: '/',
    pageName: 'Home',
    Icon: FaHome,
  },
  {
    pathName: '/movies',
    pageName: 'Movies',
    Icon: FaList,
  },
  {
    pathName: '/addMovie',
    pageName: 'Add Movie',
    Icon: FaPlus
  },
  {
    pathName: '/reduxStates',
    pageName: 'Redux States',
    Icon: FaPlus
  }
];

const PageLink = ({ pathName, pageName, Icon }) => {
  return (
    <Link
      to={pathName}
      style={{
        textDecoration: 'none'
      }}
    >
      <div
        className={styles.pageItem}
      >
        <Icon color={'#fff'} style={{ padding: '4px 16px 4px 4px' }} />
        {pageName}
      </div>
      <hr
        color='#fff'
        style={{
          margin: '2px 16px'
        }}
      />
    </Link>
  )
}

const Layout = () => {

  const [openSideBar, setSideBar] = useState(false);

  const [mode, setMode] = useState('light');

  const wishReducer = useSelector(state => state.wishReducer);

  const handleSidebar = (value) => {
    setSideBar(value);
  }

  return (
    <ThemeMode.Provider value={{ mode, setMode }} >
      <div
        style={{
          position: 'relative'
        }}
      >
        <div
          className={`${styles.sideBar} ${mode === 'dark' ? styles.darkMode : ''} ${openSideBar ? styles.sideBarMobile : ''}`}
        >
          <MdClose
            className={`${styles.closeIcon} ${styles.menuIcon}`}
            onClick={() => handleSidebar(false)}
          />
          {pages.map((page) => (
            <PageLink key={page.pageName} {...page} />
          ))}
        </div>
        <div
          className={`${styles.header} ${mode === 'dark' ? styles.darkMode : ''}`}
        >
          <GiHamburgerMenu
            className={`${styles.headerIcon} ${styles.menuIcon}`}
            onClick={() => handleSidebar(true)}
          />
          <div className={styles.divSearch}>
            <input
              placeholder='Search something ...'
              className={`${styles.searchInp} ${mode === 'dark' ? styles.lightDark : ''}`}
              style={{
                color: mode === 'dark' ? '#fff' : '#000',
              }}
            />
            <div className={`${styles.searchIcon} ${mode === 'dark' ? styles.darkMode : ''}`} >
              <FaSearch color="#fff" />
            </div>
          </div>
          <div style={{ flexGrow: 1 }} ></div>
          <FaHeart color='#f00' fontSize={'20px'} />({wishReducer.wishList.length})
          {mode === 'light' && <MdDarkMode
            className={styles.headerIcon}
            onClick={() => {
              setMode('dark');
            }}
          />}
          {mode === 'dark' && <MdLightMode
            className={styles.headerIcon}
            onClick={() => {
              setMode('light');
            }}
          />}
        </div>
        <div
          className={`${styles.pageContent} ${mode === 'dark' ? styles.lightDark : ''}`}
        >
          <Outlet />
        </div>
      </div>
    </ThemeMode.Provider>
  )
}

export default Layout;
