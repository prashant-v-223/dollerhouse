import green_cricle_img from "../image/activity_green.webp";
import img1 from "../image/line.svg";
import axios from "axios";
import { stakecontract, stake_abi } from "./contract.js";
import uset_img from "../image/uset_img.svg";
import { IoIosCloseCircle } from "react-icons/io";
import achievements_cupImg from "../image/svg-image-25.svg";
import img26 from "../image/svg-image-26.svg";
import { MdContentCopy } from "react-icons/md";
import bgbnb from "../image/hbanner1.png";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import UsdtIcon from "../image/tether-usdt-seeklogo1.svg";
import privewupicon from "../image/privew_up_icon.svg";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useState, useEffect, useRef } from "react";
import welcome_benner_card from "../image/1969222.svg";
import banner1 from "../image/dh-banner11.svg";
import banner2 from "../image/dh-banner2.svg";
import { CardData } from "./CardData.js";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading.js";

const Dashboard = () => {
  const [BuyTokenLoading, setBuyTokenLoading] = useState(false);
  const [refferal, setRefferal] = useState();
  const [profileData, setProfileData] = useState(null);
  const [profilePopup, setProfilePopup] = useState(false);
  const [previewID, setPreviewID] = useState("");

  const [profitDetails, setProfitDetails] = useState("");
  const [planDetails, setPlanDetails] = useState();
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const sdk = useSDK();

  const wallet_address = useAddress()

  const [walletAddress, setWalletAddress] = useState(wallet_address)

  const userDataReal = localStorage.getItem("UserID");
  var UserID = JSON.parse(userDataReal);

  const [main_user_id, setUser_id] = useState(UserID);
  const [user_id, setUser_id1] = useState(0);
  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  // Get User ID by wallet_address
  const [time, setTime] = useState(null);

  const user = async () => {
    try {
      const response = await axios.get(
        `https://alert-plum-pigeon.cyclic.app/user/get-user?wallet_id=${walletAddress}`
      );

      console.log(response.data.data);
      setTime(response.data.data.createdAt);
      console.log(response.data.data.createdAt);
      setRefferal(response.data.data.parent_details.wallet_id);
      user1(response.data.data.parent_details.wallet_id);
      setUser_id(response.data.data.user_id);
      console.log("response.data.data.parent_details.wallet_id", response.data.data.parent_details.wallet_id);
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    if (walletAddress) {
      user();

    }
  }, [walletAddress]);
  const user1 = async (w) => {
    try {
      const response = await axios.get(
        `https://alert-plum-pigeon.cyclic.app/user/get-user?wallet_id=${w}`
      );

      setUser_id1(response.data.data.user_id);

      localStorage.setItem("UPlineUserID", JSON.stringify(response.data.data.user_id));
    } catch (err) {
      //console.log(err);
    }
  };
  const dateTime = new Date(time);
  const day = dateTime.getDate();
  const month = dateTime.getMonth() + 1; // Month is zero-indexed
  const year = dateTime.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;

  // Profit Details by ID
  const profitDetailsApi = async (main_user_id) => {
    try {
      const response = await axios.get(
        `https://alert-plum-pigeon.cyclic.app/profit/total-profit?userId=${main_user_id}`
      );
      setProfitDetails(response.data.data);
    } catch (err) {
      //console.log(err);
    }
  };
  useEffect(() => {
    if (main_user_id !== "") {
      profitDetailsApi(main_user_id);
    }
  }, []);

  function removeAndReplaceMiddleCharacters(str) {
    if (typeof str !== "string" || str.length <= 30) {
      return str;
    }
    const before = str.substring(0, 7);
    const after = str.substring(35); // Remove 30 characters and take the rest
    const replacedMiddle = ".".repeat(5); // Replace 30 characters with 5 asterisks
    return before + replacedMiddle + after;
  }

  const modifiedAddress = removeAndReplaceMiddleCharacters(walletAddress);
  const modifiedAddress1 = removeAndReplaceMiddleCharacters(
    refferal
  );

  let ref = "0x7a343FF69aE56cb8bf799dCBedACfe41a1434162";
  const handleBuyPlan = async (plan_name, plan_price) => {
    setLoading(true);
    try {
      //console.log("Inside try block")
      const response = await fetch("https://alert-plum-pigeon.cyclic.app/plan/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: walletAddress,
          refferal: refferal,
          plan_details: [
            {
              amount: plan_price,
              plan_name: plan_name,
              type: "registration",
            },
          ],
        }),
      });
      PostHouse5Plan(plan_price);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const PostHouse5Plan = async (plan_price) => {
    setLoading(true);
    try {
      const response = await fetch("https://alert-plum-pigeon.cyclic.app/team/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: walletAddress,
          refferal_id: ref,
          amount: plan_price,
        }),
      });
      const data = await response.json();
      console.log(data);
      setLoading(false);
      toast.success("Tokens Bought Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error fetching user details:", error);
      setLoading(false);
    }
  };

  const buyToken = async (plan_name, plan_price) => {
    setBuyTokenLoading(true);
    console.log(plan_name, plan_price);

    try {
      let tierplan = ethers.utils.parseEther(plan_price);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(stakecontract, stake_abi, signer);
        const token = await contract.buyTokens(ref, tierplan);
        console.log(token);
        const receipt = await token.wait();
        if (receipt.status === 1) {
          handleBuyPlan(plan_name, plan_price);
          toast.success(`Registration Successfull for ${plan_price}$`, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setBuyTokenLoading(false);
    } catch (err) {
      setBuyTokenLoading(false);
      toast.error("You can not buy more than $1000 in one transaction", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFileChange = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("wallet_id", walletAddress.toLowerCase());
    formData.append("filename", "Test");
    try {
      const response = await axios.post(
        "https://alert-plum-pigeon.cyclic.app/profile/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      fetchProfile(walletAddress);
      toast.success("Profile Submitted", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setProfilePopup(false);
      setMessage("Profile picture uploaded successfully!");
    } catch (error) {
      console.error("Error uploading profile picture: ", error);
      setMessage("Error uploading profile picture. Please try again.");
    }
  };

  const handleCopyReferralLink = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = walletAddress;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    console.log("Copied");
    // Use react-toastify to display a toaster notification
    toast.success("Wallet Address copied to clipboard!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleCopyReferralLink2 = () => {
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = `https://dollerhouse.vercel.app/${walletAddress?.toLowerCase()}`;
    document.body.appendChild(tempTextArea);
    tempTextArea.select();
    document.execCommand("copy");
    document.body.removeChild(tempTextArea);
    console.log("Copied");
    // Use react-toastify to display a toaster notification
    toast.success("Referral link copied to clipboard!", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };


  // Get Plan Detail and Wallet wallet_address
  const GetPlanDetail = async (main_user_id) => {
    try {
      const response = await fetch(
        `https://alert-plum-pigeon.cyclic.app/plan/get-plan?userid=${main_user_id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlanDetails(data.data.plan_details);
      setWalletAddress(data.data.wallet_id);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    GetPlanDetail(main_user_id);
  }, [main_user_id]);


  // fetch Profile Data

  const fetchProfile = async (wallet) => {
    try {
      const response = await fetch(
        `https://alert-plum-pigeon.cyclic.app/profile/get-profile?wallet_id=${wallet}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  useEffect(() => {
    fetchProfile(walletAddress?.toLowerCase());
  }, [walletAddress]);

  const handleProfileFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
    fetchProfile(walletAddress);
  };

  // console.log(profileData);
  const checkAmount = (amount) => {
    for (let i = 0; i < planDetails?.length; i++) {
      if (planDetails[i].amount == amount) {
        return true;
      }
    }
    return false;
  };

  const [totalInvestMent, setTotalInvestMent] = useState("")

  useEffect(() => {
    const sumOfAmounts = planDetails?.reduce((acc, item) => acc + Number(item.amount), 0);

    setTotalInvestMent(sumOfAmounts);
  }, [planDetails])
  const handleSearch = () => {
    profitDetailsApi(previewID);
    GetPlanDetail(previewID);
    // fetchProfile(walletAddress);
    localStorage.setItem("UserID", JSON.stringify(previewID));
  };


  const searchParentData = (ID) => {
    localStorage.setItem("UserID", JSON.stringify(ID));
    window.location.reload();
  }

  return (
    <React.Fragment>
      {loading && <Loading />}
      <div className={loading && "opacity_manage"}>
        <div>
          {profilePopup && (
            <div className="profile_main_div relative">
              <button
                className="close_button_popup"
                onClick={() => {
                  setProfilePopup(false);
                }}
              >
                <IoIosCloseCircle />
              </button>
              <h3 className="heading">Edit Profile</h3>
              <form onSubmit={handleProfileFormSubmit} className="profile_form">
                <input
                  type="text"
                  placeholder="Username"
                  onChange={handleUsernameChange}
                />
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
        <div className={`${profilePopup ? "opacity_profile" : ""}`}>
          <div className="container ">
            <div className="pre_Id">
              <div className="pri_id_cnct_btn">
                <div className="pri_id_img">
                  <img src={img1} alt="logo" className="logoimg_priview" />
                  <p>Preview ID</p>
                  <div className="input_btn desktop_search_field">
                    <input
                      value={previewID}
                      type="number"
                      onChange={handleChange}
                      className="input_NUmber"
                      placeholder="Preview ID"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        handleSearch();
                      }}
                    >
                      Search
                    </button>
                  </div>
                </div>
                {/* <div className="connect_btn desktop_connect_button">
            <ConnectWallet />
          </div> */}
              </div>
            </div>
          </div>
          <Navbar />

          <ToastContainer />
          <div className="content">
            <div className="container">
              <div className="personal_user">
                <div className="row">
                  <div className="col-lg-6 profile-section">
                    <div className="personal_user_left">
                      <div className="unknowuser_img d-block m-auto">
                        <img
                          onClick={() => {
                            setProfilePopup(!profilePopup);
                          }}
                          className="user_logo  ml-0 ml-md-4"
                          src={uset_img}
                          alt="uset_img"
                          minwidth={130}
                        />

                        {/* <img onClick={()=> setIsModalOpen(true)} className="edit_icon" src="/pen.png" /> */}
                      </div>
                      <div className="id_user right_text d-block m-auto w-100 px-2 px-md-4">
                        <div className="d-flex justify-content-between mt-4" >
                          <div className=" ">
                            <h4 className="text-light m-0">User Name</h4>
                          </div>
                          <div className="profile_user_id table_id">
                            ID {UserID}
                          </div>
                        </div>
                        <p
                          style={{
                            width: "100%",
                            fontSize: "13px",
                            justifyContent: "space-between !important;",
                            display: "flex"
                          }}
                          className="justify-content-between mt-3 mb-2" >
                          {modifiedAddress}{" "}
                          {modifiedAddress && (
                            <MdContentCopy
                              className="cursor-pointer copy-button"
                              onClick={handleCopyReferralLink}
                              style={{
                                width: "20px",
                                height: "20px",
                                marginLeft: "10px",
                              }}
                            />
                          )}
                        </p>
                        <div className="justify-content-between" style={{ display: "flex" }}>
                          <span
                            className="id_bg id_user_top parent_address "
                            style={{ width: "180px", fontSize: "13.75px" }}
                          >
                            {`
                       ${modifiedAddress1
                                ? `Invited at ${formattedDate} by ${modifiedAddress1}`
                                : "Invited 01.03.2021 By"
                              }`}
                          </span>
                          <span style={{ marginTop: "22px" }}>
                            {refferal && (
                              <span onClick={() => { searchParentData(user_id) }} className="cursor-pointer profile_user_id table_id">
                                ID {user_id}
                              </span>
                            )}
                          </span>
                        </div>
                        {/* <img src={img21copy} className='img21copy' alt='copy'/> */}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div className="personal_user_right stack-personal-user">
                      <div
                        className="frgx"
                      // style={{
                      //   backgroundImage: `url(${frgx})`,
                      //   backgroundSize: "cover",
                      // }}
                      >
                        <div className="login_to_show">
                          <p>Personal link</p>
                          <div className="personal_link_desbord">
                            <h4 className="stacked_value copy_address">
                              https://dollerhouse.vercel.app/
                              <br />  {modifiedAddress?.toLowerCase().split(0, 10)}
                            </h4>
                            <button onClick={handleCopyReferralLink2} className="personal_link_copy_a">Copy</button>
                          </div>
                        </div>
                      </div>

                      <div className=" bgbnb">
                        <img src={bgbnb} />
                        {/* <div className="login_to_show">
                      <p>BNB Balance</p>
                      <h4 className="stacked_value">{bnbStakeValue ? parseFloat(bnbStakeValue).toFixed(4) : "0.00"} BNB</h4>
                    </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="partners_card_section">
              <div className="container">
                <div className="row">
                  <div className="card_section2_all">
                    <div className="card_section2_left">
                      <div
                        className="teams_all_card teams_all_card2"
                      // style={{
                      //   backgroundImage: `url(${Partners})`,
                      //   backgroundSize: "cover",
                      // }}
                      >
                        <p className="card_title">Direct Team</p>
                        <h1>{profitDetails ? profitDetails?.directTeam : 0}</h1>
                        <div className="part_green_down">
                          <div className="down_green">
                            <p>
                              {" "}
                              <span className="toparrow">
                                <i
                                  className="fa fa-long-arrow-up"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </p>
                          </div>

                          <div className="green_cricle">
                            <img
                              src={green_cricle_img}
                              className="green_cricle_img"
                              alt="green_cricle_img"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="teams_all_card teams_all_card2"
                      // style={{
                      //   backgroundImage: `url(${team})`,
                      //   backgroundSize: "cover",
                      // }}
                      >
                        <p className="card_title">Total Team</p>
                        <h1>{profitDetails ? profitDetails?.total_team : 0}</h1>
                        <div className="part_green_down">
                          <div className="down_green">
                            <p>
                              {" "}
                              <span className="toparrow">
                                <i
                                  className="fa fa-long-arrow-up"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              {profitDetails && profitDetails?.recentTeam}
                            </p>
                          </div>

                          <div className="green_cricle">
                            <img
                              src={green_cricle_img}
                              className="green_cricle_img"
                              alt="green_cricle_img"
                            />
                          </div>
                        </div>
                      </div>

                      <div
                        className="teams_all_card teams_all_card2"
                      //  style={{ backgroundImage: `url(${Ratio})`, backgroundSize: 'cover' }}
                      >
                        <p className="card_title">Ratio</p>
                        <h1 className="text-green-500">
                          {profitDetails && ((profitDetails?.overAllProfit / totalInvestMent) * 100).toFixed(4)}%
                        </h1>
                      </div>
                    </div>

                    <div className="card_section2_right">
                      <div
                        className="teams_all_card teams_all_card3"
                      // style={{
                      //   backgroundImage: `url(${Profits})`,
                      //   backgroundSize: "cover",
                      // }}
                      >
                        <p className="card_title">Over All Profit</p>
                        <div className="Profits-number">
                          <div className="pro_num">
                            <h1>
                              {profitDetails ? profitDetails?.overAllProfit : 0}
                            </h1>
                            <p>
                              {" "}
                              <span className="toparrow">
                                <i
                                  className="fa fa-long-arrow-up"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </p>
                          </div>

                          {/* <div className="pro_num">
                      <h1>
                        {result2 && result2 !== "NaN" ? result2 : "0.00"} MJC
                      </h1>
                      <p>
                        <span className="toparrow">
                          <i
                            className="fa fa-long-arrow-up"
                            aria-hidden="true"
                          ></i>
                        </span>
                        {recentProfitMJC && recentProfitMJC !== "NaN"
                          ? recentProfitMJC
                          : "0.00"}{" "}
                        MJC
                      </p>
                    </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="archivment_img">
              <div className="container">
                <div className="achievements_cup">
                  <div className="achievements_cupImg">
                    <img
                      src={achievements_cupImg}
                      alt="achievements_cupImg"
                      className="achievements_cupImg"
                    />
                    <img
                      src={achievements_cupImg}
                      alt="achievements_cupImg"
                      className="achievements_cupImg"
                    />
                    <img
                      src={achievements_cupImg}
                      alt="achievements_cupImg"
                      className="achievements_cupImg"
                    />
                    <img
                      src={achievements_cupImg}
                      alt="achievements_cupImg"
                      className="achievements_cupImg"
                    />
                  </div>

                  <div className="archivment_show">
                    <a href="#">
                      Show all{" "}
                      <span className="rightarrow">
                        <img
                          src={img26}
                          alt="rightarrow"
                          className="rightarrow26"
                        />
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="doller_house_owl_crousel">
              <div className="container">
                <div id="demo" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <img
                        src={banner1}
                        alt="welcome_benner_card"
                        className="welcome_benner_card"
                      />

                      <img
                        src={banner2}
                        alt="welcome_benner_card"
                        className="welcome_benner_card welcome_benner_card2"
                      />

                      <img
                        src={welcome_benner_card}
                        alt="welcome_benner_card"
                        className="welcome_benner_card welcome_benner_card3"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src={banner2}
                        alt="welcome_benner_card"
                        className="welcome_benner_card"
                      />

                      <img
                        src={banner1}
                        alt="welcome_benner_card"
                        className="welcome_benner_card welcome_benner_card2"
                      />

                      <img
                        src={welcome_benner_card}
                        alt="welcome_benner_card"
                        className="welcome_benner_card welcome_benner_card3"
                      />
                    </div>
                    <div class="carousel-item">
                      <img
                        src={welcome_benner_card}
                        alt="welcome_benner_card"
                        className="welcome_benner_card"
                      />

                      <img
                        src={banner2}
                        alt="welcome_benner_card"
                        className="welcome_benner_card welcome_benner_card2"
                      />

                      <img
                        src={banner1}
                        alt="welcome_benner_card"
                        className="welcome_benner_card welcome_benner_card3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="preview_by_doller_program">
              <div className="container p-0">
                <div className="preview_card_pogram_title">
                  <h3>
                    {" "}
                    <span>Dollar house</span> programs
                  </h3>
                </div>

                <div className="privew_card_container_main">
                  {CardData.map((item, index) => (
                    <div className="relative privew_card_sub mx-2">
                      <div
                        key={index}
                        className={
                          checkAmount(item.plan_price) ? "" : "opacity_down"
                        }
                      >
                        <div className="slot_title_and_price">
                          <div className="slot_price">
                            <h4>{item.slotName}</h4>
                          </div>
                          <div className="slot_price_carf_t">
                            <h4>{item.mainPrice}</h4>
                            <p>
                              <img
                                src={UsdtIcon}
                                className="usdt_icon_slot"
                                alt="icon_usdt"
                              />
                            </p>
                          </div>
                        </div>
                        <div className="slot_all_price_and_priviews">
                          <div className="all_slot">
                            <h5>{item.price1}</h5>
                            <h5>{item.price2}</h5>
                            <h5>{item.price3}</h5>
                          </div>
                          {checkAmount(item.plan_price) && (
                            <div className="slot_privew_btn">
                              <Link to={`/slot-${item.slotId}`}>
                                Preview{" "}
                                <span>
                                  <img
                                    src={privewupicon}
                                    alt="upicons_privew"
                                    className="upicons_privew"
                                  />
                                </span>
                              </Link>
                            </div>
                          )}
                        </div>
                      </div>
                      {!checkAmount(item.plan_price) ? (
                        <div className="slot_privew_btn slot_privew_btn_center">
                          <button
                            onClick={() => {
                              handleBuyPlan(item.plan_name, item.plan_price);
                            }}
                          >
                            Upgrade
                            <span>
                              <img
                                src={privewupicon}
                                alt="upicons_privew"
                                className="upicons_privew"
                              />
                            </span>
                          </button>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="container">
              <div className="footer">
                <h4>Dollarhouse.All Rights Reserved.2024</h4>
                <div className="social_icon">
                  <p>
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                  </p>
                  <p>
                    <i class="fa fa-telegram" aria-hidden="true"></i>
                  </p>
                  <p>
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                  </p>
                </div>

                <div className="copy_right_containt">
                  <p>
                    Trading cryptocurrencies carries a high level of risk, and
                    may not be suitable for all investors. Before deciding to
                    trade cryptocurrency, you should carefully consider your
                    investment objectives, level of experience, and risk
                    appetite. The possibility exists that you could sustain a
                    loss of some or all of your initial investment and therefore
                    you should not invest money that you cannot afford to lose.
                    You should be aware of all the risks associated with
                    cryptocurrency trading, and seek advice from an independent
                    financial advisor. Any opinions, news, research, analyses,
                    prices, or other information contained on this website is
                    provided as general market commentary, and does not
                    constitute investment advice. The CUNetwork will not accept
                    liability for any loss or damage, including without
                    limitation to, any loss of profit, which may arise directly
                    or indirectly from use of or reliance on such information.
                    All opinions expressed on this site are owned by the
                    respective writer and should never be considered as advice
                    in any form. The CUNetwork makes no representation or
                    warranties as to the accuracy and or timelines of the
                    information contained herein. A qualified professional
                    should be consulted before making any financial decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;