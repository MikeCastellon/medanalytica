import { Outlet } from "@tanstack/react-location";
import { MenuCompare } from "./MenuCompare";
import { MenuTopWrapper } from "./MenuTopWrapper";


export const RecordingCompareLayout = () => {

  return (
    <>
      <div className="ml-[380px]">
        <MenuTopWrapper>
          <MenuCompare />
        </MenuTopWrapper>
        <Outlet />
      </div>
    </>
  )
}