import React, { memo } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import image1 from "~/assets/logo/image4.jpg";
import {
  CSChatOutline,
  CSCheckCircleOutline,
  CSMailBoxOutline,
  CSUser2Outline,
} from "~/components/iconography/Outline";
import { CSUserSolid } from "~/components/iconography/Solid";

export const CardTour = memo((tour) => {
  const history = useHistory();
  const handleDetail = () => {
    history.push(`/tour-detail/${tour?._id}`);
  };

  return (
    <div className="card-tour" onClick={handleDetail}>
      <img
        src={tour.tour?.image?.find((item) => item.type === "banner")?.url}
      />
      <div className="info-card">
        <span className="title">{tour?.tour?.name}</span>
        <span className="price">
          Giá gốc:{" "}
          <strong>
            {tour?.tour?.base_price_adult.toLocaleString("vi-VN")} VND
          </strong>
        </span>
        <Button>Đặt tour</Button>
      </div>
      <div className="bottom">
        <div className="left">
          <CSUser2Outline />
          <span>Lượng người quan tâm</span>
        </div>
        <div className="right">
          <div>
            <CSCheckCircleOutline />
            100
          </div>
          <div>
            <CSChatOutline />
            <span>50</span>
          </div>
        </div>
      </div>
    </div>
  );
});

CardTour.displayName = "CardTour";
