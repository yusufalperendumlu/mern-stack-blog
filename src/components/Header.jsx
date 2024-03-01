import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { images } from "../constants";
import { logout } from "../store/actions/user";

const NavItemInfo = [
  {
    name: "Home",
    type: "link",
    href: "/",
  },
  {
    name: "Articles",
    type: "link",
    href: "/articles",
  },
  {
    name: "Pages",
    type: "dropdown",
    items: [
      { title: "About us", href: "/about" },
      { title: "Contact us", href: "/contact" },
    ],
  },
  {
    name: "Pricing",
    type: "link",
    href: "/pricing",
  },
  {
    name: "Faq",
    type: "link",
    href: "/faq",
  },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const DropdownHandler = () => {
    setDropdown((curState) => {
      return !curState;
    });
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link to={item.href} className="px-4 py-2">
            {item.name}
          </Link>
          <span className="text-blue-500 absolute right-0 top-0 opacity-0 transition-all duration-500 font-bold group-hover:opacity-100 group-hover:right-[90%]">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <p className="flex cursor-pointer gap-x-1 items-center px-4 py-2 ">
            <span>{item.name}</span>
            <IoIosArrowDown onClick={DropdownHandler} />
          </p>
          <div
            className={`${
              dropdown ? "hidden" : "block"
            } lg:hidden transition-all duration-500 pt-4 absolute bottom-0 right-0 transform translate-y-full  w-max lg:group-hover:block z-50 opacity-100`}
          >
            <ul className="flex flex-col z-50 bg-dark-hard lg:bg-white shadow-lg rounded-lg overflow-hidden ">
              {item.items.map((subItem, index) => {
                return (
                  <Link
                    key={index}
                    to={subItem.href}
                    className="hover:bg-dark-soft hover:text-white px-4 py-2 text-white lg:text-dark-soft"
                  >
                    {subItem.title}
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className="sticky top-0 right-0 left-0 bg-white z-50">
      <header className="container mx-auto px-5 py-4 flex justify-between items-center">
        <Link to="/">
          <img className="w-16" src={images.Logo} alt="Logo" />
        </Link>
        <div className="lg:hidden z-50">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-3 font-semibold">
            {NavItemInfo.map((item) => {
              return <NavItem key={item.name} item={item} />;
            })}
          </ul>
          {userState.userInfo ? (
            <div className="text-white items-center gap-y-5 lg:text-dark-soft flex flex-col lg:flex-row gap-x-3 font-semibold">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <p className="flex cursor-pointer gap-x-1 items-center  mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300">
                    <span>Account</span>
                    <IoIosArrowDown
                      onClick={() => setProfileDropdown(!profileDropdown)}
                    />
                  </p>
                  <div
                    className={`${
                      profileDropdown ? "hidden" : "block"
                    } lg:hidden transition-all duration-500 pt-4 absolute bottom-0 right-0 transform translate-y-full  w-max lg:group-hover:block z-50 opacity-100`}
                  >
                    <ul className="flex flex-col z-50 bg-dark-hard lg:bg-white shadow-lg rounded-lg overflow-hidden ">
                      <button
                        type="button"
                        onClick={() => navigate("/profile")}
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-hard"
                      >
                        Profile Page
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="hover:bg-dark-hard hover:text-white px-4 py-2 text-white lg:text-dark-hard"
                      >
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              Sign in
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
