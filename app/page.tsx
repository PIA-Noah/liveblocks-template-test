import clsx from "clsx";
import { redirect } from "next/navigation";
import { ComponentProps, ReactNode } from "react";
import { auth, signIn } from "@/auth";
import { DASHBOARD_URL } from "@/constants";
import { SignInIcon } from "@/icons";
import { MarketingLayout } from "@/layouts/Marketing";
import { Button, LinkButton } from "@/primitives/Button";
import { Container } from "@/primitives/Container";
import styles from "./page.module.css";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
}

function Feature({ title, description, className, ...props }: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <h4 className={styles.featuresFeatureTitle}>{title}</h4>
      <p className={styles.featuresFeatureDescription}>{description}</p>
    </div>
  );
}

export default async function Index() {
  const session = await auth();

  // If logged in, go to dashboard
  if (session) {
    redirect(DASHBOARD_URL);
  }

  return (
    <MarketingLayout>
      <Container className={styles.section}>
        <div className={styles.heroInfo}>
          <h1 className={styles.heroTitle}>Welcome to the SimR application</h1>
          <p className={styles.heroLead}>powered by PIA</p>
        </div>
        <div className={styles.heroActions}>
          <form
            action={async () => {
              "use server";
              await signIn();
            }}
          >
            <Button icon={<SignInIcon />}>Sign in</Button>
          </form>
          <LinkButton
            href="https://parisinfrastructureadvisory.com/"
            target="_blank"
            variant="secondary"
          >
            About us
          </LinkButton>
          <LinkButton
            href="https://simr.vercel.app/fetch_test"
            target="_blank"
            variant="destructive"
          >
            API test
          </LinkButton>
          <LinkButton
            href="https://simr-backend.onrender.com/accounts/login/"
            target="_blank"
            variant="destructive"
          >
            Register
          </LinkButton>
        </div>
      </Container>
    </MarketingLayout>
  );
}
