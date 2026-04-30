import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
  <PageMeta
  title="Vigilance Enquiry Management System | Admin Dashboard"
  description="This is the admin dashboard for the Vigilance Enquiry Management System used to manage enquiries, reports, and investigation records."
/>
      <div className="grid grid-cols-6 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          {/* <MonthlySalesChart /> */}
        </div>

        {/* <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div> */}

        {/* <div className="col-span-12">
          <StatisticsChart />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div> */}

        {/* <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div> */}
      </div>
    </>
  );
}
