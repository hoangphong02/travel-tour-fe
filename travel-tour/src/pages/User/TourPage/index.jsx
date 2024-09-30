import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardTour } from "~/components/common";
import PaginationCustom from "~/components/common/TableComponent/PaginationCustom";
import { getAllTourRequest } from "~/redux/tour/actions";

const TourPage = () => {
  const {
    isGetAllTourRequest,
    isGetAllTourSuccess,
    isGetAllTourFailure,
    getAllTourState,
  } = useSelector((store) => store.tour);
  const limit = 6;
  const [indexPage, setIndexPage] = useState(1);
  const dispatch = useDispatch();
  const handleChangePage = (idxPage) => {
    setIndexPage(idxPage);
    // setIsCallApi(true);
  };
  useEffect(() => {
    dispatch(getAllTourRequest());
  }, []);

  console.log("getAllTourState", getAllTourState);
  return (
    <div className="tour-page-wrapper">
      <div className="title">
        <span>TOUR</span>
        <span className="line-1"></span>
        <span className="line-2"></span>
      </div>
      <div className="list-tour">
        {!!getAllTourState?.data?.length &&
          getAllTourState?.data?.map((tour) => {
            return <CardTour tour={tour} />;
          })}
      </div>
      <div>
        <PaginationCustom
          maxPage={getAllTourState?.totalPage}
          indexPage={indexPage}
          handlePaginationNext={handleChangePage}
        />
      </div>
    </div>
  );
};

export default TourPage;
