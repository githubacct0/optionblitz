import React from "react";
import "./trades.css";


const TabHistory = () => {
    return (
        <div className="tab_section" style={{ overflowX: "auto" }}>
            <table>
                <thead className="tab_history_header">
                    <tr>
                        <th>Date/Time</th>
                        <th>market</th>
                        <th>expired</th>
                        <th>type</th>
                        <th>trade amount</th>
                        <th>result</th>
                        <th>Profit/Loss</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="tab_history_header">
                        <td>2020-19-12, 17:56</td>
                        <td>BTC/USD</td>
                        <td>58:23:51,20-12-20</td>
                        <td>call  <img src="/assets/images/upArrowGreen.png" className="row_item_img" /></td>
                        <td>$100</td>
                        <td>Win</td>
                        <td>+$75</td>
                    </tr>
                    <tr className="tab_history_header">
                        <td>2020-19-12, 17:56</td>
                        <td>BTC/USD</td>
                        <td>58:23:51,20-12-20</td>
                        <td>call  <img src="/assets/images/downArrowRed.png" className="row_item_img" /></td>
                        <td>$100</td>
                        <td>Win</td>
                        <td>+$75</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default TabHistory;
