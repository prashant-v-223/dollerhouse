import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import roadmap1 from "../image/social.png";
import roadmap2 from "../image/achievements.png";
// import roadmap3 from '../image/bigRefferalСontest.png';
import roadmap4 from "../image/games.png";
import roadmap5 from "../image/customInvitePdf.png";
import roadmap6 from "../image/maxqore.png";
import roadmap7 from "../image/token.png";
import img26tick from "../image/greentick.svg";
import info27 from "../image/svg-image-27.svg";
import svg31viewicon from "../image/svg-image-31.svg";
import bluecircle from "../image/blue-blur.webp";
import icon1 from "../image/icon3.svg";
import icon2 from "../image/icon1.svg";
import icon3 from "../image/icon2.svg";
import logo from "../image/line.svg";
import banner1 from '../image/dh-banner11.svg';
import banner2 from '../image/dh-banner2.svg';
import banner3 from '../image/dh-banner211.svg';
import welcome_benner_card from "../image/1969222.svg"
import svg_wallet_img from "../image/svg-image-23.svg"
import imgsvg24 from "../image/svg-image-24.svg"
import axios from "axios";
import frx from "../image/bg.webp";
import frx3 from "../image/bg33.webp";
import frx2 from "../image/bg2.webp";
import poket_img from "../image/line.svg";

