import BorderAnimate from "../ui/extended/border-animate";
import config from "~/config.json";

const SecretGreeting = () => {
  return (
    <BorderAnimate childContainerClassName="bg-background">
      <p>Hello there! It&apos;s nice to meet you.</p>
      <p>I am Keegan</p>
      <a
        href={`https://www.linkedin.com/in/${config.social.linkedin}/`}
        target="_blank"
        className="non-gradient-text group-hover:gradient-text group-hover:animate-rotate-bg"
      >
        Let&apos;s get in touch
      </a>
    </BorderAnimate>
  );
};

export default SecretGreeting;
