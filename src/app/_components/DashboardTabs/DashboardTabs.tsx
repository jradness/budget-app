'use client'
import {Tab, Tabs} from "react-bootstrap";
import BillTable from "../../_components/BillTable/BillTable";
import ForecastTable from "../../_components/ForecastTable/ForecastTable";
import Settings from "../../_components/Settings/Settings";

const DashboardTabs = () => {
  return (
    <Tabs
    defaultActiveKey="dashboard"
    id="dashboardTabs"
    className="mb-3"
  >
    <Tab eventKey="dashboard" title="Dashboard">
      <ForecastTable />
    </Tab>
    <Tab eventKey="bills" title="Bills">
      <BillTable />
    </Tab>
    <Tab eventKey="settings" title="Settings">
      <Settings />
    </Tab>
  </Tabs>
  )
}

export default DashboardTabs;