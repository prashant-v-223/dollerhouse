import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import uset_img from "../image/uset_img.svg";
import info27 from "../image/svg-image-27.svg";
import svg31viewicon from "../image/svg-image-31.svg";
import bluecircle from "../image/blue-blur.webp";
import icon1 from "../image/icon3.svg";
import logo from "../image/line.svg";
import banner1 from '../image/dh-banner11.svg';
import banner2 from '../image/dh-banner2.svg';
import welcome_benner_card from "../image/1969222.svg"
import svg_wallet_img from "../image/svg-image-23.svg"
import imgsvg24 from "../image/svg-image-24.svg"
import axios from "axios";
import poket_img from "../image/line.svg";
import plashtfiny from "../image/gold-blur.png";
import { useLogin } from "@thirdweb-dev/react";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; import { useParams } from 'react-router-dom';

import Registration from "../component/Registration";
const Landingpage = () => {
  const registrationRef = useRef(null); // Reference to the Registration component
  const wallet_address = useAddress()
  const [showButton, setShowButton] = useState(true);
  const [data, setdata] = useState({});
  let { id } = useParams();
  const [userID, setuserID] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const walletElement = document.querySelector(".tw-connect-wallet");
    if (walletElement) {
      // If .tw-connect-wallet is present, hide the button
      setShowButton(false);
    } localStorage.clear();
  }, [showButton]);
  useEffect(() => {
    getdat()
  }, []);
  const getdat = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let bodyContent = new FormData();

    let response = await axios.get("https://https://dollerhouse111.onrender.com/profit/alltotal-profit", {
      method: "GET",
      body: bodyContent,
      headers: headersList
    });

    let data = await response
    setdata(data);
  }
  console.log("datadatadatadatadata", data);
  const [previewID, setPreviewID] = useState("");
  const [profileData, setprofileData] = useState({});
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    localStorage.setItem("UserID", event.target.value);
  };
  const { contract } = useContract(
    "0xEd8d315f06bfF8B794C5eae75131C7023Fe66e12"
  );


  useEffect(() => {
    (function (html) {
      "use strict";

      const cfg = {
        // Countdown Timer Final Date
        finalDate: "05 June, 2024 00:00:00",
        // MailChimp URL
        mailChimpURL:
          "https://facebook.us1.list-manage.com/subscribe/post?u=1abf75f6981256963a47d197a&amp;id=37c6d8f4d6",
      };

      /* Preloader
       * -------------------------------------------------- */
      const ssPreloader = function () {
        const body = document.querySelector("body");
        const preloader = document.querySelector("#preloader");
        const info = document.querySelector(".s-info");

        if (!(preloader && info)) return;

        html.classList.add("ss-preload");

        window.addEventListener("load", function () {
          html.classList.remove("ss-preload");
          html.classList.add("ss-loaded");

          // page scroll position to top
          preloader.addEventListener("transitionstart", function gotoTop(e) {
            if (e.target.matches("#preloader")) {
              window.scrollTo(0, 0);
              preloader.removeEventListener(e.type, gotoTop);
            }
          });

          preloader.addEventListener(
            "transitionend",
            function afterTransition(e) {
              if (e.target.matches("#preloader")) {
                body.classList.add("ss-show");
                e.target.style.display = "none";
                preloader.removeEventListener(e.type, afterTransition);
              }
            }
          );
        });

        window.addEventListener("beforeunload", function () {
          body.classList.remove("ss-show");
        });
      };

      /* Countdown Timer
       * ------------------------------------------------------ */
      const ssCountdown = function () {
        const finalDate = new Date(cfg.finalDate).getTime();
        const daysSpan = document.querySelector(".counter .ss-days");
        const hoursSpan = document.querySelector(".counter .ss-hours");
        const minutesSpan = document.querySelector(".counter .ss-minutes");
        const secondsSpan = document.querySelector(".counter .ss-seconds");
        let timeInterval;

        if (!(daysSpan && hoursSpan && minutesSpan && secondsSpan)) return;

        function timer() {
          const now = new Date().getTime();
          let diff = finalDate - now;

          if (diff <= 0) {
            if (timeInterval) {
              clearInterval(timeInterval);
            }
            return;
          }

          let days = Math.floor(diff / (1000 * 60 * 60 * 24));
          let hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          let minutes = Math.floor((diff / 1000 / 60) % 60);
          let seconds = Math.floor((diff / 1000) % 60);

          if (days <= 99) {
            if (days <= 9) {
              days = "0" + days;
            } else {
              days = days;
            }
          }

          hours <= 9 ? (hours = "0" + hours) : hours
          minutes <= 9 ? (minutes = "0" + minutes) : minutes
          seconds <= 9 ? (seconds = "0" + seconds) : seconds

          daysSpan.textContent = days;
          hoursSpan.textContent = hours;
          minutesSpan.textContent = minutes;
          secondsSpan.textContent = seconds;
        }

        timer();
        timeInterval = setInterval(timer, 1000);
      };

      /* MailChimp Form
       * ---------------------------------------------------- */
      const ssMailChimpForm = function () {
        const mcForm = document.querySelector("#mc-form");

        if (!mcForm) return;

        // Add novalidate attribute
        mcForm.setAttribute("novalidate", true);

        // Field validation
        function hasError(field) {
          // Don't validate submits, buttons, file and reset inputs, and disabled fields
          if (
            field.disabled ||
            field.type === "file" ||
            field.type === "reset" ||
            field.type === "submit" ||
            field.type === "button"
          )
            return;

          // Get validity
          let validity = field.validity;

          // If valid, return null
          if (validity.valid) return;

          // If field is required and empty
          if (validity.valueMissing) return "Please enter an email address.";

          // If not the right type
          if (validity.typeMismatch) {
            if (field.type === "email")
              return "Please enter a valid email address.";
          }

          // If pattern doesn't match
          if (validity.patternMismatch) {
            // If pattern info is included, return custom error
            if (field.hasAttribute("title")) return field.getAttribute("title");

            // Otherwise, generic error
            return "Please match the requested format.";
          }

          // If all else fails, return a generic catchall error
          return "The value you entered for this field is invalid.";
        }

        // Show error message
        function showError(field, error) {
          // Get field id or name
          let id = field.id || field.name;
          if (!id) return;

          let errorMessage = field.form.querySelector(".mc-status");

          // Update error message
          errorMessage.classList.remove("success-message");
          errorMessage.classList.add("error-message");
          errorMessage.innerHTML = error;
        }

        // Submit the form
        function submitMailChimpForm(form) {
          let url = cfg.mailChimpURL;
          let emailField = form.querySelector("#mce-EMAIL");
          let serialize =
            "&" +
            encodeURIComponent(emailField.name) +
            "=" +
            encodeURIComponent(emailField.value);

          if (url == "") return;

          url = url.replace("/post?u=", "/post-json?u=");
          url += serialize + "&c=displayMailChimpStatus";

          // Create script with url and callback (if specified)
          var ref = window.document.getElementsByTagName("script")[0];
          var script = window.document.createElement("script");
          script.src = url;

          ref.parentNode.insertBefore(script, ref);

          // After the script is loaded (and executed), remove it
          script.onload = function () {
            this.remove();
          };
        }

        // Check email field on submit
        mcForm.addEventListener(
          "submit",
          function (event) {
            event.preventDefault();

            let emailField = event.target.querySelector("#mce-EMAIL");
            let error = hasError(emailField);

            if (error) {
              showError(emailField, error);
              emailField.focus();
              return;
            }

            submitMailChimpForm(this);
          },
          false
        );
      };

      /* Tabs
       * ---------------------------------------------------- */
      const sstabs = function (nextTab = false) {
        const tabList = document.querySelector(".tab-nav__list");
        const tabPanels = document.querySelectorAll(".tab-content__item");
        const tabItems = document.querySelectorAll(".tab-nav__list li");
        const tabLinks = [];

        if (!(tabList && tabPanels)) return;

        const tabClickEvent = function (
          tabLink,
          tabLinks,
          tabPanels,
          linkIndex,
          e
        ) {
          // Reset all the tablinks
          tabLinks.forEach(function (link) {
            link.setAttribute("tabindex", "-1");
            link.setAttribute("aria-selected", "false");
            link.parentNode.removeAttribute("data-tab-active");
            link.removeAttribute("data-tab-active");
          });

          // set the active link attributes
          tabLink.setAttribute("tabindex", "0");
          tabLink.setAttribute("aria-selected", "true");
          tabLink.parentNode.setAttribute("data-tab-active", "");
          tabLink.setAttribute("data-tab-active", "");

          // Change tab panel visibility
          tabPanels.forEach(function (panel, index) {
            if (index != linkIndex) {
              panel.setAttribute("aria-hidden", "true");
              panel.removeAttribute("data-tab-active");
            } else {
              panel.setAttribute("aria-hidden", "false");
              panel.setAttribute("data-tab-active", "");
            }
          });

          window.dispatchEvent(new Event("resize"));
        };

        const keyboardEvent = function (
          tabLink,
          tabLinks,
          tabPanels,
          tabItems,
          index,
          e
        ) {
          let keyCode = e.keyCode;
          let currentTab = tabLinks[index];
          let previousTab = tabLinks[index - 1];
          let nextTab = tabLinks[index + 1];
          let firstTab = tabLinks[0];
          let lastTab = tabLinks[tabLinks.length - 1];

          // ArrowRight and ArrowLeft are the values when event.key is supported
          switch (keyCode) {
            case "ArrowLeft":
            case 37:
              e.preventDefault();

              if (!previousTab) {
                lastTab.focus();
              } else {
                previousTab.focus();
              }
              break;

            case "ArrowRight":
            case 39:
              e.preventDefault();

              if (!nextTab) {
                firstTab.focus();
              } else {
                nextTab.focus();
              }
              break;
          }
        };

        // Add accessibility roles and labels
        tabList.setAttribute("role", "tablist");
        tabItems.forEach(function (item, index) {
          let link = item.querySelector("a");

          // collect tab links
          tabLinks.push(link);
          item.setAttribute("role", "presentation");

          if (index == 0) {
            item.setAttribute("data-tab-active", "");
          }
        });

        // Set up tab links
        tabLinks.forEach(function (link, i) {
          let anchor = link.getAttribute("href").split("#")[1];
          let attributes = {
            id: "tab-link-" + i,
            role: "tab",
            tabIndex: "-1",
            "aria-selected": "false",
            "aria-controls": anchor,
          };

          // if it's the first element update the attributes
          if (i == 0) {
            attributes["aria-selected"] = "true";
            attributes.tabIndex = "0";
            link.setAttribute("data-tab-active", "");
          }

          // Add the various accessibility roles and labels to the links
          for (var key in attributes) {
            link.setAttribute(key, attributes[key]);
          }

          // Click Event Listener
          link.addEventListener("click", function (e) {
            e.preventDefault();
          });

          // Click Event Listener
          link.addEventListener("focus", function (e) {
            tabClickEvent(this, tabLinks, tabPanels, i, e);
          });

          // Keyboard event listener
          link.addEventListener("keydown", function (e) {
            keyboardEvent(link, tabLinks, tabPanels, tabItems, i, e);
          });
        });

        // Set up tab panels
        tabPanels.forEach(function (panel, i) {
          let attributes = {
            role: "tabpanel",
            "aria-hidden": "true",
            "aria-labelledby": "tab-link-" + i,
          };

          if (nextTab) {
            let nextTabLink = document.createElement("a");
            let nextTabLinkIndex = i < tabPanels.length - 1 ? i + 1 : 0;

            // set up next tab link
            nextTabLink.setAttribute("href", "#tab-link-" + nextTabLinkIndex);
            nextTabLink.textContent = "Next Tab";
            panel.appendChild(nextTabLink);
          }

          if (i == 0) {
            attributes["aria-hidden"] = "false";
            panel.setAttribute("data-tab-active", "");
          }

          for (let key in attributes) {
            panel.setAttribute(key, attributes[key]);
          }
        });
      };

      /* Alert Boxes
       * ------------------------------------------------------ */
      const ssAlertBoxes = function () {
        const boxes = document.querySelectorAll(".alert-box");

        boxes.forEach(function (box) {
          box.addEventListener("click", function (event) {
            if (event.target.matches(".alert-box__close")) {
              event.stopPropagation();
              event.target.parentElement.classList.add("hideit");

              setTimeout(function () {
                box.style.display = "none";
              }, 500);
            }
          });
        });
      };

      /* Smooth Scrolling
       * ------------------------------------------------------ */
      const ssMoveTo = function () {
        const easeFunctions = {
          easeInQuad: function (t, b, c, d) {
            t /= d;
            return c * t * t + b;
          },
          easeOutQuad: function (t, b, c, d) {
            t /= d;
            return -c * t * (t - 2) + b;
          },
          easeInOutQuad: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
          },
          easeInOutCubic: function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t * t + b;
            t -= 2;
            return (c / 2) * (t * t * t + 2) + b;
          },
        };

        const triggers = document.querySelectorAll(".smoothscroll");
      };

      /* Initialize
       * ------------------------------------------------------ */
      (function ssInit() {
        ssPreloader();
        ssCountdown();
        ssMailChimpForm();
        sstabs();
        ssAlertBoxes();
        ssMoveTo();
      })();
    })(document.documentElement);
  }, []);

  const handleSearch = () => {
    navigate("/dashboard");
  };

  const { data: Parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "Parent",
    [wallet_address]
  );

  const [UserID, SetUserId] = useState("")
  const GetUserId = async (wallet_address) => {
    try {
      const response = await axios.get(
        `https://dollerhouse111.onrender.com/user/get-user?wallet_id=${wallet_address}`
      );
      console.log(response?.data?.data?.user_id)
      setuserID(response?.data?.data?.user_id);
      setprofileData(response.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (wallet_address === undefined) {
      setuserID(null);
      setprofileData({});
    } else {
      GetUserId(wallet_address)
    }
  }, [wallet_address])


  const handleSearchDashboard = async () => {
    navigate("/dashboard");
  }
  const scrollToRegistration = () => {
    registrationRef.current.scrollIntoView({ behavior: "smooth" });
  };

  function removeAndReplaceMiddleCharacters(str) {
    if (typeof str !== "string" || str.length <= 30) {
      return str;
    }
    const before = str.substring(0, 7);
    const after = str.substring(35); // Remove 30 characters and take the rest
    const replacedMiddle = ".".repeat(5); // Replace 30 characters with 5 asterisks
    return before + replacedMiddle + after;
  }

  const modifiedAddress = removeAndReplaceMiddleCharacters("0x85bd9e2907d4d2cc80f3852e1a123bea8f4d226d");

  const handleCopyReferralLink2 = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = `0x85bd9e2907d4d2cc80f3852e1a123bea8f4d226d`;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    console.log("Copied");
    // Use react-toastify to display a toaster notification
    toast.success("text copied to clipboard!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const saveId = () => {
    localStorage.setItem("UserID", userID);
  }

  return (
    <div id="scrollToTopBtn" className="landingpage_main">
      <ToastContainer />
      <div className="container py-5">
        <div className="main_top_logo">
          <div className="logos_landing">
            <span>
              <img src={logo} alt="logos" className="logolanding" />
            </span>
          </div>

          <div className="smart_chains">
            <div className="smart_chain_1">
              <spna>
                <img
                  src={icon1}
                  alt="smart_chain"
                  className="smart_chain_icon"
                />
              </spna>
              <p>Smart Chain</p>
            </div>

            {/* <div className="connect_btn mobile-connect-button"> */}
            {/* <button> <Link to="/dashboard">Dashboard </Link></button> */}

            {/* </div> */}
          </div>
        </div>
        <div
          className="register_in"
          style={{
            backgroundImage: `url(${plashtfiny})`,
            backgroundSize: "cover",
            justifyContent: 'space-around'
          }}
        >
          <div className="register_right" style={{
            transform: "scaleX(-1)"
          }}>
            <img src={poket_img} alt="pocket_img" className="poket_img" />
          </div>
          <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            {userID === null || userID === undefined ?
            <h1 className="s-intro__content-title">
            Doller house comming soon
            <br />
            05 June, 2024
          </h1> 
            // <div className="register_left w-100">
            //   <h1 className="text-center"> Welcome to Dollar House </h1>
            //   <br />
            //   <div className="join_bth d-block m-auto mt-4">
            //     <ConnectWallet className="d-block m-auto" />
            //     <br />
            //     <button onClick={scrollToRegistration} className="wath_tut d-block m-auto">
            //       Join Doller House
            //     </button>
            //   </div>
            // </div>
             :
            <h1 className="s-intro__content-title">
            Doller house comming soon
            <br />
            05 June, 2024
          </h1>
              // <div className="register_left w-100">
              //   <div className="id_user right_text d-block m-auto w-100 ">
              //     <div className="d-flex align-items-end mt-4 " >
              //       <div className=" ">
              //         <img
              //           className="user_logo ml-0"
              //           src={profileData?.data?.picture || uset_img}
              //           alt="uset_img"
              //           minwidth={130}
              //         />
              //         {profileData?.data?.profile !== null ? (
              //           <h1>
              //             {profileData?.data?.profile.username}
              //           </h1>
              //         ) : (
              //           <h1>User Name</h1>
              //         )}
              //       </div>
              //       <div className="cursor-pointer profile_user_id table_id" >
              //         ID {userID}
              //       </div>
              //     </div>
              //   </div>
              //   <p>
              //     {wallet_address} is a member of  dollerhouse
              //   </p>
              //   <div className="join_bth">
              //     <ConnectWallet className="my-2" />
              //     <button className="my-2">
              //       <Link onClick={saveId} to="/dashboard" className="wath_tut">
              //         Return to you account
              //       </Link>
              //     </button>
              //   </div>
              // </div>
            }
          </div>
          <div className="register_right">
            <img src={poket_img} alt="pocket_img" className="poket_img" />
          </div>
        </div>

        <section id="intro" className="s-intro">
          <div className="column lg-12">
            <div className="s-intro__content-bottom">
              
            </div>
          </div>
          <br />
          <div className="counter"  style={{display:"flex",
    justifyContent: "space-evenly",
    alignContent: "stretch",
    fontSize: "24px"
}} >
            <div className="counter__time">
              <span className="ss-days" style={{ color: "#fff" }}>365</span>
              <span style={{ color: "#fff" }}>days</span>
            </div>
            <div className="counter__time">
              <span className="ss-hours" style={{ color: "#fff" }}>01</span>
              <span style={{ color: "#fff" }}>hours</span>
            </div>
            <div className="counter__time minutes">
              <span className="ss-minutes" style={{ color: "#fff" }}>01</span>
              <span style={{ color: "#fff" }}>mins</span>
            </div>
            <div className="counter__time">
              <span className="ss-seconds" style={{ color: "#fff" }}>55</span>
              <span style={{ color: "#fff" }}>secs</span>
            </div>
          </div>
        </section>
        {/* <div ref={registrationRef}>
          <Registration id={id} />
        </div>
        <div className="doller_house_owl_crousel">
          <div className="container">
            <div id="demo" class="carousel slide" data-ride="carousel">
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <img src={banner1} alt="welcome_benner_card" className="welcome_benner_card" />

                  <img src={banner2} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card2" />

                  <img src={welcome_benner_card} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card3" />
                </div>
                <div class="carousel-item">
                  <img src={banner2} alt="welcome_benner_card" className="welcome_benner_card" />

                  <img src={banner1} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card2" />

                  <img src={welcome_benner_card} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card3" />
                </div>
                <div class="carousel-item">
                  <img src={welcome_benner_card} alt="welcome_benner_card" className="welcome_benner_card" />

                  <img src={banner2} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card2" />

                  <img src={banner1} alt="welcome_benner_card" className="welcome_benner_card welcome_benner_card3" />
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* 
        <div className="Account_preview">
          <div className="account_title">
            <h1>Account preview</h1>
            <p>
              Look up any Dollar House member account in preview mode. Enter ID to
              preview or click Demo to view a random account.
            </p>
          </div>

          <div className="wallwte_input">
            <div className="wall_left w-100">
              <p>Enter User ID</p>

              <div className="previw_input_btn ">
                <input
                  type="number"
                  onChange={handleChange}
                  className="account_input"
                  val=""
                />
                <a href="#scrollToTopBtn">
                  {" "}
                  <button onClick={handleSearch}>Preview</button>
                </a>
              </div>
            </div>
          </div>
        </div> */}

        {/* <div className='recent activity'>
          <div className='container'>
            <div className='forsage_title'>
              <h2>Recent Activity</h2>
              <span className='forsage_info2 px-1'>
                <img src={info27} alt='Info' className='Info27' />
              </span>
            </div>

            <div className='platfroms'>
              <div className='row'>
                <div className='col-lg-12'>
                  <div className='link_section_all'>
                    <h3>Doller House Contracts</h3>

                    <div className='link_contracts'>
                      <span className="text-light" >{modifiedAddress}
                        <span onClick={handleCopyReferralLink2} className='files'><i className="fa fa-files-o" aria-hidden="true"></i></span>
                        <a href="https://mumbai.polygonscan.com/address/0x85bd9e2907d4d2cc80f3852e1a123bea8f4d226d" className='linkIcon'><i className="fa fa-link" aria-hidden="true"></i></a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div className="need_help_section">
          <h1>Need help with using the platform?</h1>
          <p>Get qualified support from Dollar House experts via online chat</p>
          <Link to="https://t.me/dollerhouse"> <button className="contact_suppo">Contact support</button> </Link>
        </div> */}
        <div className="footer">
          <h4>Dollarhouse.All Rights Reserved.2024</h4>
          <div className="social_icon">
            <p><i class="fa fa-instagram" aria-hidden="true"></i></p>
            <p> <Link to="https://t.me/dollerhouse"><i class="fa fa-telegram" aria-hidden="true"></i></Link></p>
            <p><i class="fa fa-twitter" aria-hidden="true"></i></p>
          </div>

          <div className="copy_right_containt">
            <p>
              Trading cryptocurrencies carries a high level of risk, and may not be suitable for all investors. Before deciding to trade cryptocurrency, you should carefully consider
              your investment objectives, level of experience, and risk appetite. The possibility exists that you could sustain a loss of some or all of your initial investment and therefore
              you should not invest money that you cannot afford to lose. You should be aware of all the risks associated with cryptocurrency trading, and seek advice from an
              independent financial advisor. Any opinions, news, research, analyses, prices, or other information contained on this website is provided as general market commentary,
              and does not constitute investment advice. The CUNetwork will not accept liability for any loss or damage, including without limitation to, any loss of profit, which may
              arise directly or indirectly from use of or reliance on such information. All opinions expressed on this site are owned by the respective writer and should never be considered
              as advice in any form. The CUNetwork makes no representation or warranties as to the accuracy and or timelines of the information contained herein. A qualified
              professional should be consulted before making any financial decisions.</p>
          </div>
        </div>
      </div>
    </div >
  );
};

export default Landingpage;
