import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
  className: string;
}

export function CustomImage(props: ImageProps) {
  const { src, alt, className } = props;

  return (
    <div className={className}>
      <Image src={src} alt={alt} fill sizes="100vw" />
    </div>
  );
}
