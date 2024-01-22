import styles from './index.module.scss';
type ErrorMessageProps = {
    message: string;
};
const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return <p className={styles.errorMessage}>{message}</p>;
};

export default ErrorMessage;
