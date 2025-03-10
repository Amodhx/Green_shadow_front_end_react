class StaffModel{
    staff_id:string
    first_name:string
    last_name:string
    designation:string
    gender:string
    joined_date:string
    dob:string
    address_line_01:string
    address_line_02:string
    address_line_03:string
    address_line_04:string
    address_line_05:string
    contact_number:string
    email:string
    role:string
    field_staff_details:string[]
    equipment_staff_details:string[]
    vehicle:string[]

    setStaffId(id:string){
        this.staff_id = id;
    }


    constructor(staff_id: string, first_name: string, last_name: string, designation: string, gender: string, joined_date: string, dob: string, address_line_01: string, address_line_02: string, address_line_03: string, address_line_04: string, address_line_05: string, contact_number: string, email: string, role: string, field_list: string[], equipment_list: string[], vehicle_list: string[]) {
        this.staff_id = staff_id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.designation = designation;
        this.gender = gender;
        this.joined_date = joined_date;
        this.dob = dob;
        this.address_line_01 = address_line_01;
        this.address_line_02 = address_line_02;
        this.address_line_03 = address_line_03;
        this.address_line_04 = address_line_04;
        this.address_line_05 = address_line_05;
        this.contact_number = contact_number;
        this.email = email;
        this.role = role;
        this.field_staff_details = field_list;
        this.equipment_staff_details = equipment_list;
        this.vehicle = vehicle_list;
    }
}

export default StaffModel