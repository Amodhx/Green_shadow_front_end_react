class CropModel {
    crop_id:string
    crop_common_name:string
    crop_scientific_name:string
    crop_image:File | null;
    category:string
    season:string
    field_list:string[]
    log_list:string[]

    setCropId(id:string):void{
        this.crop_id = id;
    }


    constructor(crop_id: string, crop_common_name: string, crop_scientific_name: string, crop_image: File |null, category: string, season: string, field_list: string[], log_list: string[]) {
        this.crop_id = crop_id;
        this.crop_common_name = crop_common_name;
        this.crop_scientific_name = crop_scientific_name;
        this.crop_image = crop_image;
        this.category = category;
        this.season = season;
        this.field_list = field_list;
        this.log_list = log_list;
    }
    toPlainObject() {
        return {
            crop_id : this.crop_id,
            crop_common_name: this.crop_common_name,
            crop_scientific_name: this.crop_scientific_name,
            crop_image: this.crop_image,
            category: this.category,
            season: this.season,
            field_list: this.field_list,
            log_list: this.log_list
        }
    }
}
export default CropModel;