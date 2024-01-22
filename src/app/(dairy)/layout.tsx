const DairyLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/* <Navbar /> */}
            <div className="contents">{children}</div>
        </>
    );
};
export default DairyLayout;
