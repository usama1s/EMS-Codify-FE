 // const fetchData = async () => {
    //     try {
    //         const currentDate = new Date();
    //         let estdate
    //         if (currentDate.getTimezoneOffset() !== -300) {
    //             estdate = new Date(currentDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    //         } else {
    //             estdate = currentDate.toISOString().split('T')[0];
    //         }
    //         const date = currentDate?.toISOString().split('T')[0];
    //         const response = await axios.get(APIS.getClockInTimeByUserIdAndDate, { params: { userId, date } });
    //         if (response) {
    //             const time = response.data;
    //             const [hours, minutes] = time.split(':').map(Number);
    //             const currentHours = currentDate.getHours();
    //             const currentMinutes = currentDate.getMinutes();
    //             let hourIterate = hours + 1;
    //             let nextHour = 0;
    //             let nextMinutes = 0;
    //             let startTime;
    //             let endTime
    //             let prevMinute
    //             for (hourIterate; hourIterate <= currentHours + 1; hourIterate++) {
    //                 nextHour = hourIterate
    //                 const prevHour = nextHour - 1;
    //                 console.log("current time", currentHours + ":" + currentMinutes);
    //                 if (nextHour == hours + 1) {
    //                     prevMinute = minutes;
    //                 } else {
    //                     prevMinute = 0;
    //                 }
    //                 if (prevHour == currentHours) {
    //                     nextMinutes = currentMinutes;
    //                     nextHour = currentHours;
    //                 }
    //                 startTime = prevHour + ":" + prevMinute
    //                 endTime = nextHour + ":" + nextMinutes
    //                 await addProgressIn(startTime, endTime)

    //                 console.log("Slot Hour", prevHour, "-", nextHour);
    //                 console.log("Slot Minutes", prevMinute, "-", nextMinutes);
    //             }


    //         }

    //     } catch (error) {
    //         console.error('Error fetching attendance data:', error);
    //     }
    // };

    // const addProgressIn = (start_time: any, end_time: any) => {
    //     const startTime = start_time;
    //     const endTime = end_time;
    //     const newItem = { id: Date.now(), startTime, endTime, title: "", description: "" };
    //     setProgressItems([...progressItems, newItem]);
    // };