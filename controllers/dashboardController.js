const db = require("../db");

// @desc	Get Asset Count and Assigned Assets
// @route 	GET /api/dashboard/
// @access 	Public
const dashboardLanding = async (req, res) => {
  try {
    const statusCount = await db.query(
      "select assetstatus as status, count(*) from asset group by assetstatus"
    );
    const assigned = statusCount.rows.filter(
      (row) => row.status === "Assigned"
    )[0]
      ? Number(
          statusCount.rows.filter((row) => row.status === "Assigned")[0].count
        )
      : 0;
    const onboarded = statusCount.rows.filter(
      (row) => row.status === "Onboarding"
    )[0]
      ? Number(
          statusCount.rows.filter((row) => row.status === "Onboarding")[0].count
        )
      : 0;
    const inventory = statusCount.rows.filter(
      (row) => row.status === "Inventory"
    )[0]
      ? Number(
          statusCount.rows.filter((row) => row.status === "Inventory")[0].count
        )
      : 0;
    const finalStatusCount = [onboarded, assigned, inventory];

    try {
      const categoryCount = await db.query(
        "select onboard #>> '{assetType, value}' as type, count(*) from asset group by onboard #>> '{assetType, value}'"
      );
      const Computer = categoryCount.rows.filter(
        (row) => row.type === "Computer"
      )[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "Computer")[0].count
          )
        : 0;
      const Chair = categoryCount.rows.filter((row) => row.type === "Chair")[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "Chair")[0].count
          )
        : 0;
      const Table = categoryCount.rows.filter((row) => row.type === "Table")[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "Table")[0].count
          )
        : 0;
      const TV = categoryCount.rows.filter((row) => row.type === "TV")[0]
        ? Number(categoryCount.rows.filter((row) => row.type === "TV")[0].count)
        : 0;
      const Coffee = categoryCount.rows.filter(
        (row) => row.type === "Coffee Maker"
      )[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "Coffee Maker")[0]
              .count
          )
        : 0;
      const Stationary = categoryCount.rows.filter(
        (row) => row.type === "Stationary"
      )[0]
        ? Number(
            categoryCount.rows.filter((row) => row.type === "Stationary")[0]
              .count
          )
        : 0;
      const finalCategoryCount = [
        Computer,
        Chair,
        Table,
        TV,
        Coffee,
        Stationary,
      ];

      try {
        const periodCount = await db.query(
          "select SUM(CASE WHEN createdat >= date_trunc('day', CURRENT_DATE) and createdat <= date_trunc('day', CURRENT_DATE+1) THEN 1 ELSE 0 END) AS dailycount, SUM(CASE WHEN createdat >= date_trunc('week', CURRENT_DATE) and createdat <=(date_trunc('week', current_date) + interval '1 week' - interval '1 day') THEN 1 ELSE 0 END) AS weeklycount, COUNT(*) AS monthlycount FROM   asset WHERE  createdat >= date_trunc('month', CURRENT_DATE) and createdat <=(date_trunc('month', current_date) + interval '1 month' - interval '1 day')"
        );

        const finalPeriodCount = [
          periodCount.rows[0].dailycount,
          periodCount.rows[0].weeklycount,
          periodCount.rows[0].monthlycount,
        ];

        res.status(200).json({
          status: 200,
          stats: {
            assetsCountByStatus: finalStatusCount,
            assetsCountByCategory: finalCategoryCount,
            assetsCountByPeriod: finalPeriodCount,
          },
        });
      } catch (error) {
        res.json({ status: 401, message: error.message });
      }
    } catch (error) {
      res.json({ status: 401, message: error.message });
    }
  } catch (error) {
    res.json({ status: 401, message: error.message });
  }
};

// @desc	Get Asset Count and Assigned Assets
// @route 	POST /api/dashboard/abs
// @access 	Public

const assetByStatus = async (req, res) => {
  const { assetByStatus } = req.body;

  try {
    const assetByStatusList = await db.query(
      "SELECT a2.*, u2.name, e2.empname FROM asset a2 LEFT OUTER JOIN users u2 ON (a2.userid=u2.userid) LEFT OUTER JOIN employee e2 ON (a2.empid=e2.id) where a2.assetstatus=$1",
      [assetByStatus]
    );
    res.json({
      status: 200,
      assets: assetByStatusList.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc	Get Asset Count and Assigned Assets
// @route 	POST /api/dashboard/abc
// @access 	Public

const assetByCategory = async (req, res) => {
  const { assetByCategory } = req.body;

  try {
    const assetByCategoryList = await db.query(
      "SELECT a2.*,u2.name, e2.empname FROM asset a2 LEFT OUTER JOIN users u2 ON (a2.userid=u2.userid) LEFT OUTER JOIN employee e2 ON (a2.empid=e2.id) where a2.onboard -> 'assetType' ->> 'value' =$1",
      [assetByCategory]
    );
    res.json({
      status: 200,
      assets: assetByCategoryList.rows,
    });
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

// @desc	Get Asset Count by period
// @route 	POST /api/dashboard/abp
// @access 	Public

const assetByPeriod = async (req, res) => {
  const { assetByPeriod } = req.body;

  try {
    if (assetByPeriod === "Daily") {
      const assetByPeriodList = await db.query(
        "SELECT a2.*,u2.name, e2.empname FROM asset a2 LEFT OUTER JOIN users u2 ON (a2.userid=u2.userid) LEFT OUTER JOIN employee e2 ON (a2.empid=e2.id) where a2.createdat >= current_date and a2.createdat <= current_date + 1"
      );
      res.json({
        status: 200,
        assets: assetByPeriodList.rows,
      });
    } else if (assetByPeriod === "Weekly") {
      const assetByPeriodList = await db.query(
        "SELECT a2.*,u2.name, e2.empname FROM asset a2 LEFT OUTER JOIN users u2 ON (a2.userid=u2.userid) LEFT OUTER JOIN employee e2 ON (a2.empid=e2.id) where a2.createdat >= date_trunc('week', CURRENT_DATE) and a2.createdat <=(date_trunc('week', current_date) + interval '1 week' - interval '1 day')"
      );
      res.json({
        status: 200,
        assets: assetByPeriodList.rows,
      });
    } else if (assetByPeriod === "Monthly") {
      const assetByPeriodList = await db.query(
        "SELECT a2.*,u2.name, e2.empname FROM asset a2 LEFT OUTER JOIN users u2 ON (a2.userid=u2.userid) LEFT OUTER JOIN employee e2 ON (a2.empid=e2.id) where a2.createdat >= date_trunc('month', CURRENT_DATE) and a2.createdat <=(date_trunc('month', current_date) + interval '1 month' - interval '1 day')"
      );
      res.json({
        status: 200,
        assets: assetByPeriodList.rows,
      });
    }
  } catch (error) {
    res.json({ status: 500, message: error.message });
  }
};

module.exports = {
  dashboardLanding: dashboardLanding,
  assetByStatus: assetByStatus,
  assetByCategory: assetByCategory,
  assetByPeriod: assetByPeriod,
};
