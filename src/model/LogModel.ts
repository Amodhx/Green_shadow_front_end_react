class LogModel{
    log_code: string;
    log_date: string;
    log_description: string;
    log_type: string;
    observe_image :File | null
    fields_list : string[]
    crop_list:string[]
    staff_list:string[]


    setLogId(id:string):void{
        this.log_code = id;
    }
    constructor(log_id: string, log_date: string, log_description: string, log_type: string, observe_image: File| null, fields_list: string[], crop_list: string[], staff_list: string[]) {
        this.log_code = log_id;
        this.log_date = log_date;
        this.log_description = log_description;
        this.log_type = log_type;
        this.observe_image = observe_image;
        this.fields_list = fields_list;
        this.crop_list = crop_list;
        this.staff_list = staff_list;
    }
    toPlainObject(){
        return{
            log_id: this.log_code,
            log_date: this.log_date,
            log_description: this.log_description,
            log_type: this.log_type,
            observe_image: this.observe_image,
            fields_list: this.fields_list,
            crop_list: this.crop_list,
            staff_list: this.staff_list
        }
    }
}
export default LogModel