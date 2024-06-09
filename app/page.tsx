import styles from "./page.module.css";
import {DatePicker} from "@/app/components/datePicker/datePicker";


export default function Home() {
  return (
      <main className={styles.main}>
        <div className={styles.description}></div>

        <div className={styles.center}>
          <DatePicker/>
        </div>

        <div className={styles.grid}></div>
      </main>
  );
}
