import HomepageCards from "@/components/Cards";
import { Userchat } from "@/components/Chart";
import CorporateCount from "@/components/counts/RetailCounts";
import List from "@/components/List";
import Stats from "@/components/Stats";
import { TablesComponent } from "@/components/TablesComponent";
import RolesPage from "./roles/page";
import UserRegistration from "./corporate-maintenance/user-registration/page";
import UserRegistrationMin from "./corporate-maintenance/user-registration-min/page";
import CorpRegMin from "./corporate-maintenance/corporate-registration-min/page";



export default function Home() {
  
  return (
    <div className="p-6">
      <div className="px-2 flex justify-between">
        <p className="text-vcblue text-lg font-light">Dashboard </p>

      </div>

      <HomepageCards />
      <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-6 mt-6 w-full">
        <div className=" ">
          <Userchat />
          <div className="bg-white rounded-2xl mt-6 p-4">
            <Stats />
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl">
          <UserRegistrationMin/>
          <CorpRegMin/>
          <div className="mt-4"></div>
        </div>
      </div>
    </div>
  );
}

