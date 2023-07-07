"use client";
const Heading = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
        {title}
      </h2>
      <p className="text-xs sm:text-sm text-muted-foreground">{description}</p>
    </div>
  );
};

export default Heading;
