import styles from "../styles/Profile.module.css";
import { useParams } from "react-router-dom";
import React from "react";
import { QUERY_CHARITY } from "../utils/queries";
import { useQuery } from "@apollo/client";

const CharityProfile = () => {
  let { id } = useParams();

  const { loading, error, data } = useQuery(QUERY_CHARITY, {
    variables: {
      _id: id,
    },
  });

  const charity = data?.charity;

  return (
    <div>
      <section className={styles.mainContainer}>
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4 flex justify-center">
                  <div className="">
                    <img
                      alt=""
                      src={charity.image}
                      className="shadow-xl rounded-full h-auto align-middle border-none  -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                    ></img>
                  </div>
                </div>
                {/* ----------------------- ICONS ------------------------- */}
                <div className="w-full px-4 justify-center mt-20">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center items-center ">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <a href={charity.website}>
                            <button
                              type="button"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </a>
                        </div>
                      </div>
                      <span className="text-sm text-blueGray-400">
                        Website
                      </span>

                    </div>
                    <div className="mr-4 p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <a href={charity.instagram}>
                            <button
                              type="button"
                              data-te-ripple-init
                              data-te-ripple-color="light"
                              className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-4 w-4"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </button>
                          </a>
                        </div>
                      </div>
                      <span className="text-sm text-blueGray-400">
                        Instagram
                      </span>

                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <div className="flex justify-center space-x-2">
                        <div>
                          <a href={charity.facebook}>
                          <button
                            type="button"
                            data-te-ripple-init
                            data-te-ripple-color="light"
                            className="inline-block rounded-full bg-primary p-2 uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4"
                            >
                              <path
                                fillRule="evenodd"
                                d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15zm-6.75-10.5a.75.75 0 00-1.5 0v4.19l-1.72-1.72a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06 0l3-3a.75.75 0 10-1.06-1.06l-1.72 1.72V10.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                          </a>
                        </div>
                      </div>
                      <span className="text-sm text-blueGray-400">
                       Facebook
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {charity.charityName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {charity.address}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {charity.phoneNumber}
                </div>
                {/* <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  Website
                </div> */}
              </div>
              <div className="mt-10 py-5 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center flex-col items-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p>{charity.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CharityProfile;
