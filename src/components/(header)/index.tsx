import styles from './index.module.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type HeaderProps = {
    isMenu?: boolean;
};

export default function Header({ isMenu = true }: HeaderProps) {
    return (
        <div className={styles.header}>
            {/* アイコン */}
            {isMenu ? (
                <div className={styles.menu}>
                    <FontAwesomeIcon icon={faBars} />
                </div>
            ) : null}
            <div className={styles.appName}>APP Name</div>
            <div></div>
        </div>
    );
}
