import styles from './index.module.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Header() {
    return (
        <div className={styles.header}>
            {/* アイコン */}
            <div className={styles.menu}>
                <FontAwesomeIcon icon={faBars} />
            </div>
            <div className={ styles.appName}>APP Name</div>
            <div></div>
        </div>
    );
}
