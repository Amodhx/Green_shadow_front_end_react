class VehicleModel{
    vehicle_id:string;
    licence_plate_number:string;
    vehicle_category:string;
    fuel_type:string
    status:string
    staff_id:string
    remarks:string


    constructor(vehicle_id: string, licence_plate_number: string, vehicle_category: string, fuel_type: string, status: string, staff_id: string, remarks: string) {
        this.vehicle_id = vehicle_id;
        this.licence_plate_number = licence_plate_number;
        this.vehicle_category = vehicle_category;
        this.fuel_type = fuel_type;
        this.status = status;
        this.staff_id = staff_id;
        this.remarks = remarks;
    }
}
export default VehicleModel