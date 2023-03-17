//Navbar
//Note: When in mobile view, menu automatically "hamburgers".
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import Auth from '../utils/auth'

import { useStateContext } from "../utils/GlobalState";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_GOOGLE_VOLUNTEER } from '../utils/queries'


const navigation = [
  //This create event field needs to be conditionally rendered IF the user logged in is userc
  {name: "Create Event",to: '/EventForm', href:"/EventForm", current:false},
  { name: "Home", to: "/", href: "/",  current: false },
  { name: "Find Opportunities", href: "/discover", current: false },
  { name: "Find Volunteers", href: "/LoginCharity", current: false },
  //CHANGE BACK TO /profile
  { name: "Profile", href: "/charityprofile", current: false },
];
const loggedInNav =[
  { name: "Login", href: "/LoginVolunteer", current: false},
  { name: "Sign Up", href: "/Signup", current: false},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Navbar() {
  const state = useStateContext();
  const [userData, setUserData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(Auth.getProfile()?.data._id);
  const { loading, error, data } = useQuery(QUERY_GOOGLE_VOLUNTEER, {
    variables: {
      _id: userId
    },
    skip: !userId
  })
  
// if user isnt signed up, userData will store to localstorage and update state
  useEffect(()=>{
    setUserData(data?.googleVolunteer);
    if(Auth.loggedIn()){
      setIsLoggedIn(true);
    }
  },[data])

  return (
    <Disclosure as="nav" className="bg-gray-700 sticky absolute top-0">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {isLoggedIn ? navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                       {item.name}
                      </a>
                    )) : navigation.slice(0,4).map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                       {item.name}
                      </a>
                    ))
                    }
                    {!isLoggedIn && loggedInNav.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                       {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {Auth.loggedIn() && 
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>


                
                  <Menu as="div" className="relative ml-3">
                  <div 
                    className="flex"
                  >
                    {userData?.name && 
                    <span
                      className="mr-2"
                    >{userData?.name}</span>}
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        referrerPolicy="no-referrer"
                        src={userData?.picture}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to ="/profile"
                            //href=""
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                  
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                          // we still need to make a signout route?
                            to="/signout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </Link>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
                <div 
                  className="text-sm text-white-700 p-5 cursor-pointer"
                  onClick={()=> Auth.logout()}
                  >Logout
                </div>
              </div>
              }
            </div>
          </div>
{/* Navbar View in Desktop Mode. Navigation items are mapped over and buttons are generated */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => {
                return <Disclosure.Button
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                </Disclosure.Button>
              })}
              {!isLoggedIn && loggedInNav.map((item)=>{
                return <Disclosure.Button
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                </Disclosure.Button>
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
export default Navbar;