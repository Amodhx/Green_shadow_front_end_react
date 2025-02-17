class FieldModel{
    field_code:string;
    field_name:string;
    filed_location:string;
    extent_size : string
    staff_list : string[]
    crops_list : string[]
    field_image : File | null
    logs_list : string[]
    equipment_list:string[]

    setFieldId(id:string):void{
        this.field_code = id;
    }

    constructor(field_id: string, field_name: string, filed_location: string, extent_size: string, staff_list: string[], crops_list: string[], field_image: File | null, logs_list: string[], equipment_list: string[]) {
        this.field_code = field_id;
        this.field_name = field_name;
        this.filed_location = filed_location;
        this.extent_size = extent_size;
        this.staff_list = staff_list;
        this.crops_list = crops_list;
        this.field_image = field_image;
        this.logs_list = logs_list;
        this.equipment_list = equipment_list;
    }
    toPlainObject() {
        return {
            field_id: this.field_code,
            field_name: this.field_name,
            filed_location: this.filed_location,
            extent_size: this.extent_size,
            staff_list: this.staff_list,
            crops_list: this.crops_list,
            field_image: this.field_image,
            logs_list: this.logs_list,
            equipment_list: this.equipment_list,
        };
    }

}
export default FieldModel;