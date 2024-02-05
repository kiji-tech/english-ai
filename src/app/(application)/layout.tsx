import Header from '@/components/(header)';

const DiaryLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div className="contents">{children}</div>
        </>
    );
};
export default DiaryLayout;
