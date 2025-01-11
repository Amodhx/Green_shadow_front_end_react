class EquipmentModel{
    equipment_id:string
    equipment_name:string
    type:string
    count:string
    status:string
    staff_list:string[]
    field_list:string[]


    constructor(equipment_id: string, equipment_name: string, type: string, count: string, status: string, staff_list: string[], field_list: string[]) {
        this.equipment_id = equipment_id;
        this.equipment_name = equipment_name;
        this.type = type;
        this.count = count;
        this.status = status;
        this.staff_list = staff_list;
        this.field_list = field_list;
    }
}
export default EquipmentModel