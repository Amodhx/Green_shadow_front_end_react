class FieldModel{
    field_id:string;
    field_name:string;
    filed_location:string;
    extent_size : string
    staff_list : string[]
    crops_list : string[]
    field_image : string | null
    logs_list : string[]
    equipment_list:string

    constructor(field_id: string, field_name: string, filed_location: string, extent_size: string, staff_list: string[], crops_list: string[], field_image: string | null, logs_list: string[], equipment_list: string) {
        this.field_id = field_id;
        this.field_name = field_name;
        this.filed_location = filed_location;
        this.extent_size = extent_size;
        this.staff_list = staff_list;
        this.crops_list = crops_list;
        this.field_image = field_image;
        this.logs_list = logs_list;
        this.equipment_list = equipment_list;
    }

}
export default FieldModel;