class CropModel {
    crop_code:string
    crop_common_name:string
    crop_scientific_name:string
    crop_image:File | null;
    category:string
    season:string
    crop_field_details:string[]
    log_crop_details:string[]

    setCropId(id:string):void{
        this.crop_code = id;
    }


    constructor(crop_id: string, crop_common_name: string, crop_scientific_name: string, crop_image: File |null, category: string, season: string, field_list: string[], log_list: string[]) {
        this.crop_code = crop_id;
        this.crop_common_name = crop_common_name;
        this.crop_scientific_name = crop_scientific_name;
        this.crop_image = crop_image;
        this.category = category;
        this.season = season;
        this.crop_field_details = field_list;
        this.log_crop_details = log_list;
    }
}
export default CropModel;