import React, { useState } from 'react';

import { FaSearch, FaHome, FaList, FaPlus } from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdLightMode, MdClose } from 'react-icons/md';
import { Link, Outlet } from 'react-router-dom';

import styles from './layout.module.css';

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

  const handleSidebar = (value) => {
    setSideBar(value);
  }

  return (
    <div
      style={{
        position: 'relative'
      }}
    >
      <div
        className={`${styles.sideBar} ${openSideBar ? styles.sideBarMobile : ''}`}
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
        className={styles.header}
      >
        <GiHamburgerMenu
          className={`${styles.headerIcon} ${styles.menuIcon}`}
          onClick={() => handleSidebar(true)}
        />
        <div className={styles.divSearch}>
          <input
            placeholder='Search something ...'
            className={styles.searchInp}
          />
          <div className={styles.searchIcon} >
            <FaSearch color="#fff" />
          </div>
        </div>
        <div style={{ flexGrow: 1 }} ></div>
        <MdLightMode className={styles.headerIcon} />
      </div>
      <div
        className={styles.pageContent}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default Layout;
