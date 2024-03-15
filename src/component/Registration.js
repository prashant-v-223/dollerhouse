import plashtfiny from "../image/gold-blur.png";
import logo from "../image/logoMain.png";
import icon1 from "../image/icon3.svg";
import React, { useState, useEffect, useRef } from "react";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import axios from "axios";
import welcome_benner from "../image/Welcome_banner.svg";
import { stakecontract, stake_abi } from "./contract.js";
import {
  useTokenBalance,
  useContract,
  useAddress,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UsdtContract, usdt_abi } from "./usdt.js";
import { color } from "framer-motion";

const Registration = () => {
  const [USDTAmt, setUSDTAmt] = useState("");
  const [approveAmt, setApproveAmt] = useState("");
  const [BuyTokenLoading, setBuyTokenLoading] = useState(false);
  const [directStakeJoiningLoading, setDirectStakeJoiningLoading] =
    useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ApproveTokensloading, setApproveTokensLoading] = useState(false);
  const referralLinkRef = useRef(null);
  const [refferalCode, setReferralCode] = useState("");
  const navigate = useNavigate();
  const handleConfetti = () => {
    confetti({});
  };
  const [activeTab, setActiveTab] = useState("home");
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };


  const [selectedValue, setSelectedValue] = useState("20");
  const handleReferralChange = (event) => {
    setReferralCode(event.target.value);
  };



  const isValidUSDTamount = Number(USDTAmt) >= 20 || USDTAmt == "";

  var storedData = localStorage.getItem("UserID");
  var UserID = JSON.parse(storedData);
  const  address = useAddress();
   
  //read functions
  const { contract } = useContract(
    "0x642ba5BEF7030FD665b671E12090268086EFF1eC"
  );
  const { data: cunWalletBal, isLoading: isCunWalletBalLoading } =
    useTokenBalance(contract, address);
  const { contract: USDTContract } = useContract(
    "0x0ECBBF0D46E13cC4fffdf14AbC39D8332c89Ad8b"
  );

  const { data: checkApproval, isLoading: isApprovalLoading } = useContractRead(
    USDTContract,
    "allowance",
    [address, "0x642ba5BEF7030FD665b671E12090268086EFF1eC"]
  );

  const ApprovedValue = checkApproval
    ? parseFloat(ethers.utils.formatUnits(checkApproval))
    : 0;

  const { data: walletBal, isLoading: walletBalLoading } = useTokenBalance(
    USDTContract,
    address
  );

  const walletBalValue = walletBal
    ? parseFloat(ethers.utils.formatUnits(walletBal.value))
    : 0;

  const handleCopyReferralLink = () => {
    if (referralLinkRef.current) {
      referralLinkRef.current.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();

      // Use react-toastify to display a toaster notification
      toast.success("Referral link copied to clipboard!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const approveTokens = async () => {
    setBuyTokenLoading(true);
    setIsLoading(true)
    try {
      let spender = "0x642ba5BEF7030FD665b671E12090268086EFF1eC"; //contract address
      let approveAmount = ethers.utils.parseEther(approveAmt);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(UsdtContract, usdt_abi, signer);
      console.log(contract);
      const token = await contract.approve(spender, approveAmount.toString(), {
        gasLimit: 80000,
      });
      console.log(token);
      const receipt = await token.wait();
      console.log(receipt);
      console.log(receipt.status);
      if (receipt.status === 1) {
        toast.success("Successfully approved tokens!", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setIsLoading(false)
      setBuyTokenLoading(false);
    } catch (error) {
      setBuyTokenLoading(false);
      toast.error("Failed", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const PostHouse5Plan = async (plan_price) => {
    setIsLoading(true)
    try {
      const response = await fetch("https://alert-plum-pigeon.cyclic.app/team/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: address.toLowerCase(),
          refferal_id: refferalCode.toLowerCase(),
          amount: 20,
        }),
      });
      const data = await response.json();
      console.log(data);
      setIsLoading(false)

      toast.success("Tokens Bought Successfully", {
        position: toast.POSITION.TOP_CENTER,
      });
      if(response.ok){
        user()
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setIsLoading(true)
    }
  };
 
  const handleBuyPlan = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("https://alert-plum-pigeon.cyclic.app/plan/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet_id: address.toLowerCase(),
          refferal: refferalCode.toLowerCase(),
          plan_details: [
            {
              amount: 20,
              plan_name: "DH Plan 1",
              type: "registration",
            },
          ],
        }),
      });
     
      if (response.ok) { // Check if response is successful
        setIsLoading(false)
        PostHouse5Plan(20);
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching user details:", error);
    }
  };

  const buyToken = async () => {
    setBuyTokenLoading(true);
    try {
      let tierplan = ethers.utils.parseEther(selectedValue);
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(stakecontract, stake_abi, signer);
        const token = await contract.buyTokens(refferalCode, tierplan);
        console.log(token);
        const receipt = await token.wait();
        if (receipt.status === 1) {
          handleBuyPlan();
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setBuyTokenLoading(false);
    } catch (err) {
      toast.error("You can not buy more than $1000 in one transaction", {
        position: toast.POSITION.TOP_CENTER,
      });
      console.error("contract call failure", err);
    }
  };

  const user = async () => {
    console.log(address)
    try {
      const response = await axios.get(
        `https://alert-plum-pigeon.cyclic.app/user/get-user?wallet_id=${address}`
      );

      if(response.ok){
        localStorage.setItem("UserID", JSON.stringify(response.data.data.user_id));
        navigate("/dashboard");
      }
    
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <div className="regi_main">
      <div style={{ zIndex: 99999999 }}>
        <ToastContainer />
         
      </div>

      {/* <img src={blueflase} className="bludeflasereg" alt="blueflase" /> */}
      <div className={`container`}>
        <div className="main_top_logo">
          <div className="logos_landing">
            <span>
              <img src={logo} alt="logos" className="logolanding" />
            </span>
          </div>

          <div className="smart_chains">
            <div className="smart_chain_1">
              <span>
                <img
                  src={icon1}
                  alt="smart_chain"
                  className="smart_chain_icon"
                />
              </span>
              <p>Smart Chain</p>
            </div>

            <div className="connect_btn">
              {/* <button>
                <Link to="/">Back </Link>
              </button> */}
            </div>
          </div>
        </div>
        
        {isLoading && <Loading />}
        <div className="registion_from">
          <div className="row">
            <div className="col-lg-6">
              <div className="regis_left">
                <h2>
                  Registration On <br></br>Dollar House Platform
                </h2>
                <div className="input_upline">
                  <h5>Your upline</h5>
                  <input
                    required
                    type="text"
                    className="you_pline_input"
                    value={refferalCode}
                    onChange={handleReferralChange}
                  />

                  <div className="input_verification">
                    {address ? (
                      <p className="approve_busd_span">
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        Wallet Connected
                      </p>
                    ) : (
                      <p className="text-red">
                        <span>
                          <i
                            class="fa fa-exclamation-circle"
                            aria-hidden="true"
                          ></i>
                        </span>
                        Wallet:not detected
                      </p>
                    )}
                    {walletBalValue > 20 ? (
                      <p className="approve_busd_span">
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>USDT Balance</span>
                      </p>
                    ) : (
                      <p>
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>USDT Balance</span>
                      </p>
                    )}

                    {ApprovedValue > 20 ? (
                      <p className="approve_busd_span">
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>Approve USDT</span>
                      </p>
                    ) : (
                      <p>
                        {" "}
                        <span>
                          <i class="fa fa-check"></i>
                        </span>
                        <span>Approve USDT</span>
                      </p>
                    )}
                  </div>
                  {walletBalValue && ApprovedValue && address ? (
                    <div className="chech_agin_btn">
                      <button onClick={handleBuyPlan}>Register with $20 Slot</button>
                    </div>
                  ) : (
                    <div className="chech_agin_btn">
                      <button onClick={handleBuyPlan}>Register with $20 Slot</button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <div
                className="regis_right"
                style={{
                  backgroundImage: `url(${plashtfiny})`,
                  backgroundSize: "cover",
                }}
              >
                <label className="block text-white font-bold text-lg">
                  Approve
                </label>
                <div className="information_section_icon">
                  <div className="flex">
                    <input
                      type="text"
                      className="you_pline_input"
                      value={approveAmt}
                      onChange={(e) => {
                        setApproveAmt(e.target.value);
                      }}
                    />
                    <button
                      className="bg-[#cb6100] approve_button"
                      onClick={approveTokens}
                    >
                      Approve
                    </button>
                  </div>
                  <h4 className="mt-4">
                    <span>
                      <i class="fa fa-info-circle" aria-hidden="true"></i>
                    </span>
                    Information
                  </h4>
                  <div className="wallwct_conenct_dtai_section">
                    <h5>Wallet not connected.</h5>
                    <p>
                      Access the website via cryptowallet dapp browser
                      (”Discover” button in Tokenpoket) or with Metamask
                      extension installed.
                    </p>

                    <button>Read guide</button>
                  </div>
                </div>
                <div className="video_section_ragistration">
                  <div className="video_section_registration">
                    {/* <video width="100%" height="240" controls>
                      <source src="movie.mp4" type="video/mp4" />
                      <source src="movie.ogg" type="video/ogg" />
                      Your browser does not support the video tag.
                    </video> */}
                    <img
                      src={welcome_benner}
                      alt="img"
                      className="rg_lion_img"
                    />
                  </div>
                </div>

                <div className="nedd_help_section">
                  <p>
                    {" "}
                    <span>
                      <i class="fa fa-commenting-o" aria-hidden="true"></i>
                    </span>
                    Need help with registration? <br></br>Talk to experts in the{" "}
                    <b>support chat</b>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
