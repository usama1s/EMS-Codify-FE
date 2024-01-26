export interface UserData {
    user_id: number;
    profile_picture: string | null;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    user_type: number;
    designation: string;
    date_of_joining: string;
}

export interface AttendanceData {
    attendance_picture: string;
    Fullname: string;
    email: string;
    designation: string; // Assuming designation is a string, update this type if needed
    attendance_date_time: string;
}

export interface Coordinates {
    latitude: number;
    longitude: number;
    altitude?: number | null;
    accuracy: number;
    altitudeAccuracy?: number | null;
    heading?: number | null;
    speed?: number | null;
}

export interface Position {
    coords: Coordinates;
    timestamp: number;
}