class EquipmentModel{
    equipment_id:string
    equipment_name:string
    type:string
    count:string
    status:string
    staff_list:string[]
    field_list:string[]


    setEquipmentId(id:string){
        this.equipment_id = id;
    }
    constructor(equipment_id: string, equipment_name: string, type: string, count: string, status: string, staff_list: string[], field_list: string[]) {
        this.equipment_id = equipment_id;
        this.equipment_name = equipment_name;
        this.type = type;
        this.count = count;
        this.status = status;
        this.staff_list = staff_list;
        this.field_list = field_list;
    }
    toPlainObject() {
        return {
            equipment_id: this.equipment_id,
            equipment_name: this.equipment_name,
            type: this.type,
            count: this.count,
            status: this.status,
            staff_list: this.staff_list,
            field_list: this.field_list,
        };
    }


}
export default EquipmentModel