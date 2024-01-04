import React, { useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import Breadcrumb from '../components/Breadcrumb';

declare global {
    interface Coordinates {
        latitude: number;
        longitude: number;
        altitude?: number | null;
        accuracy: number;
        altitudeAccuracy?: number | null;
        heading?: number | null;
        speed?: number | null;
    }

    interface Position {
        coords: Coordinates;
        timestamp: number;
    }
}


const MarkAttendence: React.FC = () => {
    const webcamRef = useRef<Webcam>(null);
    // const [locationName, setLocationName] = useState<string | null>(null);

    const capture = useCallback(async () => {
        if (webcamRef.current) {
            const imageSrc = webcamRef.current.getScreenshot();
            try {
                const location = await getCurrentLocation();
                const locationName = await getLocationName(location.latitude, location.longitude);

                console.log('Live Location:', location);
                console.log('Location Name:', locationName);

                // Do something with the captured image, location, and location name.
            } catch (error) {
                console.error('Error getting live location:', error);
            }
            console.log(imageSrc);
        }
    }, [webcamRef]);

    const getCurrentLocation = (): Promise<Coordinates> => new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position.coords),
            reject,
            { enableHighAccuracy: true }
        );
    });
    const getLocationName = async (latitude: number, longitude: number): Promise<string> => {
        const apiUrl = `https://api.example.com/reverse-geocode?lat=${latitude}&lon=${longitude}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extract the location name from the response.
            const locationName = data.results[0]?.formatted_address || 'Unknown Location';
            return locationName;
        } catch (error) {
            console.error('Error fetching location name:', error);
            return 'Unknown Location';
        }
    };

    return (
        <>
            <Breadcrumb pageName="Attendance" />

            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark" style={{ height: '700px' }}>
                <div className="relative z-20 h-700 md:h-700 flex flex-col items-center justify-center mt-7">
                    {/* Adjust the height and width as needed */}
                    <Webcam
                        audio={false}
                        height={700} // Set the desired height
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={500} // Set the desired width
                    />
                    <button className="inline-flex items-center justify-center gap-2.5 rounded-md bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 mt-10" onClick={capture}>
                        Mark Attendence
                    </button>
                </div>
            </div>
        </>
    );
};

export default MarkAttendence;
