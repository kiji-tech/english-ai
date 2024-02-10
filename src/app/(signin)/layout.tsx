import Header from '@/components/(header)';

const SignInLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <Header isMenu={false} />
            <div className="contents">{children}</div>
        </div>
    );
};
export default SignInLayout;
