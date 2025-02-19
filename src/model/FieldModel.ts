class FieldModel{
    field_code:string;
    field_name:string;
    field_location:string;
    extent_size : string
    field_staff_details : string[]
    crop_field_details : string[]
    field_image : File | null
    log_fiedls_details : string[]
    equipment_field_details:string[]

    setFieldId(id:string):void{
        this.field_code = id;
    }

    constructor(field_id: string, field_name: string, filed_location: string, extent_size: string, staff_list: string[], crops_list: string[], field_image: File | null, logs_list: string[], equipment_list: string[]) {
        this.field_code = field_id;
        this.field_name = field_name;
        this.field_location = filed_location;
        this.extent_size = extent_size;
        this.field_staff_details = staff_list;
        this.crop_field_details = crops_list;
        this.field_image = field_image;
        this.log_fiedls_details = logs_list;
        this.equipment_field_details = equipment_list;
    }

}
export default FieldModel;