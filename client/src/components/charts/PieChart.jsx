import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import { dashboardTable } from "../../reducers/dashboardSlice";

const PieChart = ({ rawData, type, labels }) => {
  const dispatch = useDispatch();
  const data = {
    labels,
    datasets: [
      {
        data: rawData,
        backgroundColor: [
          "#F7685B",
          "#885AF8",
          "#C2CFE0",
          "#FAAD80",
          "#A03C78",
          "#93D9A3",
        ],
        borderColor: [
          "#F7685B",
          "#885AF8",
          "#C2CFE0",
          "#FAAD80",
          "#A03C78",
          "#93D9A3",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Doughnut
      data={data}
      getElementAtEvent={(elems, event) => {
        const index =
          elems[0] && elems[0].index !== undefined && elems[0].index;

        if (type === "assetByStatus") {
          const criteria =
            index === 0 ? "Onboarding" : index === 1 ? "Assigned" : "Inventory";
          const assetFilterCriteria = {
            type,
            criteria,
          };
          dispatch(dashboardTable(assetFilterCriteria));
        } else if (type === "assetByCategory") {
          const criteria =
            index === 0
              ? "Computer"
              : index === 1
              ? "Chair"
              : index === 2
              ? "Table"
              : index === 3
              ? "TV"
              : index === 4
              ? "Coffee Maker"
              : "Stationary";
          const assetFilterCriteria = {
            type,
            criteria,
          };
          dispatch(dashboardTable(assetFilterCriteria));
        } else if (type === "assetByPeriod") {
          const criteria =
            index === 0 ? "Daily" : index === 1 ? "Weekly" : "Monthly";
          const assetFilterCriteria = {
            type,
            criteria,
          };
          dispatch(dashboardTable(assetFilterCriteria));
        }
      }}
      options={{
        // onClick: graphClickEvent,
        maintainAspectRatio: false,
        cutoutPercentage: 85,
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10,
            fontFamily: '"Poppins", "-apple-system", "sans-serif"',
          },
        },
        title: {
          display: true,
          text: type,
          fontSize: 20,
          fontFamily: '"Poppins", "-apple-system", "sans-serif"',
        },
      }}
    />
  );
};

export default PieChart;