import bluesedo from "../image/gold-blur.png";
import plashtfiny from "../image/gold-blur.png";
import { Link } from "react-router-dom";
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
import "react-toastify/dist/ReactToastify.css";
const Landingpage = () => {
  const wallet_address = useAddress()
  const [showButton, setShowButton] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const walletElement = document.querySelector(".tw-connect-wallet");
    if (walletElement) {
      // If .tw-connect-wallet is present, hide the button
      setShowButton(false);
    }
  }, [showButton]);

  const [previewID, setPreviewID] = useState("");
  const [userData, setUserData] = useState(null);

  const handleChange = (event) => {
    localStorage.setItem("UserID", event.target.value);
  };
  const { contract } = useContract(
    "0x642ba5BEF7030FD665b671E12090268086EFF1eC"
  );


 
  
  const handleSearch = () => {
    navigate("/dashboard");
  };

  const { data: Parent, isLoading: isParentLoading } = useContractRead(
    contract,
    "Parent",
    [wallet_address]
  );

  const [UserID, SetUserId]= useState("")
  const GetUserId = async (wallet_address) => {
      try {
        const response = await axios.get(
          `https://alert-plum-pigeon.cyclic.app/user/get-user?wallet_id=${wallet_address}`
        );
        console.log(response.data.data.user_id)
        // localStorage.setItem("UserID", JSON.stringify(response.data.data.user_id));
      } catch (err) {
        //console.log(err);
      }
  }

  useEffect(()=>{
      GetUserId(wallet_address)
  }, [wallet_address])


  const handleSearchDashboard = async () => {
      navigate("/dashboard");
}

  return (
    <div id="scrollToTopBtn" className="landingpage_main">
      <ToastContainer />
      <div className="container">
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

            <div className="connect_btn mobile-connect-button">
              {/* <button> <Link to="/dashboard">Dashboard </Link></button> */}
              <ConnectWallet />
            </div>
          </div>
        </div>
        <div
          className="register_in"
          style={{
            backgroundImage: `url(${plashtfiny})`,
            backgroundSize: "cover",
          }}
        >
          <div className="register_left">
            <h1>Register on Dollar House platform</h1>
            <p>
              You can use this Wallet (...) to register as a new member. Watch a tutorial to learn more
            </p>
            <div className="join_bth">

              {Parent === "0x0000000000000000000000000000000000000000" || Parent === undefined ?
                <button>
                  <a href="/Registration" className="join_btn">
                    Sign In
                  </a>
                </button> :
                <button onClick={handleSearchDashboard}>
                  Dashboard
                </button>
              }
              <button>
                <a href="/Registration" className="wath_tut">
                  Registration
                </a>
              </button>
            </div>
          </div>

          <div className="register_right">
            <img src={poket_img} alt="pocket_img" className="poket_img" />
          </div>
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
        </div>

        <div className="Account_preview">
          <div className="account_title">
            <h1>Account preview</h1>
            <p>
              Look up any Dollar House member account in preview mode. Enter ID to
              preview or click Demo to view a random account.
            </p>
          </div>

          <div className="wallwte_input">
            <div className="wall_left">
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
            <div className="wall_right">
              <p>Don’t know any ID?</p>
              <button><Link to="/dashboard">Check demo</Link></button>
            </div>
          </div>
        </div>

        <div className='recent activity'>
          <div className='container'>
            <div className='forsage_title'>
              <h2>Platform recent activity</h2>
              <span className='forsage_info2'> <img src={info27} alt='Info' className='Info27' />  </span>
            </div>

            <div className='platfroms'>
              <div className='row'>
                <div className='col-lg-8'>
                  <div className='seemore'>
                    <div className='view_Section_blank'>
                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>

                      <div className="busd_line_semore_btn">
                        <div className="wallwrt_id_busd">
                          <img src={svg_wallet_img} alt="wallet" className="wallet_icon_last"></img>
                          <p>ID 16541527</p>
                          <h5> <span className="color_gry"> + </span> 20 BUSD <span className="color_gry">in</span> <spam className="color_orage">X4</spam></h5>
                        </div>

                        <div className="11_minit">
                          <h4><img src={imgsvg24} alt="img" className="imgsvg24" />11 minute</h4>
                        </div>
                      </div>
                    </div>
                    <div className='seemore_btn'>
                      <button> <span><img src={svg31viewicon} alt='svg31viewicon' className='svg31viewicon' />
                      </span> See more </button>
                    </div>
                  </div>
                </div>

                <div className='col-lg-4'>
                  <div className='menber_totla_title'>
                    <h3>Members total <span className='forsage_info2'> <img src={info27} alt='Info' className='Info27' />  </span> </h3>

                    <h4>1 634 321</h4>

                    <p><span className='toparrow'><i className="fa fa-long-arrow-up" aria-hidden="true"></i></span>719</p>
                  </div>

                  <div className='menber_totla_title'>
                    <h3>Members total <span className='forsage_info2'> <img src={info27} alt='Info' className='Info27' />  </span> </h3>
                    <div className='busd busd2'>
                      <h2>BUSD</h2>
                      <h6>+ BUSD</h6>
                    </div>

                    <div className='busd'>
                      <h2>BNB</h2>
                      <h6>+ BNB</h6>
                    </div>
                  </div>

                  <div className='link_section_all'>
                    <h3>Forsage BUSD Contracts</h3>

                    <div className='link_contracts'>
                      <p>x3/x4</p>
                      <a href='#'>0x5ac...B97 <span className='files'><i className="fa fa-files-o" aria-hidden="true"></i></span> <span className='linkIcon'><i className="fa fa-link" aria-hidden="true"></i></span></a>
                    </div>

                    <div className='link_contracts'>
                      <p>xXx</p>
                      <a href='#'>0x5ac...B97 <span className='files'><i className="fa fa-files-o" aria-hidden="true"></i></span> <span className='linkIcon'><i className="fa fa-link" aria-hidden="true"></i></span></a>
                    </div>

                    <div className='link_contracts'>
                      <p>xGold</p>
                      <a href='#'>0x5ac...B97 <span className='files'><i className="fa fa-files-o" aria-hidden="true"></i></span> <span className='linkIcon'><i className="fa fa-link" aria-hidden="true"></i></span></a>
                    </div>

                    <div className='link_contracts'>
                      <p>xQore</p>
                      <a href='#'>0x5ac...B97 <span className='files'><i className="fa fa-files-o" aria-hidden="true"></i></span> <span className='linkIcon'><i className="fa fa-link" aria-hidden="true"></i></span></a>
                    </div>

                    <div className='link_contracts'>
                      <p>maxQore</p>
                      <a href='#'>0x5ac...B97 <span className='files'><i className="fa fa-files-o" aria-hidden="true"></i></span> <span className='linkIcon'><i className="fa fa-link" aria-hidden="true"></i></span></a>
                    </div>

                    <div className='trajection_made'>
                      <h3>Transactions made</h3>

                      <p>+</p>

                      <h3>Turnover, BUSD</h3>

                      <p>+</p>
                    </div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="need_help_section">
          <h1>Need help with using the platform?</h1>
          <p>Get qualified support from Dollar House experts via online chat</p>
          <Link to="https://t.me/dollerhouse"> <button className="contact_suppo">Contact support</button> </Link>

          {/* <img src={bluecircle} alt="bluecircle" className="bluecircle" /> */}
        </div>

        {/* <div className="copy_right">
          <div className="copy_left">
            <p>© 2023 All Rights Reserved</p>
            <p>Documents</p>
          </div>

          <div className="social_media">
            <i className="fa fa-telegram" aria-hidden="true"></i>
            <i className="fa fa-youtube-play" aria-hidden="true"></i>
            <i className="fa fa-twitter" aria-hidden="true"></i>
          </div>
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
    </div>
  );
};

export default Landingpage;
