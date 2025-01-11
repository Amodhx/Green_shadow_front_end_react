class StaffModel{
    staff_id:string
    first_name:string
    last_name:string
    designation:string
    gender:string
    joined_date:string
    dob:string
    address:string
    contact_number:string
    email:string
    role:string
    field_list:string[]
    equipment_list:string[]
    vehicle_list:string[]

    constructor(staff_id: string, first_name: string, last_name: string, designation: string, gender: string, joined_date: string, dob: string, address: string, contact_number: string, email: string, role: string, field_list: string[], equipment_list: string[], vehicle_list: string[]) {
        this.staff_id = staff_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.designation = designation;
        this.gender = gender;
        this.joined_date = joined_date;
        this.dob = dob;
        this.address = address;
        this.contact_number = contact_number;
        this.email = email;
        this.role = role;
        this.field_list = field_list;
        this.equipment_list = equipment_list;
        this.vehicle_list = vehicle_list;
    }
}
export default StaffModel