import {RootState} from "@/lib/store";
import {toggleState} from "@/lib/store/features/layout/Sider.reducer";
import {Drawer} from "antd";
import {useDispatch, useSelector} from "react-redux";
import UserSider from "./UserSider";
import MenuItems from "./MenuItems";

function DashboardDrawer() {
    const {open, isBreak} = useSelector((state: RootState) => state.sideBar);
    const dispatch = useDispatch();

    const closeDrawer = () => {
        dispatch(toggleState());
    };
    return (
        <Drawer
            open={isBreak ? open : false}
            placement="left"
            onClose={closeDrawer}
            styles={{
                content: {
                    background: "#0a0a0a",
                },
            }}
        >
            <UserSider />
            <MenuItems isDrawer />
        </Drawer>
    );
}

export default DashboardDrawer;
