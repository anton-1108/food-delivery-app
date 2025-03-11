import { AvatarDemo } from "../_components/Avatar";
import DataTableDemo from "../_components/DataTable";
import { DatePickerWithRange } from "../_components/DatePicker";

export default function Orders() {
  return (
    <div className="w-screen ">
      <div className="flex justify-end">
        <AvatarDemo />
      </div>
      <DataTableDemo />
    </div>
  );
}
