import Link from 'next/link';
import styles from './NavigateLink.module.css'
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { FC, PropsWithChildren } from 'react';

type NavigateLinkProps = PropsWithChildren<{
    href: string,
    CustomIcon?: FC
}>

export function NavigateLink({ href, CustomIcon, children }: NavigateLinkProps) {
    return <Link href={href} className={styles.navigatelink}>
        {children}
        {CustomIcon ? <CustomIcon /> : <HiOutlineArrowNarrowRight />}
    </Link>;
}
