import {RootState} from "@/lib/store";
import {setIsBreak} from "@/lib/store/features/layout/Sider.reducer";
import {Layout} from "antd";
import {useDispatch, useSelector} from "react-redux";
import UserSider from "./UserSider";
import MenuItems from "./MenuItems";

function DashboardSider() {
    const {open, isBreak} = useSelector((state: RootState) => state.sideBar);
    const dispatch = useDispatch();
    const changeBreak = (event: boolean) => {
        dispatch(setIsBreak(event));
    };
    return (
        <Layout.Sider
            trigger={null}
            width={"250px"}
            collapsible
            collapsed={isBreak ? true : open}
            breakpoint="lg"
            collapsedWidth={isBreak ? 0 : "120"}
            onBreakpoint={changeBreak}
            className={`${isBreak ? "p-0" : "py-1 px-4"} relative`}
        >
            <UserSider />
            <MenuItems />
        </Layout.Sider>
    );
}

export default DashboardSider;
