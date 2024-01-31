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

export interface userData {
    user_id: number;
}

export interface ClockOutData {
    attendance_picture: string;
    location: string;
    user_id: string;
    clock_type: string;
}

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    hours?: number;
    clockOutData?: {
        attendance_picture: string;
        location: string;
        user_id: string;
        clock_type: string;
    };
}

export interface TimerProps {
    isRunning: boolean;
    onStart: () => void;
    onReset: () => void;
}
export interface Header {
    sidebarOpen: string | boolean | undefined;
    setSidebarOpen: (arg0: boolean) => void;
}











// const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
//     const apiUrl = `https://api.example.com/reverse-geocode?lat=${latitude}&lon=${longitude}`;

//     try {
//         const response = await fetch(apiUrl);
//         const data = await response.json();

//         // Extract the location name from the response.
//         const locationName = data.results[0]?.formatted_address || 'Unknown Location';
//         return locationName;
//     } catch (error) {
//         console.error('Error fetching location name:', error);
//         return 'Unknown Location';
//     }
// };


// if (hours !== undefined && hours <= 6) {


//     const clockOutData = {
//         attendance_picture: attendance_picture,
//         location: location,
//         user_id: userId,
//     };

//     try {
//         const response = await axios.post(APIS.clockOut, clockOutData);

//         if (response && response.data) {
//             alert(response.data.message);
//             navigate('/');
//         }
//     } catch (error) {
//         console.error('Error during clock out:', error);
//     }
// }

// Do something with the captured image, location, and location name.