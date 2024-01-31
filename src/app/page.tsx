import Image from "next/image";
import styles from "./page.module.css";
import SendEmailForm from "@/Components/send-email-form";

export default function Home() {
  return (
    <main className={styles.main}>
      <SendEmailForm />
    </main>
  );
}
