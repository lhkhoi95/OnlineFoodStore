export const metadata = {
  title: "About Page",
};

const AboutLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>This is AboutLayout</h1>
      {children}
    </div>
  );
};

export default AboutLayout;
