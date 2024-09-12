import React from "react";
import { Button } from "react-bootstrap";

const TopComponent = ({ handleShowModalActions }) => {
  return (
    <div className="body">
      <h3>Danh sách món ăn</h3>
      <div>
        <Button onClick={() => handleShowModalActions("add")}>Thêm</Button>
      </div>
    </div>
  );
};

export default TopComponent;