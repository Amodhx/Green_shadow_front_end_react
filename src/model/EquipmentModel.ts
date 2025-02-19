class EquipmentModel{
    equipment_id:string
    equipment_name:string
    type:string
    count:string
    status:string
    equipment_staff_details:string[]
    equipment_field_details:string[]


    setEquipmentId(id:string){
        this.equipment_id = id;
    }
    constructor(equipment_id: string, equipment_name: string, type: string, count: string, status: string, staff_list: string[], field_list: string[]) {
        this.equipment_id = equipment_id;
        this.equipment_name = equipment_name;
        this.type = type;
        this.count = count;
        this.status = status;
        this.equipment_staff_details = staff_list;
        this.equipment_field_details = field_list;
    }


}
export default EquipmentModel