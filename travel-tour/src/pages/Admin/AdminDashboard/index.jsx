import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CSOrderOutline } from "~/components/iconography/Outline";
import { CSDollarSolid, CSLayersSolid } from "~/components/iconography/Solid";
import {
  getAllBookingRequest,
  getStatisticalRequest,
} from "~/redux/booking/actions";
import {
  getAllTourFlopRequest,
  getAllTourMainRequest,
  getAllTourRequest,
} from "~/redux/tour/actions";
import RevenueStatisticsChart from "./RevenueStatisticsChart";

const AdminDashboard = () => {
  const { getAllBookingState, getStatisticalState } = useSelector(
    (store) => store.booking
  );
  const { getAllTourState, getAllTourMainState, getAllTourFlopState } =
    useSelector((store) => store.tour);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceOfMonth, setTotalPriceOfMonth] = useState(0);
  const [totalTourOfMonth, setTotalTourOfMonth] = useState(0);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllBookingRequest({ limit: 0 }));
    dispatch(getAllTourRequest({ limit: 0 }));
    dispatch(getAllTourMainRequest());
    dispatch(getAllTourFlopRequest());
    dispatch(getStatisticalRequest());
  }, []);

  const monthMap = {
    thang1: "Jan",
    thang2: "Feb",
    thang3: "Mar",
    thang4: "Apr",
    thang5: "May",
    thang6: "Jun",
    thang7: "Jul",
    thang8: "Aug",
    thang9: "Sep",
    thang10: "Oct",
    thang11: "Nov",
    thang12: "Dec",
  };

  const totalOrdersMonthly = {};
  Array.isArray(getAllBookingState?.data) &&
    getAllBookingState?.data?.forEach((order) => {
      const orderDate = new Date(order?.createdAt);
      const month = orderDate.getMonth() + 1;
      const monthKey = `thang${month}`;
      if (totalOrdersMonthly[monthKey]) {
        totalOrdersMonthly[monthKey].price += order?.total_price;
      } else {
        totalOrdersMonthly[monthKey] = {
          name: monthKey,
          price: order?.total_price,
        };
      }
    });
  const dataTotalOrderMonth = Object.values(totalOrdersMonthly);
  const dataToTalPriceOrderMonth = dataTotalOrderMonth.map((item) => ({
    ...item,
    name: monthMap[item.name],
  }));

  useEffect(() => {
    if (getAllBookingState?.data) {
      const total = getAllBookingState?.data?.reduce((total, order) => {
        return total + order?.total_price;
      }, 0);
      setTotalPrice(total);
      const totalPriceOfMonth = getAllBookingState?.data?.reduce(
        (total, order) => {
          const updatedAtDate = new Date(order.updatedAt);
          const orderMonth = updatedAtDate.getMonth() + 1;
          const orderYear = updatedAtDate.getFullYear();
          if (orderMonth === currentMonth && orderYear === currentYear) {
            return total + order.total_price;
          } else {
            return total;
          }
        },
        0
      );
      setTotalPriceOfMonth(totalPriceOfMonth);
      const totalTourOfMonth = getAllBookingState?.data?.reduce(
        (total, order) => {
          const updatedAtDate = new Date(order.updatedAt);
          const orderMonth = updatedAtDate.getMonth() + 1;
          const orderYear = updatedAtDate.getFullYear();
          if (orderMonth === currentMonth && orderYear === currentYear) {
            return total + 1;
          } else {
            return total;
          }
        },
        0
      );
      setTotalTourOfMonth(totalTourOfMonth);
    }
  }, [getAllBookingState]);
  console.log("getAllTourFlopState", getStatisticalState);
  return (
    <div className="page-dashboard">
      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>DOANH THU</h3>
            <CSDollarSolid className="card_icon" />
          </div>
          <h2>
            {getStatisticalState?.data?.revenueTotal?.toLocaleString("vi-VN")}{" "}
            VNĐ
          </h2>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>DOANH THU THÁNG</h3>
            <CSDollarSolid className="card_icon" />
          </div>
          <h2>
            {getStatisticalState?.data?.revenueMonth?.toLocaleString("vi-VN")}{" "}
            VNĐ
          </h2>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOUR TRONG THÁNG</h3>
            <CSOrderOutline className="card_icon" />
          </div>
          <h2>{getStatisticalState?.data?.bookingMonth}</h2>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>TOUR</h3>
            <CSLayersSolid className="card_icon" />
          </div>
          <h2>{getStatisticalState?.data?.totalTours}</h2>
        </div>
      </div>

      <div className="chart-total-price-of-month">
        <div>
          <p style={{ padding: "0 20px", marginBottom: "0" }}>
            BIỂU ĐỒ DOANH THU THEO THÁNG
          </p>
          <div style={{ height: "300px", marginTop: "30px" }}>
            <RevenueStatisticsChart data={dataToTalPriceOrderMonth.reverse()} />
          </div>
        </div>
      </div>

      <div className="list-tour">
        <div className="list-tour-main">
          <span className="title">TOUR NỔI BẬT</span>
          <div className="tour-main">
            {getAllTourMainState?.data?.map((item, index) => {
              return (
                <div className="body">
                  <img
                    src={
                      item?.image?.find((image) => image.type === "banner")?.url
                    }
                    alt=""
                  />
                  <div className="name">
                    <span>{item?.name}</span>
                    <span>Lượt quan tâm: {item?.view}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="list-tour-main">
          <span className="title">TOUR ÍT ĐƯỢC QUAN TÂM</span>
          <div className="tour-main">
            {getAllTourFlopState?.data?.map((item, index) => {
              return (
                <div className="body">
                  <img
                    src={
                      item?.image?.find((image) => image.type === "banner")?.url
                    }
                    alt=""
                  />
                  <div className="name">
                    <span>{item?.name}</span>
                    <span>Lượt quan tâm: {item?.view}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
