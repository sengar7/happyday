type HeartMarkProps = Readonly<{
  className?: string;
}>;

export function HeartMark({ className }: HeartMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 64 58"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M32 54.5C28.8 50.7 5 34.6 5 18.7 5 9.4 11.5 4 19.4 4c5.2 0 9.6 2.5 12.6 7.2C35 6.5 39.4 4 44.6 4 52.5 4 59 9.4 59 18.7 59 34.6 35.2 50.7 32 54.5Z"
        fill="currentColor"
      />
    </svg>
  );
}
