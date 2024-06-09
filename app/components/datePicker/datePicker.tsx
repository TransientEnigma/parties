"use client"
// react
import { useState } from "react";
import { DayPicker } from "react-day-picker";

// third-party
import { format } from "date-fns"

// styles
import "react-day-picker/dist/style.css";
import styles from "./datePicker.module.css";

// data
import { data } from "@/app/data/festivals";
import moment from "moment";

export function DatePicker() {
    // note: we need to use a style below then it will log the styles
    // console.log(styles);

    const [selected, setSelected] = useState();
    const [selectedDay, setSelectedDay] = useState("");

    console.log("selected", selected);
    console.log("selectedDay", selectedDay);

    let footer = <div className={styles.footerDesign}>
        <p>Please pick a day.</p>
    </div>

    // add a footer design
    if(selected) {
        footer = <div className={styles.footerDesign}>
            <p>You picked: {format(selected, "PP" )}.</p>
        </div>
    }

    // use the onDayClick to get the date that is selected,
    // but not when it is unselected
    function handleDayClick(day, {selected, disabled, booked}) {
        // alert if the date is booked
        console.log(selected, disabled, booked);

        if (booked) {
            alert(`Day ${day.toLocaleDateString()} is booked? ` + booked);
        }

        // The onDayClick handler receives as second argument an object
        // that can be inspected to check if the clicked day has been selected
        // or not.
        if (!selected) {
            // if it is not selected, and we click it then log it
            console.log('Active day:', day)
            const selectedDay = moment(day).format("LL")
            setSelectedDay(selectedDay);

        }

        if (disabled) {
            console.log('Disabled Day:', day);
        }
    }

    // console.log(data.festivalDays, data.linkedDays)

    function formatFestivalDates(dates) {
        return dates.map((date) => new Date(date))
    }

    const festivalDays = formatFestivalDates(data.festivalDays.dates);

    function formatAssociatedDates(festivals) {
        return festivals.map(festival => new Date(festival.date));
    }

    const linkedDays= formatAssociatedDates(data.associatedDays);

    // console.log(linkedDays);

    // const festivalDays = [
    //     new Date(2024, 5, 8),
    //     new Date(2024, 5, 9),
    //     new Date(2024, 5, 13),
    //     new Date(2024, 5, 19),
    //     new Date(2024, 5, 27),
    //     // { from: new Date(2024, 5, 15), to: new Date(2024, 6, 20) }
    // ];

    // const linkedDays = [
    //     new Date(2024, 5, 12),
    //     new Date(2024, 5, 20),
    //     new Date(2024, 5, 23),
    //     // { from: new Date(2024, 5, 15), to: new Date(2024, 6, 20) }
    // ];

    // to disable a specific date: disabled={new Date('06-26-2024')}

    function compactDates(dates) {
        return dates.map((date) =>  moment(new Date(date)).format("MM-DD-YYYY"))
    }

    const compactFestivalDays = compactDates(festivalDays)

    // console.log(compactFestivalDays, "06-08-2024", "includes:", compactFestivalDays.includes("06-08-2024"));

    return (
        <>
            <DayPicker
                mode="single"
                selected={selected}
                onSelect={setSelected}
                onDayClick={handleDayClick}

                modifiers={{ festivals: festivalDays, linked: linkedDays }}

                modifiersClassNames={{
                    selected: styles.dayPickerSelected,
                    today: styles.dayPickerToday,
                    disabled: styles.dayPickerDisabled,
                    festivals: styles.festivalDays,
                    linked: styles.linkedDays,
                }}

                showOutsideDays
                disabled={{ dayOfWeek: [0, 6] }}
                footer={footer}
            />
        </>
    );
}