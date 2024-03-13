import React, { useEffect, useMemo, useState } from "react";
import img6 from "../image/svg-image-6.svg";
import img8 from "../image/svg-image-8.svg";
import img4 from "../image/svg-image-4.svg";
import tiffanysedo from "../image/blue-blur.png";
import Navbar from "../component/Navbar";
import { FaRegCopy } from "react-icons/fa";
import img1 from "../image/line.svg";
import PriviewId from "../component/PriviewId";
import svg_wallet_img from "../image/svg-image-23.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdContentCopy } from "react-icons/md";
import "./style.css";
import { ethers } from "ethers";
import criclesimg from "../image/cycles.svg";
import UsdtIcon from "../image/tether-usdt-seeklogo1.svg";

import { Link } from "react-router-dom";
import {
  ConnectWallet,
  useSDK,
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import Boxs from "./Boxs";

const House5Plan = () => {
  const wallet_address_real = useAddress();
  const [wallet_address, setWalletAddress] = useState(wallet_address_real);
  console.log(wallet_address);

  const copyToClipboard = (invited_member_id) => {
    const textField = document.createElement("textarea");
    textField.innerText = invited_member_id;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
    console.log("Copied");
    toast.success("Address copied to clipboard", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };
  const sumPlanDetailsAmount = (item) => {
    if (item.result && item.result.length > 0) {
      const planDetails = item.result[0].plan_details;
      if (planDetails && planDetails.length > 0) {
        return planDetails.reduce((acc, curr) => {
          switch (curr.amount) {
            case 20:
              curr.subamount = 5;
              break;
            case 40:
              curr.subamount = 10;
              break;
            case 100:
              curr.subamount = 30;
              break;
            case 200:
              curr.subamount = 60;
              break;
            case 500:
              curr.subamount = 120;
              break;
            case 1000:
              curr.subamount = 250;
              break;
            case 2000:
              curr.subamount = 500;
              break;
            case 4000:
              curr.subamount = 1000;
              break;
            default:
              curr.subamount = 0;
              break;
          }
          return acc + curr.subamount; // Add subamount to accumulator
        }, 0);
      }
    }
    return 0; // Return 0 if there are no plan_details or no amount in plan_details
  };

  // const wallet_address = userDataReal?.data?.wallet_address;

  const [tableData, setTableData] = useState("");
  const [color, setColor] = useState("");
  const [previewID, setPreviewID] = useState("");

  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const { contract } = useContract(
    "0x642ba5BEF7030FD665b671E12090268086EFF1eC"
  );
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );

  const numberOfElements = 10; // Change this to the desired number of elements
  const { data: getThePlansCount, isLoading: isPlanCountLoading } =
    useContractRead(contract, "getThePlanCount", [
      wallet_address,
      ethers.utils.parseEther("1000"),
    ]);

  const result1000 = getThePlansCount;
  const box1000 = Number(result1000 && result1000?._hex);
  const blueElements1000 = Array.from({ length: box1000 }).map((_, index) => (
    <h3
      key={index}
      className={
        index < box1000 ? "forsage_detail_box" : "forsage_blue other_box"
      }
    >
      {index < tableData.length ? tableData[index].user_id : null}{" "}
      {/* Assuming TableData contains the data you want to display */}
    </h3>
  ));

  const userDataReal = localStorage.getItem("UserID");
  var UserID = JSON.parse(userDataReal);

  const [count, setCount] = useState(0);
  const [house5Plan, setHouse5Plan] = useState([]);
  const [house5Plan1, setHouse5Plan1] = useState([]);
  const [house5Plan2, setHouse5Plan2] = useState([]);
  const fetchUserData = async (UserID, leval) => {
    try {
      const response = await fetch(
        `http://localhost:3100/team/leval5-member/${UserID}/${leval}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      // setHouse5Plan(data?.data);
      console.log("data?.datadata?.datadata?.data", data);
      setHouse5Plan(data?.data);
      setHouse5Plan2(data?.filteredDatalastwor);
      setHouse5Plan1(data?.data1);
      setColor(data?.color);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const memoizedHouse5Plan = useMemo(() => {
    // Your logic to calculate the value of house5Plan goes here
    return house5Plan;
  }, [house5Plan]);
  console.log("house5Plan1[0]?.referBY", memoizedHouse5Plan);
  const [house5PlanSingle, setHouse5PlanSingle] = useState(null);
  const fetchUserDataSingle = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3100/team/single-member?userId=${id}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setHouse5PlanSingle(data?.data.refferal_details);
      setWalletAddress(data?.data.wallet_id);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchUserData(UserID, count);
  }, [count]);
  // useEffect(() => {
  //   window.location.reload();
  // }, [house5Plan1])

  const leftsaid = () => {
    return (
      <div className="circle_preview_5_left ">
        <div className="circle_pre_1_1">
          <h4 >
            {memoizedHouse5Plan?.length > 1 && memoizedHouse5Plan[1]?.uid || 0}
          </h4>
        </div>
        <div className="circle_pre_1_2">
          <h4
          >
            {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[0]?.uid || 0}
          </h4>
          <h4
          >
            {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[1]?.uid || 0}
          </h4>
        </div>
        <div className="circle_pre_1_3">
          {[1, 2].map((el, index) => {
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[0]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[1]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
        </div>
        <div className="circle_pre_1_4">
          {[1, 2].map((el, index) => {
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[0]?.depthData[0]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[0]?.depthData[1]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[1]?.depthData[0]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[1]?.depthData[1]?.depthData[1]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
        </div>
        <div className="circle_pre_1_6">
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[0]?.depthData[0]?.depthData[0]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[0]?.depthData[0]?.depthData[1]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[0]?.depthData[1]?.depthData[0]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[0]?.depthData[1]?.depthData[1]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[1]?.depthData[0]?.depthData[0]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[1]?.depthData[0]?.depthData[1]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[1]?.depthData[1]?.depthData[0]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[1]?.depthData[1]?.depthData[1]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
        </div>
      </div>
    )
  }
  const Rightsaid = () => {
    return (
      <div className="circle_preview_5_left ">
        {/* {house5Plan?.map((el) => {
        if (el?.depthleval === 0) {
          return (
            <> */}
        <div className="circle_pre_1_1">
          <h4 >
            {memoizedHouse5Plan?.length > 0 && memoizedHouse5Plan[0]?.uid || 0}
          </h4>
        </div>
        <div className="circle_pre_1_2">
          <h4
          >
            {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[0]?.uid || 0}
          </h4>
          <h4
          >
            {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[1]?.uid || 0}
          </h4>
        </div>
        <div className="circle_pre_1_3">
          {[1, 2].map((el, index) => {
            return (
              <h4

              >
                {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[0]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            return (
              <h4

              >
                {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[1]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
        </div>
        <div className="circle_pre_1_4">
          {[1, 2].map((el, index) => {
            console.log(memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[1]?.depthData);
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[0]?.depthData[0]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            return (
              <h4

              >
                {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[0]?.depthData[1]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            return (
              <h4

              >
                {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[1]?.depthData[0]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            console.log(memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[1]?.depthData[0]);
            return (
              <h4
              >
                {memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[1]?.depthData[1]?.depthData[index]?.uid || "0"}
              </h4>)
          })}
        </div>
        <div className="circle_pre_1_6">
          {[1, 2].map((el, index) => {
            const referredIndex = memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[0]?.depthData[0]?.depthData[0]?.referred[index]

            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === referredIndex);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const referredIndex = memoizedHouse5Plan && memoizedHouse5Plan[0]?.depthData[0]?.depthData[0]?.depthData[1]?.referred[index]
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === referredIndex);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[0]?.depthData[0]?.depthData[1]?.depthData[0]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[0]?.depthData[0]?.depthData[1]?.depthData[1]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[0]?.depthData[1]?.depthData[0]?.depthData[0]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[0]?.depthData[1]?.depthData[0]?.depthData[1]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
          {[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[0]?.depthData[1]?.depthData[1]?.depthData[0]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}{[1, 2].map((el, index) => {
            const filteredDatalastwor = house5Plan2?.filter(item => item.refId === memoizedHouse5Plan[1]?.depthData[1]?.depthData[1]?.depthData[1]?.referred[index]);
            return (
              <h4 >
                {filteredDatalastwor && filteredDatalastwor[0]?.uid || 0}
              </h4>)
          })}
        </div>
      </div>
    )
  }
  return (
    <React.Fragment>
      <div className="container">
        <ToastContainer />
      </div>
      <Navbar />
      <div className="content">
        <div className="container">
          <div className="forsgae1_main">
            <div className="forsage_title2">
              <div className="preview_card_pogram_title">
                <h3>
                  {" "}
                  <span>Dollar house 5 </span> Plan
                </h3>
                <p>You can view the details of your House 1 Plan </p>
              </div>
            </div>
            <div className="forsage_prive_center_btn">
              <div className="previews_btn_forsage" onClick={() => {
                setCount((co) => {
                  return co - 1;
                });
              }}>
                <button>Previous</button>
              </div>
              <div className="center_contant_forsage">
                <div className="forsgae_level_card">
                  <div className="level_title">
                    <h4>House 5 Plan <br /> leval:{"  "}{count + 1}</h4>
                    <h1>
                      00
                      <span>
                        <img
                          src={UsdtIcon}
                          className="usdt_icon_slot"
                          alt="icon_usdt"
                        />
                      </span>
                    </h1>
                  </div>
                  {/* <Boxs box={box50} tableData={tableData} /> */}

                  <div className="circle_preview_5">
                    {Rightsaid()}
                    {leftsaid()}
                  </div>

                  <div className="cycle_name">
                    <div className="cycle_name_left">
                      <div className="partners">
                        <p>Partners</p>
                        <h5>
                          <span>
                            <img
                              src={img6}
                              alt="user_icon"
                              className="userd_icon"
                            />
                          </span>
                          {/* {Number(result50)} */}
                        </h5>
                      </div>

                      <div className="partners">
                        <p>Cycles</p>
                        <h5>
                          <span>
                            <img
                              src={criclesimg}
                              alt="user_icon"
                              className="userd_icon"
                            />
                          </span>
                          {/* {Number(result50)} */}
                        </h5>
                      </div>
                    </div>

                    <div className="Total_revenue">
                      <p>Total revenue</p>
                      <h1>
                        00
                        <span>
                          <img
                            src={UsdtIcon}
                            className="usdt_icon_slot ml-2"
                            alt="icon_usdt"
                          />
                        </span>
                      </h1>
                      {/* <span><img src={img4} alt='user_icon' className='userd_icon' /></span> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="previews_btn_forsage" onClick={() => {
                setCount((co) => {
                  return co + 1;
                });
              }}>
                <button>Next</button>
              </div>
            </div>

            <div className="tabls">
              <table className="table">
                <thead>
                  <tr>
                    <th className="text-center">Level</th>
                    <th className="text-center">Reward</th>
                    <th className="text-center">Reward Value</th>
                    <th className="text-center">Wallet Id</th>
                    <th className="text-center">User Id</th>
                    <th className="text-center">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {house5Plan1 &&
                    house5Plan1[0]?.referBY?.sort((a, b) => a.depthleval - b.depthleval)?.map((item, index) => {
                      let parse = item.depthleval + 1 === 1 ? 0 : item.depthleval + 1 === 2 ? 10 : item.depthleval + 1 === 3 ? 20 : item.depthleval + 1 === 4 ? 20 : item.depthleval + 1 === 5 ? 50 : 0
                      return (<tr key={index}>
                        <td>
                          {item.status ? (
                            <img
                              src="/up-arrow.png"
                              className="wallet_icon_last upline_arrow"
                            />
                          ) : (
                            <img
                              src={svg_wallet_img}
                              alt="wallet"
                              className="wallet_icon_last "
                            />
                          )}
                          {item.depthleval + 1}
                        </td>
                        <td>{5 * parse / 100}</td>
                        <td className="text-center">
                          {item.refId.slice(0, 4)}...{" "}
                          {item.refId.slice(-4)}
                          <button
                            className="border-0 text-white bg-transparent"
                            onClick={() => {
                              copyToClipboard(item.refId);
                            }}
                          >
                            <FaRegCopy />
                          </button>
                        </td>
                        <td className="status_row">
                          {item.status ? (
                            "Sent to Upline"
                          ) : (
                            <p className="recieved_status">Received</p>
                          )}
                        </td>
                        <td>
                          <span className="table_id">ID{item.uid}</span>
                        </td>

                        <td className="text-center">
                          {/* {new Date(item.result[0].createdAt).toLocaleString()} */}
                        </td>
                      </tr>)
                    })}
                </tbody>
              </table>
            </div>
          </div>

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
                Trading cryptocurrencies carries a high level of risk, and may
                not be suitable for all investors. Before deciding to trade
                cryptocurrency, you should carefully consider your investment
                objectives, level of experience, and risk appetite. The
                possibility exists that you could sustain a loss of some or all
                of your initial investment and therefore you should not invest
                money that you cannot afford to lose. You should be aware of all
                the risks associated with cryptocurrency trading, and seek
                advice from an independent financial advisor. Any opinions,
                news, research, analyses, prices, or other information contained
                on this website is provided as general market commentary, and
                does not constitute investment advice. The CUNetwork will not
                accept liability for any loss or damage, including without
                limitation to, any loss of profit, which may arise directly or
                indirectly from use of or reliance on such information. All
                opinions expressed on this site are owned by the respective
                writer and should never be considered as advice in any form. The
                CUNetwork makes no representation or warranties as to the
                accuracy and or timelines of the information contained herein. A
                qualified professional should be consulted before making any
                financial decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment >
  );
};

export default House5Plan;