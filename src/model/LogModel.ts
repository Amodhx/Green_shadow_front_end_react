class LogModel{
    log_code: string;
    log_date: string;
    log_details: string;
    log_type: string;
    observe_image :File | null
    log_fiedls_details : string[]
    log_crop_details:string[]
    log_staff_details:string[]


    setLogId(id:string):void{
        this.log_code = id;
    }
    constructor(log_id: string, log_date: string, log_description: string, log_type: string, observe_image: File| null, fields_list: string[], crop_list: string[], staff_list: string[]) {
        this.log_code = log_id;
        this.log_date = log_date;
        this.log_details = log_description;
        this.log_type = log_type;
        this.observe_image = observe_image;
        this.log_fiedls_details = fields_list;
        this.log_crop_details = crop_list;
        this.log_staff_details = staff_list;
    }
    toPlainObject(){
        return{
            log_id: this.log_code,
            log_date: this.log_date,
            log_description: this.log_details,
            log_type: this.log_type,
            observe_image: this.observe_image,
            fields_list: this.log_fiedls_details,
            crop_list: this.log_crop_details,
            staff_list: this.log_staff_details
        }
    }
}
export default LogModel