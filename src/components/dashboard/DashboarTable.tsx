import {Table, TableProps} from "antd";

function DashboardTable(props: TableProps) {
    return (
        <div className="bg-body rounded-xl flex-1 p-2 tabla-jk tabla-jk-transparent h-full w-full flex flex-col">
            <Table {...props} />
        </div>
    );
}

export default DashboardTable;
