import { getSession } from "@/lib/whitelist/session";
import { SERVER_NAME, PAGE_TITLE, INTRO } from "@/lib/whitelist/config";
import ApplyForm from "./ApplyForm";
import Banner from "./Banner";
import styles from "./whitelist.module.css";

export const dynamic = "force-dynamic";
export const metadata = { title: "Whitelist Application" };

const ERRORS = {
  oauth: "Discord login failed. Please try again.",
};

export default async function WhitelistPage({ searchParams }) {
  const params = await searchParams;
  const session = await getSession();
  const error = ERRORS[params?.error];
  const avatar = session?.avatar
    ? `https://cdn.discordapp.com/avatars/${session.id}/${session.avatar}.png?size=96`
    : null;

  return (
    <div className={styles.wlPage}>
      <section className={styles.pass}>
        <Banner className={styles.banner} />

        <header className={styles.passStrip}>
          {avatar ? (
            <img className={styles.avatar} src={avatar} alt="" width="52" height="52" />
          ) : (
            <div className={styles.avatar} aria-hidden="true" />
          )}
          <div className={styles.who}>
            <strong>{session ? session.username : SERVER_NAME}</strong>
            <span>{session ? "Connected with Discord" : PAGE_TITLE}</span>
          </div>
          {session && (
            <a className={styles.link} href="/api/auth/logout">
              Log out
            </a>
          )}
        </header>

        <div className={styles.passDivider} aria-hidden="true" />

        <div className={styles.passBody}>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          {session ? (
            <>
              <h1>{PAGE_TITLE}</h1>
              <p className={styles.lead}>{INTRO}</p>
              <ApplyForm />
            </>
          ) : (
            <>
              <h1>Log in with Discord to apply</h1>
              <p className={styles.lead}>
                We only use your Discord account to identify you and to send you the result.
              </p>
              <a className={styles.btn} href="/api/auth/login">
                Log in with Discord
              </a>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
