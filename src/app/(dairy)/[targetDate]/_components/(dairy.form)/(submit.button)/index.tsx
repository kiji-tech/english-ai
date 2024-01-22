'use client';

import styles from './index.module.scss';
import { Button } from 'kiji-tech-ui-component';
import { useFormStatus } from 'react-dom';

const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
        <div className={'buttonWidth'}>
            <Button label="保存する" type="submit" color="color-accent" disabled={pending} />
        </div>
    );
};

export default SubmitButton;
