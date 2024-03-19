import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import img1 from "../image/Vector.svg";
import axios from "axios";
import "../page/style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdContentCopy } from "react-icons/md";
import { useAddress } from "@thirdweb-dev/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Statstable = () => {
  // Retrieve data from localStorage

  var UserID = localStorage.getItem("UserID");
  var userIDReal = JSON.parse(UserID);
  const address = useAddress();

  const [tableData, setTableData] = useState("");
  const [main_user_id, setUser_id] = useState("");

  const user = async (profitDetailsApi) => {
    try {
      const response = await axios.get(
        `https://alert-plum-pigeon.cyclic.app/user/get-user?wallet_id=${address}`
      );
      setUser_id(response.data.data.user_id);
    } catch (err) {
      //console.log(err);
    }
  };
  const navigate = useNavigate();

  const profitDetailsApi = (id) => {
    const apiUrl = `https://alert-plum-pigeon.cyclic.app/reward/get?userId=${id}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTableData(data.data.house_reward);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching or processing data:", error);
      });
  };

  const handleRedirect = (ID) => {
    localStorage.setItem("UserID", JSON.stringify(ID));
    navigate("/dashboard");
  };

  const [previewID, setPreviewID] = useState("");
  const handleChange = (event) => {
    setPreviewID(event.target.value);
  };

  const handleSearch = () => {
    if (address) {
      profitDetailsApi(previewID);
      localStorage.setItem("UserID", JSON.stringify(previewID));
    }
  };

  useEffect(() => {
    if (address) {
      user();
      profitDetailsApi(userIDReal);
    }
  }, [address]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedtableData = tableData?.slice(startIndex, endIndex);

  const [activeTab, setActiveTab] = useState(1);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3; // You can adjust this number based on your preference

    if (10 <= maxPagesToShow) {
      // If there are fewer pages than the max to show, display all pages
      for (let i = 1; i <= 10; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }
    } else {
      // Display ellipsis and a range of pages around the current page
      const startPage = Math.max(
        1,
        currentPage - Math.floor(maxPagesToShow / 2)
      );
      const endPage = Math.min(10, startPage + maxPagesToShow - 1);

      if (startPage > 1) {
        pageNumbers.push(<span key="startEllipsis">...</span>);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <span
            key={i}
            onClick={() => handlePageChange(i)}
            className={currentPage === i ? "active" : ""}
          >
            {i}
          </span>
        );
      }
      if (endPage < 10) {
        pageNumbers.push(<span key="endEllipsis">...</span>);
        // Display the last two digits
        pageNumbers.push(
          <span
            key={10}
            onClick={() => handlePageChange(10)}
            className={currentPage === 10 ? "active" : ""}
          >
            {10}
          </span>
        );
      }
    }

    return pageNumbers;
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

  return (
    <React.Fragment>
      <Navbar />
      <ToastContainer />
      <div className="content">
        <div className="tabls table_margin_top">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Plan Name</th>
                <th>Wallet Address</th>
                <th>Amount</th>
                <th>Status</th>
                <th>User ID</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {displayedtableData.length > 0 ? (
                displayedtableData
                  .sort((a, b) => new Date(b.Time) - new Date(a.Time)) // Sort by date in descending order
                  .map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <img
                            src="/static/media/svg-image-23.aa0930be96db08ffc8e973487f0567fb.svg"
                            alt="wallet"
                            className="wallet_icon_last"
                          />
                        </td>
                        <td>{item.plan_name}</td>
                        <td>
                          {removeAndReplaceMiddleCharacters(
                            item.invited_member_id
                          )}
                          <button
                            className="copy_button_table"
                            onClick={() => {
                              copyToClipboard(item.invited_member_id);
                            }}
                          >
                            {" "}
                            <MdContentCopy />
                          </button>
                        </td>
                        <td>{item.amount} USDT</td>
                        <td className="status_row">
                          {item.status ? (
                            item.status
                          ) : (
                            <p className="recieved_status">Received</p>
                          )}
                        </td>
                        <td>
                          <p
                            onClick={() => {
                              handleRedirect(item.user_id);
                            }}
                            className="link_table text-center  link_table2 table_id"
                          >
                            ID{item.user_id}
                          </p>
                        </td>
                        <td>
                          {new Date(item.Time).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                          })}
                        </td>
                      </tr>
                    );
                  })
              ) : (
                <h1 className="nodata_h">No data found!</h1>
              )}
            </tbody>
          </table>
          {tableData.length > 10 && (
            <div className="flex pagination_postion justify-end ">
              <div className="pagination-container flex space-between space-x-5">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>

                <div className="page-numbers  flex space-x-2">
                  {renderPageNumbers()}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === 10}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </div> */}
    </React.Fragment>
  );
};

export default Statstable;