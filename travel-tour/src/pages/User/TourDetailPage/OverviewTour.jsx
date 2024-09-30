import React from "react";
import { useSelector } from "react-redux";
import RenderQuillItem from "~/components/common/RenderQuill";

const OverviewTour = () => {
  const {
    isGetDetailTourRequest,
    isGetDetailTourSuccess,
    isGetDetailTourFailure,
    getDetailTourState,
  } = useSelector((store) => store.tour);
  return (
    <div className="overview-tour">
      <div className="overview-tour-title">
        <span>Tổng quan tour</span>
      </div>
      <div className="overview-tour-body">
        <RenderQuillItem detail={getDetailTourState?.data?.description} />
      </div>
    </div>
  );
};

export default OverviewTour;
